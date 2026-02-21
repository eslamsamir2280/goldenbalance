import { useState, useEffect } from "react";

export default function ArticlePage({ lang, onBack, articleIndex = 0 }) {
  const isRTL = lang === "ar";
  const [dbArticle, setDbArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        let baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        baseUrl = baseUrl.replace(/\/api\/?$/, "").replace(/\/$/, "");

        const response = await fetch(`${baseUrl}/api/articles`);
        if (response.ok) {
          const data = await response.json();
          if (
            data &&
            data[lang] &&
            data[lang].articles &&
            data[lang].articles.length > 0
          ) {
            setDbArticle(data[lang].articles[articleIndex]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [lang, articleIndex]);

  // النصوص الثابتة في الواجهة
  const staticUI = {
    ar: {
      backLabel: "العودة إلى المقالات",
      shareLabel: "مشاركة المقال",
      sidebar: {
        ctaTitle: "هل تحتاج مساعدة قانونية؟",
        ctaText: "فريقنا متخصص وجاهز لدراسة موقفك القانوني وتأمين استثماراتك.",
        ctaBtn: "احجز استشارة مجانية",
        relatedTitle: "مقالات ذات صلة",
        practiceTitle: "مجالات الممارسة",
        practices: [
          "قانون التعدين",
          "قانون السياحة",
          "التحكيم الدولي",
          "القانون التجاري",
          "العقارات",
        ],
        related: [
          {
            category: "الاستثمار السياحي",
            date: "٠٢ فبراير ٢٠٢٦",
            title: "الضوابط القانونية لهيكلة رأس المال الأجنبي",
          },
          {
            category: "التحكيم الدولي",
            date: "١٨ يناير ٢٠٢٦",
            title: "آليات التحكيم الدولي في النزاعات المعقدة",
          },
        ],
      },
    },
    en: {
      backLabel: "Back to Articles",
      shareLabel: "Share Article",
      sidebar: {
        ctaTitle: "Need Legal Guidance?",
        ctaText:
          "Our legal team is ready to assist with your specific situation and secure your investments.",
        ctaBtn: "Book a Consultation",
        relatedTitle: "Related Articles",
        practiceTitle: "Practice Areas",
        practices: [
          "Mining Law",
          "Tourism Law",
          "International Arbitration",
          "Commercial Law",
          "Real Estate",
        ],
        related: [
          {
            category: "Tourism",
            date: "FEB 02, 2026",
            title: "Structuring Foreign Capital for Red Sea Resorts",
          },
          {
            category: "Arbitration",
            date: "JAN 18, 2026",
            title: "International Arbitration in Commercial Disputes",
          },
        ],
      },
    },
    it: {
      backLabel: "Torna agli Articoli",
      shareLabel: "Condividi l'Articolo",
      sidebar: {
        ctaTitle: "Hai Bisogno di Consulenza?",
        ctaText:
          "Il nostro team legale è pronto ad assisterti per proteggere i tuoi investimenti.",
        ctaBtn: "Prenota una Consulenza",
        relatedTitle: "Articoli Correlati",
        practiceTitle: "Aree di Pratica",
        practices: [
          "Diritto Minerario",
          "Diritto del Turismo",
          "Arbitrato Internazionale",
          "Diritto Commerciale",
          "Immobiliare",
        ],
        related: [
          {
            category: "Turismo",
            date: "02 FEB 2026",
            title: "Strutturare Capitale Estero per i Resort del Mar Rosso",
          },
          {
            category: "Arbitrato",
            date: "18 GEN 2026",
            title: "Arbitrato Internazionale nelle Controversie Commerciali",
          },
        ],
      },
    },
  };

  const ui = staticUI[lang] || staticUI.en;
  const sb = ui.sidebar;

  // تنظيف المحتوى — السبب الجذري: المحرر يضع &nbsp; بين كل كلمة
  const cleanArticleBody = (html) => {
    if (!html) return "<p>لا يوجد محتوى لهذا المقال حالياً.</p>";
    return html
      .replace(/&nbsp;/gi, " ") // الحل الرئيسي
      .replace(/&#160;/gi, " ") // نفس الشيء بصيغة رقمية
      .replace(/\u00A0/g, " ") // نفس الشيء Unicode
      .replace(/<wbr\s*\/?>/gi, "")
      .replace(/&shy;/gi, "")
      .replace(/\u00AD/g, "")
      .replace(/\u200B/g, "")
      .replace(/\uFEFF/g, "");
  };

  const article = dbArticle || {
    category: "",
    date: "",
    title: "",
    desc: "",
    image: "",
    readTime: "",
    author: "",
    authorRole: "",
    body: "",
  };

  const btnStyles = isRTL
    ? "text-sm font-bold"
    : "text-xs font-bold tracking-[0.2em] uppercase";
  const tagStyles = isRTL
    ? "text-xs font-bold"
    : "text-[10px] font-bold tracking-[0.2em] uppercase";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]" dir={isRTL ? "rtl" : "ltr"}>
      {/* Hero Header Area */}
      <div className="relative w-full h-[55vh] min-h-[400px] flex items-end">
        <div className="absolute inset-0">
          <img
            src={
              article.image ||
              "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1400&q=80"
            }
            alt={article.title}
            className="w-full h-full object-cover"
            style={{ filter: "grayscale(50%) brightness(0.6) contrast(1.1)" }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
        <div className="absolute inset-0 bg-black/30" />

        {/* Back button */}
        <button
          onClick={onBack}
          className={`absolute top-24 md:top-32 left-6 md:left-12 flex items-center gap-2 text-white/70 hover:text-gold-400 transition-colors duration-300 group z-20 ${btnStyles}`}
          style={{
            [isRTL ? "right" : "left"]: "2rem",
            left: isRTL ? "auto" : "2rem",
          }}
        >
          <div className="w-8 h-8 rounded-full border border-white/20 group-hover:border-gold-400 flex items-center justify-center transition-all duration-300">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="group-hover:-translate-x-1 transition-transform duration-300"
              style={{ transform: isRTL ? "scaleX(-1)" : "none" }}
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </div>
          <span className="hidden sm:block">{ui.backLabel}</span>
        </button>

        {/* Title Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 md:gap-4 mb-6 flex-wrap">
              <span
                className={`bg-gold-400 text-black px-4 py-1.5 rounded-sm ${tagStyles}`}
              >
                {article.category || "مقال قانوني"}
              </span>
              <span className="text-white/70 text-sm font-medium">
                {article.date}
              </span>
              <span className="text-white/30 text-sm">•</span>
              <span className="text-white/70 text-sm font-medium flex items-center gap-1.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {article.readTime}
              </span>
            </div>
            <h1 className="font-display text-white text-3xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-xl">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content & Sidebar */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start justify-between">
          {/* MAIN ARTICLE BODY */}
          <div className="w-full lg:w-[60%] min-w-0">
            {/* Author & Share Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 mb-10 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-400/20 to-transparent border border-gold-400/30 flex items-center justify-center shrink-0 shadow-lg">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-lg font-bold">
                    {article.author}
                  </p>
                  <p className="text-gold-400/80 text-sm font-medium">
                    {article.authorRole}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-white/40 text-sm font-medium hidden sm:block">
                  {ui.shareLabel}
                </span>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-gold-400 hover:bg-gold-400/10 flex items-center justify-center text-white/60 hover:text-gold-400 transition-all duration-300">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-gold-400 hover:bg-gold-400/10 flex items-center justify-center text-white/60 hover:text-gold-400 transition-all duration-300">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* محتوى المقال */}
            {/* ⬇️ الإصلاح الجذري لمشكلة تقطيع الكلمات */}
            <style>{`
              .article-content,
              .article-content p,
              .article-content span,
              .article-content li,
              .article-content h1,
              .article-content h2,
              .article-content h3,
              .article-content h4,
              .article-content * {
                word-break: normal !important;
                overflow-wrap: break-word !important;
                hyphens: none !important;
                white-space: normal !important;
              }
            `}</style>

            <article
              style={{
                wordBreak: "normal",
                overflowWrap: "break-word",
                hyphens: "none",
              }}
              className={`prose prose-invert max-w-none prose-lg md:prose-xl prose-headings:text-gold-400 prose-headings:font-bold prose-p:text-white/80 prose-p:leading-[1.9] prose-a:text-gold-400 prose-strong:text-white w-full ${isRTL ? "text-right" : "text-left"}`}
            >
              <div
                className="article-content"
                dir={isRTL ? "rtl" : "ltr"}
                dangerouslySetInnerHTML={{
                  __html: cleanArticleBody(article.body),
                }}
              />
            </article>
          </div>

          {/* SIDEBAR */}
          <div className="w-full lg:w-[35%] shrink-0">
            <div className="sticky top-32 space-y-8">
              {/* CTA Box */}
              <div className="bg-white/5 border border-gold-400/30 p-8 rounded-xl relative overflow-hidden group shadow-2xl">
                <div className="absolute inset-0 bg-gold-400/5 group-hover:bg-gold-400/10 transition-colors duration-500" />
                <h3 className="relative z-10 font-display text-white text-2xl font-bold mb-4">
                  {sb.ctaTitle}
                </h3>
                <p className="relative z-10 text-white/60 text-base leading-relaxed mb-8">
                  {sb.ctaText}
                </p>
                <button
                  className={`relative z-10 w-full bg-gold-400 hover:bg-gold-500 text-black py-4 rounded-md transition-all duration-300 hover:shadow-[0_10px_20px_rgba(212,175,55,0.2)] hover:-translate-y-1 ${btnStyles}`}
                >
                  {sb.ctaBtn}
                </button>
              </div>

              {/* Related Articles */}
              <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-xl shadow-lg">
                <h4
                  className={`text-white mb-6 pb-4 border-b border-white/10 ${tagStyles}`}
                >
                  {sb.relatedTitle}
                </h4>
                <div className="space-y-6">
                  {sb.related.map((a, i) => (
                    <a key={i} href="#" className="block group">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-gold-400 text-xs font-bold">
                          {a.category}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <span className="text-white/40 text-xs">{a.date}</span>
                      </div>
                      <p className="text-white/80 text-base font-medium leading-snug group-hover:text-gold-400 transition-colors duration-300">
                        {a.title}
                      </p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Practice Areas */}
              <div className="bg-[#0A0A0A] border border-white/10 p-8 rounded-xl shadow-lg">
                <h4
                  className={`text-white mb-6 pb-4 border-b border-white/10 ${tagStyles}`}
                >
                  {sb.practiceTitle}
                </h4>
                <ul className="space-y-4">
                  {sb.practices.map((p, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="flex items-center gap-3 text-white/60 text-base font-medium hover:text-gold-400 transition-colors duration-300 group py-1"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="text-gold-400/40 group-hover:text-gold-400 transition-colors shrink-0"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        {p}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
