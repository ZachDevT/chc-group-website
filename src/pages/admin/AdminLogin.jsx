import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { FiLock, FiMail, FiLogIn } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext.jsx'
import './Admin.css'

const AdminLogin = () => {
  const { user, login, authError } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(null)

  if (user) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setFeedback(null)
    try {
      await login(email, password)
      setFeedback({ type: 'success', message: 'Connexion réussie.' })
    } catch (error) {
      setFeedback({ type: 'error', message: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg, #0f9088, #0fb3a7)' }}>
      <div className="admin-card" style={{ width: 'min(420px, 90vw)' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="admin-brand-logo" style={{ margin: '0 auto 12px' }}>
            <FiLock />
          </div>
          <h1>Accès Admin</h1>
          <p style={{ color: '#64748b' }}>Veuillez vous connecter pour accéder à l'espace d'administration</p>
        </div>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email professionnel</label>
          <div className="admin-input" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiMail />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@chc-group.org"
              required
              style={{ border: 'none', outline: 'none', flex: 1, background: 'transparent' }}
            />
          </div>
          <label htmlFor="password">Mot de passe</label>
          <div className="admin-input" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiLock />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              style={{ border: 'none', outline: 'none', flex: 1, background: 'transparent' }}
            />
          </div>
          {(feedback || authError) && (
            <div className="status-pill" style={{ width: '100%', textAlign: 'center' }}>
              {feedback?.message || authError?.message}
            </div>
          )}
          <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
            <FiLogIn /> {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin


