import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';

// ==========================================
// 1. استيراد مكونات الموقع الأساسية (Components)
// ==========================================
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhyUs from './components/WhyUs';
import PracticeAreas from './components/PracticeAreas';
import Methodology from './components/Methodology';
import CTA from './components/CTA';
import Team from './components/Team';
import Articles from './components/Articles';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget'; // مكون زر الشات العائم للعميل

// ==========================================
// 2. استيراد الصفحات الفرعية للموقع (Pages)
// ==========================================
import ArticlePage from './components/ArticlePage';
import ServicesPage from './pages/ServicesPage'; 

// ==========================================
// 3. استيراد تخطيط وصفحات لوحة التحكم (Admin Pages)
// ==========================================
import ProtectedRoute from './components/ProtectedRoute'; // مكون الحماية الذي أنشأناه
import AdminLogin from './pages/AdminLogin'; // صفحة تسجيل الدخول للأدمن
import AdminLayout from './pages/AdminLayout';
import AdminMessages from './pages/AdminMessages';
import AdminHero from './pages/AdminHero';
import AdminAbout from './pages/AdminAbout';
import AdminWhyUs from './pages/AdminWhyUs';
import AdminPracticeAreas from './pages/AdminPracticeAreas';
import AdminArticles from './pages/AdminArticles';
import AdminFAQ from './pages/AdminFAQ';
import AdminContact from './pages/AdminContact';
import AdminChat from './pages/AdminChat'; // صفحة شات المدير مع العملاء

export default function App() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState('en');

  // دالة تغيير اللغة
  const changeLanguage = (lng) => {
    setLang(lng);
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  // ضبط اللغة الافتراضية عند فتح الموقع
  useEffect(() => {
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-[#0A0A0A]">
        
        {/* زر الشات يظهر في كل مكان ماعدا لوحة تحكم الأدمين (اختياري) */}
        {!window.location.pathname.startsWith('/admin') && <ChatWidget lang={lang} />}

        <Routes>
          
          {/* ========================================== */}
          {/* مسار الموقع الرئيسي (Landing Page) */}
          {/* ========================================== */}
          <Route 
            path="/" 
            element={
              <>
                <Navbar lang={lang} onLangChange={changeLanguage} />
                <Hero lang={lang} />
                <About lang={lang} />
                <WhyUs lang={lang} />
                <PracticeAreas lang={lang} />
                <Methodology lang={lang} />
                <CTA lang={lang} />
                <Team lang={lang} />
                <ArticlesWrapper lang={lang} />
                <FAQ lang={lang} />
                <Contact lang={lang} />
                <Footer lang={lang} />
              </>
            } 
          />

          {/* ========================================== */}
          {/* مسارات الصفحات الفرعية للموقع */}
          {/* ========================================== */}
          <Route 
            path="/article" 
            element={
              <>
                <Navbar lang={lang} onLangChange={changeLanguage} />
                <ArticlePageWrapper lang={lang} />
                <Footer lang={lang} />
              </>
            } 
          />
          
          <Route 
            path="/services" 
            element={
              <>
                <Navbar lang={lang} onLangChange={changeLanguage} />
                <ServicesPage lang={lang} />
                <Footer lang={lang} />
              </>
            } 
          />

          {/* ========================================== */}
          {/* مسار تسجيل الدخول للوحة التحكم (مفتوح للجميع ليتمكن الأدمن من الدخول) */}
          {/* ========================================== */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ========================================== */}
          {/* مسارات لوحة التحكم المتداخلة (Admin Dashboard) - [محمية] */}
          {/* ========================================== */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              
              {/* إعادة توجيه تلقائي: لو دخل على /admin يوديه على الرسائل */}
              <Route index element={<Navigate to="messages" replace />} />
              
              {/* الصفحات الداخلية للوحة التحكم */}
              <Route path="messages" element={<AdminMessages />} />
              <Route path="chat" element={<AdminChat />} />
              <Route path="hero" element={<AdminHero />} />
              <Route path="about" element={<AdminAbout />} />
              <Route path="whyus" element={<AdminWhyUs />} />
              <Route path="practiceareas" element={<AdminPracticeAreas />} />
              <Route path="articles" element={<AdminArticles />} />
              <Route path="faq" element={<AdminFAQ />} />
              <Route path="contact" element={<AdminContact />} />
              
            </Route>
          </Route>
          
        </Routes>
      </div>
    </Router>
  );
}

// ---------------------------------------------------------
// مكونات مساعدة (Wrappers) للتعامل مع الـ Navigation
// ---------------------------------------------------------

function ArticlesWrapper({ lang }) {
  const navigate = useNavigate();
  return <Articles lang={lang} onReadMore={() => navigate('/article')} />;
}

function ArticlePageWrapper({ lang }) {
  const navigate = useNavigate();
  
  // لعمل سكرول لأعلى الصفحة بمجرد الدخول لمقال جديد
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  return <ArticlePage lang={lang} onBack={() => navigate('/')} />;
}