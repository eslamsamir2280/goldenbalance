import { useState, useEffect } from 'react';

const getEmptyLang = () => ({ tag: '', title: '', subtitle: '', questions: [] });
const defaultState = { ar: getEmptyLang(), en: getEmptyLang(), it: getEmptyLang() };

export default function AdminFAQ() {
  const [activeTab, setActiveTab] = useState('ar');
  const [formData, setFormData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/faq`)
      .then(res => res.json())
      .then(data => setFormData((data && data._id) ? data : defaultState))
      .catch(() => setFormData(defaultState));
  }, []);

  const handleTextChange = (field, value) => {
    setFormData(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], [field]: value } }));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQs = [...formData[activeTab].questions];
    updatedQs[index][field] = value;
    setFormData(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], questions: updatedQs } }));
  };

  const handleAddQuestion = () => {
    const newQ = { q: '', a: '' };
    setFormData(prev => ({
      ...prev, [activeTab]: { ...prev[activeTab], questions: [...prev[activeTab].questions, newQ] }
    }));
  };

  const handleRemoveQuestion = (index) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا السؤال؟")) return;
    setFormData(prev => ({
      ...prev, [activeTab]: { ...prev[activeTab], questions: prev[activeTab].questions.filter((_, i) => i !== index) }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/faq`, {
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

  if (!formData) return <div className="min-h-screen bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-800">جاري التحميل...</div>;
  const current = formData[activeTab];

  // ستايل موحد للمدخلات لضمان وضوح الخط
  const inputStyle = "w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-medium placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all shadow-sm";
  const labelStyle = "block text-sm font-bold mb-2 text-gray-800";

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen" dir={activeTab === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-8 text-gray-900" dir="rtl">إدارة الأسئلة الشائعة (FAQ)</h1>
      
      {message && (
        <div className="p-4 mb-6 bg-green-100 border border-green-400 text-green-800 rounded-lg font-bold text-center shadow-sm">
          {message}
        </div>
      )}

      {/* تبديل اللغات */}
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
        
        {/* النصوص الأساسية للقسم */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-bold mb-6 border-b pb-3 text-blue-700">النصوص الثابتة للقسم</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className={labelStyle}>التاج (Tag)</label><input className={inputStyle} value={current.tag} onChange={e => handleTextChange('tag', e.target.value)} /></div>
            <div><label className={labelStyle}>العنوان (Title)</label><input className={inputStyle} value={current.title} onChange={e => handleTextChange('title', e.target.value)} /></div>
            <div className="md:col-span-2"><label className={labelStyle}>النص الفرعي (Subtitle)</label><input className={inputStyle} value={current.subtitle} onChange={e => handleTextChange('subtitle', e.target.value)} /></div>
          </div>
        </div>

        {/* قائمة الأسئلة والإجابات */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-6 border-b pb-3">
            <h2 className="text-xl font-bold text-blue-700">الأسئلة والإجابات ({current.questions.length})</h2>
            <button type="button" onClick={handleAddQuestion} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-md transition-transform hover:scale-105">
              <span>+</span> إضافة سؤال جديد
            </button>
          </div>
          
          <div className="space-y-6">
            {current.questions.map((item, i) => (
              <div key={i} className="p-6 bg-gray-50 border border-gray-200 rounded-xl relative group hover:border-blue-300 transition-colors">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">سؤال {i + 1}</span>
                  <button type="button" onClick={() => handleRemoveQuestion(i)} className="text-red-500 hover:text-red-700 text-sm font-bold border border-red-200 hover:bg-red-50 px-4 py-1 rounded-lg transition-all">حذف</button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className={labelStyle}>السؤال (Question)</label>
                    <input className={inputStyle + " font-bold"} value={item.q} onChange={e => handleQuestionChange(i, 'q', e.target.value)} />
                  </div>
                  <div>
                    <label className={labelStyle}>الإجابة (Answer)</label>
                    <textarea className={inputStyle} rows="4" value={item.a} onChange={e => handleQuestionChange(i, 'a', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
            
            {current.questions.length === 0 && (
              <div className="text-center p-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                لا توجد أسئلة مضافة حالياً. اضغط على الزر الأخضر للبدء.
              </div>
            )}
          </div>
        </div>

        {/* زر الحفظ النهائي */}
        <div className="flex justify-start pt-6 pb-20">
          <button 
            type="submit" 
            disabled={isSaving} 
            className={`px-12 py-4 text-white font-extrabold rounded-xl shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 ${
              isSaving ? 'bg-gray-400 cursor-wait' : 'bg-blue-700 hover:bg-blue-800 shadow-blue-200'
            }`}
          >
            {isSaving ? 'جاري الحفظ...' : 'حفظ كافة التغييرات'}
          </button>
        </div>
      </form>
    </div>
  );
}