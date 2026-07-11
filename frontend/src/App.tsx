import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'
import Home from './pages/HomePage'
import Dashboard from './pages/admin/DashboardPage'
import Article from './pages/ArticlePage'
import EditArticle from './pages/admin/EditArticlePage'
import NewArticle from './pages/admin/NewArticlePage'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/edit" element={<EditArticle />} />
        <Route path="/new" element={<NewArticle />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
