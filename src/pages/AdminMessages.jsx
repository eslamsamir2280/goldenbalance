import { useState, useEffect } from 'react';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/messages`);
      const data = await res.json();
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/messages/${id}/read`, { method: 'PUT' });
    fetchMessages(); 
  };

  const deleteMessage = async (id) => {
    if(!window.confirm('هل أنت متأكد من الحذف؟')) return;
    await fetch(`${import.meta.env.VITE_API_URL}/messages/${id}`, { method: 'DELETE' });
    fetchMessages();
  };

  if (loading) return <div className="p-10 text-center font-bold text-gray-800 text-xl">جاري تحميل الرسائل...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen" dir="rtl">
      <h1 className="text-3xl font-black mb-8 text-gray-900 border-r-4 border-blue-600 pr-4">صندوق الوارد (رسائل العملاء)</h1>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        {messages.length === 0 ? (
          <div className="p-20 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <p className="text-gray-500 text-xl font-medium">لا توجد رسائل جديدة حالياً.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="p-5 font-black text-gray-800 text-sm uppercase tracking-wider">التاريخ</th>
                  <th className="p-5 font-black text-gray-800 text-sm uppercase tracking-wider">بيانات العميل</th>
                  <th className="p-5 font-black text-gray-800 text-sm uppercase tracking-wider">الخدمة المطلوبة</th>
                  <th className="p-5 font-black text-gray-800 text-sm uppercase tracking-wider">نص الرسالة</th>
                  <th className="p-5 font-black text-gray-800 text-sm uppercase tracking-wider text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {messages.map(msg => (
                  <tr key={msg._id} className={`transition-colors hover:bg-gray-50 ${!msg.isRead ? 'bg-blue-50/40' : 'bg-white'}`}>
                    <td className="p-5 text-sm font-bold text-gray-700 whitespace-nowrap" dir="ltr">
                      {new Date(msg.createdAt).toLocaleDateString('ar-EG', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="p-5">
                      <p className={`text-base ${!msg.isRead ? 'font-black text-gray-900' : 'font-bold text-gray-800'}`}>{msg.fullName}</p>
                      <p className="text-sm text-blue-700 font-medium mt-1" dir="ltr">{msg.phone}</p>
                      <p className="text-xs text-gray-500 font-medium mt-0.5">{msg.email}</p>
                    </td>
                    <td className="p-5">
                      <span className="inline-block bg-gold-400/20 text-gold-700 text-xs px-3 py-1 rounded-full font-black border border-gold-400/30">
                        {msg.serviceArea || 'غير محدد'}
                      </span>
                      <p className="text-xs mt-2 text-gray-500 font-bold">اللغة: {msg.language || '---'}</p>
                    </td>
                    <td className="p-5">
                      <div className={`text-sm leading-relaxed max-w-xs md:max-w-md ${!msg.isRead ? 'text-gray-900 font-bold' : 'text-gray-600'}`}>
                        {msg.message}
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <div className="flex justify-center gap-3">
                        {!msg.isRead && (
                          <button 
                            onClick={() => markAsRead(msg._id)} 
                            className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-black hover:bg-blue-700 shadow-sm transition-all"
                          >
                            تمت القراءة
                          </button>
                        )}
                        <button 
                          onClick={() => deleteMessage(msg._id)} 
                          className="bg-red-50 text-red-600 border border-red-200 px-4 py-1.5 rounded-lg text-xs font-black hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="mt-6 text-gray-500 text-sm font-medium">
        * الرسائل المظللة باللون الأزرق الفاتح هي رسائل جديدة لم تُقرأ بعد.
      </div>
    </div>
  );
}