import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe as GlobeAfrica, Menu, X, Bell } from 'lucide-react';
import { useAuthStore } from '../lib/store';
import { cn } from '../lib/utils';

export const Navigation = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-secondary-light py-4 sticky top-0 z-50">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <GlobeAfrica className="w-8 h-8 text-primary" />
          <span className="text-2xl font-display font-bold text-primary">AfriJob</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="jobs" className="text-gray-300 hover:text-primary transition-colors">Jobs</Link>
          <Link to="learning-hub" className="text-gray-300 hover:text-primary transition-colors">Learning Hub</Link>
          <Link to="governance" className="text-gray-300 hover:text-primary transition-colors">Governance</Link>
{/*            <a href="#features" className="text-gray-300 hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-primary transition-colors">How it Works</a>
            <a href="#testimonials" className="text-gray-300 hover:text-primary transition-colors">Testimonials</a> */}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/messages" className="relative">
                <Bell className="w-6 h-6 text-gray-300 hover:text-primary transition-colors" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-red rounded-full text-xs flex items-center justify-center">
                  3
                </span>
              </Link>
              <Link 
                to={user?.role === 'freelancer' ? '/freelancer-dashboard' : '/client-dashboard'}
                className="text-gray-300 hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="login" className="btn-secondary">Log In</Link>
              <Link to="register" className="btn-primary">Sign Up</Link>
            </>
          )}
        </div>

        <button 
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-primary" />
          ) : (
            <Menu className="w-6 h-6 text-primary" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "md:hidden fixed inset-x-0 top-[72px] bg-secondary-light transition-all duration-300",
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      )}>
        <div className="container py-4 flex flex-col gap-4">
          <Link to="jobs" className="text-gray-300 hover:text-primary transition-colors">Jobs</Link>
          <Link to="learning-hub" className="text-gray-300 hover:text-primary transition-colors">Learning Hub</Link>
          <Link to="governance" className="text-gray-300 hover:text-primary transition-colors">Governance</Link>
          
          {isAuthenticated ? (
            <>
              <Link 
                to={user?.role === 'freelancer' ? '/freelancer-dashboard' : '/client-dashboard'}
                className="text-gray-300 hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn-secondary w-full">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="login" className="btn-secondary w-full text-center">Log In</Link>
              <Link to="register" className="btn-primary w-full text-center">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
