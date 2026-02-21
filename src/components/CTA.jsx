export default function CTA({ lang }) {
  const isRTL = lang === 'ar';

  const content = {
    ar: {
      tag: 'شركاء النجاح',
      quote: '"التعدين هو فن استخراج القيمة من الأرض، ومهمتنا هي حماية هذه القيمة بنصوص القانون."',
      desc: 'نحن لا نقدم مجرد استشارات عابرة، بل نضع خارطة طريق قانونية متكاملة للشركات. تكمن أهمية دراساتنا في قطاع التعدين ذي رأس المال الكثيف طويل الأمد، في منح المستثمر رؤية تشريعية شفافة لكامل المشهد القانوني.',
      btnPrimary: 'احجز استشارة قانونية',
      btnSecondary: 'تواصل مع الخبراء',
    },
    en: {
      tag: 'SUCCESS PARTNERS',
      quote: '"Mining is the art of extracting value from the earth, and our mission is to protect that value with the text of the law."',
      desc: 'We don\'t just offer passing consultations; we lay down a comprehensive legal roadmap for companies. The importance of our reports in the long-term, capital-intensive mining sector lies in giving investors a transparent legislative vision of the entire legal landscape.',
      btnPrimary: 'BOOK A CONSULTATION',
      btnSecondary: 'CONTACT EXPERTS',
    },
    it: {
      tag: 'PARTNER DI SUCCESSO',
      quote: '"L\'estrazione mineraria è l\'arte di estrarre valore dalla terra, e la nostra missione è proteggere quel valore con il testo della legge."',
      desc: 'Non offriamo semplici consulenze passeggere, ma tracciamo una roadmap legale completa per le aziende. L\'importanza dei nostri report nel settore minerario a lungo termine sta nell\'offrire agli investitori una chiara visione legislativa dell\'intero panorama legale.',
      btnPrimary: 'PRENOTA UNA CONSULENZA',
      btnSecondary: 'CONTATTA GLI ESPERTI',
    },
  };

  const c = content[lang] || content.en;

  // تنسيق الخطوط وتجنب تشوه العربي
  const tagStyles = isRTL ? "text-sm font-bold" : "text-xs tracking-[0.25em] uppercase font-semibold";
  const btnStyles = isRTL ? "text-sm font-bold" : "text-xs font-bold tracking-[0.2em] uppercase";

  return (
    <section className="relative bg-black/60 py-24 md:py-32 px-6 overflow-hidden flex items-center justify-center min-h-[70vh]" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Content Container (Glassmorphism Card) */}
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <div className="backdrop-blur-md bg-black/40 border border-gold-400/20 p-8 md:p-16 rounded-sm shadow-2xl text-center overflow-hidden group">
          
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold-400/40 opacity-50 group-hover:w-full group-hover:h-full group-hover:border-gold-400/20 transition-all duration-700 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold-400/40 opacity-50 group-hover:w-full group-hover:h-full group-hover:border-gold-400/20 transition-all duration-700 pointer-events-none" />

          {/* Tagline */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-8 md:w-12 h-[1px] bg-gold-400" />
            <span className={`text-gold-400 ${tagStyles}`}>
              {c.tag}
            </span>
            <div className="w-8 md:w-12 h-[1px] bg-gold-400" />
          </div>

          {/* Main Quote */}
          <h2 className="font-display text-white text-3xl md:text-5xl lg:text-5xl font-semibold leading-tight mb-8 drop-shadow-lg italic">
            {c.quote}
          </h2>

          {/* Description */}
          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12">
            {c.desc}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button className={`bg-gold-400 hover:bg-gold-500 text-black px-8 py-4 w-full sm:w-auto transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_20px_rgba(212,175,55,0.15)] rounded-sm whitespace-nowrap ${btnStyles}`}>
              {c.btnPrimary}
            </button>
            <button className={`border border-white/30 text-white hover:border-gold-400 hover:text-gold-400 backdrop-blur-md bg-white/5 px-8 py-4 w-full sm:w-auto transition-all duration-300 hover:-translate-y-1 rounded-sm whitespace-nowrap ${btnStyles}`}>
              {c.btnSecondary}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}