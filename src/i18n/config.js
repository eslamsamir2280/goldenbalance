import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        about: 'من نحن',
        services: 'خدماتنا',
        team: 'فريقنا',
        contact: 'تواصل معنا',
      },
      hero: {
        tagline: 'العدالة هي أساس كل حق',
        subtitle: 'مكتب محاماة متخصص بخبرة تمتد لأكثر من 20 عاماً',
        cta: 'استشارة مجانية',
        cta2: 'خدماتنا',
      },
    }
  },
  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About',
        services: 'Services',
        team: 'Our Team',
        contact: 'Contact',
      },
      hero: {
        tagline: 'Justice is the foundation of every right',
        subtitle: 'A specialized law firm with over 20 years of experience',
        cta: 'Free Consultation',
        cta2: 'Our Services',
      },
    }
  },
  it: {
    translation: {
      nav: {
        home: 'Home',
        about: 'Chi Siamo',
        services: 'Servizi',
        team: 'Il Team',
        contact: 'Contatti',
      },
      hero: {
        tagline: 'La giustizia è il fondamento di ogni diritto',
        subtitle: 'Uno studio legale specializzato con oltre 20 anni di esperienza',
        cta: 'Consulenza Gratuita',
        cta2: 'I Nostri Servizi',
      },
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar',
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false,
    }
  })

export default i18n
