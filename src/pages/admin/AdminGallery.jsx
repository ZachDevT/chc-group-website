import { useState } from 'react'
import { FiPlus, FiTrash2, FiCamera } from 'react-icons/fi'
import { useRealtimeCollection } from '../../hooks/useRealtimeCollection.js'
import { compressToBase64 } from '../../utils/imageTools.js'
import { createGalleryItem, deleteGalleryItem } from '../../services/contentService.js'

const galleryCategories = ['Projets', 'Événements', 'Formations', 'Équipe', 'Partenaires']

const emptyPhoto = {
  title: '',
  category: galleryCategories[0],
  image: '',
  description: ''
}

const AdminGallery = () => {
  const { data: gallery, loading } = useRealtimeCollection('gallery', { orderByField: 'createdAt' })
  const [formData, setFormData] = useState(emptyPhoto)
  const [preview, setPreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImage = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const { base64 } = await compressToBase64(file)
      setFormData((prev) => ({ ...prev, image: base64 }))
      setPreview(base64)
    } catch (error) {
      setToast({ type: 'error', message: error.message })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await createGalleryItem(formData)
      setToast({ type: 'success', message: 'Photo ajoutée.' })
      setFormData(emptyPhoto)
      setPreview('')
    } catch (error) {
      setToast({ type: 'error', message: error.message })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette image ?')) return
    await deleteGalleryItem(id)
    setToast({ type: 'success', message: 'Image supprimée.' })
  }

  return (
    <div className="admin-gallery">
      <div className="admin-card">
        <h3 className="admin-section-title">
          <FiPlus /> Ajouter une photo
        </h3>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label>Titre</label>
          <input name="title" className="admin-input" value={formData.title} onChange={handleChange} required />
          <label>Catégorie</label>
          <select name="category" className="admin-select" value={formData.category} onChange={handleChange}>
            {galleryCategories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <label>Description</label>
          <textarea name="description" className="admin-textarea" value={formData.description} onChange={handleChange} />
          <label>Image (compressée &lt; 1MB)</label>
          <div className="image-preview">{preview ? <img src={preview} alt="preview" /> : 'Aucune image'}</div>
          <label className="admin-btn admin-btn-secondary" style={{ justifyContent: 'center' }}>
            <FiCamera /> Importer une image
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImage} />
          </label>
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            {saving ? 'Ajout...' : 'Enregistrer'}
          </button>
        </form>
      </div>

      <div className="admin-card">
        <h3 className="admin-section-title">Photos publiées</h3>
        {loading ? (
          <div className="admin-empty-state">Chargement...</div>
        ) : gallery.length === 0 ? (
          <div className="admin-empty-state">Aucune photo pour l&apos;instant.</div>
        ) : (
          <div className="admin-grid">
            {gallery.map((photo) => (
              <div className="admin-card" key={photo.id}>
                {photo.image && <img src={photo.image} alt={photo.title} style={{ borderRadius: '20px', width: '100%', marginBottom: '12px' }} />}
                <h4>{photo.title}</h4>
                <p style={{ color: '#64748b' }}>{photo.category}</p>
                <button className="admin-btn admin-btn-secondary" onClick={() => handleDelete(photo.id)}>
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {toast && <div className="admin-toast">{toast.message}</div>}
    </div>
  )
}

export default AdminGallery


