import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { 
  FileText, Edit, Trash2, Download, Search, Filter, 
  Plus, AlertCircle, Check, X, Upload, File
} from 'lucide-react';

const categories = [
  'Semua',
  'Kecerdasan Buatan',
  'Blockchain',
  'Internet of Things',
  'Keamanan Siber',
  'Komputasi Awan',
  'Augmented Reality'
];

const AdminResources = () => {
  const { user } = useAuth();
  const [resources, setResources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    category: '',
    file: null as File | null
  });
  const [deleteResourceId, setDeleteResourceId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setResources(data);
      }
    } catch (error: any) {
      console.error('Error fetching resources:', error);
      setError('Gagal memuat sumber belajar. Silakan coba lagi nanti.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUploadData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadData(prev => ({
        ...prev,
        file: e.target.files![0]
      }));
    }
  };
  
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadData.file) {
      setError('Silakan pilih file untuk diunggah');
      return;
    }
    
    try {
      setIsUploading(true);
      setError(null);
      
      // Upload file to Supabase Storage
      const fileExt = uploadData.file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `resources/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('resources')
        .upload(filePath, uploadData.file);
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Get public URL for the uploaded file
      const { data: urlData } = supabase.storage
        .from('resources')
        .getPublicUrl(filePath);
      
      const publicUrl = urlData.publicUrl;
      
      // Insert resource metadata into the database
      const { error: insertError } = await supabase
        .from('resources')
        .insert([
          {
            title: uploadData.title,
            description: uploadData.description,
            category: uploadData.category,
            file_url: publicUrl,
            file_type: uploadData.file.type,
            file_size: uploadData.file.size,
            downloads: 0,
            user_id: user!.id
          }
        ]);
      
      if (insertError) {
        throw insertError;
      }
      
      setUploadSuccess(true);
      
      // Reset form after successful upload
      setTimeout(() => {
        setUploadSuccess(false);
        setShowUploadForm(false);
        setUploadData({
          title: '',
          description: '',
          category: '',
          file: null
        });
        fetchResources(); // Refresh the resources list
      }, 2000);
      
    } catch (error: any) {
      console.error('Error uploading resource:', error);
      setError(error.message || 'Gagal mengunggah file. Silakan coba lagi.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteResourceId(id);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteResourceId) return;
    
    try {
      // Get the resource to find the file path
      const { data: resource, error: fetchError } = await supabase
        .from('resources')
        .select('file_url')
        .eq('id', deleteResourceId)
        .single();
      
      if (fetchError) {
        throw fetchError;
      }
      
      // Delete from database
      const { error: deleteError } = await supabase
        .from('resources')
        .delete()
        .eq('id', deleteResourceId);
      
      if (deleteError) {
        throw deleteError;
      }
      
      // Try to delete the file from storage if possible
      // This is a best effort - we don't want to fail if the file doesn't exist
      if (resource && resource.file_url) {
        try {
          const filePath = resource.file_url.split('/').pop();
          if (filePath) {
            await supabase.storage
              .from('resources')
              .remove([`resources/${filePath}`]);
          }
        } catch (storageError) {
          console.error('Error deleting file from storage:', storageError);
          // Continue anyway since the database record is deleted
        }
      }
      
      // Update local state
      setResources(resources.filter(r => r.id !== deleteResourceId));
      setShowDeleteConfirm(false);
      setDeleteResourceId(null);
      
    } catch (error: any) {
      console.error('Error deleting resource:', error);
      setError('Gagal menghapus sumber belajar. Silakan coba lagi.');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kelola Sumber Belajar</h1>
            <p className="text-gray-600 mt-2">Unggah, edit, dan hapus sumber belajar</p>
          </div>
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center"
          >
            {showUploadForm ? 'Batal' : 'Unggah Baru'} {showUploadForm ? <X className="h-4 w-4 ml-1" /> : <Plus className="h-4 w-4 ml-1" />}
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
        
        {/* Upload Form */}
        {showUploadForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Upload className="h-5 w-5 mr-2 text-blue-600" />
              Unggah Sumber Belajar Baru
            </h2>
            
            {uploadSuccess ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
                <div className="flex items-center">
                  <Check className="h-5 w-5 mr-2" />
                  <span>File berhasil diunggah!</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={uploadData.title}
                      onChange={handleUploadChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                    <select
                      id="category"
                      name="category"
                      value={uploadData.category}
                      onChange={handleUploadChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Pilih kategori</option>
                      {categories.filter(cat => cat !== 'Semua').map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={uploadData.description}
                    onChange={handleUploadChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">File</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <File className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                          <span>Unggah file</span>
                          <input 
                            id="file" 
                            name="file" 
                            type="file" 
                            className="sr-only"
                            onChange={handleFileChange}
                            required
                          />
                        </label>
                        <p className="pl-1">atau seret dan lepas</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, Video, atau dokumen lainnya hingga 50MB
                      </p>
                      {uploadData.file && (
                        <p className="text-sm text-green-600">
                          File dipilih: {uploadData.file.name} ({(uploadData.file.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowUploadForm(false)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md font-medium transition-colors mr-2"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center disabled:opacity-50"
                  >
                    {isUploading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Mengunggah...
                      </>
                    ) : (
                      <>
                        Unggah <Upload className="h-4 w-4 ml-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
        
        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari sumber belajar..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
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
        
        {/* Resources Table */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredResources.length > 0 ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sumber Belajar
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kategori
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unduhan
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ukuran
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredResources.map((resource) => (
                    <tr key={resource.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{resource.title}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{resource.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {resource.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(resource.created_at).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Download className="h-4 w-4 mr-1 text-green-600" />
                          <span>{resource.downloads}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {(resource.file_size / 1024 / 1024).toFixed(2)} MB
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <a 
                            href={resource.file_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Download className="h-5 w-5" />
                          </a>
                          <Link 
                            to={`/admin/resources/edit/${resource.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="h-5 w-5" />
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(resource.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada sumber belajar</h3>
            <p className="text-gray-500 mb-6">Belum ada sumber belajar yang diunggah atau tidak ada yang cocok dengan pencarian Anda.</p>
            <button
              onClick={() => setShowUploadForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors inline-flex items-center"
            >
              Unggah Sumber Belajar <Upload className="h-4 w-4 ml-2" />
            </button>
          </div>
        )}
        
        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Konfirmasi Hapus</h3>
              <p className="text-gray-600 mb-6">Apakah Anda yakin ingin menghapus sumber belajar ini? Tindakan ini tidak dapat dibatalkan.</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors "
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

export default AdminResources;