import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AdminSidebar from './components/AdminSidebar.jsx'
import AdminNavbar from './components/AdminNavbar.jsx'
import './Admin.css'

const pageTitles = {
  '/admin': 'Tableau de bord',
  '/admin/blog': 'Gestion du blog',
  '/admin/partners': 'Partenaires & alliances',
  '/admin/gallery': 'Galerie & médias',
  '/admin/team': 'Équipe',
  '/admin/testimonials': 'Témoignages',
  '/admin/recruitment': 'Recrutement',
  '/admin/users': 'Utilisateurs & auteurs',
  '/admin/settings': 'Paramètres',
  '/admin/categories': 'Catégories'
}

const AdminLayout = () => {
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'Administration'
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="admin-shell">
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <AdminSidebar onNavigate={() => setSidebarOpen(false)} />
      </div>
      {sidebarOpen && (
        <div className="admin-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}
      <div className="admin-main">
        <AdminNavbar title={title} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout


