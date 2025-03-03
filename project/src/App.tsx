import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ArticlesPage from './pages/ArticlesPage';
import TopicsPage from './pages/TopicsPage';
import AuthorProfilePage from './pages/AuthorProfilePage';
import ContactPage from './pages/ContactPage';
import ResourcesPage from './pages/ResourcesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminResources from './pages/admin/AdminResources';
import AdminArticles from './pages/admin/AdminArticles';
import AdminUsers from './pages/admin/AdminUsers';
import AdminTopics from './pages/admin/AdminTopics';
import AdminArticleForm from './pages/admin/AdminArticleForm';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Protected route wrapper for admin routes
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>;
  }
  
  return isAdmin ? <>{children}</> : <Navigate to="/login" replace />;
};

// Protected route wrapper for authenticated users
const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>;
  }
  
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="/authors/:id" element={<AuthorProfilePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/resources" element={
              <AuthRoute>
                <ResourcesPage />
              </AuthRoute>
            } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            <Route path="/admin/resources" element={
              <AdminRoute>
                <AdminResources />
              </AdminRoute>
            } />
            <Route path="/admin/articles" element={
              <AdminRoute>
                <AdminArticles />
              </AdminRoute>
            } />
            <Route path="/admin/articles/new" element={
              <AdminRoute>
                <AdminArticleForm />
              </AdminRoute>
            } />
            <Route path="/admin/articles/edit/:id" element={
              <AdminRoute>
                <AdminArticleForm />
              </AdminRoute>
            } />
            <Route path="/admin/topics" element={
              <AdminRoute>
                <AdminTopics />
              </AdminRoute>
            } />
            <Route path="/admin/users" element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;