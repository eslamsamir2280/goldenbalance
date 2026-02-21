import { useState, useEffect } from 'react';

const getEmptyFields = () => ({ fullName: '', fullNamePH: '', email: '', emailPH: '', phone: '', phonePH: '', language: '', serviceArea: '', message: '', messagePH: '' });
const getEmptyLang = () => ({ tag: '', title: '', subtitle: '', fields: getEmptyFields(), languages: [], services: [], submit: '', hqTitle: '', hqName: '', hqAddress: '', phone: '', email: '', whatsapp: '', linkedin: '', viewMap: '', whatsappUrl: '', linkedinUrl: '', mapUrl: '' });
const defaultState = { ar: getEmptyLang(), en: getEmptyLang(), it: getEmptyLang() };

export default function AdminContact() {
  const [activeTab, setActiveTab] = useState('ar');
  const [formData, setFormData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/contact`)
      .then(res => res.json())
      .then(data => setFormData((data && data._id) ? data : defaultState))
      .catch(() => setFormData(defaultState));
  }, []);

  const handleTextChange = (field, value) => {
    setFormData(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], [field]: value } }));
  };

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev, [activeTab]: { ...prev[activeTab], fields: { ...prev[activeTab].fields, [field]: value } }
    }));
  };

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], [field]: value.split('\n') } }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
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

  // ستايل موحد للمدخلات لضمان وضوح الخط والقراءة
  const inputStyle = "w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all shadow-sm";
  const labelStyle = "block text-sm font-bold mb-2 text-gray-800";

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen" dir={activeTab === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-8 text-gray-900" dir="rtl">إدارة قسم التواصل (Contact)</h1>
      
      {message && (
        <div className="p-4 mb-6 bg-green-100 border border-green-400 text-green-800 rounded-lg font-bold text-center animate-bounce">
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
        
        {/* العناوين الأساسية */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-bold mb-6 border-b pb-3 text-blue-700">نصوص القسم الأساسية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className={labelStyle}>التاج (Tag)</label><input className={inputStyle} value={current.tag} onChange={e => handleTextChange('tag', e.target.value)} /></div>
            <div><label className={labelStyle}>العنوان (Title)</label><input className={inputStyle} value={current.title} onChange={e => handleTextChange('title', e.target.value)} /></div>
            <div className="md:col-span-2"><label className={labelStyle}>النص الفرعي (Subtitle)</label><input className={inputStyle} value={current.subtitle} onChange={e => handleTextChange('subtitle', e.target.value)} /></div>
          </div>
        </div>

        {/* بيانات الفورم */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-bold mb-6 border-b pb-3 text-blue-700">حقول نموذج المراسلة (Form Fields)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="flex gap-3"><div className="w-1/2"><label className="block text-xs font-bold mb-1 text-gray-500 uppercase">تسمية الاسم</label><input className={inputStyle} value={current.fields.fullName} onChange={e => handleFieldChange('fullName', e.target.value)} /></div><div className="w-1/2"><label className="block text-xs font-bold mb-1 text-gray-400 uppercase">Placeholder</label><input className={inputStyle} value={current.fields.fullNamePH} onChange={e => handleFieldChange('fullNamePH', e.target.value)} /></div></div>
            <div className="flex gap-3"><div className="w-1/2"><label className="block text-xs font-bold mb-1 text-gray-500 uppercase">تسمية الإيميل</label><input className={inputStyle} value={current.fields.email} onChange={e => handleFieldChange('email', e.target.value)} /></div><div className="w-1/2"><label className="block text-xs font-bold mb-1 text-gray-400 uppercase">Placeholder</label><input className={inputStyle} value={current.fields.emailPH} onChange={e => handleFieldChange('emailPH', e.target.value)} /></div></div>
            <div className="flex gap-3"><div className="w-1/2"><label className="block text-xs font-bold mb-1 text-gray-500 uppercase">تسمية الهاتف</label><input className={inputStyle} value={current.fields.phone} onChange={e => handleFieldChange('phone', e.target.value)} /></div><div className="w-1/2"><label className="block text-xs font-bold mb-1 text-gray-400 uppercase">Placeholder</label><input className={inputStyle} value={current.fields.phonePH} onChange={e => handleFieldChange('phonePH', e.target.value)} /></div></div>
            <div className="flex gap-3"><div className="w-1/2"><label className="block text-xs font-bold mb-1 text-gray-500 uppercase">تسمية الرسالة</label><input className={inputStyle} value={current.fields.message} onChange={e => handleFieldChange('message', e.target.value)} /></div><div className="w-1/2"><label className="block text-xs font-bold mb-1 text-gray-400 uppercase">Placeholder</label><input className={inputStyle} value={current.fields.messagePH} onChange={e => handleFieldChange('messagePH', e.target.value)} /></div></div>
            
            <div><label className={labelStyle}>تسمية قائمة اللغات</label><input className={inputStyle} value={current.fields.language} onChange={e => handleFieldChange('language', e.target.value)} /></div>
            <div><label className={labelStyle}>تسمية قائمة الخدمات</label><input className={inputStyle} value={current.fields.serviceArea} onChange={e => handleFieldChange('serviceArea', e.target.value)} /></div>
            <div className="md:col-span-2"><label className={labelStyle}>نص زر الإرسال</label><input className={inputStyle} value={current.submit} onChange={e => handleTextChange('submit', e.target.value)} /></div>
          </div>
        </div>

        {/* Dropdowns */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-bold mb-6 border-b pb-3 text-blue-700">خيارات القوائم المنسدلة (كل خيار في سطر)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div><label className={labelStyle}>خيارات اللغات</label><textarea className={inputStyle} rows="5" value={current.languages.join('\n')} onChange={e => handleArrayChange('languages', e.target.value)} /></div>
            <div><label className={labelStyle}>خيارات الخدمات</label><textarea className={inputStyle} rows="5" value={current.services.join('\n')} onChange={e => handleArrayChange('services', e.target.value)} /></div>
          </div>
        </div>

        {/* بيانات المقر والاتصال */}
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-bold mb-6 border-b pb-3 text-blue-700">بيانات المقر وأرقام التواصل</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className={labelStyle}>عنوان كارت المقر</label><input className={inputStyle} value={current.hqTitle} onChange={e => handleTextChange('hqTitle', e.target.value)} /></div>
            <div><label className={labelStyle}>اسم المبنى</label><input className={inputStyle} value={current.hqName} onChange={e => handleTextChange('hqName', e.target.value)} /></div>
            <div className="md:col-span-2"><label className={labelStyle}>العنوان التفصيلي</label><textarea className={inputStyle} rows="2" value={current.hqAddress} onChange={e => handleTextChange('hqAddress', e.target.value)} /></div>
            <div><label className={labelStyle}>رقم التليفون المعروض</label><input className={inputStyle} value={current.phone} onChange={e => handleTextChange('phone', e.target.value)} dir="ltr"/></div>
            <div><label className={labelStyle}>الإيميل المعروض</label><input className={inputStyle} value={current.email} onChange={e => handleTextChange('email', e.target.value)} dir="ltr"/></div>
          </div>
          
          <h3 className="font-bold mt-10 mb-4 text-gray-800 border-b pb-2">روابط التواصل الاجتماعي والخريطة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
               <label className="block text-xs font-bold mb-2 text-green-700 uppercase">واتساب</label>
               <input className={inputStyle + " mb-2"} placeholder="نص الزر" value={current.whatsapp} onChange={e => handleTextChange('whatsapp', e.target.value)} />
               <input className={inputStyle} placeholder="الرابط الفعلي (URL)" value={current.whatsappUrl} onChange={e => handleTextChange('whatsappUrl', e.target.value)} dir="ltr"/>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
               <label className="block text-xs font-bold mb-2 text-blue-700 uppercase">لينكدإن</label>
               <input className={inputStyle + " mb-2"} placeholder="نص الزر" value={current.linkedin} onChange={e => handleTextChange('linkedin', e.target.value)} />
               <input className={inputStyle} placeholder="الرابط الفعلي (URL)" value={current.linkedinUrl} onChange={e => handleTextChange('linkedinUrl', e.target.value)} dir="ltr"/>
            </div>
            <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
               <label className="block text-xs font-bold mb-2 text-red-700 uppercase">خريطة جوجل</label>
               <div className="flex gap-4">
                  <input className={inputStyle + " w-1/3"} placeholder="نص الزر" value={current.viewMap} onChange={e => handleTextChange('viewMap', e.target.value)} />
                  <input className={inputStyle + " w-2/3"} placeholder="رابط الخريطة الفعلي" value={current.mapUrl} onChange={e => handleTextChange('mapUrl', e.target.value)} dir="ltr"/>
               </div>
            </div>
          </div>
        </div>

        {/* زر الحفظ */}
        <div className="flex justify-start pt-6 pb-20">
          <button 
            type="submit" 
            disabled={isSaving} 
            className={`px-12 py-4 text-white font-extrabold rounded-xl shadow-xl transition-all transform hover:-translate-y-1 ${
              isSaving ? 'bg-gray-400 cursor-wait' : 'bg-blue-700 hover:bg-blue-800 active:scale-95'
            }`}
          >
            {isSaving ? 'جاري الحفظ...' : 'حفظ كافة التغييرات'}
          </button>
        </div>
      </form>
    </div>
  );
}