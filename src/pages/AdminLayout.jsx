import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';

// ربط السوكيت بالسيرفر (استخدم المتغير البيئي لو موجود، أو الرابط المحلي)
const socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000");

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hasNewMessage, setHasNewMessage] = useState(false);

  // 1. إدارة اتصال السوكيت والتنبيهات
  useEffect(() => {
    // إخبار السيرفر أن هذا هو "الأدمن" لكي يرسل له تنبيهات كل الغرف
    socket.emit('join_admin');

    const handleReceiveMessage = (data) => {
      // لو الرسالة جاية من عميل وإحنا مش جوه صفحة الشات حالياً، نُظهر النقطة الحمراء
      if (data.sender !== 'admin' && location.pathname !== '/admin/chat') {
        setHasNewMessage(true);
      }
    };

    socket.on('receive_message', handleReceiveMessage);

    // تنظيف الاتصال عند الخروج من المكون
    return () => socket.off('receive_message', handleReceiveMessage);
  }, [location.pathname]);

  // 2. تصفير التنبيه بمجرد الدخول لصفحة الشات
  useEffect(() => {
    if (location.pathname === '/admin/chat') {
      setHasNewMessage(false);
    }
  }, [location.pathname]);

  // 3. دالة تسجيل الخروج
  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // مسح التوكن من المتصفح
    navigate('/admin/login'); // توجيه الأدمن لصفحة تسجيل الدخول
  };

  // 4. قائمة الروابط في اللوحة الجانبية
  const menuItems = [
    // --- قسم التواصل والعملاء ---
    { name: 'رسائل العملاء', path: '/admin/messages', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { name: 'الشات المباشر', path: '/admin/chat', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', hasNotify: hasNewMessage },
    
    // --- قسم إدارة محتوى الموقع ---
    { name: 'القسم الرئيسي (Hero)', path: '/admin/hero', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { name: 'من نحن', path: '/admin/about', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'لماذا نحن', path: '/admin/whyus', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
    { name: 'مجالات الممارسة', path: '/admin/practiceareas', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { name: 'المقالات', path: '/admin/articles', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
    { name: 'الأسئلة الشائعة', path: '/admin/faq', icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'معلومات التواصل', path: '/admin/contact', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
  ];

  return (
    <div className="flex h-screen bg-gray-100" dir="rtl">
      
      {/* القائمة الجانبية (Sidebar) */}
      <aside className="w-64 bg-[#0A0A0A] text-white flex flex-col shadow-2xl shrink-0">
        
        {/* اللوجو والترويسة */}
        <div className="p-6 border-b border-white/10 text-center">
          <h2 className="text-xl font-bold text-gold-400 uppercase tracking-tighter">Golden Dashboard</h2>
        </div>

        {/* الروابط */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          
          {/* فاصل قسم التواصل */}
          <div className="text-white/40 text-xs font-bold mb-2 mt-2 px-2">التواصل والدعم</div>
          
          {menuItems.slice(0, 2).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive ? 'bg-gold-400 text-black font-bold' : 'text-white/70 hover:bg-white/10'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <span>{item.name}</span>
              </div>
              
              {/* النقطة الحمراء (التنبيه) */}
              {item.hasNotify && (
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border border-white"></span>
                </span>
              )}
            </NavLink>
          ))}

          {/* فاصل قسم إدارة المحتوى */}
          <div className="text-white/40 text-xs font-bold mb-2 mt-6 px-2">إدارة محتوى الموقع</div>

          {menuItems.slice(2).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive ? 'bg-gold-400 text-black font-bold' : 'text-white/70 hover:bg-white/10'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <span>{item.name}</span>
              </div>
            </NavLink>
          ))}
        </nav>

        {/* زر تسجيل الخروج في أسفل القائمة */}
        <div className="p-4 border-t border-white/10 mt-auto">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors duration-300 font-bold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            تسجيل الخروج
          </button>
        </div>

      </aside>

      {/* منطقة عرض المحتوى (الصفحات الداخلية) */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <Outlet />
      </main>

    </div>
  );
}