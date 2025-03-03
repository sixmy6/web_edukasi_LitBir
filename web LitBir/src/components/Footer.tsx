import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Mail, Phone, MapPin, Facebook, Twitter, X , Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Cpu className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">LitBir</span>
            </div>
            <p className="text-gray-300 mb-4">
              Platform edukasi teknologi terkemuka yang menyediakan informasi terkini tentang perkembangan teknologi,inovasi dengan mudah dan menyenankan.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Navigasi</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Beranda</Link></li>
              <li><Link to="/articles" className="text-gray-300 hover:text-white transition-colors">Artikel</Link></li>
              <li><Link to="/topics" className="text-gray-300 hover:text-white transition-colors">Topik</Link></li>
              <li><Link to="/resources" className="text-gray-300 hover:text-white transition-colors">Sumber Belajar</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Kontak</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Topik Populer</h3>
            <ul className="space-y-2">
              <li><Link to="/topics/ai" className="text-gray-300 hover:text-white transition-colors">Kecerdasan Buatan</Link></li>
              <li><Link to="/topics/blockchain" className="text-gray-300 hover:text-white transition-colors">Blockchain</Link></li>
              <li><Link to="/topics/cybersecurity" className="text-gray-300 hover:text-white transition-colors">Keamanan Siber</Link></li>
              <li><Link to="/topics/iot" className="text-gray-300 hover:text-white transition-colors">Internet of Things</Link></li>
              <li><Link to="/topics/cloud" className="text-gray-300 hover:text-white transition-colors">Komputasi Awan</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Kontak</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">info@litbir.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">+62 882 0198 68343</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                <span className="text-gray-300">Jl. Mallengkeri I No. 22, mangasa, Indonesi</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} LitBir. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;