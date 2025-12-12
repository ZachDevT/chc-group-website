import { NavLink } from 'react-router-dom'
import { FiGrid, FiEdit3, FiUsers, FiImage, FiShare2, FiSettings, FiTag, FiUser, FiBriefcase, FiMessageSquare } from 'react-icons/fi'
import { useAuth } from '../../../context/AuthContext.jsx'

const AdminSidebar = ({ onNavigate }) => {
  const { userRole } = useAuth()
  const isSuperAdmin = userRole === 'super-admin'
  const isHR = userRole === 'hr' || isSuperAdmin

  const navItems = [
    { to: '/admin', label: 'Tableau de bord', icon: <FiGrid /> },
    { to: '/admin/blog', label: 'Blog & Articles', icon: <FiEdit3 /> },
    { to: '/admin/categories', label: 'Catégories', icon: <FiTag /> },
    { to: '/admin/partners', label: 'Partenaires', icon: <FiShare2 /> },
    { to: '/admin/gallery', label: 'Galerie', icon: <FiImage /> },
    { to: '/admin/team', label: 'Équipe', icon: <FiUser /> },
    { to: '/admin/testimonials', label: 'Témoignages', icon: <FiMessageSquare /> },
    ...(isHR ? [{ to: '/admin/recruitment', label: 'Recrutement', icon: <FiBriefcase /> }] : []),
    ...(isSuperAdmin ? [{ to: '/admin/users', label: 'Utilisateurs', icon: <FiUsers /> }] : []),
    { to: '/admin/settings', label: 'Réglages', icon: <FiSettings /> }
  ]

  return (
    <>
      <div className="admin-brand">
        <div className="admin-brand-logo">CHC</div>
        <div>
          <h1>CHC Admin</h1>
          <small>Espace d'administration</small>
        </div>
      </div>
      <nav className="admin-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            onClick={onNavigate}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </>
  )
}

export default AdminSidebar


