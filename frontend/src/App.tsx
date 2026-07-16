import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import { Home } from './pages/HomePage'
import Dashboard from './pages/admin/DashboardPage'
import Article from './pages/ArticlePage'
import EditArticle from './pages/admin/EditArticlePage'
import NewArticle from './pages/admin/NewArticlePage'
import './App.css'
import { AuthProvider } from './contexts/AuthProvider.tsx'
import { AdminRoute } from './routes/AdminRoute'
import LoginAdmin from './pages/admin/Login/LoginAdminPage.tsx'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/login" element={<LoginAdmin />} />

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/edit" element={<EditArticle />} />
            <Route path="/new" element={<NewArticle />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
