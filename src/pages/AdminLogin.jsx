import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // 1. قراءة الرابط ديناميكياً (يشتغل معاك لوكال وعلى السيرفر)
      let baseUrl = import.meta.env.VITE_API_URL;
      // تنظيف الرابط لمنع تكرار كلمة api
      baseUrl = baseUrl.replace(/\/api\/?$/, "").replace(/\/$/, "");

      // 2. استخدام الرابط الديناميكي في الطلب
      const response = await fetch(`${baseUrl}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // إذا نجح الدخول، احفظ التوكن الحقيقي القادم من السيرفر
        localStorage.setItem('adminToken', data.token);
        // التوجيه للوحة التحكم
        navigate('/admin/messages');
      } else {
        // إذا فشل (الباسورد خطأ مثلاً)
        setError(data.message || 'البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }
    } catch (err) {
      console.error(err);
      setError('لا يمكن الاتصال بالخادم. تأكد من اتصالك بالإنترنت أو تشغيل السيرفر.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6" dir="rtl">
      <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-lg shadow-2xl backdrop-blur-md">
        
        <div className="text-center mb-8">
          <h1 className="font-display text-gold-400 text-3xl font-bold mb-2">تسجيل الدخول</h1>
          <p className="text-white/50 text-sm">لوحة تحكم إدارة Golden Balance</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-white/70 text-xs font-bold mb-2">البريد الإلكتروني</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-white/10 text-white p-3 rounded focus:outline-none focus:border-gold-400 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-white/70 text-xs font-bold mb-2">كلمة المرور</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 text-white p-3 rounded focus:outline-none focus:border-gold-400 transition-colors"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-gold-400 hover:bg-gold-500 text-black font-bold py-3 rounded transition-colors mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'جاري التحقق...' : 'دخول'}
          </button>
        </form>
      </div>
    </div>
  );
}

