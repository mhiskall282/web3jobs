import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Users, Globe, Bell, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
// import AfroTalentLogo from '../assets/logo.svg';

const Navbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isAuthenticated, userRole, hasProfile, logout, login } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/'); // Redirect to home instead of login page
    };

    const freelancerLinks = [
        { name: 'Dashboard', path: '/freelancer-dashboard' },
        { name: 'Find Jobs', path: '/jobs' },
        { name: 'My Applications', path: '/applications' },
    ];

    const recruiterLinks = [
        { name: 'Dashboard', path: '/recruiter-dashboard' },
        { name: 'Post Job', path: '/post-job' },
        { name: 'My Listings', path: '/listings' },
    ];

    const commonLinks = [
        { name: 'Learning Hub', path: '/learning' },
        { name: 'Governance', path: '/governance' },
    ];

    return (
        <nav className="bg-black border-b border-gold/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left section */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            {/* <img
                className="h-8 w-8"
                src={AfroTalentLogo}
                alt="AfroTalent logo"
              /> */}
                            <span className="ml-2 text-xl font-bold text-gold">
                                Worka
                            </span>
                        </Link>

                        {/* Desktop links */}
                        <div className="hidden md:flex items-center ml-10 space-x-8">
                            {isAuthenticated && (
                                <>
                                    {userRole === 'Freelancer' &&
                                        freelancerLinks.map((link) => (
                                            <Link
                                                key={link.name}
                                                to={link.path}
                                                className="text-gray-300 hover:text-gold transition-colors"
                                            >
                                                {link.name}
                                            </Link>
                                        ))}

                                    {userRole === 'Recruiter' &&
                                        recruiterLinks.map((link) => (
                                            <Link
                                                key={link.name}
                                                to={link.path}
                                                className="text-gray-300 hover:text-gold transition-colors"
                                            >
                                                {link.name}
                                            </Link>
                                        ))}

                                    {commonLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.path}
                                            className="text-gray-300 hover:text-gold transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right section */}
                    <div className="hidden md:flex items-center space-x-6">
                        {isAuthenticated ? (
                            <>
                                <button className="relative text-gray-300 hover:text-gold">
                                    <Bell className="w-6 h-6" />
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                                        3
                                    </span>
                                </button>

                                <Link
                                    to="/profile"
                                    className="flex items-center text-gray-300 hover:text-gold"
                                >
                                    <span className="mr-2">My Profile</span>
                                    <Users className="w-5 h-5" />
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="ml-4 px-4 py-2 border border-gold text-gold rounded-lg hover:bg-gold/10 transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={login} // Directly trigger login function
                                className="px-4 py-2 bg-gold text-black rounded-lg hover:bg-gold/90 transition-colors"
                            >
                                Sign In
                            </button>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-300 hover:text-gold"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-black/95 border-b border-gold/20">
                    <div className="px-4 pt-2 pb-3 space-y-4">
                        {isAuthenticated && (
                            <>
                                {userRole === 'Freelancer' &&
                                    freelancerLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.path}
                                            className="block text-gray-300 hover:text-gold"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}

                                {userRole === 'Recruiter' &&
                                    recruiterLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.path}
                                            className="block text-gray-300 hover:text-gold"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}

                                {commonLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className="block text-gray-300 hover:text-gold"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </>
                        )}

                        <div className="pt-4 border-t border-gold/20">
                            {isAuthenticated  ? (
                                <>
                                    <Link
                                        to="/profile"
                                        className="block text-gray-300 hover:text-gold"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        My Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full mt-2 px-4 py-2 text-left text-gray-300 hover:text-gold"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={login} // Directly trigger login function
                                    className="px-4 py-2 bg-gold text-black rounded-lg hover:bg-gold/90 transition-colors"
                                >
                                    Sign In
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;