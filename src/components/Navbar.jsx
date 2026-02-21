import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// 1. استيراد دوال التوجيه من مكتبة الراوتر
import { useLocation, useNavigate } from 'react-router-dom'; 

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
  { code: 'it', label: 'IT' },
];

export default function Navbar({ lang, onLangChange }) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isRTL = lang === 'ar';

  // 2. تعريف دوال التوجيه
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 3. الدالة الذكية للتحكم في التنقل والسكرول
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false); // قفل القائمة في الموبايل لو مفتوحة

    // التأكد إن الرابط عبارة عن سكشن (بيبدأ بـ #)
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        // لو إحنا في صفحة داخلية: نرجع الرئيسية وبعدين نعمل سكرول
        navigate('/' + href);
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }, 100); // تأخير بسيط جداً لضمان تحميل الصفحة الرئيسية
      } else {
        // لو إحنا في الرئيسية: نعمل سكرول فوراً
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // لو كان رابط لصفحة أخرى (مستقبلاً)
      navigate(href);
    }
  };

  const navLinks = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'why', href: '#why' },
    { key: 'services', href: '#services' },
    { key: 'articles', href: '#articles' },
    { key: 'contact', href: '#contact' },
  ];

  const navLabels = {
    ar: { home: 'الرئيسية', about: 'من نحن', why: 'لماذا نحن', services: 'مجالات الممارسة', articles: 'مقالات', contact: 'تواصل' },
    en: { home: 'Home', about: 'About Us', why: 'Why Us', services: 'Practice Areas', articles: 'Articles', contact: 'Contact' },
    it: { home: 'Home', about: 'Chi Siamo', why: 'Perché Noi', services: 'Aree di Pratica', articles: 'Articoli', contact: 'Contatti' },
  };

  const bookLabel = { ar: 'احجز استشارة', en: 'Book Consultation', it: 'Prenota Consulenza' };

  const labels = navLabels[lang] || navLabels.en;

  const btnTextStyles = isRTL 
    ? "text-sm font-bold" 
    : "text-xs font-bold tracking-widest uppercase";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled ? 'bg-black/95 shadow-lg shadow-black/50 border-white/5 py-1' : 'bg-black/80 border-transparent py-3'
      }`}
      style={{ backdropFilter: 'blur(12px)' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" dir={isRTL ? 'rtl' : 'ltr'}>

        {/* Logo Section */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')} // ربط اللوجو بالدالة
          className="flex items-center gap-3 shrink-0 group"
        >
          <img 
            src="https://res.cloudinary.com/defcamc5x/image/upload/v1771533572/cpr5wcl6vxwfcyyj9z32.png" 
            alt="Golden Balance Logo" 
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <li key={link.key}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)} // ربط الروابط بالدالة
                className="relative text-white/80 hover:text-gold-400 text-sm tracking-wide transition-colors duration-200 whitespace-nowrap after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-gold-400 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                {labels[link.key]}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: Lang switcher + Book btn */}
        <div className="hidden lg:flex items-center gap-6">
          
          {/* Language switcher */}
          <div className="flex items-center gap-2 text-sm bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <div className="flex items-center gap-2">
              {LANGS.map((l, i) => (
                <div key={l.code} className="flex items-center">
                  <button
                    onClick={() => onLangChange(l.code)}
                    className={`text-xs transition-colors duration-200 hover:text-gold-400 ${
                      lang === l.code ? 'text-gold-400 font-bold' : 'text-white/60'
                    }`}
                  >
                    {l.label}
                  </button>
                  {i < LANGS.length - 1 && <span className="text-white/20 ml-2 mr-2">|</span>}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <button 
            onClick={(e) => handleNavClick(e, '#contact')} // تشغيل زر الحجز عشان ينزل لسكشن التواصل
            className={`bg-gold-400 hover:bg-gold-500 text-black px-6 py-2.5 rounded-sm transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-gold-400/20 whitespace-nowrap ${btnTextStyles}`}
          >
            {bookLabel[lang]}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-gold-400 p-2 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-300 ${menuOpen ? 'rotate-90' : ''}`}>
            {menuOpen
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-black/95 border-b border-gold-400/20 ${
          menuOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
        }`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="px-6 flex flex-col gap-5">
          <ul className="flex flex-col gap-4">
            {navLinks.map(link => (
              <li key={link.key}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)} // ربط الروابط في الموبايل
                  className="text-white/80 hover:text-gold-400 text-base tracking-wide transition-colors duration-200 block border-b border-white/5 pb-2"
                >
                  {labels[link.key]}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center justify-center gap-3 bg-white/5 rounded-lg py-2">
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => { onLangChange(l.code); setMenuOpen(false); }}
                className={`text-sm px-4 py-1.5 rounded transition-colors ${
                  lang === l.code ? 'bg-gold-400 text-black font-bold' : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          
          <button 
            onClick={(e) => handleNavClick(e, '#contact')} 
            className={`w-full bg-gold-400 hover:bg-gold-500 text-black py-3 rounded-sm transition-colors ${btnTextStyles}`}
          >
            {bookLabel[lang]}
          </button>
        </div>
      </div>
    </nav>
  );
}