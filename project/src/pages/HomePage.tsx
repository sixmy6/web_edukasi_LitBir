import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Shield, Zap, Globe, Cloud, Database } from 'lucide-react';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Jelajahi Dunia Teknologi Bersama Kami</h1>
              <p className="text-xl mb-8">Pelajari perkembangan teknologi terkini dari para ahli dan tingkatkan pengetahuan Anda untuk masa depan yang lebih baik.</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/articles" className="bg-white text-blue-700 hover:bg-blue-100 px-6 py-3 rounded-md font-medium transition-colors">
                  Mulai Belajar
                </Link>
                <Link to="/topics" className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-700 px-6 py-3 rounded-md font-medium transition-colors">
                  Lihat Topik
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Teknologi Modern" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Topics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Topik Unggulan</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Pelajari berbagai topik teknologi yang sedang berkembang dan relevan dengan kebutuhan industri saat ini.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-xl p-8 transition-transform hover:scale-105">
              <Cpu className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Kecerdasan Buatan</h3>
              <p className="text-gray-600 mb-4">Pelajari dasar-dasar AI, machine learning, dan bagaimana teknologi ini mengubah berbagai industri.</p>
              <Link to="/topics/ai" className="text-blue-600 font-medium flex items-center hover:text-blue-800">
                Pelajari lebih lanjut <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-8 transition-transform hover:scale-105">
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Keamanan Siber</h3>
              <p className="text-gray-600 mb-4">Pahami pentingnya keamanan digital dan bagaimana melindungi data dari ancaman cyber.</p>
              <Link to="/topics/cybersecurity" className="text-blue-600 font-medium flex items-center hover:text-blue-800">
                Pelajari lebih lanjut <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-8 transition-transform hover:scale-105">
              <Cloud className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Komputasi Awan</h3>
              <p className="text-gray-600 mb-4">Eksplorasi teknologi cloud computing dan bagaimana teknologi ini mengubah cara bisnis beroperasi.</p>
              <Link to="/topics/cloud" className="text-blue-600 font-medium flex items-center hover:text-blue-800">
                Pelajari lebih lanjut <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Artikel Terbaru</h2>
            <Link to="/articles" className="text-blue-600 font-medium flex items-center hover:text-blue-800">
              Lihat semua <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Article 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="AI Technology" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-blue-600 mb-2">Kecerdasan Buatan</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Perkembangan Terbaru dalam Teknologi AI Generatif</h3>
                <p className="text-gray-600 mb-4">Bagaimana AI generatif seperti GPT-4 mengubah cara kita berinteraksi dengan teknologi dan membuka peluang baru.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                      alt="Author" 
                      className="h-10 w-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Dr. Andi Wijaya</p>
                      <p className="text-sm text-gray-500">12 Mei 2025</p>
                    </div>
                  </div>
                  <Link to="/articles/1" className="text-blue-600 hover:text-blue-800">
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Article 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Blockchain Technology" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-blue-600 mb-2">Blockchain</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Blockchain dan Masa Depan Keuangan Digital</h3>
                <p className="text-gray-600 mb-4">Mengapa teknologi blockchain menjadi fondasi penting untuk revolusi sistem keuangan global.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                      alt="Author" 
                      className="h-10 w-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Siti Rahayu</p>
                      <p className="text-sm text-gray-500">8 Mei 2025</p>
                    </div>
                  </div>
                  <Link to="/articles/2" className="text-blue-600 hover:text-blue-800">
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Article 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1563770660941-20978e870e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="IoT Technology" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-blue-600 mb-2">Internet of Things</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">IoT dan Transformasi Kota Pintar</h3>
                <p className="text-gray-600 mb-4">Bagaimana Internet of Things membangun infrastruktur kota yang lebih efisien dan berkelanjutan.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                      alt="Author" 
                      className="h-10 w-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Budi Santoso</p>
                      <p className="text-sm text-gray-500">5 Mei 2025</p>
                    </div>
                  </div>
                  <Link to="/articles/3" className="text-blue-600 hover:text-blue-800">
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mengapa Memilih TechEdu?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Platform edukasi teknologi yang dirancang untuk membantu Anda memahami perkembangan teknologi dengan cara yang sederhana dan menarik.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Konten Terkini</h3>
              <p className="text-gray-600">Informasi teknologi terbaru yang selalu diperbarui oleh tim ahli kami.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Perspektif Global</h3>
              <p className="text-gray-600">Wawasan teknologi dari berbagai sudut pandang dan konteks global.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
                <Database className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sumber Belajar</h3>
              <p className="text-gray-600">Akses ke berbagai materi pembelajaran dalam format yang beragam.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Kredibilitas</h3>
              <p className="text-gray-600">Konten yang disusun oleh para ahli dan praktisi teknologi terpercaya.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Dapatkan Update Terbaru</h2>
              <p className="text-xl mb-6">Berlangganan newsletter kami untuk mendapatkan informasi terkini tentang perkembangan teknologi langsung ke inbox Anda.</p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Alamat email Anda" 
                  className="px-4 py-3 rounded-md flex-grow text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit" 
                  className="bg-blue-900 hover:bg-blue-800 px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Berlangganan
                </button>
              </form>
              <p className="text-sm mt-4 text-blue-200">Kami menghargai privasi Anda. Anda dapat berhenti berlangganan kapan saja.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;