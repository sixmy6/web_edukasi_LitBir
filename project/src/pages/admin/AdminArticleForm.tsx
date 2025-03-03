import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { 
  BookOpen, Save, ArrowLeft, Upload, Image, 
  AlertCircle, Check, X
} from 'lucide-react';

const categories = [
  'Kecerdasan Buatan',
  'Blockchain',
  'Internet of Things',
  'Keamanan Siber',
  'Komputasi Awan',
  'Augmented Reality'
];

const AdminArticleForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(id ? true : false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    published: false,
    image: null as File | null,
    imageUrl: ''
  });

  useEffect(() => {
    if (id && id !== 'new') {
      fetchArticle(id);
    }
  }, [id]);

  const fetchArticle = async (articleId: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', articleId)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setFormData({
          title: data.title,
          content: data.content,
          excerpt: data.excerpt,
          category: data.category,
          published: data.published,
          image: null,
          imageUrl: data.image_url
        });
      }
    } catch (error: any) {
      console.error('Error fetching article:', error);
      setError('Gagal memuat artikel. Silakan coba lagi nanti.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSaving(true);
      setError(null);
      
      let imageUrl = formData.imageUrl;
      
      // Upload image if a new one is selected
      if (formData.image) {
        const fileExt = formData.image.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `articles/${fileName}`;
        
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
      
      if (id && id !== 'new') {
        // Update existing article
        const { error: updateError } = await supabase
          .from('articles')
          .update({
            title: formData.title,
            content: formData.content,
            excerpt: formData.excerpt,
            category: formData.category,
            published: formData.published,
            image_url: imageUrl,
            updated_at: new Date().toISOString()
          })
          .eq('id', id);
        
        if (updateError) {
          throw updateError;
        }
      } else {
        // Create new article
        const { error: insertError } = await supabase
          .from('articles')
          .insert([
            {
              title: formData.title,
              content: formData.content,
              excerpt: formData.excerpt,
              category: formData.category,
              published: formData.published,
              image_url: imageUrl,
              author_id: user!.id
            }
          ]);
        
        if (insertError) {
          throw insertError;
        }
      }
      
      setSuccess(true);
      
      // Redirect after successful save
      setTimeout(() => {
        navigate('/admin/articles');
      }, 2000);
      
    } catch (error: any) {
      console.error('Error saving article:', error);
      setError(error.message || 'Gagal menyimpan artikel. Silakan coba lagi.');
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/admin/articles')}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {id && id !== 'new' ? 'Edit Artikel' : 'Buat Artikel Baru'}
            </h1>
            <p className="text-gray-600 mt-1">
              {id && id !== 'new' ? 'Perbarui konten artikel yang sudah ada' : 'Buat artikel baru untuk dipublikasikan'}
            </p>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
            <div className="flex items-center">
              <Check className="h-5 w-5 mr-2" />
              <span>Artikel berhasil disimpan! Mengalihkan...</span>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Judul Artikel</label>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Pilih kategori</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">Ringkasan</label>
                <input
                  type="text"
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="Ringkasan singkat artikel (akan ditampilkan di daftar artikel)"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Konten Artikel</label>
              <textarea
                id="content"
                name="content"
                rows={15}
                value={formData.content}
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
                        alt="Current article image" 
                        className="h-40 mx-auto object-cover rounded"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={formData.published}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
                Publikasikan artikel ini
              </label>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/admin/articles')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md font-medium transition-colors mr-2"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    Simpan <Save className="h-4 w-4 ml-1" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminArticleForm;