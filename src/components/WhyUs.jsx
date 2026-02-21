import { useState, useEffect } from 'react';

export default function WhyUs({ lang }) {
  const isRTL = lang === 'ar';

  // الداتا الديفولت والأيقونات محولة لنصوص (Strings)
  const defaultContent = {
    ar: {
      tag: 'الميزة الذهبية',
      title: 'لماذا جولدن بالانس؟',
      subtitle: 'في قطاع يتسم بالمخاطر العالية والتعقيد القانوني، نتميز بتقديم:',
      cards: [
        { icon: `<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>`, title: 'تخصص دقيق', desc: 'فريق قانوني يجمع بين الخبرة التشريعية والفهم التقني...' },
        { icon: `<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>`, title: 'رؤية استباقية', desc: 'إعداد دراسات استباقية وتوقع للمخاطر القانونية...' },
        { icon: `<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.315 48.315 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>`, title: 'علاقات مؤسسية', desc: 'خبرة ممتدة في التعامل مع الهيئات الحكومية...' },
        { icon: `<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>`, title: 'فريق متعدد اللغات', desc: 'إتقان تام للعربية، الإنجليزية، والإيطالية...' },
        { icon: `<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>`, title: 'صياغة العقود الدولية', desc: 'اتفاقيات محكمة ومصاغة بدقة لحماية استثماراتكم...' },
        { icon: `<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z" /></svg>`, title: 'تسوية النزاعات والتحكيم', desc: 'تمثيل استراتيجي قوي وموثوق في النزاعات...' }
      ]
    },
    en: { tag: 'THE GOLDEN ADVANTAGE', title: 'Why Golden Balance?', subtitle: 'In a sector characterized by high risks...', cards: [ /* نفس الفكرة هنا بنسيبها ديفولت ونجيب من الداتا بيز */ ] },
    it: { tag: 'IL VANTAGGIO DORATO', title: 'Perché Golden Balance?', subtitle: 'In un settore caratterizzato da alti rischi...', cards: [] }
  };

  const [data, setData] = useState(defaultContent);

  useEffect(() => {
    const fetchWhyUsData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/whyus`);
        if (response.ok) {
          const resData = await response.json();
          if (resData && resData._id) setData(resData);
        }
      } catch (error) {
        console.error("Failed to fetch Why Us data:", error);
      }
    };
    fetchWhyUsData();
  }, []);

  const c = data[lang] || data.ar; // Fallback للعربي لو مفيش كروت إنجليزي مؤقتاً
  const tagStyles = isRTL ? "text-sm font-bold" : "text-xs tracking-[0.3em] uppercase font-semibold";

  return (
    <section id="why" className="bg-[#0A0A0A] py-24 px-6 border-t border-white/5 relative" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className={`text-gold-400 mb-4 inline-block px-4 py-1 rounded-full border border-gold-400/20 bg-gold-400/5 ${tagStyles}`}>
            {c.tag}
          </p>
          <h2 className="font-display text-white text-3xl md:text-5xl font-semibold mb-6">{c.title}</h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed">{c.subtitle}</p>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {c.cards && c.cards.map((card, i) => (
            <div key={i} className="relative bg-white/5 border border-white/10 p-8 rounded-sm group hover:border-gold-400/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="relative w-14 h-14 mb-6 rounded-full bg-black flex items-center justify-center border border-white/10 group-hover:border-gold-400/50 transition-colors duration-300">
                {/* هنا بنقرأ الأيقونة كنص HTML ونعرضها */}
                <div className="text-gold-400 z-10" dangerouslySetInnerHTML={{ __html: card.icon }} />
                <div className="absolute inset-0 bg-gold-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="relative z-10">
                <h3 className="text-white font-semibold text-lg mb-3 leading-snug group-hover:text-gold-400 transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-white/60 text-sm md:text-base leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                  {card.desc}
                </p>
              </div>

              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold-400/0 group-hover:border-gold-400/50 transition-colors duration-300 opacity-0 group-hover:opacity-100" style={{ [isRTL ? 'left' : 'right']: 0, [isRTL ? 'borderLeftWidth' : 'borderRightWidth']: '1px', borderRightWidth: isRTL ? '0' : '1px' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}