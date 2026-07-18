import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import { Home } from './pages/HomePage'
import Dashboard from './pages/admin/dashboard/DashboardPage.tsx'
import Article from './pages/ArticlePage'
import EditArticle from './pages/admin/edit-articles/EditArticlePage.tsx'
import NewArticle from './pages/admin/new-article/NewArticlePage.tsx'
import './App.css'
import { AuthProvider } from './contexts/AuthProvider.tsx'
import { AdminRoute } from './routes/AdminRoute'
import LoginAdmin from './pages/admin/login/LoginAdminPage.tsx'
import NotFound from './pages/NotFoundPage.tsx'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/login" element={<LoginAdmin />} />
          <Route path="*" element={<NotFound />} />

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/edit/:id" element={<EditArticle />} />
            <Route path="/new" element={<NewArticle />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
