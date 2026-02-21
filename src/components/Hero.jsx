import { useState, useEffect } from "react";

export default function Hero({ lang }) {
  const isRTL = lang === "ar";

  // الداتا الافتراضية المحدثة باللغات الثلاث
  const [heroData, setHeroData] = useState({
    ar: {
      badge: "مؤسسة جولدن بالانس للمحاماة",
      title1: "نصنع التوازن بين حماية القانون",
      title2: "وطموح الاستثمار",
      subtitle:
        "نقدم نخبة من الحلول القانونية الاستراتيجية في قطاعات التعدين، الاستثمار السياحي، والمنازعات المعقدة، لحماية وتنمية أعمالك في الأسواق المحلية والدولية.",
      primaryCta: "احجز استشارة استراتيجية",
      secondaryCta: "مجالات الممارسة",
      stats: [
        { number: "١٥+", label: "سنوات من الخبرة" },
        { number: "٢٠٠+", label: "قضية ناجحة" },
        { number: "٥٠+", label: "شراكة دولية" },
      ],
    },
    en: {
      badge: "Golden Balance Law Firm",
      title1: "Forging the Balance Between Legal Protection",
      title2: "& Investment Ambition",
      subtitle:
        "Delivering elite, strategic legal solutions in mining, tourism investment, and complex litigation to protect and grow your business locally and globally.",
      primaryCta: "Book a Consultation",
      secondaryCta: "Practice Areas",
      stats: [
        { number: "15+", label: "Years of Experience" },
        { number: "200+", label: "Successful Cases" },
        { number: "50+", label: "Global Partnerships" },
      ],
    },
    it: {
      badge: "Studio Legale Golden Balance",
      title1: "Forgiare l'Equilibrio tra Protezione Legale",
      title2: "e Ambizione di Investimento",
      subtitle:
        "Offriamo soluzioni legali d'élite e strategiche nei settori minerario, degli investimenti turistici e dei contenziosi complessi per proteggere e far crescere il tuo business a livello locale e globale.",
      primaryCta: "Prenota una Consulenza",
      secondaryCta: "Aree di Pratica",
      stats: [
        { number: "15+", label: "Anni di Esperienza" },
        { number: "200+", label: "Casi di Successo" },
        { number: "50+", label: "Partnership Globali" },
      ],
    },
    leftImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    rightImage:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب البيانات من الباك إند
    const fetchHeroData = async () => {
      try {
        let baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        baseUrl = baseUrl.replace(/\/api\/?$/, "").replace(/\/$/, "");

        const response = await fetch(`${baseUrl}/api/hero`);
        if (response.ok) {
          const data = await response.json();
          // دمج الداتا القادمة مع الداتا الافتراضية لمنع ضياع أي حقل
          if (data) setHeroData((prev) => ({ ...prev, ...data }));
        }
      } catch (error) {
        console.error("Failed to fetch hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  const c = heroData[lang] || heroData.en;

  // تنسيق الخطوط بناءً على اللغة
  const btnTextStyles = isRTL
    ? "text-sm font-bold"
    : "text-xs font-bold tracking-widest uppercase";

  const badgeTextStyles = isRTL
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
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20"
    >
      {/* Background Images */}
      <div className="absolute inset-0 flex">
        {/* Left Image */}
        <div
          className="relative w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroData.leftImage}')` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Elegant Gold Divider */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gold-400/40 to-transparent z-10" />

        {/* Right Image */}
        <div
          className="relative w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroData.rightImage}')` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
      </div>

      {/* Subtle center gradient fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.85) 100%)",
        }}
      />

      {/* Main Content Wrapper */}
      <div
        className="relative z-20 w-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Content Box */}
        <div className="text-center p-8 md:p-12 rounded-sm backdrop-blur-md bg-white/[0.02] border border-white/10 shadow-2xl relative overflow-hidden group">
          {/* Subtle Glow on hover */}
          <div className="absolute inset-0 bg-gold-400/0 group-hover:bg-gold-400/5 transition-colors duration-700 pointer-events-none" />

          {/* Gold Badge */}
          <div className="inline-flex items-center justify-center border border-gold-400/40 rounded-sm px-5 py-2 mb-8 bg-gold-400/10 backdrop-blur-sm">
            <span className={`text-gold-400 ${badgeTextStyles}`}>
              {c.badge}
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-display leading-tight mb-6 drop-shadow-lg"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", fontWeight: 600 }}
          >
            <span className="text-white">{c.title1}</span>
            <br />
            <span className="text-gold-400">{c.title2}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {c.subtitle}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#contact"
              className={`bg-gold-400 hover:bg-gold-500 text-black px-8 py-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(212,175,55,0.2)] min-w-[240px] rounded-sm text-center ${btnTextStyles}`}
            >
              {c.primaryCta}
            </a>
            <a
              href="#services"
              className={`border border-white/20 text-white hover:border-gold-400 hover:text-gold-400 hover:bg-gold-400/10 px-8 py-4 transition-all duration-300 hover:-translate-y-1 min-w-[240px] rounded-sm text-center ${btnTextStyles}`}
            >
              {c.secondaryCta}
            </a>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-3xl mx-auto">
            {c.stats.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center"
              >
                <span className="text-gold-400 font-display text-3xl font-bold mb-1">
                  {stat.number}
                </span>
                <span
                  className={`text-white/50 ${isRTL ? "text-sm font-medium" : "text-xs tracking-wider uppercase"}`}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, transparent, #0A0A0A)",
        }}
      />
    </section>
  );
}
