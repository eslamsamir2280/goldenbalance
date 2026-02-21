import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  // هنا نفحص هل الأدمن مسجل دخوله؟ 
  // (في الواقع العملي، قد تفحص token من الـ localStorage أو من Context)
  const isAuthenticated = localStorage.getItem('adminToken'); 

  // إذا كان مسجل دخول، اعرض المكونات الداخلية (Outlet)
  // إذا لم يكن، وجهه فوراً إلى صفحة تسجيل الدخول
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
}