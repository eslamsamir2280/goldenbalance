export default function Footer({ lang }) {
  const isRTL = lang === 'ar';

  const content = {
    ar: {
      tagline: 'التوازن بين القانون وقوة الاستثمار',
      desc: 'مؤسسة قانونية رائدة تتخصص في تقديم حلول استراتيجية متكاملة لقطاعي التعدين والسياحة في الأسواق المحلية والدولية.',
      links: {
        company: 'الشركة',
        companyLinks: [
          { label: 'من نحن', href: '#about' },
          { label: 'لماذا نحن', href: '#why' },
          { label: 'منهجية العمل', href: '#methodology' },
        ],
        practice: 'مجالات الممارسة',
        practiceLinks: [
          { label: 'قانون التعدين', href: '#services' },
          { label: 'قانون السياحة', href: '#services' },
          { label: 'التحكيم الدولي', href: '#services' },
          { label: 'القانون التجاري', href: '#services' },
        ],
        contact: 'تواصل',
        contactLinks: [
          { label: 'احجز استشارة', href: '#contact' },
          { label: 'المقالات القانونية', href: '#articles' },
          { label: 'strategic@goldenbalance.law', href: 'mailto:strategic@goldenbalance.law' },
          { label: '+20 2 2456 7890', href: 'tel:+20224567890' },
        ],
      },
      rights: 'جميع الحقوق محفوظة',
      devLabel: 'تطوير وتصميم',
    },
    en: {
      tagline: 'Balancing Law & Investment Power',
      desc: 'A leading law firm specializing in providing integrated strategic solutions for the mining and tourism sectors in domestic and international markets.',
      links: {
        company: 'Company',
        companyLinks: [
          { label: 'About Us', href: '#about' },
          { label: 'Why Us', href: '#why' },
          { label: 'Methodology', href: '#methodology' },
        ],
        practice: 'Practice Areas',
        practiceLinks: [
          { label: 'Mining Law', href: '#services' },
          { label: 'Tourism Law', href: '#services' },
          { label: 'International Arbitration', href: '#services' },
          { label: 'Commercial Law', href: '#services' },
        ],
        contact: 'Contact',
        contactLinks: [
          { label: 'Book a Consultation', href: '#contact' },
          { label: 'Legal Articles', href: '#articles' },
          { label: 'strategic@goldenbalance.law', href: 'mailto:strategic@goldenbalance.law' },
          { label: '+20 2 2456 7890', href: 'tel:+20224567890' },
        ],
      },
      rights: 'All rights reserved',
      devLabel: 'Developed & Designed by',
    },
    it: {
      tagline: 'Bilanciare Legge e Potere Investimento',
      desc: 'Uno studio legale leader specializzato nel fornire soluzioni strategiche integrate per i settori minerario e turistico nei mercati nazionali e internazionali.',
      links: {
        company: 'Azienda',
        companyLinks: [
          { label: 'Chi Siamo', href: '#about' },
          { label: 'Perché Noi', href: '#why' },
          { label: 'Metodologia', href: '#methodology' },
        ],
        practice: 'Aree di Pratica',
        practiceLinks: [
          { label: 'Diritto Minerario', href: '#services' },
          { label: 'Diritto del Turismo', href: '#services' },
          { label: 'Arbitrato Internazionale', href: '#services' },
          { label: 'Diritto Commerciale', href: '#services' },
        ],
        contact: 'Contatti',
        contactLinks: [
          { label: 'Prenota Consulenza', href: '#contact' },
          { label: 'Articoli Legali', href: '#articles' },
          { label: 'strategic@goldenbalance.law', href: 'mailto:strategic@goldenbalance.law' },
          { label: '+20 2 2456 7890', href: 'tel:+20224567890' },
        ],
      },
      rights: 'Tutti i diritti riservati',
      devLabel: 'Sviluppato e Progettato da',
    },
  };

  const c = content[lang] || content.en;
  const year = new Date().getFullYear();

  // تنسيق العناوين للغات لتجنب تشوه العربي
  const titleStyles = isRTL ? "text-sm font-bold" : "text-xs font-bold tracking-[0.2em] uppercase";

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-400/5 rounded-full blur-[150px] pointer-events-none" style={{ [isRTL ? 'left' : 'right']: 0, right: isRTL ? 'auto' : 0 }} />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">

          {/* Brand column (Wider) */}
          <div className="md:col-span-12 lg:col-span-5">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 mb-6 group inline-flex">
              <img 
                src="https://res.cloudinary.com/defcamc5x/image/upload/v1771533572/cpr5wcl6vxwfcyyj9z32.png" 
                alt="Golden Balance Logo" 
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="text-gold-400 font-display text-2xl font-semibold tracking-wide leading-none">
                  Golden Balance
                </span>
              </div>
            </a>

            <p className="text-white/80 font-semibold mb-3">
              {c.tagline}
            </p>
            <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-md">
              {c.desc}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {/* WhatsApp */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-gold-400 hover:bg-gold-400/10 flex items-center justify-center text-white/60 hover:text-gold-400 transition-all duration-300 hover:-translate-y-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.121 1.523 5.855L.057 23.882l6.21-1.625A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.516-5.188-1.415l-.371-.221-3.861 1.011 1.03-3.748-.241-.384A9.954 9.954 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-gold-400 hover:bg-gold-400/10 flex items-center justify-center text-white/60 hover:text-gold-400 transition-all duration-300 hover:-translate-y-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              {/* Email */}
              <a href="mailto:strategic@goldenbalance.law" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-gold-400 hover:bg-gold-400/10 flex items-center justify-center text-white/60 hover:text-gold-400 transition-all duration-300 hover:-translate-y-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns Container */}
          <div className="md:col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-10">
            
            {/* Company Links */}
            <div>
              <h4 className={`text-white mb-6 ${titleStyles}`}>
                {c.links.company}
              </h4>
              <ul className="space-y-4">
                {c.links.companyLinks.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-white/60 text-sm hover:text-gold-400 transition-colors duration-300 flex items-center gap-2 group">
                      <span className="w-0 h-[1px] bg-gold-400 group-hover:w-3 transition-all duration-300" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Practice Areas Links */}
            <div>
              <h4 className={`text-white mb-6 ${titleStyles}`}>
                {c.links.practice}
              </h4>
              <ul className="space-y-4">
                {c.links.practiceLinks.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-white/60 text-sm hover:text-gold-400 transition-colors duration-300 flex items-center gap-2 group">
                      <span className="w-0 h-[1px] bg-gold-400 group-hover:w-3 transition-all duration-300" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Links */}
            <div>
              <h4 className={`text-white mb-6 ${titleStyles}`}>
                {c.links.contact}
              </h4>
              <ul className="space-y-4">
                {c.links.contactLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-white/60 text-sm hover:text-gold-400 transition-colors duration-300 block break-all leading-snug">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4" dir={isRTL ? 'rtl' : 'ltr'}>

          <p className="text-white/40 text-xs md:text-sm font-medium">
            © {year} Golden Balance Law Firm. {c.rights}.
          </p>

          {/* Horizonya Credit */}
          <p className="text-white/40 text-xs md:text-sm flex items-center gap-1.5 font-medium">
            {c.devLabel}
            <a
              href="https://horizonya.com"
              target="_blank"
              rel="noreferrer"
              className="relative text-gold-400 hover:text-white transition-colors duration-300 font-bold tracking-wider group"
            >
              Horizonya
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gold-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" style={{ transformOrigin: isRTL ? 'right' : 'left' }} />
            </a>
          </p>

        </div>
      </div>

    </footer>
  );
}