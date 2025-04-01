// Layout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

const Layout = () => {

    const location = useLocation();

  // Define routes where navigation and footer should be hidden
  const noLayoutRoutes = ["/login", "/register", "/forgot-password", "/post-job"]; 

  const shouldHideLayout = noLayoutRoutes.includes(location.pathname);
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;