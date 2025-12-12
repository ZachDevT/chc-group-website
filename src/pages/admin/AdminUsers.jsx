import { useState } from 'react'
import { FiPlus, FiTrash2, FiUser, FiShield } from 'react-icons/fi'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { useRealtimeCollection } from '../../hooks/useRealtimeCollection.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { compressToBase64 } from '../../utils/imageTools.js'
import { createAuthor, deleteAuthor, createUserRole, deleteUserRole } from '../../services/contentService.js'

const emptyAuthor = {
  name: '',
  role: 'editor',
  email: '',
  password: '',
  avatar: ''
}

const AdminUsers = () => {
  const { userRole } = useAuth()
  const { data: authors, loading } = useRealtimeCollection('authors', { orderByField: 'createdAt' })
  const { data: userRoles, loading: rolesLoading } = useRealtimeCollection('userRoles', { orderByField: 'createdAt' })
  const [formData, setFormData] = useState(emptyAuthor)
  const [preview, setPreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)
  
  const isSuperAdmin = userRole === 'super-admin'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvatar = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const { base64 } = await compressToBase64(file, { maxSizeMB: 0.4 })
      setFormData((prev) => ({ ...prev, avatar: base64 }))
      setPreview(base64)
    } catch (error) {
      setToast({ type: 'error', message: error.message })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isSuperAdmin) {
      setToast({ type: 'error', message: 'Seuls les super-admins peuvent créer des utilisateurs.' })
      return
    }
    
    setSaving(true)
    try {
      // Create Firebase Auth user (this will sign out current user temporarily)
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      const newUser = userCredential.user
      
      // Create userRoles document
      await createUserRole(newUser.uid, {
        name: formData.name,
        email: formData.email,
        role: formData.role || 'editor',
        avatar: formData.avatar || null
      })
      
      // Create authors document
      await createAuthor({
        name: formData.name,
        email: formData.email,
        role: formData.role || 'Editor',
        avatar: formData.avatar || null
      })
      
      setToast({ 
        type: 'success', 
        message: 'Utilisateur créé avec succès. Vous devez vous reconnecter.' 
      })
      setFormData(emptyAuthor)
      setPreview('')
      
      // Redirect to login after a short delay
      setTimeout(() => {
        window.location.href = '/admin/login'
      }, 2000)
    } catch (error) {
      setToast({ type: 'error', message: error.message || 'Erreur lors de la création de l\'utilisateur.' })
      setSaving(false)
    }
  }

  const handleDelete = async (id, isUserRole = false) => {
    if (!window.confirm(isUserRole ? 'Supprimer ce rôle ? (L\'utilisateur Auth doit être supprimé manuellement dans Firebase Console)' : 'Supprimer cet auteur ?')) return
    try {
      if (isUserRole) {
        await deleteUserRole(id)
        setToast({ type: 'success', message: 'Rôle supprimé. Pensez à supprimer l\'utilisateur Auth dans Firebase Console.' })
      } else {
        await deleteAuthor(id)
        setToast({ type: 'success', message: 'Auteur supprimé.' })
      }
    } catch (error) {
      setToast({ type: 'error', message: error.message })
    }
  }

  return (
    <div className="admin-users">
      <div className="admin-card">
        <h3 className="admin-section-title">
          <FiPlus /> Nouvel utilisateur du blog
        </h3>
        {!isSuperAdmin ? (
          <div className="admin-empty-state">
            <FiShield /> Seuls les super-admins peuvent créer des utilisateurs.
          </div>
        ) : (
          <form className="admin-form" onSubmit={handleSubmit}>
            <label>Nom complet</label>
            <input name="name" className="admin-input" value={formData.name} onChange={handleChange} required />
            <label>Email</label>
            <input name="email" type="email" className="admin-input" value={formData.email} onChange={handleChange} required />
            <label>Mot de passe</label>
            <input name="password" type="password" className="admin-input" value={formData.password} onChange={handleChange} required minLength={6} />
            <label>Rôle</label>
            <select name="role" className="admin-select" value={formData.role} onChange={handleChange} required>
              <option value="editor">Éditeur</option>
              <option value="super-admin">Super Admin</option>
            </select>
            <label>Avatar (optionnel)</label>
            <div className="image-preview">{preview ? <img src={preview} alt="avatar" /> : <FiUser size={32} />}</div>
            <label className="admin-btn admin-btn-secondary" style={{ justifyContent: 'center' }}>
              Importer un avatar
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatar} />
            </label>
            <div style={{ padding: '12px', background: 'rgba(15, 144, 136, 0.1)', borderRadius: '12px', fontSize: '0.9rem', color: '#475569' }}>
              ⚠️ La création d&apos;un utilisateur vous déconnectera temporairement. Vous devrez vous reconnecter.
            </div>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
              {saving ? 'Création...' : 'Créer l\'utilisateur'}
            </button>
          </form>
        )}
      </div>

      <div className="admin-card">
        <h3 className="admin-section-title">Utilisateurs authentifiés</h3>
        {rolesLoading ? (
          <div className="admin-empty-state">Chargement...</div>
        ) : userRoles.length === 0 ? (
          <div className="admin-empty-state">Aucun utilisateur authentifié.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Nom</th>
                <th>Rôle</th>
                <th>Email</th>
                {isSuperAdmin && <th></th>}
              </tr>
            </thead>
            <tbody>
              {userRoles.map((userRole) => (
                <tr key={userRole.id}>
                  <td>{userRole.avatar ? <img src={userRole.avatar} alt={userRole.name} style={{ width: '48px', borderRadius: '50%' }} /> : <FiUser />}</td>
                  <td>{userRole.name}</td>
                  <td>
                    <span className={`status-pill ${userRole.role === 'super-admin' ? 'success' : 'draft'}`}>
                      {userRole.role === 'super-admin' ? 'Super Admin' : 'Éditeur'}
                    </span>
                  </td>
                  <td>{userRole.email}</td>
                  {isSuperAdmin && (
                    <td>
                      <button 
                        className="admin-btn admin-btn-secondary" 
                        onClick={() => handleDelete(userRole.id, true)}
                        title="Supprimer le rôle (l'utilisateur Auth doit être supprimé manuellement)"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      <div className="admin-card">
        <h3 className="admin-section-title">Auteurs du blog (références)</h3>
        {loading ? (
          <div className="admin-empty-state">Chargement...</div>
        ) : authors.length === 0 ? (
          <div className="admin-empty-state">Aucun auteur enregistré.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Nom</th>
                <th>Rôle</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author) => (
                <tr key={author.id}>
                  <td>{author.avatar ? <img src={author.avatar} alt={author.name} style={{ width: '48px', borderRadius: '50%' }} /> : <FiUser />}</td>
                  <td>{author.name}</td>
                  <td>{author.role}</td>
                  <td>{author.email}</td>
                  <td>
                    <button className="admin-btn admin-btn-secondary" onClick={() => handleDelete(author.id)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {toast && <div className="admin-toast">{toast.message}</div>}
    </div>
  )
}

export default AdminUsers


