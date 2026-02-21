import { useState, useEffect } from 'react';

export default function Articles({ lang, onReadMore }) {
  const isRTL = lang === 'ar';

  // الداتا الافتراضية عشان لو قاعدة البيانات لسه فاضية
  const defaultContent = {
    ar: {
      tag: 'رؤى وتحليلات',
      title: 'المقالات القانونية',
      readMore: 'اقرأ المزيد',
      articles: [
        {
          category: 'قانون التعدين',
          date: '١٤ فبراير ٢٠٢٦',
          title: 'دليلك الشامل للوائح التنقيب والتعدين الجديدة في مصر',
          desc: 'تحليل قانوني معمق حول التعديلات الأخيرة في قوانين التعدين وتأثيرها على استثمارات الشركات الأجنبية.',
          image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
        }
      ],
    },
    en: {
      tag: 'INSIGHTS & ANALYSIS',
      title: 'Legal Articles',
      readMore: 'READ MORE',
      articles: [],
    },
    it: {
      tag: 'APPROFONDIMENTI',
      title: 'Articoli Legali',
      readMore: 'LEGGI DI PIÙ',
      articles: [],
    },
  };

  const [data, setData] = useState(defaultContent);

  // جلب البيانات من السيرفر
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/articles`);
        if (response.ok) {
          const resData = await response.json();
          // لو في داتا جاية من السيرفر بنستخدمها، غير كده بنسيب الافتراضي
          if (resData && resData._id) {
            setData(resData);
          }
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, []);

  const c = data[lang] || data.en;

  // تنسيق الخطوط وتجنب تشوه العربي
  const tagStyles = isRTL ? "text-sm font-bold" : "text-xs tracking-[0.3em] uppercase font-semibold";
  const btnStyles = isRTL ? "text-sm font-bold" : "text-xs font-bold tracking-[0.2em] uppercase";

  return (
    <section id="articles" className="bg-[#0A0A0A] py-24 px-6 border-t border-white/5" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">

        {/* Centered Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-gold-400" />
            <p className={`text-gold-400 ${tagStyles}`}>
              {c.tag}
            </p>
            <div className="w-8 h-[1px] bg-gold-400" />
          </div>
          <h2 className="font-display text-white text-3xl md:text-5xl font-semibold mb-6">
            {c.title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto" />
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {c.articles.map((article, i) => (
            <article
              key={i}
              className="bg-white/5 border border-white/10 hover:border-gold-400/40 rounded-sm group cursor-pointer transition-all duration-300 overflow-hidden flex flex-col h-full hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Image Container */}
              <div className="overflow-hidden h-60 relative shrink-0">
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    style={{ filter: 'grayscale(40%) contrast(1.1) brightness(0.8)' }}
                  />
                )}
                {/* Elegant dark gradient over image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
                
                {/* Date Badge */}
                <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 bg-black/80 backdrop-blur-sm border border-white/10 text-white/90 text-xs px-3 py-1.5 font-medium rounded-sm">
                  {article.date}
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6 md:p-8 flex flex-col flex-grow relative bg-[#0A0A0A]">
                {/* Top Gold Border Accent */}
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

                {/* Category */}
                <span className="text-gold-400 text-sm font-semibold mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  {article.category}
                </span>

                {/* Title */}
                <h3 className="text-white font-semibold text-xl leading-snug mb-4 group-hover:text-gold-400 transition-colors duration-300">
                  {article.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed mb-8 flex-grow">
                  {article.desc}
                </p>

                {/* Read More Link */}
                <div className="mt-auto pt-4 border-t border-white/5">
                  <a
                    href="#"
                    onClick={e => { 
                      e.preventDefault(); 
                      // بنمرر بيانات المقال بالكامل لو حابين نعرضه في الصفحة التانية
                      onReadMore && onReadMore(article);
                    }}
                    className={`inline-flex items-center gap-2 text-gold-400 group-hover:gap-4 transition-all duration-300 ${btnStyles}`}
                  >
                    {c.readMore}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}

          {/* في حالة عدم وجود مقالات مضافة */}
          {c.articles.length === 0 && (
             <div className="col-span-full text-center py-10 text-white/50">
               لا توجد مقالات مضافة حالياً.
             </div>
          )}
        </div>

      </div>
    </section>
  );
}