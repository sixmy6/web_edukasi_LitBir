import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: 'Perkembangan Terbaru dalam Teknologi AI Generatif',
    excerpt: 'Bagaimana AI generatif seperti GPT-4 mengubah cara kita berinteraksi dengan teknologi dan membuka peluang baru.',
    category: 'Kecerdasan Buatan',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Dr. Andi Wijaya',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    date: '12 Mei 2025'
  },
  {
    id: 2,
    title: 'Blockchain dan Masa Depan Keuangan Digital',
    excerpt: 'Mengapa teknologi blockchain menjadi fondasi penting untuk revolusi sistem keuangan global.',
    category: 'Blockchain',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Siti Rahayu',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    date: '8 Mei 2025'
  },
  {
    id: 3,
    title: 'IoT dan Transformasi Kota Pintar',
    excerpt: 'Bagaimana Internet of Things membangun infrastruktur kota yang lebih efisien dan berkelanjutan.',
    category: 'Internet of Things',
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Budi Santoso',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    date: '5 Mei 2025'
  },
  {
    id: 4,
    title: 'Keamanan Siber di Era Digital: Tantangan dan Solusi',
    excerpt: 'Mengapa keamanan siber menjadi semakin penting dan bagaimana melindungi data Anda dari serangan cyber.',
    category: 'Keamanan Siber',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Diana Putri',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    date: '1 Mei 2025'
  },
  {
    id: 5,
    title: 'Cloud Computing: Transformasi Infrastruktur IT Modern',
    excerpt: 'Bagaimana cloud computing mengubah cara bisnis mengelola infrastruktur IT mereka dan meningkatkan efisiensi.',
    category: 'Komputasi Awan',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Rudi Hartono',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    date: '28 April 2025'
  },
  {
    id: 6,
    title: 'Augmented Reality dan Masa Depan Pendidikan',
    excerpt: 'Bagaimana teknologi AR mengubah cara kita belajar dan membuat pengalaman pendidikan lebih interaktif.',
    category: 'Augmented Reality',
    image: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Prof. Maya Indah',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    date: '25 April 2025'
  }
];

const categories = [
  'Semua',
  'Kecerdasan Buatan',
  'Blockchain',
  'Internet of Things',
  'Keamanan Siber',
  'Komputasi Awan',
  'Augmented Reality'
];

const ArticlesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Artikel & Berita</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Temukan informasi terkini tentang perkembangan teknologi dari para ahli dan praktisi terpercaya.</p>
        </div>
        
        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari artikel..."
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-sm text-blue-600 mb-2">{article.category}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={article.author.avatar} 
                        alt={article.author.name} 
                        className="h-10 w-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{article.author.name}</p>
                        <p className="text-sm text-gray-500">{article.date}</p>
                      </div>
                    </div>
                    <Link to={`/articles/${article.id}`} className="text-blue-600 hover:text-blue-800">
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-900 mb-2">Tidak ada artikel yang ditemukan</h3>
            <p className="text-gray-600">Coba ubah kata kunci pencarian atau filter kategori Anda.</p>
          </div>
        )}
        
        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <nav className="flex items-center space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Sebelumnya
            </button>
            <button className="px-4 py-2 border border-blue-500 rounded-md text-white bg-blue-500">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
              3
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Selanjutnya
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;