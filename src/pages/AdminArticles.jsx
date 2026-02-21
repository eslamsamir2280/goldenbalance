import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const getEmptyArticle = () => ({
  category: '', date: '', title: '', desc: '', image: '', readTime: '', author: '', authorRole: '', body: ''
});

const getEmptyLang = () => ({ tag: '', title: '', readMore: '', articles: [] });
const defaultState = { ar: getEmptyLang(), en: getEmptyLang(), it: getEmptyLang() };

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }],
    ['link', 'clean']
  ],
};

export default function AdminArticles() {
  const [activeTab, setActiveTab] = useState('ar');
  const [formData, setFormData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [editingArticleIndex, setEditingArticleIndex] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/articles`)
      .then(res => res.json())
      .then(data => setFormData((data && data._id) ? data : defaultState))
      .catch(() => setFormData(defaultState));
  }, []);

  const handleTextChange = (field, value) => {
    setFormData(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], [field]: value } }));
  };

  const handleArticleChange = (field, value) => {
    const updatedArticles = [...formData[activeTab].articles];
    updatedArticles[editingArticleIndex][field] = value;
    setFormData(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], articles: updatedArticles } }));
  };

  const handleAddArticle = () => {
    const updatedArticles = [...formData[activeTab].articles, getEmptyArticle()];
    setFormData(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], articles: updatedArticles } }));
    setEditingArticleIndex(updatedArticles.length - 1);
  };

  const handleRemoveArticle = (index) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المقال؟")) return;
    const updatedArticles = formData[activeTab].articles.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], articles: updatedArticles } }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/articles`, {
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

  // ستايل موحد للمدخلات لضمان وضوح الخط
  const inputStyle = "w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all";

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen" dir={activeTab === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-bold mb-6 text-gray-900" dir="rtl">إدارة المقالات</h1>
      
      {message && (
        <div className="p-4 mb-4 bg-green-100 border border-green-400 text-green-800 rounded font-bold text-center animate-pulse">
          {message}
        </div>
      )}

      <div className="flex gap-4 mb-6 border-b border-gray-300 pb-4" dir="rtl">
        {['ar', 'en', 'it'].map(lang => (
          <button 
            key={lang} 
            onClick={() => { setActiveTab(lang); setEditingArticleIndex(null); }} 
            className={`px-8 py-2 rounded-lg font-bold transition-all ${activeTab === lang ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'}`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 text-right">
        
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 text-blue-700">نصوص القسم الأساسية</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div><label className="block text-gray-800 font-bold mb-2">التاج (Tag)</label><input className={inputStyle} value={current.tag} onChange={e => handleTextChange('tag', e.target.value)} /></div>
            <div><label className="block text-gray-800 font-bold mb-2">العنوان (Title)</label><input className={inputStyle} value={current.title} onChange={e => handleTextChange('title', e.target.value)} /></div>
            <div><label className="block text-gray-800 font-bold mb-2">نص (اقرأ المزيد)</label><input className={inputStyle} value={current.readMore} onChange={e => handleTextChange('readMore', e.target.value)} /></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          {editingArticleIndex === null ? (
            <>
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <button type="button" onClick={handleAddArticle} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold shadow-md transition-all">+ إضافة مقال جديد</button>
                <h2 className="text-xl font-bold text-gray-800">قائمة المقالات ({current.articles.length})</h2>
              </div>
              
              <div className="space-y-4">
                {current.articles.map((article, i) => (
                  <div key={i} className="flex justify-between items-center p-5 bg-gray-50 border border-gray-200 rounded-xl hover:bg-blue-50 transition-all group">
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setEditingArticleIndex(i)} className="bg-blue-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-blue-700 shadow-sm">تعديل</button>
                      <button type="button" onClick={() => handleRemoveArticle(i)} className="bg-red-50 text-red-600 border border-red-200 px-5 py-2 rounded-lg font-bold hover:bg-red-600 hover:text-white transition-all">حذف</button>
                    </div>
                    <div className="text-right">
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-700 transition-colors">{article.title || 'مقال بدون عنوان'}</h3>
                      <p className="text-sm text-gray-500">{article.category} • {article.date}</p>
                    </div>
                  </div>
                ))}
                {current.articles.length === 0 && <p className="text-center text-gray-400 py-10 italic">لا توجد مقالات مضافة حالياً.</p>}
              </div>
            </>
          ) : (
            <div className="animate-in fade-in duration-500">
              <div className="flex justify-between items-center mb-8 border-b pb-4">
                <button type="button" onClick={() => setEditingArticleIndex(null)} className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-200 border border-gray-300 transition-all">إلغاء والعودة</button>
                <h2 className="text-2xl font-bold text-blue-700">تعديل محتوى المقال</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-right">
                <div><label className="block text-gray-800 font-bold mb-2">عنوان المقال</label><input className={inputStyle} value={current.articles[editingArticleIndex].title} onChange={e => handleArticleChange('title', e.target.value)} /></div>
                <div><label className="block text-gray-800 font-bold mb-2">التصنيف (Category)</label><input className={inputStyle} value={current.articles[editingArticleIndex].category} onChange={e => handleArticleChange('category', e.target.value)} /></div>
                <div><label className="block text-gray-800 font-bold mb-2">التاريخ</label><input className={inputStyle} value={current.articles[editingArticleIndex].date} onChange={e => handleArticleChange('date', e.target.value)} /></div>
                <div><label className="block text-gray-800 font-bold mb-2">وقت القراءة</label><input className={inputStyle} value={current.articles[editingArticleIndex].readTime} onChange={e => handleArticleChange('readTime', e.target.value)} /></div>
                <div><label className="block text-gray-800 font-bold mb-2">اسم الكاتب</label><input className={inputStyle} value={current.articles[editingArticleIndex].author} onChange={e => handleArticleChange('author', e.target.value)} /></div>
                <div><label className="block text-gray-800 font-bold mb-2">المسمى الوظيفي للكاتب</label><input className={inputStyle} value={current.articles[editingArticleIndex].authorRole} onChange={e => handleArticleChange('authorRole', e.target.value)} /></div>
                <div className="md:col-span-2"><label className="block text-gray-800 font-bold mb-2">رابط الصورة</label><input className={inputStyle} value={current.articles[editingArticleIndex].image} onChange={e => handleArticleChange('image', e.target.value)} /></div>
                <div className="md:col-span-2"><label className="block text-gray-800 font-bold mb-2">وصف قصير (يظهر في الرئيسية)</label><textarea className={inputStyle} rows="2" value={current.articles[editingArticleIndex].desc} onChange={e => handleArticleChange('desc', e.target.value)} /></div>
              </div>

              <div className="mb-10 text-right">
                <label className="block text-gray-800 font-bold mb-3 text-lg">محتوى المقال التفصيلي</label>
                <div className="bg-white rounded-lg border border-gray-300 overflow-hidden shadow-inner">
                  <ReactQuill 
                    theme="snow" 
                    modules={quillModules}
                    value={current.articles[editingArticleIndex].body} 
                    onChange={(content) => handleArticleChange('body', content)} 
                    className="text-gray-900"
                    style={{ height: '400px', direction: activeTab === 'ar' ? 'rtl' : 'ltr' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-start pt-6 pb-12">
          <button 
            type="submit" 
            disabled={isSaving} 
            className={`px-12 py-4 text-white font-extrabold rounded-xl shadow-xl transition-all transform hover:-translate-y-1 ${isSaving ? 'bg-gray-400 cursor-wait' : 'bg-blue-700 hover:bg-blue-800 active:scale-95'}`}
          >
            {isSaving ? 'جاري حفظ البيانات...' : 'حفظ كافة التعديلات'}
          </button>
        </div>
      </form>
    </div>
  );
}