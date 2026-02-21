import { useState, useEffect } from 'react';

const getEmptyLang = () => ({
  tag: '', title: '', viewAll: '', primaryBadge: '', explore: '', secondaryTitle: '',
  primary: [
    { title: '', image: '', items: [] },
    { title: '', image: '', items: [] }
  ],
  secondary: [] 
});

const defaultState = { ar: getEmptyLang(), en: getEmptyLang(), it: getEmptyLang() };

export default function AdminPracticeAreas() {
  const [activeTab, setActiveTab] = useState('ar');
  const [formData, setFormData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/practiceareas`)
      .then(res => res.json())
      .then(data => setFormData((data && data._id) ? data : defaultState))
      .catch(() => setFormData(defaultState));
  }, []);

  const handleTextChange = (field, value) => {
    setFormData(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], [field]: value } }));
  };

  const handlePrimaryChange = (index, field, value) => {
    const updated = [...formData[activeTab].primary];
    updated[index][field] = field === 'items' ? value.split('\n') : value;
    setFormData(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], primary: updated } }));
  };

  const handleSecondaryChange = (index, field, value) => {
    const updated = [...formData[activeTab].secondary];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], secondary: updated } }));
  };

  const handleAddService = () => {
    const newService = { title: '', desc: '', icon: '' };
    setFormData(prev => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], secondary: [...prev[activeTab].secondary, newService] }
    }));
  };

  const handleRemoveService = (indexToRemove) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه الخدمة؟")) return;
    setFormData(prev => ({
      ...prev,
      [activeTab]: { 
        ...prev[activeTab], 
        secondary: prev[activeTab].secondary.filter((_, i) => i !== indexToRemove) 
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/practiceareas`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
      });
      setMessage('تم الحفظ بنجاح!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('خطأ في الحفظ');
    } finally {
      setIsSaving(false);
    }
  };

  if (!formData) return <div className="min-h-screen flex items-center justify-center text-xl font-bold text-gray-800">جاري التحميل...</div>;
  const current = formData[activeTab];

  // ستايلات موحدة للوضوح
  const inputStyle = "w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all shadow-sm";
  const labelStyle = "block text-sm font-bold mb-2 text-gray-800";

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen" dir={activeTab === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-8 text-gray-900" dir="rtl">إدارة مجالات الممارسة (الخدمات)</h1>
      
      {message && (
        <div className="p-4 mb-6 bg-green-100 border border-green-400 text-green-800 rounded-lg font-bold text-center">
          {message}
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
        
        {/* النصوص الأساسية */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-bold mb-6 border-b pb-3 text-blue-700">النصوص الثابتة للقسم</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className={labelStyle}>التاج (Tag)</label><input className={inputStyle} value={current.tag} onChange={e => handleTextChange('tag', e.target.value)} /></div>
            <div><label className={labelStyle}>العنوان (Title)</label><input className={inputStyle} value={current.title} onChange={e => handleTextChange('title', e.target.value)} /></div>
            <div><label className={labelStyle}>نص زر عرض الكل</label><input className={inputStyle} value={current.viewAll} onChange={e => handleTextChange('viewAll', e.target.value)} /></div>
            <div><label className={labelStyle}>العنوان الفرعي</label><input className={inputStyle} value={current.secondaryTitle} onChange={e => handleTextChange('secondaryTitle', e.target.value)} /></div>
          </div>
        </div>

        {/* الكروت الأساسية */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-bold mb-6 border-b pb-3 text-blue-700">الخدمات الأساسية (الكبيرة)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {current.primary.map((card, i) => (
              <div key={i} className="p-6 bg-gray-50 border border-gray-200 rounded-xl">
                <div className="mb-4">
                  <label className={labelStyle}>عنوان الخدمة</label>
                  <input className={inputStyle} value={card.title} onChange={e => handlePrimaryChange(i, 'title', e.target.value)} />
                </div>
                <div className="mb-4">
                  <label className={labelStyle}>رابط الصورة</label>
                  <input className={inputStyle} value={card.image} onChange={e => handlePrimaryChange(i, 'image', e.target.value)} />
                </div>
                <div>
                  <label className={labelStyle}>المميزات (كل ميزة في سطر)</label>
                  <textarea className={inputStyle} rows="5" value={card.items.join('\n')} onChange={e => handlePrimaryChange(i, 'items', e.target.value)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* الكروت الفرعية */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-6 border-b pb-3">
            <h2 className="text-xl font-bold text-blue-700">الخدمات الفرعية ({current.secondary.length})</h2>
            <button type="button" onClick={handleAddService} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-md transition-transform hover:scale-105">
              <span>+</span> إضافة خدمة جديدة
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {current.secondary.map((card, i) => (
              <div key={i} className="p-5 bg-gray-50 border border-gray-200 rounded-xl relative group hover:border-blue-300 transition-colors">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-bold uppercase">خدمة {i + 1}</span>
                  <button type="button" onClick={() => handleRemoveService(i)} className="text-red-500 hover:text-red-700 text-sm font-bold border border-red-200 hover:bg-red-50 px-3 py-1 rounded-lg transition-all">حذف</button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={labelStyle}>العنوان</label>
                    <input className={inputStyle} value={card.title} onChange={e => handleSecondaryChange(i, 'title', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelStyle}>الوصف</label>
                    <textarea className={inputStyle} rows="3" value={card.desc} onChange={e => handleSecondaryChange(i, 'desc', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelStyle}>كود الأيقونة (SVG)</label>
                    <textarea className={inputStyle + " text-xs font-mono text-gray-500"} dir="ltr" rows="3" value={card.icon} onChange={e => handleSecondaryChange(i, 'icon', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
            
            {current.secondary.length === 0 && (
              <div className="col-span-full text-center p-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 font-medium">
                لا توجد خدمات مضافة حالياً.
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-start pt-6 pb-20">
          <button 
            type="submit" 
            disabled={isSaving} 
            className={`px-12 py-4 text-white font-extrabold rounded-xl shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 ${
              isSaving ? 'bg-gray-400 cursor-wait' : 'bg-blue-700 hover:bg-blue-800'
            }`}
          >
            {isSaving ? 'جاري الحفظ...' : 'حفظ كافة التعديلات'}
          </button>
        </div>
      </form>
    </div>
  );
}