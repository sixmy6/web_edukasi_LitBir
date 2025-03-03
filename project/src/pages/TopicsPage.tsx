import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, Shield, Cloud, Globe, Database, Zap, 
  Smartphone, Radio, Layers, Monitor, Server, ArrowRight 
} from 'lucide-react';

const topics = [
  {
    id: 'ai',
    title: 'Kecerdasan Buatan',
    description: 'Pelajari dasar-dasar AI, machine learning, dan bagaimana teknologi ini mengubah berbagai industri.',
    icon: Cpu,
    color: 'blue',
    articles: 24,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cybersecurity',
    title: 'Keamanan Siber',
    description: 'Pahami pentingnya keamanan digital dan bagaimana melindungi data dari ancaman cyber.',
    icon: Shield,
    color: 'red',
    articles: 18,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cloud',
    title: 'Komputasi Awan',
    description: 'Eksplorasi teknologi cloud computing dan bagaimana teknologi ini mengubah cara bisnis beroperasi.',
    icon: Cloud,
    color: 'purple',
    articles: 15,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'iot',
    title: 'Internet of Things',
    description: 'Pelajari bagaimana perangkat terhubung mengubah cara kita hidup dan bekerja.',
    icon: Globe,
    color: 'green',
    articles: 12,
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'blockchain',
    title: 'Blockchain',
    description: 'Memahami teknologi blockchain dan aplikasinya di berbagai sektor industri.',
    icon: Database,
    color: 'yellow',
    articles: 10,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ar-vr',
    title: 'Augmented & Virtual Reality',
    description: 'Jelajahi dunia AR dan VR serta bagaimana teknologi ini mengubah cara kita berinteraksi.',
    icon: Monitor,
    color: 'indigo',
    articles: 8,
    image: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5g',
    title: 'Teknologi 5G',
    description: 'Pelajari tentang revolusi konektivitas dan dampaknya terhadap berbagai industri.',
    icon: Radio,
    color: 'pink',
    articles: 7,
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'big-data',
    title: 'Big Data & Analytics',
    description: 'Memahami bagaimana analisis data besar mengubah pengambilan keputusan bisnis.',
    icon: Layers,
    color: 'orange',
    articles: 9,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mobile-dev',
    title: 'Pengembangan Mobile',
    description: 'Pelajari tren terbaru dalam pengembangan aplikasi mobile dan teknologi terkait.',
    icon: Smartphone,
    color: 'teal',
    articles: 11,
    image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'devops',
    title: 'DevOps & Automation',
    description: 'Memahami praktik DevOps dan bagaimana otomatisasi meningkatkan pengembangan software.',
    icon: Server,
    color: 'gray',
    articles: 6,
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'quantum',
    title: 'Komputasi Kuantum',
    description: 'Jelajahi masa depan komputasi dan bagaimana teknologi kuantum akan mengubah dunia.',
    icon: Zap,
    color: 'blue',
    articles: 4,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

const getColorClass = (color: string) => {
  const colorMap: Record<string, { bg: string, text: string, hover: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', hover: 'hover:bg-blue-200' },
    red: { bg: 'bg-red-100', text: 'text-red-600', hover: 'hover:bg-red-200' },
    green: { bg: 'bg-green-100', text: 'text-green-600', hover: 'hover:bg-green-200' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', hover: 'hover:bg-yellow-200' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', hover: 'hover:bg-purple-200' },
    pink: { bg: 'bg-pink-100', text: 'text-pink-600', hover: 'hover:bg-pink-200' },
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', hover: 'hover:bg-indigo-200' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600', hover: 'hover:bg-orange-200' },
    teal: { bg: 'bg-teal-100', text: 'text-teal-600', hover: 'hover:bg-teal-200' },
    gray: { bg: 'bg-gray-100', text: 'text-gray-600', hover: 'hover:bg-gray-200' }
  };
  
  return colorMap[color] || colorMap.blue;
};

const TopicsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Topik Teknologi</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Jelajahi berbagai topik teknologi yang sedang berkembang dan relevan dengan kebutuhan industri saat ini.</p>
        </div>
        
        {/* Featured Topics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {topics.slice(0, 2).map((topic) => {
            const colorClass = getColorClass(topic.color);
            const Icon = topic.icon;
            
            return (
              <div key={topic.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img 
                      src={topic.image} 
                      alt={topic.title} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-8 md:w-1/2">
                    <div className={`${colorClass.bg} ${colorClass.text} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{topic.title}</h2>
                    <p className="text-gray-600 mb-4">{topic.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{topic.articles} artikel</span>
                      <Link to={`/topics/${topic.id}`} className={`${colorClass.text} font-medium flex items-center hover:underline`}>
                        Jelajahi <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* All Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.slice(2).map((topic) => {
            const colorClass = getColorClass(topic.color);
            const Icon = topic.icon;
            
            return (
              <div key={topic.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className={`${colorClass.bg} ${colorClass.text} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{topic.title}</h3>
                <p className="text-gray-600 mb-4">{topic.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{topic.articles} artikel</span>
                  <Link to={`/topics/${topic.id}`} className={`${colorClass.text} font-medium flex items-center hover:underline`}>
                    Jelajahi <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Topic Request */}
        <div className="mt-16 bg-blue-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Tidak menemukan topik yang Anda cari?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Beri tahu kami topik teknologi apa yang ingin Anda pelajari, dan tim kami akan berusaha menyediakan konten yang relevan.</p>
          <Link to="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
            Ajukan Topik Baru
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopicsPage;