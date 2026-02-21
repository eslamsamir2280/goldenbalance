import { useState, useEffect } from 'react';

export default function AdminAbout() {
  const [formData, setFormData] = useState({
    ar: { tag: '', title1: '', title2: '', p1: '', p2: '', visionTitle: '', visionText: '', cta: '' },
    en: { tag: '', title1: '', title2: '', p1: '', p2: '', visionTitle: '', visionText: '', cta: '' },
    it: { tag: '', title1: '', title2: '', p1: '', p2: '', visionTitle: '', visionText: '', cta: '' },
    image: ''
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/about`);
        if (response.ok) {
          const data = await response.json();
          if (data && data._id) setFormData(data);
        }
      } catch (error) {
        setMessage({ type: 'error', text: 'حدث خطأ أثناء جلب البيانات' });
      } finally {
        setIsLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  const handleLangChange = (lang, field, value) => {
    setFormData(prev => ({ ...prev, [lang]: { ...prev[lang], [field]: value } }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/about`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'تم حفظ البيانات بنجاح!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: 'فشل حفظ البيانات' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'حدث خطأ في الاتصال' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-10 text-center text-xl font-bold text-gray-800">جاري تحميل البيانات...</div>;

  // المكون الفرعي لحقول الإدخال مع التعديلات الجديدة للألوان
  const InputField = ({ label, value, onChange, isTextarea = false, dir = "auto" }) => (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2 text-gray-800">{label}</label>
      {isTextarea ? (
        <textarea 
          className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm" 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          dir={dir} 
          rows="4" 
        />
      ) : (
        <input 
          type="text" 
          className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-sm" 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          dir={dir} 
        />
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen" dir="rtl">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">إدارة قسم من نحن (About Section)</h1>

      {message.text && (
        <div className={`p-4 mb-6 rounded font-bold ${message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {['ar', 'en', 'it'].map((lang) => (
            <div key={lang} className="bg-white p-6 rounded-xl shadow-md border border-gray-200" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
              <h2 className="text-xl font-extrabold mb-5 text-blue-700 border-b-2 border-gray-100 pb-3 uppercase">
                {lang === 'ar' ? 'العربية' : lang === 'en' ? 'English' : 'Italiano'}
              </h2>
              <InputField label="التاج (Tag)" value={formData[lang].tag} onChange={(v) => handleLangChange(lang, 'tag', v)} />
              <InputField label="العنوان الأول" value={formData[lang].title1} onChange={(v) => handleLangChange(lang, 'title1', v)} />
              <InputField label="العنوان الثاني" value={formData[lang].title2} onChange={(v) => handleLangChange(lang, 'title2', v)} />
              <InputField label="الفقرة الأولى" value={formData[lang].p1} onChange={(v) => handleLangChange(lang, 'p1', v)} isTextarea />
              <InputField label="الفقرة الثانية" value={formData[lang].p2} onChange={(v) => handleLangChange(lang, 'p2', v)} isTextarea />
              <InputField label="عنوان الرؤية" value={formData[lang].visionTitle} onChange={(v) => handleLangChange(lang, 'visionTitle', v)} />
              <InputField label="نص الرؤية" value={formData[lang].visionText} onChange={(v) => handleLangChange(lang, 'visionText', v)} isTextarea />
              <InputField label="نص الزر" value={formData[lang].cta} onChange={(v) => handleLangChange(lang, 'cta', v)} />
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200" dir="ltr">
          <h2 className="text-xl font-extrabold mb-5 text-gray-900 border-b-2 border-gray-100 pb-3 text-right">صورة القسم</h2>
          <InputField label="Image URL" value={formData.image} onChange={(v) => setFormData({...formData, image: v})} />
          {formData.image && (
            <div className="mt-4 border-2 border-gray-200 p-2 rounded-lg bg-gray-50 inline-block w-full">
              <img src={formData.image} alt="Preview" className="h-48 w-full object-cover rounded shadow-sm" />
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 pb-10">
          <button 
            type="submit" 
            disabled={isSaving} 
            className={`px-10 py-3 text-white font-bold rounded-lg shadow-lg transition-all text-lg ${
              isSaving 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 hover:shadow-xl'
            }`}
          >
            {isSaving ? 'جاري الحفظ...' : 'حفظ التعديلات'}
          </button>
        </div>
      </form>
    </div>
  );
}