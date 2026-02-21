import { useState, useEffect } from 'react';

export default function AdminWhyUs() {
  const [activeTab, setActiveTab] = useState('ar'); 
  
  const defaultLangData = { tag: '', title: '', subtitle: '', cards: Array(6).fill({ icon: '', title: '', desc: '' }) };
  const [formData, setFormData] = useState({ ar: defaultLangData, en: defaultLangData, it: defaultLangData });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/whyus`);
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
    fetchData();
  }, []);

  const handleTextChange = (field, value) => {
    setFormData(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], [field]: value } }));
  };

  const handleCardChange = (index, field, value) => {
    const updatedCards = [...formData[activeTab].cards];
    updatedCards[index] = { ...updatedCards[index], [field]: value };
    setFormData(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], cards: updatedCards } }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/whyus`, {
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

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-xl font-bold text-gray-800">جاري تحميل البيانات...</div>;

  const currentData = formData[activeTab];

  // ستايل موحد لضمان وضوح النصوص
  const inputStyle = "w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-medium placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all shadow-sm";
  const labelStyle = "block text-sm font-bold mb-2 text-gray-800 tracking-wide";

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen" dir={activeTab === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-black mb-8 text-gray-900 border-r-4 border-blue-600 pr-4" dir="rtl">إدارة قسم (لماذا نحن؟)</h1>

      {message.text && (
        <div className={`p-4 mb-8 rounded-lg font-bold shadow-sm border ${message.type === 'success' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`} dir="rtl">
          {message.text}
        </div>
      )}

      {/* اختيار اللغة */}
      <div className="flex gap-4 mb-8 border-b border-gray-300 pb-4" dir="rtl">
        {['ar', 'en', 'it'].map(lang => (
          <button 
            key={lang}
            onClick={() => setActiveTab(lang)} 
            className={`px-8 py-2 rounded-lg font-bold transition-all ${activeTab === lang ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'}`}
          >
            {lang === 'ar' ? 'العربية' : lang.toUpperCase()}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* العناوين الأساسية */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-bold mb-6 border-b pb-3 text-blue-700">النصوص الثابتة للقسم</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelStyle}>التاج (Tag)</label>
              <input type="text" className={inputStyle} value={currentData.tag} onChange={(e) => handleTextChange('tag', e.target.value)} />
            </div>
            <div>
              <label className={labelStyle}>العنوان الرئيسي (Title)</label>
              <input type="text" className={inputStyle} value={currentData.title} onChange={(e) => handleTextChange('title', e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className={labelStyle}>النص الفرعي (Subtitle)</label>
              <textarea className={inputStyle} rows="3" value={currentData.subtitle} onChange={(e) => handleTextChange('subtitle', e.target.value)} />
            </div>
          </div>
        </div>

        {/* الكروت (Cards) */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-bold mb-6 border-b pb-3 text-blue-700">مميزات المكتب (6 كروت)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentData.cards.map((card, index) => (
              <div key={index} className="p-6 border border-gray-200 rounded-xl bg-gray-50 relative group hover:border-blue-400 transition-colors shadow-sm">
                <span className="absolute top-3 left-3 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-black uppercase">كارت {index + 1}</span>
                <div className="mt-6 space-y-4">
                  <div>
                    <label className={labelStyle}>عنوان الميزة</label>
                    <input type="text" className={inputStyle} value={card.title} onChange={(e) => handleCardChange(index, 'title', e.target.value)} />
                  </div>
                  
                  <div>
                    <label className={labelStyle}>شرح الميزة (الوصف)</label>
                    <textarea className={inputStyle} rows="3" value={card.desc} onChange={(e) => handleCardChange(index, 'desc', e.target.value)} />
                  </div>
                  
                  <div>
                    <label className={labelStyle}>كود الأيقونة (SVG)</label>
                    <textarea 
                      className={inputStyle + " font-mono text-xs text-gray-500"} 
                      dir="ltr" 
                      rows="3" 
                      value={card.icon} 
                      onChange={(e) => handleCardChange(index, 'icon', e.target.value)} 
                      placeholder="<svg>...</svg>" 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* زر الحفظ */}
        <div className="flex justify-start pt-6 pb-20">
          <button 
            type="submit" 
            disabled={isSaving} 
            className={`px-12 py-4 text-white font-extrabold rounded-xl shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 ${
              isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'
            }`}
          >
            {isSaving ? 'جاري الحفظ...' : 'حفظ كافة التعديلات'}
          </button>
        </div>
      </form>
    </div>
  );
}