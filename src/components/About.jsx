import { useState, useEffect } from 'react';

export default function About({ lang }) {
  const isRTL = lang === 'ar';

  // الداتا الديفولت بتاعتك زي ما هي
  const defaultContent = {
    ar: { tag: 'من نحن', title1: 'ريادة القانون في قطاع', title2: 'التعدين والثروة المعدنية', p1: 'نحن في مؤسسة الميزان الذهبي للمحاماة...', p2: 'وتكمن أهمية الدراسات والتقارير القانونية...', visionTitle: 'رؤيتنا', visionText: 'أن نكون الشريك القانوني الأول...', cta: 'تواصل معنا' },
    en: { tag: 'ABOUT US', title1: 'Legal Leadership in', title2: 'Mining & Mineral Resources', p1: 'At Golden Balance Law Firm...', p2: 'The importance of legal studies...', visionTitle: 'Our Vision', visionText: 'To be the premier legal partner...', cta: 'GET IN TOUCH' },
    it: { tag: 'CHI SIAMO', title1: 'Leadership Legale nel', title2: 'Settore Minerario', p1: 'Presso Golden Balance Law Firm...', p2: 'L\'importanza degli studi legali...', visionTitle: 'La Nostra Visione', visionText: 'Essere il partner legale...', cta: 'CONTATTACI' },
    image: 'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?auto=format&fit=crop&q=80&w=900'
  };

  const [aboutData, setAboutData] = useState(defaultContent);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/about`);
        if (response.ok) {
          const data = await response.json();
          if (data && data._id) {
            setAboutData(data); // استبدال الديفولت بالداتا اللي جاية من السيرفر
          }
        }
      } catch (error) {
        console.error("Failed to fetch about data:", error);
      }
    };
    fetchAboutData();
  }, []);

  const c = aboutData[lang] || aboutData.en;

  const tagStyles = isRTL ? "text-sm font-bold" : "text-xs tracking-[0.25em] uppercase font-semibold";
  const ctaStyles = isRTL ? "text-sm font-bold hover:gap-4" : "text-xs font-bold tracking-[0.2em] uppercase hover:gap-4";

  return (
    <section id="about" className="bg-[#0A0A0A] py-24 px-6 border-t border-white/5 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-400/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className={`flex flex-col ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-gold-400" />
              <span className={`text-gold-400 ${tagStyles}`}>{c.tag}</span>
            </div>
            <h2 className="font-display text-white text-3xl md:text-5xl font-semibold leading-tight mb-8">
              {c.title1}<br /><span className="text-gold-400">{c.title2}</span>
            </h2>
            <div className="mb-8">
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">{c.p1}</p>
              <p className="text-white/60 text-sm md:text-base leading-relaxed">{c.p2}</p>
            </div>
            <div className={`mb-10 p-6 bg-white/5 border border-white/10 rounded-sm relative ${isRTL ? 'border-r-4 border-r-gold-400' : 'border-l-4 border-l-gold-400'}`}>
              <h3 className="text-gold-400 text-lg font-bold mb-3 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12h4l3-9 5 18 3-9h5"/>
                </svg>
                {c.visionTitle}
              </h3>
              <p className="text-white/90 text-base leading-relaxed font-medium italic">"{c.visionText}"</p>
            </div>
            <a href="#contact" className={`inline-flex items-center gap-2 text-gold-400 transition-all duration-300 group w-max ${ctaStyles}`}>
              {c.cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300" style={{ transform: isRTL ? 'scaleX(-1) translateX(4px)' : 'translateX(4px)' }}>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          </div>

          <div className={`relative ${isRTL ? 'lg:order-1' : 'lg:order-2'} group`}>
            <div className="absolute -inset-4 border border-gold-400/20 rounded-sm pointer-events-none transition-all duration-500 group-hover:-inset-5 group-hover:border-gold-400/40" />
            <div className="relative overflow-hidden rounded-sm shadow-2xl">
              <img src={aboutData.image} alt="Mining & Law Concept" className="w-full h-[550px] object-cover transition-all duration-700 opacity-80 group-hover:opacity-100 group-hover:scale-105" style={{ filter: 'grayscale(50%) sepia(30%)' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent scale-x-50 group-hover:scale-x-100 transition-transform duration-700" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}