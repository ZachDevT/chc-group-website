import { useState } from 'react'
import { FiPlus, FiTrash2, FiEdit2, FiUser } from 'react-icons/fi'
import { useRealtimeCollection } from '../../hooks/useRealtimeCollection.js'
import { compressToBase64 } from '../../utils/imageTools.js'
import { createTeamMember, updateTeamMember, deleteTeamMember } from '../../services/contentService.js'

const emptyMember = {
  name: '',
  role: '',
  title: '',
  description: '',
  image: ''
}

const AdminTeam = () => {
  const { data: teamMembers, loading } = useRealtimeCollection('team', { orderByField: 'createdAt' })
  const [formData, setFormData] = useState(emptyMember)
  const [imagePreview, setImagePreview] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [compressing, setCompressing] = useState(false)
  const [toast, setToast] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > 10) {
      setToast({ type: 'error', message: 'L\'image est trop grande. Veuillez sélectionner une image de moins de 10MB.' })
      return
    }

    setCompressing(true)
    setToast(null)

    try {
      const { base64 } = await compressToBase64(file)
      setFormData((prev) => ({ ...prev, image: base64 }))
      setImagePreview(base64)
      setToast({ type: 'success', message: 'Image compressée avec succès.' })
    } catch (error) {
      setToast({ type: 'error', message: error.message || 'Erreur lors de la compression de l\'image.' })
    } finally {
      setCompressing(false)
    }
  }

  const handleEdit = (member) => {
    setFormData({
      name: member.name || '',
      role: member.role || '',
      title: member.title || '',
      description: member.description || '',
      image: member.image || ''
    })
    setImagePreview(member.image || '')
    setEditingId(member.id)
  }

  const handleCancel = () => {
    setFormData(emptyMember)
    setImagePreview('')
    setEditingId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editingId) {
        await updateTeamMember(editingId, formData)
        setToast({ type: 'success', message: 'Membre de l\'équipe mis à jour.' })
      } else {
        await createTeamMember(formData)
        setToast({ type: 'success', message: 'Membre de l\'équipe ajouté.' })
      }
      setFormData(emptyMember)
      setImagePreview('')
      setEditingId(null)
    } catch (error) {
      setToast({ type: 'error', message: error.message })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce membre de l\'équipe ?')) return
    await deleteTeamMember(id)
    setToast({ type: 'success', message: 'Membre de l\'équipe supprimé.' })
  }

  return (
    <div className="admin-team">
      <div className="admin-card">
        <h3 className="admin-section-title">
          <FiPlus /> {editingId ? 'Modifier un membre' : 'Ajouter un membre de l\'équipe'}
        </h3>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Nom complet</label>
          <input 
            id="name"
            name="name" 
            className="admin-input" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            placeholder="Ex: Germain NYEMBO"
          />

          <label htmlFor="title">Titre/Profession</label>
          <input 
            id="title"
            name="title" 
            className="admin-input" 
            value={formData.title} 
            onChange={handleChange} 
            required 
            placeholder="Ex: Agri économiste"
          />

          <label htmlFor="role">Rôle dans l'équipe</label>
          <input 
            id="role"
            name="role" 
            className="admin-input" 
            value={formData.role} 
            onChange={handleChange} 
            required 
            placeholder="Ex: Directeur Général"
          />

          <label htmlFor="description">Description</label>
          <textarea 
            id="description"
            name="description" 
            className="admin-textarea" 
            value={formData.description} 
            onChange={handleChange}
            placeholder="Courte description du membre..."
            rows="3"
          />

          <label>Photo de profil</label>
          <div className="image-preview">
            {imagePreview ? (
              <img src={imagePreview} alt="Prévisualisation" />
            ) : compressing ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                <div style={{ marginBottom: '12px' }}>Compression en cours...</div>
                <div style={{ fontSize: '0.85rem' }}>Veuillez patienter</div>
              </div>
            ) : (
              <span>Aucune image sélectionnée</span>
            )}
          </div>
          <label 
            className="admin-btn admin-btn-secondary" 
            style={{ 
              justifyContent: 'center',
              opacity: compressing ? 0.6 : 1,
              cursor: compressing ? 'not-allowed' : 'pointer'
            }}
          >
            <FiUser /> {compressing ? 'Compression...' : 'Importer une photo (sera compressée automatiquement)'}
            <input 
              type="file" 
              accept="image/*" 
              style={{ display: 'none' }} 
              onChange={handleImageChange}
              disabled={compressing}
            />
          </label>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
              {saving ? 'Enregistrement...' : editingId ? 'Mettre à jour' : 'Enregistrer'}
            </button>
            {editingId && (
              <button type="button" className="admin-btn admin-btn-secondary" onClick={handleCancel}>
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-card">
        <h3 className="admin-section-title">Membres de l'équipe</h3>
        {loading ? (
          <div className="admin-empty-state">Chargement...</div>
        ) : teamMembers.length === 0 ? (
          <div className="admin-empty-state">
            Aucun membre enregistré. Les membres par défaut seront affichés sur le site.
          </div>
        ) : (
          <div className="admin-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {teamMembers.map((member) => (
              <div key={member.id} className="admin-card" style={{ padding: '20px' }}>
                <div style={{ marginBottom: '16px' }}>
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      style={{ 
                        width: '100%', 
                        height: '200px', 
                        objectFit: 'cover', 
                        borderRadius: '12px',
                        marginBottom: '12px'
                      }} 
                    />
                  ) : (
                    <div style={{ 
                      width: '100%', 
                      height: '200px', 
                      background: 'rgba(15, 23, 42, 0.05)', 
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '12px'
                    }}>
                      <FiUser size={48} color="#64748b" />
                    </div>
                  )}
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', fontWeight: 600 }}>
                    {member.name}
                  </h4>
                  <p style={{ margin: '0 0 4px 0', color: '#0f9088', fontWeight: 600, fontSize: '0.9rem' }}>
                    {member.title}
                  </p>
                  <p style={{ margin: '0 0 8px 0', color: '#64748b', fontSize: '0.85rem' }}>
                    {member.role}
                  </p>
                  {member.description && (
                    <p style={{ margin: '0', fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>
                      {member.description}
                    </p>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    className="admin-btn admin-btn-secondary" 
                    onClick={() => handleEdit(member)}
                    style={{ flex: 1 }}
                  >
                    <FiEdit2 /> Modifier
                  </button>
                  <button 
                    className="admin-btn admin-btn-secondary" 
                    onClick={() => handleDelete(member.id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {toast && (
        <div className="admin-toast" role="status">
          {toast.message}
        </div>
      )}
    </div>
  )
}

export default AdminTeam






