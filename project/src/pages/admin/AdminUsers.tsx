import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { 
  User, Trash2, Shield, Search, AlertCircle, Check, X, UserPlus
} from 'lucide-react';

const AdminUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setUsers(data);
      }
    } catch (error: any) {
      console.error('Error fetching users:', error);
      setError('Gagal memuat daftar pengguna. Silakan coba lagi nanti.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const fullName = user.full_name || '';
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDeleteClick = (id: string) => {
    // Don't allow deleting yourself
    if (id === currentUser?.id) {
      setError('Anda tidak dapat menghapus akun Anda sendiri.');
      return;
    }
    
    setDeleteUserId(id);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteUserId) return;
    
    try {
      // Delete user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', deleteUserId);
      
      if (profileError) {
        throw profileError;
      }
      
      // In a real application, you would also delete the auth user
      // This requires admin privileges and is typically done on the server
      
      // Update local state
      setUsers(users.filter(u => u.id !== deleteUserId));
      setShowDeleteConfirm(false);
      setDeleteUserId(null);
      
    } catch (error: any) {
      console.error('Error deleting user:', error);
      setError('Gagal menghapus pengguna. Silakan coba lagi.');
    }
  };

  const toggleAdminStatus = async (id: string, currentRole: string) => {
    // Don't allow changing your own role
    if (id === currentUser?.id) {
      setError('Anda tidak dapat mengubah peran Anda sendiri.');
      return;
    }
    
    try {
      const newRole = currentRole === 'admin' ? 'user' : 'admin';
      
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      // Update local state
      setUsers(users.map(user => 
        user.id === id 
          ? { ...user, role: newRole } 
          : user
      ));
      
    } catch (error: any) {
      console.error('Error updating user role:', error);
      setError('Gagal mengubah peran pengguna. Silakan coba lagi.');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kelola Pengguna</h1>
            <p className="text-gray-600 mt-2">Lihat dan kelola semua pengguna terdaftar</p>
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
        
        {/* Search */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari pengguna berdasarkan nama..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Users Table */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pengguna
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal Bergabung
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Peran
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className={user.id === currentUser?.id ? 'bg-blue-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            {user.avatar_url ? (
                              <img src={user.avatar_url} alt={user.full_name} className="h-10 w-10 rounded-full" />
                            ) : (
                              <User className="h-5 w-5 text-gray-500" />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.full_name || 'Pengguna Tanpa Nama'}
                              {user.id === currentUser?.id && (
                                <span className="ml-2 text-xs text-blue-600">(Anda)</span>
                              )}
                            </div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.created_at).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'admin' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role === 'admin' ? 'Admin' : 'Pengguna'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => toggleAdminStatus(user.id, user.role)}
                            disabled={user.id === currentUser?.id}
                            className={`text-indigo-600 hover:text-indigo-900 ${user.id === currentUser?.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                            title={user.role === 'admin' ? 'Jadikan Pengguna Biasa' : 'Jadikan Admin'}
                          >
                            <Shield className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(user.id)}
                            disabled={user.id === currentUser?.id}
                            className={`text-red-600 hover:text-red-900 ${user.id === currentUser?.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                            title="Hapus Pengguna"
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
            <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada pengguna</h3>
            <p className="text-gray-500 mb-6">Belum ada pengguna yang terdaftar atau tidak ada yang cocok dengan pencarian Anda.</p>
          </div>
        )}
        
        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Konfirmasi Hapus Pengguna</h3>
              <p className="text-gray-600 mb-6">Apakah Anda yakin ingin menghapus pengguna ini? Semua data terkait pengguna ini juga akan dihapus. Tindakan ini tidak dapat dibatalkan.</p>
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

export default AdminUsers;