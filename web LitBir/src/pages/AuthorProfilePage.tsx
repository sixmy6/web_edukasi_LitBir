import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Mail, Globe, Twitter, Linkedin, ArrowRight } from 'lucide-react';

// Mock data for authors
const authors = [
  {
    id: '1',
    name: 'Dr. Andi Wijaya',
    role: 'Pakar Kecerdasan Buatan',
    bio: 'Dr. Andi Wijaya adalah seorang peneliti dan praktisi di bidang kecerdasan buatan dengan pengalaman lebih dari 15 tahun. Beliau memperoleh gelar Ph.D. dari MIT dalam bidang Computer Science dengan fokus pada machine learning dan natural language processing.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    email: 'andi.wijaya@example.com',
    website: 'https://andiwijaya.com',
    twitter: '@andiwijaya',
    linkedin: 'andiwijaya',
    expertise: ['Kecerdasan Buatan', 'Machine Learning', 'Natural Language Processing', 'Computer Vision'],
    articles: [
      {
        id: 1,
        title: 'Perkembangan Terbaru dalam Teknologi AI Generatif',
        excerpt: 'Bagaimana AI generatif seperti GPT-4 mengubah cara kita berinteraksi dengan teknologi dan membuka peluang baru.',
        category: 'Kecerdasan Buatan',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        date: '12 Mei 2025'
      },
      {
        id: 4,
        title: 'Etika dalam Pengembangan Kecerdasan Buatan',
        excerpt: 'Mengapa pertimbangan etis sangat penting dalam pengembangan teknologi AI dan bagaimana menerapkannya.',
        category: 'Kecerdasan Buatan',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        date: '2 April 2025'
      },
      {
        id: 7,
        title: 'Masa Depan NLP: Bahasa dan Kecerdasan',
        excerpt: 'Bagaimana pemrosesan bahasa alami berkembang dan mengubah interaksi manusia-komputer.',
        category: 'Kecerdasan Buatan',
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        date: '15 Maret 2025'
      }
    ]
  },
  {
    id: '2',
    name: 'Siti Rahayu',
    role: 'Spesialis Blockchain',
    bio: 'Siti Rahayu adalah seorang spesialis blockchain dan teknologi terdistribusi dengan pengalaman lebih dari 8 tahun di industri fintech. Beliau aktif sebagai pembicara di berbagai konferensi teknologi dan menulis secara rutin tentang perkembangan blockchain.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    email: 'siti.rahayu@example.com',
    website: 'https://sitirahayu.com',
    twitter: '@sitirahayu',
    linkedin: 'sitirahayu',
    expertise: ['Blockchain', 'Cryptocurrency', 'Smart Contracts', 'DeFi', 'Web3'],
    articles: [
      {
        id: 2,
        title: 'Blockchain dan Masa Depan Keuangan Digital',
        excerpt: 'Mengapa teknologi blockchain menjadi fondasi penting untuk revolusi sistem keuangan global.',
        category: 'Blockchain',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        date: '8 Mei 2025'
      },
      {
        id: 5,
        title: 'Smart Contracts: Revolusi dalam Transaksi Digital',
        excerpt: 'Bagaimana kontrak pintar mengubah cara kita melakukan transaksi dan mengelola kesepakatan.',
        category: 'Blockchain',
        image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        date: '20 April 2025'
      },
      {
        id: 8,
        title: 'Web3 dan Masa Depan Internet',
        excerpt: 'Memahami konsep Web3 dan bagaimana teknologi ini akan mengubah pengalaman online kita.',
        category: 'Blockchain',
        image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        date: '5 Maret 2025'
      }
    ]
  }
];

const AuthorProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const author = authors.find(a => a.id === id);
  
  if (!author) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Penulis Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-6">Maaf, kami tidak dapat menemukan penulis yang Anda cari.</p>
          <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Author Profile Header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/3 bg-blue-50 p-8 flex flex-col items-center justify-center">
              <img 
                src={author.avatar} 
                alt={author.name} 
                className="h-48 w-48 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <h1 className="text-2xl font-bold text-gray-900 mt-6 text-center">{author.name}</h1>
              <p className="text-blue-600 font-medium text-center">{author.role}</p>
              
              <div className="mt-6 w-full">
                <div className="flex items-center space-x-2 mb-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <a href={`mailto:${author.email}`} className="text-gray-700 hover:text-blue-600">{author.email}</a>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <Globe className="h-5 w-5 text-gray-500" />
                  <a href={author.website} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600">{author.website.replace('https://', '')}</a>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <Twitter className="h-5 w-5 text-gray-500" />
                  <a href={`https://twitter.com/${author.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600">{author.twitter}</a>
                </div>
                <div className="flex items-center space-x-2">
                  <Linkedin className="h-5 w-5 text-gray-500" />
                  <a href={`https://linkedin.com/in/${author.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600">{author.linkedin}</a>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Tentang</h2>
              <p className="text-gray-700 mb-6">{author.bio}</p>
              
              <h2 className="text-xl font-bold text-gray-900 mb-4">Keahlian</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {author.expertise.map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Statistik</h2>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-3xl font-bold text-blue-600">{author.articles.length}</p>
                    <p className="text-gray-600">Artikel</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-3xl font-bold text-blue-600">15K+</p>
                    <p className="text-gray-600">Pembaca</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-3xl font-bold text-blue-600">{author.expertise.length}</p>
                    <p className="text-gray-600">Topik</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Author Articles */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Artikel oleh {author.name}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {author.articles.map((article) => (
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
                    <p className="text-sm text-gray-500">{article.date}</p>
                    <Link to={`/articles/${article.id}`} className="text-blue-600 hover:text-blue-800">
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfilePage;