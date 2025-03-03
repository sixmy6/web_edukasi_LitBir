import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send the form data to a server here
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset submission status after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hubungi Kami</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Punya pertanyaan atau ingin berkolaborasi? Jangan ragu untuk menghubungi kami.</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Contact Information */}
            <div className="md:w-1/3 bg-blue-700 text-white p-8">
              <h2 className="text-2xl font-bold mb-6">Informasi Kontak</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 mt-1" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-blue-200">info@LitBir.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 mt-1" />
                  <div>
                    <h3 className="font-medium">Telepon</h3>
                    <p className="text-blue-200">+62 123 4567 890</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 mt-1" />
                  <div>
                    <h3 className="font-medium">Alamat</h3>
                    <p className="text-blue-200">Jl. Mallengkeri No.I<br />Indonesia</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="font-medium mb-4">Jam Operasional</h3>
                <p className="text-blue-200 mb-2">sabtu - minggu: 18:00 - 24:00</p>
                <p className="text-blue-200">Sabtu - Minggu: buka</p>
              </div>
              
              <div className="mt-12">
                <h3 className="font-medium mb-4">Ikuti Kami</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-blue-800 hover:bg-blue-900 h-10 w-10 rounded-full flex items-center justify-center transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="bg-blue-800 hover:bg-blue-900 h-10 w-10 rounded-full flex items-center justify-center transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="bg-blue-800 hover:bg-blue-900 h-10 w-10 rounded-full flex items-center justify-center transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="bg-blue-800 hover:bg-blue-900 h-10 w-10 rounded-full flex items-center justify-center transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79zM6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 9.94v-8.37H5.5v8.37h2.77z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="md:w-2/3 p-8">
              <div className="flex items-center space-x-2 mb-8">
                <MessageSquare className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Kirim Pesan</h2>
              </div>
              
              {formSubmitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
                  <strong className="font-bold">Terima kasih!</strong>
                  <span className="block sm:inline"> Pesan Anda telah kami terima. Kami akan segera menghubungi Anda.</span>
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subjek</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Pilih subjek</option>
                    <option value="general">Pertanyaan Umum</option>
                    <option value="support">Dukungan Teknis</option>
                    <option value="partnership">Kerjasama</option>
                    <option value="feedback">Umpan Balik</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center"
                >
                  Kirim Pesan <Send className="h-4 w-4 ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Map */}
        <div className="mt-12">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Lokasi Kami</h2>
              <p className="text-gray-600 mb-4">Jl. mallengkeri No.I, Indonesia</p>
            </div>
            <div className="h-96 bg-gray-200">
              {/* In a real application, you would embed a Google Maps iframe here */}
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <p className="text-gray-600">Peta akan ditampilkan di sini</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Pertanyaan yang Sering Diajukan</h2>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="divide-y divide-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Bagaimana cara berlangganan newsletter?</h3>
                <p className="text-gray-600">Anda dapat berlangganan newsletter kami dengan mengisi formulir di halaman beranda atau mengirimkan email ke info@LitBir.com dengan subjek "Berlangganan Newsletter".</p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Apakah saya bisa menjadi kontributor?</h3>
                <p className="text-gray-600">Tentu! Kami selalu mencari kontributor yang berpengalaman di bidang teknologi. Silakan kirim portofolio dan contoh tulisan Anda ke kontributor@LitBir.com.</p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Apakah konten di situs ini gratis?</h3>
                <p className="text-gray-600">Ya, semua konten di situs kami dapat diakses secara gratis. Namun, beberapa materi pembelajaran khusus mungkin memerlukan pendaftaran akun.</p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Bagaimana cara mengajukan topik baru?</h3>
                <p className="text-gray-600">Anda dapat mengajukan topik baru melalui formulir kontak di halaman ini atau mengirimkan email ke topik@LitBir.com dengan detail topik yang Anda inginkan.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;