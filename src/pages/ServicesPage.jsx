import { useState, useEffect } from 'react';

export default function ServicesPage({ lang }) {
  const isRTL = lang === 'ar';
  const [data, setData] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/practiceareas`);
        if (response.ok) {
          const resData = await response.json();
          setData(resData);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  if (!data) return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-gold-400">Loading...</div>;

  const c = data[lang] || data.en;

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-32 pb-24 px-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl text-white font-bold mb-4 text-center">{c.title}</h1>
        <p className="text-gold-400 text-center mb-16 text-lg">{c.secondaryTitle}</p>

        {/* عرض كل الخدمات (بدمج الأساسي والفرعي في شكل كروت منسقة) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* الكروت الأساسية */}
          {c.primary && c.primary.map((item, i) => (
            <div key={`pri-${i}`} className="bg-white/5 border border-gold-400/30 p-6 rounded-sm shadow-lg hover:-translate-y-2 transition-transform">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded mb-6 opacity-80" />
              <h3 className="text-2xl text-white font-bold mb-4">{item.title}</h3>
              <ul className="space-y-2">
                {item.items.map((line, j) => (
                  <li key={j} className="text-white/70 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gold-400 rounded-full" /> {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* الكروت الفرعية (كلها) */}
          {c.secondary && c.secondary.map((item, i) => (
            <div key={`sec-${i}`} className="bg-white/5 border border-white/10 p-6 rounded-sm hover:border-gold-400/50 hover:-translate-y-2 transition-all">
               <div className="w-12 h-12 bg-black border border-white/10 rounded flex items-center justify-center text-gold-400 mb-6" dangerouslySetInnerHTML={{ __html: item.icon }} />
               <h3 className="text-xl text-white font-bold mb-3">{item.title}</h3>
               <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}