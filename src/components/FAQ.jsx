import { useState, useEffect } from 'react';

export default function FAQ({ lang }) {
  const isRTL = lang === 'ar';
  const [openIndex, setOpenIndex] = useState(null);

  // الداتا الافتراضية
  const defaultContent = {
    ar: {
      tag: 'المعرفة القانونية', title: 'الأسئلة الشائعة', subtitle: 'إجابات وافية لأكثر التساؤلات شيوعاً...',
      questions: [
        { q: 'ما هي الخدمات القانونية التي تقدمها المؤسسة لقطاع التعدين؟', a: 'نقدم دعماً متكاملاً يشمل صياغة وتعديل اتفاقيات التنقيب...' },
        { q: 'هل تقدم المؤسسة استشارات في تأسيس الشركات الأجنبية؟', a: 'نعم، نتخصص في هيكلة وتأسيس الشركات...' },
        { q: 'كيف تدعم المؤسسة المستثمرين في قطاع السياحة؟', a: 'نقوم بمراجعة وصياغة عقود الإدارة الفندقية العالمية...' },
        { q: 'ما هي آلية التعامل في قضايا التحكيم الدولي؟', a: 'نمتلك خبرة واسعة في تمثيل العملاء أمام هيئات التحكيم...' }
      ]
    },
    en: { tag: 'LEGAL KNOWLEDGE', title: 'Frequently Asked Questions', subtitle: 'Comprehensive answers to common questions...', questions: [] },
    it: { tag: 'CONOSCENZA LEGALE', title: 'Domande Frequenti', subtitle: 'Risposte esaurienti alle domande...', questions: [] }
  };

  const [data, setData] = useState(defaultContent);

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/faq`);
        if (response.ok) {
          const resData = await response.json();
          if (resData && resData._id) setData(resData);
        }
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    };
    fetchFAQ();
  }, []);

  const c = data[lang] || data.en;

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#0A0A0A] py-24 px-6 border-t border-white/5 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-gold-400/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-gold-400 text-xs tracking-[0.3em] uppercase font-bold mb-4">{c.tag}</p>
          <h2 className="font-display text-white text-3xl md:text-5xl font-semibold mb-6">{c.title}</h2>
          <p className="text-white/50 text-base md:text-lg">{c.subtitle}</p>
        </div>

        <div className="space-y-4">
          {c.questions && c.questions.map((item, index) => (
            <div key={index} className={`border border-white/10 rounded-sm transition-all duration-300 ${openIndex === index ? 'bg-white/[0.03] border-gold-400/30' : 'bg-transparent'}`}>
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-right transition-colors"
                style={{ textAlign: isRTL ? 'right' : 'left' }}
              >
                <span className={`text-lg font-medium transition-colors duration-300 ${openIndex === index ? 'text-gold-400' : 'text-white/90'}`}>
                  {item.q}
                </span>
                <span className={`flex-shrink-0 ml-4 rtl:ml-0 rtl:mr-4 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-gold-400' : 'text-white/30'}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 pt-0 text-white/60 leading-relaxed border-t border-white/5 mt-2">
                  {item.a}
                </div>
              </div>
            </div>
          ))}

          {(!c.questions || c.questions.length === 0) && (
            <p className="text-center text-white/40">لا توجد أسئلة شائعة حالياً.</p>
          )}
        </div>

        <div className="mt-16 text-center">
          <p className="text-white/40 text-sm mb-6">
            {isRTL ? 'لديك استفسار آخر لم يتم ذكره؟' : 'Have another question not mentioned?'}
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 text-gold-400 hover:text-white transition-colors font-semibold group">
            {isRTL ? 'تحدث مع خبير قانوني الآن' : 'Speak with a legal expert now'}
            <svg className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}