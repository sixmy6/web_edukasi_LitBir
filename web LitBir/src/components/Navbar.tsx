import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Cpu, BookOpen, Grid, Users, Mail, FileText, LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Cpu className="h-8 w-8" />
              <span className="text-xl font-bold">LitBir</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-1 hover:text-blue-200 transition-colors">
              <BookOpen className="h-5 w-5" />
              <span>Beranda</span>
            </Link>
            <Link to="/articles" className="flex items-center space-x-1 hover:text-blue-200 transition-colors">
              <FileText className="h-5 w-5" />
              <span>Artikel</span>
            </Link>
            <Link to="/topics" className="flex items-center space-x-1 hover:text-blue-200 transition-colors">
              <Grid className="h-5 w-5" />
              <span>Topik</span>
            </Link>
            <Link to="/resources" className="flex items-center space-x-1 hover:text-blue-200 transition-colors">
              <FileText className="h-5 w-5" />
              <span>Sumber Belajar</span>
            </Link>
            <Link to="/contact" className="flex items-center space-x-1 hover:text-blue-200 transition-colors">
              <Mail className="h-5 w-5" />
              <span>Kontak</span>
            </Link>
            
            {/* Admin Dashboard Link - Only visible to admins */}
            {isAdmin && (
              <Link to="/admin" className="flex items-center space-x-1 hover:text-blue-200 transition-colors">
                <Settings className="h-5 w-5" />
                <span>Admin</span>
              </Link>
            )}
            
            {/* User Profile Menu */}
            {user ? (
              <div className="relative">
                <button 
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-1 hover:text-blue-200 transition-colors focus:outline-none"
                >
                  <User className="h-5 w-5" />
                  <span>Profil</span>
                </button>
                
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    {isAdmin && (
                      <Link 
                        to="/admin" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Dashboard Admin
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-1 hover:text-blue-200 transition-colors">
                <User className="h-5 w-5" />
                <span>Masuk</span>
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-200 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-white block px-3 py-2 rounded-md hover:bg-blue-600"
              onClick={toggleMenu}
            >
              <BookOpen className="h-5 w-5" />
              <span>Beranda</span>
            </Link>
            <Link 
              to="/articles" 
              className="flex items-center space-x-2 text-white block px-3 py-2 rounded-md hover:bg-blue-600"
              onClick={toggleMenu}
            >
              <FileText className="h-5 w-5" />
              <span>Artikel</span>
            </Link>
            <Link 
              to="/topics" 
              className="flex items-center space-x-2 text-white block px-3 py-2 rounded-md hover:bg-blue-600"
              onClick={toggleMenu}
            >
              <Grid className="h-5 w-5" />
              <span>Topik</span>
            </Link>
            <Link 
              to="/resources" 
              className="flex items-center space-x-2 text-white block px-3 py-2 rounded-md hover:bg-blue-600"
              onClick={toggleMenu}
            >
              <FileText className="h-5 w-5" />
              <span>Sumber Belajar</span>
            </Link>
            <Link 
              to="/contact" 
              className="flex items-center space-x-2 text-white block px-3 py-2 rounded-md hover:bg-blue-600"
              onClick={toggleMenu}
            >
              <Mail className="h-5 w-5" />
              <span>Kontak</span>
            </Link>
            
            {/* Admin Dashboard Link - Only visible to admins */}
            {isAdmin && (
              <Link 
                to="/admin" 
                className="flex items-center space-x-2 text-white block px-3 py-2 rounded-md hover:bg-blue-600"
                onClick={toggleMenu}
              >
                <Settings className="h-5 w-5" />
                <span>Admin</span>
              </Link>
            )}
            
            {/* Login/Logout */}
            {user ? (
              <button
                onClick={() => {
                  handleSignOut();
                  toggleMenu();
                }}
                className="flex items-center space-x-2 text-white block w-full text-left px-3 py-2 rounded-md hover:bg-blue-600"
              >
                <LogOut className="h-5 w-5" />
                <span>Keluar</span>
              </button>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-2 text-white block px-3 py-2 rounded-md hover:bg-blue-600"
                onClick={toggleMenu}
              >
                <User className="h-5 w-5" />
                <span>Masuk</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;