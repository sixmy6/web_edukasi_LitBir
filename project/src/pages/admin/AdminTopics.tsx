import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { 
  Grid, Edit, Trash2, Search, Plus, AlertCircle, 
  Check, X, Upload, Image, Cpu, Shield, Cloud, Globe, 
  Database, Zap, Smartphone, Radio, Layers, Monitor, Server
} from 'lucide-react';

const iconOptions = [
  { name: 'Cpu', icon: Cpu, label: 'CPU (AI)' },
  { name: 'Shield', icon: Shield, label: 'Shield (Security)' },
  { name: 'Cloud', icon: Cloud, label: 'Cloud' },
  { name: 'Globe', icon: Globe, label: 'Globe (IoT)' },
  { name: 'Database', icon: Database, label: 'Database (Blockchain)' },
  { name: 'Zap', icon: Zap, label: 'Zap (Quantum)' },
  { name: 'Smartphone', icon: Smartphone, label: 'Smartphone (Mobile)' },
  { name: 'Radio', icon: Radio, label: 'Radio (5G)' },
  { name: 'Layers', icon: Layers, label: 'Layers (Big Data)' },
  { name: 'Monitor', icon: Monitor, label: 'Monitor (AR/VR)' },
  { name: 'Server', icon: Server, label: 'Server (DevOps)' }
];

const colorOptions = [
  { name: 'blue', label: 'Biru', class: 'bg-blue-100 text-blue-600' },
  { name: 'red', label: 'Merah', class: 'bg-red-100 text-red-600' },
  { name: 'green', label: 'Hijau', class: 'bg-green-100 text-green-600' },
  { name: 'yellow', label: 'Kuning', class: 'bg-yellow-100 text-yellow-600' },
  { name: 'purple', label: 'Ungu', class: 'bg-purple-100 text-purple-600' },
  { name: 'pink', label: 'Pink', class: 'bg-pink-100 text-pink-600' },
  { name: 'indigo', label: 'Indigo', class: 'bg-indigo-100 text-indigo-600' },
  { name: 'orange', label: 'Oranye', class: 'bg-orange-100 text-orange-600' },
  { name: 'teal', label: 'Teal', class: 'bg-teal-100 text-teal-600' },
  { name: 'gray', label: 'Abu-abu', class: 'bg-gray-100 text-gray-600' }
];

