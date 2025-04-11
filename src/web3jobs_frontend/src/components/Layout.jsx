import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  // Define routes where navigation and footer should be hidden
  const noLayoutRoutes = ["/create-profile", "/forgot-password", "/post-job"]; 

  // Check if the current route should hide the layout
  const shouldHideLayout = noLayoutRoutes.includes(location.pathname);

  // If the route is in noLayoutRoutes, only render the Outlet
  if (shouldHideLayout) {
    return <Outlet />;
  }

  // Otherwise, render the full layout with Navbar, Outlet, and Footer
  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a1a] text-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
