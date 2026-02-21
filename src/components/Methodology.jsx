export default function Methodology({ lang }) {
  const isRTL = lang === "ar";

  const content = {
    ar: {
      tag: "منهجية العمل",
      title: "من الأرض إلى السوق",
      subtitle:
        "نحن نرافق مشروعكم في كافة مراحله لضمان النجاح والاستدامة، وتحويل التحديات إلى فرص استثمارية آمنة.",
      steps: [
        {
          num: "01",
          title: "مرحلة التأسيس",
          desc: "اختيار الهيكل القانوني الأمثل وتأمين الموافقات الأولية والتراخيص اللازمة لبدء المشروع على أساس صلب.",
        },
        {
          num: "02",
          title: "مرحلة التشغيل",
          desc: "إدارة وحوكمة العقود اليومية، ضمان الامتثال العمالي، والرقابة البيئية الصارمة لتفادي أي عوائق تنظيمية.",
        },
        {
          num: "03",
          title: "مرحلة النمو",
          desc: "دعم استراتيجي لعمليات الاستحواذ، الاندماج، زيادة رأس المال، وحماية الأصول لضمان توسع مستدام.",
        },
      ],
    },
    en: {
      tag: "OUR METHODOLOGY",
      title: "From Ground to Market",
      subtitle:
        "We accompany your project through all its stages to ensure success, sustainability, and transforming challenges into safe investment opportunities.",
      steps: [
        {
          num: "01",
          title: "Establishment Phase",
          desc: "Selecting the optimal legal structure and securing initial approvals and licenses to start your project on a solid foundation.",
        },
        {
          num: "02",
          title: "Operational Phase",
          desc: "Managing daily contracts, ensuring labor compliance, and strict environmental oversight to avoid regulatory hurdles.",
        },
        {
          num: "03",
          title: "Growth Phase",
          desc: "Strategic support for acquisitions, mergers, capital increases, and asset protection to ensure sustainable expansion.",
        },
      ],
    },
    it: {
      tag: "LA NOSTRA METODOLOGIA",
      title: "Dalla Terra al Mercato",
      subtitle:
        "Accompagniamo il vostro progetto in tutte le sue fasi per garantire successo, sostenibilità e trasformare le sfide in opportunità sicure.",
      steps: [
        {
          num: "01",
          title: "Fase di Costituzione",
          desc: "Selezione della struttura legale ottimale e ottenimento delle approvazioni e licenze iniziali per avviare il progetto su basi solide.",
        },
        {
          num: "02",
          title: "Fase Operativa",
          desc: "Gestione dei contratti giornalieri, garanzia di conformità lavorativa e rigoroso controllo ambientale per evitare ostacoli normativi.",
        },
        {
          num: "03",
          title: "Fase di Crescita",
          desc: "Supporto strategico per acquisizioni, fusioni, aumenti di capitale e protezione degli asset per garantire un'espansione sostenibile.",
        },
      ],
    },
  };

  const c = content[lang] || content.en;

  // تنسيق الخطوط وتجنب تشوه العربي
  const tagStyles = isRTL
    ? "text-sm font-bold"
    : "text-xs tracking-[0.2em] uppercase font-bold";

  return (
    <section
      id="methodology"
      className="bg-[#0A0A0A] py-24 px-6 border-t border-white/5 relative overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background abstract element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gold-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-24 max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-3 mb-6 px-5 py-2 rounded-full border border-gold-400/20 bg-gold-400/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
            <span className={`text-gold-400 ${tagStyles}`}>{c.tag}</span>
          </div>
          <h2 className="font-display text-white text-4xl md:text-5xl font-semibold mb-6 leading-tight drop-shadow-lg">
            {c.title}
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed">
            {c.subtitle}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative mt-10">
          {/* Connecting Line (Desktop: Horizontal) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

          {/* Connecting Line (Mobile: Vertical) - Adjusts dynamically based on RTL/LTR */}
          <div
            className={`md:hidden absolute top-10 bottom-10 w-[1px] bg-gradient-to-b from-gold-400/30 via-gold-400/30 to-transparent ${isRTL ? "right-10" : "left-10"}`}
          />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {c.steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex md:flex-col items-start md:items-center gap-6 md:gap-8 group ${isRTL ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Node Number */}
                <div className="relative shrink-0 flex justify-center z-10">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#0A0A0A] border border-gold-400/20 flex items-center justify-center shadow-lg group-hover:border-gold-400/80 group-hover:scale-105 transition-all duration-500 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gold-400/5 group-hover:bg-gold-400/10 transition-colors duration-500" />
                    <span className="font-display text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold-400 to-yellow-700 drop-shadow-sm">
                      {step.num}
                    </span>
                  </div>
                </div>

                {/* Content Card */}
                <div
                  className={`flex-1 w-full bg-white/[0.02] border border-white/5 group-hover:border-gold-400/20 transition-all duration-500 p-6 md:p-8 rounded-2xl backdrop-blur-sm ${isRTL ? "text-right md:text-center" : "text-left md:text-center"}`}
                >
                  <h3 className="text-white text-xl md:text-2xl font-bold mb-4">
                    {step.title}
                  </h3>
                  <p className="text-white/60 text-sm md:text-base leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
