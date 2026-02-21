export default function Team({ lang }) {
  const isRTL = lang === "ar";

  const content = {
    ar: {
      tag: "قيادة المؤسسة",
      title: "الشركاء والخبراء",
      subtitle:
        'تضم مؤسسة "جولدن بالانس" نخبة مميزة من المحامين المتخصصين في كافة فروع القانون، يجمعون بين الخبرة العملية العميقة والكفاءة الأكاديمية العالية.',
      team: [
        {
          name: "مصطفى رضا عبادي محمد",
          role: "المالك والمؤسس",
          bio: "خبير قانوني رائد يتولى قيادة التوجه الاستراتيجي للمؤسسة، مع تخصص دقيق وواسع في هيكلة استثمارات قطاع التعدين، السياحة، وتأسيس الشركات الكبرى.",
          image: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png", // أيقونة سودة
          linkedin: "#",
          email: "mailto:mostafa@goldenbalance.law",
        },
        {
          name: "محمود محمد حربي عبد الرحيم",
          role: "شريك أول — متخصص في التقاضي",
          bio: "مرجعية قانونية في النزاعات المعقدة، يتمتع بخبرة استثنائية في إدارة القضايا المدنية، الاقتصادية، الإدارية، والمنازعات الضريبية بنجاح.",
          image: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png", // أيقونة سودة
          linkedin: "#",
          email: "mailto:mahmoud@goldenbalance.law",
        },
      ],
    },
    en: {
      tag: "OUR LEADERSHIP",
      title: "Partners & Experts",
      subtitle:
        "Golden Balance comprises an elite group of specialized lawyers across all branches of law, combining deep practical experience with high academic proficiency.",
      team: [
        {
          name: "Mostafa Reda Ebady Mohamed",
          role: "Owner & Founder",
          bio: "A leading legal expert driving the firm's strategic direction, with extensive specialization in mining, tourism, and corporate formations.",
          image: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png", // صورة حقيقية
          linkedin: "#",
          email: "mailto:mostafa@goldenbalance.law",
        },
        {
          name: "Mahmoud Mohamed Harby Abdel Rehim",
          role: "Senior Partner — Head of Litigation",
          bio: "A legal authority in complex disputes, possessing exceptional expertise in successfully managing civil, economic, administrative, and tax litigation.",
          image: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png", // صورة حقيقية
          linkedin: "#",
          email: "mailto:mahmoud@goldenbalance.law",
        },
      ],
    },
    it: {
      tag: "LA NOSTRA LEADERSHIP",
      title: "Partner ed Esperti",
      subtitle:
        "Lo studio Golden Balance comprende un gruppo d'élite di avvocati specializzati in tutti i rami del diritto.",
      team: [
        {
          name: "Mostafa Reda Ebady Mohamed",
          role: "Proprietario e Fondatore",
          bio: "Esperto legale di spicco che guida la direzione strategica dello studio, con un'ampia specializzazione in settori minerari e turistici.",
          image: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
          linkedin: "#",
          email: "mailto:mostafa@goldenbalance.law",
        },
        {
          name: "Mahmoud Mohamed Harby Abdel Rehim",
          role: "Senior Partner — Responsabile Contenziosi",
          bio: "Un'autorità legale in controversie complesse, con un'eccezionale competenza nella gestione di contenziosi civili e fiscali.",
          image: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
          linkedin: "#",
          email: "mailto:mahmoud@goldenbalance.law",
        },
      ],
    },
  };

  const c = content[lang] || content.en;
  const tagStyles = isRTL
    ? "text-sm font-bold"
    : "text-xs tracking-[0.3em] uppercase font-semibold";

  return (
    <section
      id="team"
      className="bg-[#0A0A0A] py-24 px-6 border-t border-white/5 relative"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-3 mb-6 px-5 py-2 rounded-full border border-gold-400/20 bg-gold-400/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
            <p className={`text-gold-400 ${tagStyles}`}> {c.tag} </p>
          </div>
          <h2 className="font-display text-white text-4xl md:text-5xl font-bold mb-6">
            {" "}
            {c.title}{" "}
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed">
            {" "}
            {c.subtitle}{" "}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 max-w-5xl mx-auto">
          {c.team.map((member, i) => {
            // التحقق إذا كانت الصورة مجرد أيقونة (PNG سودة) بناءً على الرابط
            const isAvatarIcon =
              member.image.includes("flaticon") || member.image.includes("png");

            return (
              <div
                key={i}
                className="relative overflow-hidden group rounded-2xl bg-[#0f0f0f] border border-white/10 hover:border-gold-400/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.1)] cursor-default h-[550px]"
              >
                {/* Image Container */}
                <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className={`w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 
                      ${isAvatarIcon ? "invert opacity-70 p-20 object-contain group-hover:opacity-100 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" : "grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100"}
                    `}
                  />
                </div>

                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent opacity-90 transition-opacity duration-500" />

                {/* Content Block */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
                  {/* Text Group */}
                  <div className="relative z-10 transform transition-transform duration-500 group-hover:-translate-y-4">
                    <h3 className="font-display text-white text-2xl lg:text-3xl font-bold mb-2 group-hover:text-gold-400 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-gold-400 text-sm font-bold tracking-wide uppercase mb-4">
                      {member.role}
                    </p>

                    {/* Bio (Hidden by default, revealed on hover) */}
                    <div className="overflow-hidden">
                      <p
                        className={`text-white/70 text-sm leading-relaxed transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ${isRTL ? "text-right" : "text-left"}`}
                      >
                        {member.bio}
                      </p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <a
                        href={member.linkedin}
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-gold-400 hover:border-gold-400 hover:text-black flex items-center justify-center text-white transition-all duration-300"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      </a>
                      <a
                        href={member.email}
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-gold-400 hover:border-gold-400 hover:text-black flex items-center justify-center text-white transition-all duration-300"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
