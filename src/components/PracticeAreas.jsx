import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PracticeAreas({ lang }) {
  const isRTL = lang === 'ar';
  const navigate = useNavigate();

  const defaultContent = {
    ar: {
      tag: 'خبرتنا الاستراتيجية', title: 'مجالات الممارسة', viewAll: 'عرض كل المجالات', primaryBadge: 'التركيز الأساسي', explore: 'استكشف المزيد', secondaryTitle: 'خبرات قانونية متكاملة لدعم أعمالك',
      primary: [
        { title: 'قانون التعدين', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80', items: ['الترخيص والامتيازات', 'التفاوض مع الجهات الحكومية', 'الامتثال البيئي والتنظيمي', 'صياغة عقود التعدين المعقدة'] },
        { title: 'قانون السياحة', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', items: ['تأسيس شركات السياحة', 'تراخيص الفنادق والمنتجعات', 'هيكلة الاستثمار الأجنبي', 'تسوية منازعات السياحة'] },
      ],
      secondary: [
        { title: 'القانون التجاري', desc: 'استشارات قانونية شاملة للشركات...', icon: '<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>' },
        // ... (ضيف باقي الديفولت زي ما هما مع تحويل الأيقونات لـ String زي الكود اللي فوق)
      ],
    },
    en: { tag: 'OUR EXPERTISE', title: 'Practice Areas', viewAll: 'VIEW ALL AREAS', primaryBadge: 'PRIMARY FOCUS', explore: 'EXPLORE MORE', secondaryTitle: 'Comprehensive Legal Expertise', primary: [], secondary: [] },
    it: { tag: 'LA NOSTRA COMPETENZA', title: 'Aree di Pratica', viewAll: 'VEDI TUTTE LE AREE', primaryBadge: 'FOCUS PRINCIPALE', explore: 'ESPLORA DI PIÙ', secondaryTitle: 'Competenza Legale Completa', primary: [], secondary: [] },
  };

  const [data, setData] = useState(defaultContent);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/practiceareas`);
        if (response.ok) {
          const resData = await response.json();
          if (resData && resData._id) setData(resData);
        }
      } catch (error) {
        console.error("Error fetching practice areas:", error);
      }
    };
    fetchData();
  }, []);

  const c = data[lang] || data.ar;
  const tagStyles = isRTL ? "text-sm font-bold" : "text-xs tracking-[0.25em] uppercase font-semibold";
  const btnStyles = isRTL ? "text-sm font-bold" : "text-xs font-bold tracking-[0.2em] uppercase";

  return (
    <section id="services" className="bg-[#0A0A0A] py-24 px-6 border-t border-white/5" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-[1px] bg-gold-400" />
              <p className={`text-gold-400 ${tagStyles}`}>{c.tag}</p>
            </div>
            <h2 className="font-display text-white text-4xl md:text-5xl font-semibold leading-tight">{c.title}</h2>
          </div>
          {/* تم ربط الزرار بصفحة /services */}
          <button onClick={() => navigate('/services')} className={`border border-white/20 text-white hover:border-gold-400 hover:bg-gold-400 hover:text-black px-8 py-3.5 transition-all duration-300 rounded-sm whitespace-nowrap ${btnStyles}`}>
            {c.viewAll}
          </button>
        </div>

        {/* Primary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {c.primary && c.primary.map((card, i) => (
            <div key={i} onClick={() => navigate('/services')} className="relative overflow-hidden group cursor-pointer rounded-sm shadow-2xl bg-black" style={{ minHeight: '480px' }}>
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-60" style={{ backgroundImage: `url('${card.image}')`, filter: 'grayscale(30%)' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="font-display text-white text-3xl md:text-4xl font-semibold mb-6 group-hover:text-gold-400">{card.title}</h3>
                <ul className="space-y-3 mb-8">
                  {card.items && card.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-white/90 text-sm md:text-base font-medium">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Title */}
        <div className="flex items-center gap-6 mb-12 opacity-80">
          <h3 className="text-white text-xl md:text-2xl font-display font-medium shrink-0">{c.secondaryTitle}</h3>
          <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent" style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
        </div>

        {/* Secondary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {c.secondary && c.secondary.slice(0, 15).map((item, i) => ( // عرضنا 6 بس في الصفحة الرئيسية عشان الزحمة
            <div key={i} onClick={() => navigate('/services')} className="group bg-white/5 border border-white/10 hover:border-gold-400/40 p-6 rounded-sm transition-all duration-300 hover:bg-white/10 cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded bg-black border border-white/10 flex items-center justify-center text-gold-400 group-hover:scale-110 transition-all shrink-0" dangerouslySetInnerHTML={{ __html: item.icon }} />
                <h4 className="text-white font-semibold text-lg group-hover:text-gold-400">{item.title}</h4>
              </div>
              <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}