const AdminTopics = () => {
  const { user } = useAuth();
  const [topics, setTopics] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingTopic, setEditingTopic] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Cpu',
    color: 'blue',
    image: null as File | null,
    imageUrl: ''
  });
  const [deleteTopicId, setDeleteTopicId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('topics')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setTopics(data);
      }
    } catch (error: any) {
      console.error('Error fetching topics:', error);
      setError('Gagal memuat topik. Silakan coba lagi nanti.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTopics = topics.filter(topic => {
    return topic.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
           topic.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        image: e.target.files![0]
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: 'Cpu',
      color: 'blue',
      image: null,
      imageUrl: ''
    });
    setEditingTopic(null);
  };
  
  const handleEditClick = (topic: any) => {
    setFormData({
      title: topic.title,
      description: topic.description,
      icon: topic.icon,
      color: topic.color,
      image: null,
      imageUrl: topic.image_url
    });
    setEditingTopic(topic.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      let imageUrl = formData.imageUrl;
      
      // Upload image if a new one is selected
      if (formData.image) {
        const fileExt = formData.image.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `topics/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('articles')
          .upload(filePath, formData.image);
        
        if (uploadError) {
          throw uploadError;
        }
        
        // Get public URL for the uploaded image
        const { data: urlData } = supabase.storage
          .from('articles')
          .getPublicUrl(filePath);
        
        imageUrl = urlData.publicUrl;
      }
      
      if (editingTopic) {
        // Update existing topic
        const { error: updateError } = await supabase
          .from('topics')
          .update({
            title: formData.title,
            description: formData.description,
            icon: formData.icon,
            color: formData.color,
            image_url: imageUrl
          })
          .eq('id', editingTopic);
        
        if (updateError) {
          throw updateError;
        }
      } else {
        // Create new topic
        const { error: insertError } = await supabase
          .from('topics')
          .insert([
            {
              title: formData.title,
              description: formData.description,
              icon: formData.icon,
              color: formData.color,
              image_url: imageUrl,
              article_count: 0
            }
          ]);
        
        if (insertError) {
          throw insertError;
        }
      }
      
      setFormSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormSuccess(false);
        setShowForm(false);
        resetForm();
        fetchTopics(); // Refresh the topics list
      }, 2000);
      
    } catch (error: any) {
      console.error('Error saving topic:', error);
      setError(error.message || 'Gagal menyimpan topik. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteTopicId(id);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTopicId) return;
    
    try {
      // Delete from database
      const { error: deleteError } = await supabase
        .from('topics')
        .delete()
        .eq('id', deleteTopicId);
      
      if (deleteError) {
        throw deleteError;
      }
      
      // Update local state
      setTopics(topics.filter(t => t.id !== deleteTopicId));
      setShowDeleteConfirm(false);
      setDeleteTopicId(null);
      
    } catch (error: any) {
      console.error('Error deleting topic:', error);
      setError('Gagal menghapus topik. Silakan coba lagi.');
    }
  };

  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find(option => option.name === iconName);
    return iconOption ? iconOption.icon : Cpu;
  };

  const getColorClass = (colorName: string) => {
    const colorOption = colorOptions.find(option => option.name === colorName);
    return colorOption ? colorOption.class : 'bg-blue-100 text-blue-600';
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kelola Topik</h1>
            <p className="text-gray-600 mt-2">Buat, edit, dan hapus topik pembelajaran</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center"
          >
            {showForm ? 'Batal' : 'Tambah Topik'} {showForm ? <X className="h-4 w-4 ml-1" /> : <Plus className="h-4 w-4 ml-1" />}
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          </div>
        )}
        
        {/* Topic Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Grid className="h-5 w-5 mr-2 text-blue-600" />
              {editingTopic ? 'Edit Topik' : 'Tambah Topik Baru'}
            </h2>
            
            {formSuccess ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
                <div className="flex items-center">
                  <Check className="h-5 w-5 mr-2" />
                  <span>Topik berhasil disimpan!</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Judul Topik</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">Ikon</label>
                      <select
                        id="icon"
                        name="icon"
                        value={formData.icon}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        {iconOptions.map((option) => (
                          <option key={option.name} value={option.name}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">Warna</label>
                      <select
                        id="color"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        {colorOptions.map((option) => (
                          <option key={option.name} value={option.name}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Gambar Cover</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Image className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="image" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                          <span>Unggah gambar</span>
                          <input 
                            id="image" 
                            name="image" 
                            type="file" 
                            className="sr-only"
                            onChange={handleImageChange}
                            accept="image/*"
                          />
                        </label>
                        <p className="pl-1">atau seret dan lepas</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF hingga 10MB
                      </p>
                      {formData.image && (
                        <p className="text-sm text-green-600">
                          Gambar dipilih: {formData.image.name}
                        </p>
                      )}
                      {!formData.image && formData.imageUrl && (
                        <div>
                          <p className="text-sm text-blue-600 mb-2">Gambar saat ini:</p>
                          <img 
                            src={formData.imageUrl} 
                            alt="Current topic image" 
                            className="h-20 mx-auto object-cover rounded"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md font-medium transition-colors mr-2"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        {editingTopic ? 'Perbarui' : 'Simpan'} <Check className="h-4 w-4 ml-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
        
        {/* Search */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari topik..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Topics Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounde d-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredTopics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTopics.map((topic) => {
              const IconComponent = getIconComponent(topic.icon);
              const colorClass = getColorClass(topic.color);
              
              return (
                <div key={topic.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  {topic.image_url && (
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={topic.image_url} 
                        alt={topic.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className={`${colorClass} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{topic.title}</h3>
                    <p className="text-gray-600 mb-4">{topic.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{topic.article_count} artikel</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditClick(topic)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(topic.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Grid className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada topik</h3>
            <p className="text-gray-500 mb-6">Belum ada topik yang dibuat atau tidak ada yang cocok dengan pencarian Anda.</p>
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors inline-flex items-center"
            >
              Tambah Topik <Plus className="h-4 w-4 ml-2" />
            </button>
          </div>
        )}
        
        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Konfirmasi Hapus</h3>
              <p className="text-gray-600 mb-6">Apakah Anda yakin ingin menghapus topik ini? Tindakan ini tidak dapat dibatalkan.</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTopics;