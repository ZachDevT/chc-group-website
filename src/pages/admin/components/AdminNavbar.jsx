import { FiBell, FiLogOut, FiShield, FiUser, FiMenu } from 'react-icons/fi'
import { useAuth } from '../../../context/AuthContext.jsx'

const AdminNavbar = ({ title = 'Administration', onMenuClick }) => {
  const { user, userInfo, userRole, logout } = useAuth()
  const displayName = userInfo?.name || user?.displayName || user?.email?.split('@')[0] || 'Admin CHC'
  const displayEmail = userInfo?.email || user?.email || ''
  const initials = displayName.substring(0, 2).toUpperCase()
  const roleLabel = userRole === 'super-admin' ? 'Super Admin' : 'Éditeur'

  return (
    <header className="admin-topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          className="admin-menu-toggle" 
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <FiMenu />
        </button>
        <h2>{title}</h2>
      </div>
      <div className="admin-actions">
        <button className="admin-btn admin-btn-secondary" aria-label="Notifications">
          <FiBell />
        </button>
        <div className="admin-user-chip">
          {userInfo?.avatar ? (
            <img src={userInfo.avatar} alt={displayName} style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
          ) : (
            <div className="admin-user-avatar">{initials}</div>
          )}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong>{displayName}</strong>
              <span className={`status-pill ${userRole === 'super-admin' ? 'success' : 'draft'}`} style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                {userRole === 'super-admin' ? <FiShield size={12} /> : <FiUser size={12} />} {roleLabel}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{displayEmail}</p>
          </div>
          <button className="admin-btn admin-btn-secondary" onClick={logout}>
            <FiLogOut /> Déconnexion
          </button>
        </div>
      </div>
    </header>
  )
}

export default AdminNavbar


