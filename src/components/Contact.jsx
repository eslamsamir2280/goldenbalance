import { useState, useEffect } from 'react';

export default function Contact({ lang }) {
  const isRTL = lang === 'ar';

  // 1. الداتا الافتراضية للسكشن (عشان لو السيرفر لسه فاضي)
  const defaultContent = {
    ar: {
      tag: 'تواصل معنا', title: 'احجز استشارة قانونية', subtitle: 'شركاؤنا الخبراء مستعدون لمناقشة التحديات والفرص الاستراتيجية لأعمالك.',
      fields: { fullName: 'الاسم الكامل', fullNamePH: 'محمد أحمد', email: 'البريد الإلكتروني', emailPH: 'example@company.com', phone: 'رقم الهاتف', phonePH: '+20 (0) 000-0000', language: 'لغة التواصل المفضلة', serviceArea: 'مجال الخدمة', message: 'الرسالة أو الاستفسار', messagePH: 'اشرح احتياجاتك القانونية باختصار...' },
      languages: ['العربية', 'الإنجليزية', 'الإيطالية'], services: ['قانون التعدين', 'الاستثمار السياحي', 'التحكيم الدولي', 'القانون التجاري', 'العقارات والمقاولات'], submit: 'طلب تحديد موعد',
      hqTitle: 'المقر الرئيسي - القاهرة', hqName: 'برج Golden Balance', hqAddress: '١٥ طريق منطقة الاستثمار،\nالقاهرة الجديدة، مصر ١١٨٣٥', phone: '+20 2 2456 7890', email: 'strategic@goldenbalance.law', whatsapp: 'واتساب', linkedin: 'لينكدإن', viewMap: 'عرض على الخريطة',
      whatsappUrl: '#', linkedinUrl: '#', mapUrl: '#'
    },
    en: {
      tag: 'CONNECT', title: 'Book a Consultation', subtitle: 'Our senior partners are ready to discuss your strategic needs and opportunities.',
      fields: { fullName: 'FULL NAME', fullNamePH: 'John Doe', email: 'EMAIL', emailPH: 'john@company.com', phone: 'PHONE', phonePH: '+1 (555) 000-0000', language: 'PREFERRED LANGUAGE', serviceArea: 'SERVICE AREA', message: 'MESSAGE', messagePH: 'Briefly describe your legal needs...' },
      languages: ['English', 'Arabic', 'Italian'], services: ['Mining Law', 'Tourism Law', 'International Arbitration', 'Commercial Law', 'Real Estate'], submit: 'REQUEST APPOINTMENT',
      hqTitle: 'Cairo Headquarters', hqName: 'Golden Balance Tower', hqAddress: '15 Investment Zone Road,\nNew Cairo, Egypt 11835', phone: '+20 2 2456 7890', email: 'strategic@goldenbalance.law', whatsapp: 'WHATSAPP', linkedin: 'LINKEDIN', viewMap: 'VIEW ON MAP',
      whatsappUrl: '#', linkedinUrl: '#', mapUrl: '#'
    },
    it: {
      tag: 'CONTATTI', title: 'Prenota una Consulenza', subtitle: 'I nostri senior partner sono pronti a discutere le tue esigenze strategiche.',
      fields: { fullName: 'NOME COMPLETO', fullNamePH: 'Mario Rossi', email: 'EMAIL', emailPH: 'mario@azienda.com', phone: 'TELEFONO', phonePH: '+39 000 000 0000', language: 'LINGUA PREFERITA', serviceArea: 'AREA DI SERVIZIO', message: 'MESSAGGIO', messagePH: 'Descrivi brevemente le tue esigenze legali...' },
      languages: ['Italiano', 'Arabo', 'Inglese'], services: ['Diritto Minerario', 'Diritto del Turismo', 'Arbitrato Internazionale', 'Diritto Commerciale', 'Immobiliare'], submit: 'RICHIEDI APPUNTAMENTO',
      hqTitle: 'Sede di Il Cairo', hqName: 'Golden Balance Tower', hqAddress: '15 Investment Zone Road,\nNew Cairo, Egitto 11835', phone: '+20 2 2456 7890', email: 'strategic@goldenbalance.law', whatsapp: 'WHATSAPP', linkedin: 'LINKEDIN', viewMap: 'VEDI SULLA MAPPA',
      whatsappUrl: '#', linkedinUrl: '#', mapUrl: '#'
    },
  };

  // State الخاص بمحتوى الصفحة
  const [data, setData] = useState(defaultContent);

  // State الخاص ببيانات الفورم اللي العميل هيملاها
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', language: '', serviceArea: '', message: ''
  });
  
  // State الخاص بحالة الإرسال
  const [status, setStatus] = useState({ loading: false, success: false, error: false });

  // 2. جلب محتوى السكشن من لوحة التحكم
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/contact`)
      .then(res => res.json())
      .then(resData => {
        if (resData && resData._id) setData(resData);
      })
      .catch(err => console.error("Error fetching contact data:", err));
  }, []);

  // 3. تحديث بيانات الفورم عند الكتابة
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 4. دالة إرسال الفورم
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: false });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ loading: false, success: true, error: false });
        // تفريغ الفورم بعد النجاح
        setFormData({ fullName: '', email: '', phone: '', language: '', serviceArea: '', message: '' });
        // إخفاء رسالة النجاح بعد 5 ثواني
        setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
      } else {
        setStatus({ loading: false, success: false, error: true });
      }
    } catch (error) {
      setStatus({ loading: false, success: false, error: true });
    }
  };

  const c = data[lang] || data.en;

  // تنسيق الخطوط
  const tagStyles = isRTL ? "text-sm font-bold" : "text-xs tracking-[0.25em] uppercase font-semibold";
  const btnStyles = isRTL ? "text-sm font-bold" : "text-xs font-bold tracking-[0.2em] uppercase";
  const labelClass = isRTL ? "block text-white/60 text-xs font-bold mb-2" : "block text-white/50 text-[10px] tracking-[0.2em] uppercase font-semibold mb-2";
  const inputClass = "w-full bg-white/5 border border-white/10 text-white text-sm px-5 py-3.5 rounded-sm placeholder:text-white/20 focus:outline-none focus:border-gold-400/50 focus:bg-white/10 transition-all duration-300";

  return (
    <section id="contact" className="bg-[#0A0A0A] py-24 px-6 border-t border-white/5 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">

          {/* LEFT: Form Section */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-gold-400" />
              <p className={`text-gold-400 ${tagStyles}`}>{c.tag}</p>
            </div>
            <h2 className="font-display text-white text-3xl md:text-5xl font-semibold mb-4 leading-tight">{c.title}</h2>
            <p className="text-white/60 text-base mb-10 max-w-lg leading-relaxed">{c.subtitle}</p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              
              {/* رسائل الحالة (نجاح أو فشل الإرسال) */}
              {status.success && (
                <div className="p-4 bg-green-500/10 border border-green-500/30 text-green-400 rounded-sm text-sm font-medium">
                  {isRTL ? 'تم إرسال رسالتك بنجاح، سنتواصل معك قريباً.' : 'Message sent successfully. We will contact you soon.'}
                </div>
              )}
              {status.error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-sm text-sm font-medium">
                  {isRTL ? 'حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً.' : 'An error occurred. Please try again later.'}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>{c.fields?.fullName}</label>
                  <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder={c.fields?.fullNamePH} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{c.fields?.email}</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder={c.fields?.emailPH} className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>{c.fields?.phone}</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={c.fields?.phonePH} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{c.fields?.language}</label>
                  <select name="language" value={formData.language} onChange={handleChange} className={inputClass + ' cursor-pointer appearance-none'}>
                    <option value="" disabled className="text-gray-500">-- اختر --</option>
                    {c.languages && c.languages.map((l, i) => <option key={i} value={l} className="bg-[#0A0A0A] text-white">{l}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>{c.fields?.serviceArea}</label>
                <select name="serviceArea" value={formData.serviceArea} onChange={handleChange} className={inputClass + ' cursor-pointer appearance-none'}>
                  <option value="" disabled className="text-gray-500">-- اختر --</option>
                  {c.services && c.services.map((s, i) => <option key={i} value={s} className="bg-[#0A0A0A] text-white">{s}</option>)}
                </select>
              </div>

              <div>
                <label className={labelClass}>{c.fields?.message}</label>
                <textarea required rows={4} name="message" value={formData.message} onChange={handleChange} placeholder={c.fields?.messagePH} className={inputClass + ' resize-none'} />
              </div>

              <button 
                type="submit" 
                disabled={status.loading}
                className={`w-full ${status.loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gold-400 hover:bg-gold-500 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(212,175,55,0.2)]'} text-black py-4 rounded-sm transition-all duration-300 mt-4 ${btnStyles}`}
              >
                {status.loading ? (isRTL ? 'جاري الإرسال...' : 'Sending...') : c.submit}
              </button>
            </form>
          </div>

          {/* RIGHT: Contact Info Card */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-sm relative overflow-hidden h-full flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/5 rounded-bl-full pointer-events-none" style={{ [isRTL ? 'left' : 'right']: 0, right: isRTL ? 'auto' : 0, borderRadius: isRTL ? '0 0 100% 0' : '0 0 0 100%' }} />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />

              <h3 className="font-display text-white text-2xl font-semibold mb-10 relative z-10">{c.hqTitle}</h3>

              <div className="flex items-start gap-4 mb-8 relative z-10">
                <div className="w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center shrink-0">
                  <svg className="text-gold-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div className="pt-2">
                  <p className="text-white font-semibold text-base mb-1">{c.hqName}</p>
                  <p className="text-white/60 text-sm whitespace-pre-line leading-relaxed">{c.hqAddress}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center shrink-0">
                  <svg className="text-gold-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg>
                </div>
                <a href={`tel:${c.phone}`} className="text-white/80 text-sm hover:text-gold-400 transition-colors duration-300 font-medium tracking-wide" dir="ltr">{c.phone}</a>
              </div>

              <div className="flex items-center gap-4 mb-10 relative z-10">
                <div className="w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center shrink-0">
                  <svg className="text-gold-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <a href={`mailto:${c.email}`} className="text-white/80 text-sm hover:text-gold-400 transition-colors duration-300 font-medium">{c.email}</a>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-10 relative z-10">
                <a href={c.whatsappUrl} target="_blank" rel="noreferrer" className={`bg-black border border-white/10 hover:border-gold-400/50 text-white/70 hover:text-gold-400 py-3.5 text-center transition-all duration-300 rounded-sm hover:-translate-y-0.5 ${btnStyles}`}>{c.whatsapp}</a>
                <a href={c.linkedinUrl} target="_blank" rel="noreferrer" className={`bg-black border border-white/10 hover:border-gold-400/50 text-white/70 hover:text-gold-400 py-3.5 text-center transition-all duration-300 rounded-sm hover:-translate-y-0.5 ${btnStyles}`}>{c.linkedin}</a>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8 relative z-10" />

              <div className="relative z-10 mt-auto">
                <a href={c.mapUrl} target="_blank" rel="noreferrer" className={`flex items-center justify-center w-full border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-black py-4 transition-all duration-300 rounded-sm group ${btnStyles}`}>
                  {c.viewMap}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ml-2 group-hover:translate-x-1 transition-transform duration-300" style={{ transform: isRTL ? 'scaleX(-1) translateX(-8px)' : 'none', marginLeft: isRTL ? '0' : '0.5rem', marginRight: isRTL ? '0.5rem' : '0' }}>
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}