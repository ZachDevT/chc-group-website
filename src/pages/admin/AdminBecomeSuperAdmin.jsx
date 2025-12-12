import { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'

const AdminBecomeSuperAdmin = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const handleMakeSuperAdmin = async () => {
    if (!user) {
      setError('Vous devez être connecté.')
      return
    }

    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      const userRoleRef = doc(db, 'userRoles', user.uid)
      
      await setDoc(userRoleRef, {
        role: 'super-admin',
        name: 'Zachsoft',
        email: user.email || 'zachdev10000@gmail.com',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge: true })

      setMessage('✅ Votre rôle a été défini comme Super Admin!')
      setMessage('🔄 Vous allez être déconnecté. Reconnectez-vous pour voir les changements.')
      
      // Log out after 2 seconds
      setTimeout(() => {
        logout()
        navigate('/admin/login')
      }, 2000)
    } catch (err) {
      setError('Erreur: ' + err.message)
      console.error('Error setting super admin:', err)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="admin-card" style={{ maxWidth: '600px', margin: '40px auto' }}>
        <h3 className="admin-section-title">Accès refusé</h3>
        <p>Vous devez être connecté pour accéder à cette page.</p>
        <button className="admin-btn admin-btn-primary" onClick={() => navigate('/admin/login')}>
          Se connecter
        </button>
      </div>
    )
  }

  return (
    <div className="admin-card" style={{ maxWidth: '600px', margin: '40px auto' }}>
      <h3 className="admin-section-title">Devenir Super Admin</h3>
      
      <div style={{ marginBottom: '24px' }}>
        <p><strong>Utilisateur actuel:</strong></p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0' }}>
          <li>📧 Email: {user.email}</li>
          <li>🆔 UID: {user.uid}</li>
        </ul>
      </div>

      {message && (
        <div style={{ 
          padding: '16px', 
          background: 'rgba(15, 144, 136, 0.1)', 
          borderRadius: '12px', 
          marginBottom: '20px',
          color: '#0f9088'
        }}>
          {message}
        </div>
      )}

      {error && (
        <div style={{ 
          padding: '16px', 
          background: 'rgba(239, 68, 68, 0.1)', 
          borderRadius: '12px', 
          marginBottom: '20px',
          color: '#dc2626'
        }}>
          {error}
        </div>
      )}

      <div style={{ 
        padding: '16px', 
        background: 'rgba(15, 23, 42, 0.05)', 
        borderRadius: '12px', 
        marginBottom: '24px',
        fontSize: '0.9rem'
      }}>
        <p><strong>⚠️ Attention:</strong></p>
        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
          <li>Cette action définira votre rôle comme "Super Admin"</li>
          <li>Vous serez déconnecté automatiquement</li>
          <li>Vous devrez vous reconnecter pour voir les changements</li>
          <li>Après reconnexion, vous verrez l'onglet "Utilisateurs" dans le menu</li>
        </ul>
      </div>

      <button
        className="admin-btn admin-btn-primary"
        onClick={handleMakeSuperAdmin}
        disabled={loading}
        style={{ width: '100%' }}
      >
        {loading ? 'Traitement...' : 'Devenir Super Admin'}
      </button>
    </div>
  )
}

export default AdminBecomeSuperAdmin






