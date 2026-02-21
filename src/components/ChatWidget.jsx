import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

// استبدل الرابط برابط السيرفر الخاص بك
const SOCKET_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5000' : '/';
const socket = io(SOCKET_URL, {
  path: "/socket.io/", // المسار الافتراضي للشات
  transports: ["websocket", "polling"],
});
export default function ChatWidget({ lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [hasUnread, setHasUnread] = useState(false); // حالة التنبيه بالرسائل الجديدة
  const scrollRef = useRef();
  const isRTL = lang === 'ar';

  // 1. توليد أو جلب معرف الغرفة الفريد للعميل
  const [roomId] = useState(() => {
    const savedId = localStorage.getItem('chat_room_id');
    if (savedId) return savedId;
    const newId = 'client_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('chat_room_id', newId);
    return newId;
  });

  useEffect(() => {
    // الانضمام للغرفة
    socket.emit('join_chat', roomId);

    // جلب تاريخ المحادثة القديم
    socket.on('chat_history', (history) => {
      setChat(history);
    });

    // استقبال الرسائل الجديدة
    socket.on('receive_message', (data) => {
      setChat((prev) => [...prev, data]);
      
      // إذا كانت الرسالة من الأدمين والشات مغلق، فعل التنبيه
      if (data.sender === 'admin' && !isOpen) {
        setHasUnread(true);
      }
    });

    return () => {
      socket.off('chat_history');
      socket.off('receive_message');
    };
  }, [roomId, isOpen]);

  // تصفير التنبيه عند فتح الشات
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
    }
  }, [isOpen]);

  // سكرول تلقائي لآخر رسالة
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMsg = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const msgData = { roomId, message: message.trim(), sender: 'client' };
    
    // إرسال للسيرفر
    socket.emit('send_message', msgData);
    
    // إضافة الرسالة محلياً فوراً
    setChat((prev) => [...prev, msgData]);
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9999]" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* زر الشات العائم مع التنبيه */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="relative bg-gold-400 w-14 h-14 rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.4)] flex items-center justify-center text-black transition-all hover:scale-110 active:scale-95"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}

        {/* نقطة التنبيه الحمراء */}
        {!isOpen && hasUnread && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-red-600 border-2 border-white text-[10px] text-white items-center justify-center font-bold">!</span>
          </span>
        )}
      </button>

      {/* نافذة المحادثة */}
      {isOpen && (
        <div className="absolute bottom-20 left-0 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 animate-in slide-in-from-bottom-5 duration-300">
          
          {/* رأس النافذة */}
          <div className="bg-[#0A0A0A] p-4 flex items-center justify-between border-b border-gold-400/20">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gold-400 font-bold text-sm">
                {isRTL ? 'الدعم القانوني المباشر' : 'Direct Legal Support'}
              </span>
            </div>
          </div>

          {/* منطقة الرسائل */}
          <div className="flex-1 p-4 overflow-y-auto bg-[#F9FAFB] flex flex-col gap-3">
            <div className="bg-blue-50 text-blue-800 p-3 rounded-xl text-xs font-medium text-center mb-2">
              {isRTL ? 'أهلاً بك، كيف يمكننا مساعدتك قانونياً اليوم؟' : 'Welcome, how can we assist you legally today?'}
            </div>

            {chat.map((m, i) => (
              <div 
                key={i} 
                className={`flex ${m.sender === 'client' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`p-3 rounded-2xl max-w-[85%] text-sm shadow-sm leading-relaxed ${
                  m.sender === 'client' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none font-medium'
                }`}>
                  {m.message}
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>

          {/* صندوق الإدخال */}
          <form onSubmit={sendMsg} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input 
              className="flex-1 p-2.5 bg-gray-100 rounded-xl text-gray-900 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-gold-400/20 transition-all" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              placeholder={isRTL ? 'اكتب استفسارك هنا...' : 'Type your inquiry here...'} 
            />
            <button 
              type="submit" 
              className="bg-gold-400 p-2.5 rounded-xl text-black hover:bg-gold-500 transition-colors shadow-md"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={isRTL ? 'rotate-180' : ''}>
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
