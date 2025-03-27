// import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { useLocation } from 'react-router-dom';

export const Layout = () => {
  const location = useLocation();

  // Define routes where navigation and footer should be hidden
  const noLayoutRoutes = ["/login", "/register", "/forgot-password", "/post-job"]; 

  const shouldHideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!shouldHideLayout && <Navigation />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!shouldHideLayout && <Footer />}
    </div>
  );
};