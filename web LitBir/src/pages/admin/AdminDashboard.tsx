import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, FileText, BookOpen, BarChart2, 
  Download, Eye, UserPlus, FileUp 
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalResources: 0,
    totalArticles: 0,
    totalDownloads: 0,
    recentUsers: [],
    recentResources: [],
    popularResources: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch total users
      const { count: userCount, error: userError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      
      // Fetch total resources
      const { count: resourceCount, error: resourceError } = await supabase
        .from('resources')
        .select('*', { count: 'exact', head: true });
      
      // Fetch total articles
      const { count: articleCount, error: articleError } = await supabase
        .from('articles')
        .select('*', { count: 'exact', head: true });
      
      // Fetch total downloads
      const { data: resourcesData, error: downloadsError } = await supabase
        .from('resources')
        .select('downloads');
      
      const totalDownloads = resourcesData?.reduce((sum, resource) => sum + resource.downloads, 0) || 0;
      
      // Fetch recent users
      const { data: recentUsers, error: recentUsersError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      // Fetch recent resources
      const { data: recentResources, error: recentResourcesError } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      // Fetch popular resources
      const { data: popularResources, error: popularResourcesError } = await supabase
        .from('resources')
        .select('*')
        .order('downloads', { ascending: false })
        .limit(5);
      
      if (userError || resourceError || articleError || downloadsError || 
          recentUsersError || recentResourcesError || popularResourcesError) {
        throw new Error('Error fetching dashboard data');
      }
      
      setStats({
        totalUsers: userCount || 0,
        totalResources: resourceCount || 0,
        totalArticles: articleCount || 0,
        totalDownloads,
        recentUsers: recentUsers || [],
        recentResources: recentResources || [],
        popularResources: popularResources || []
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
          <p className="text-gray-600 mt-2">Selamat datang, {profile?.full_name || user?.email}!</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Total Pengguna</h2>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Total Sumber Belajar</h2>
                <p className="text-2xl font-bold text-gray-900">{stats.totalResources}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Total Artikel</h2>
                <p className="text-2xl font-bold text-gray-900">{stats.totalArticles}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Download className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Total Unduhan</h2>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDownloads}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link to="/admin/resources/new" className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg flex flex-col items-center justify-center text-center transition-colors">
              <FileUp className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-gray-900 font-medium">Unggah Sumber Belajar</span>
            </Link>
            
            <Link to="/admin/articles/new" className="bg-green-50 hover:bg-green-100 p-4 rounded-lg flex flex-col items-center justify-center text-center transition-colors">
              <BookOpen className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-gray-900 font-medium">Buat Artikel Baru</span>
            </Link>
            
            <Link to="/admin/users" className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg flex flex-col items-center justify-center text-center transition-colors">
              <Users className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-gray-900 font-medium">Kelola Pengguna</span>
            </Link>
            
            <Link to="/admin/analytics" className="bg-yellow-50 hover:bg-yellow-100 p-4 rounded-lg flex flex-col items-center justify-center text-center transition-colors">
              <BarChart2 className="h-8 w-8 text-yellow-600 mb-2" />
              <span className="text-gray-900 font-medium">Lihat Analitik</span>
            </Link>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Users */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Pengguna Terbaru</h2>
              <Link to="/admin/users" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Lihat Semua
              </Link>
            </div>
            
            <div className="space-y-4">
              {stats.recentUsers.length > 0 ? (
                stats.recentUsers.map((user: any) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-gray-200 h-10 w-10 rounded-full flex items-center justify-center">
                        {user.avatar_url ? (
                          <img src={user.avatar_url} alt={user.full_name} className="h-10 w-10 rounded-full" />
                        ) : (
                          <UserPlus className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{user.full_name || 'Pengguna Baru'}</p>
                        <p className="text-xs text-gray-500">{new Date(user.created_at).toLocaleDateString('id-ID')}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role === 'admin' ? 'Admin' : 'Pengguna'}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">Belum ada pengguna</p>
              )}
            </div>
          </div>
          
          {/* Recent Resources */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Sumber Belajar Terbaru</h2>
              <Link to="/admin/resources" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Lihat Semua
              </Link>
            </div>
            
            <div className="space-y-4">
              {stats.recentResources.length > 0 ? (
                stats.recentResources.map((resource: any) => (
                  <div key={resource.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-blue-100 h-10 w-10 rounded-full flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{resource.title}</p>
                        <p className="text-xs text-gray-500">{resource.category} • {new Date(resource.created_at).toLocaleDateString('id-ID')}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Download className="h-4 w-4 mr-1" />
                      <span>{resource.downloads}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">Belum ada sumber belajar</p>
              )}
            </div>
          </div>
          
          {/* Popular Resources */}
          <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Sumber Belajar Populer</h2>
              <Link to="/admin/resources" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Lihat Semua
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Judul
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.popularResources.length > 0 ? (
                    stats.popularResources.map((resource: any) => (
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
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                        Belum ada sumber belajar
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;