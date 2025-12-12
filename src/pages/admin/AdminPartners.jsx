import { useState } from 'react'
import { FiPlus, FiTrash2, FiExternalLink } from 'react-icons/fi'
import { useRealtimeCollection } from '../../hooks/useRealtimeCollection.js'
import { compressToBase64 } from '../../utils/imageTools.js'
import { createPartner, deletePartner } from '../../services/contentService.js'

const emptyPartner = {
  name: '',
  website: '',
  description: '',
  logo: ''
}

const AdminPartners = () => {
  const { data: partners, loading } = useRealtimeCollection('partners', { orderByField: 'createdAt' })
  const [formData, setFormData] = useState(emptyPartner)
  const [logoPreview, setLogoPreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogoChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const { base64 } = await compressToBase64(file, { maxSizeMB: 0.5 })
      setFormData((prev) => ({ ...prev, logo: base64 }))
      setLogoPreview(base64)
    } catch (error) {
      setToast({ type: 'error', message: error.message })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await createPartner(formData)
      setToast({ type: 'success', message: 'Partenaire ajouté.' })
      setFormData(emptyPartner)
      setLogoPreview('')
    } catch (error) {
      setToast({ type: 'error', message: error.message })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce partenaire ?')) return
    await deletePartner(id)
    setToast({ type: 'success', message: 'Partenaire supprimé.' })
  }

  return (
    <div className="admin-partners">
      <div className="admin-card">
        <h3 className="admin-section-title">
          <FiPlus /> Ajouter un partenaire
        </h3>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label>Nom</label>
          <input name="name" className="admin-input" value={formData.name} onChange={handleChange} required />
          <label>Site web</label>
          <input name="website" className="admin-input" value={formData.website} onChange={handleChange} placeholder="https://..." />
          <label>Description</label>
          <textarea name="description" className="admin-textarea" value={formData.description} onChange={handleChange} />
          <label>Logo (base64 &lt; 1MB)</label>
          <div className="image-preview">{logoPreview ? <img src={logoPreview} alt="logo" /> : 'Pas de logo'}</div>
          <label className="admin-btn admin-btn-secondary" style={{ justifyContent: 'center' }}>
            Importer un logo
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleLogoChange} />
          </label>
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            {saving ? 'Ajout...' : 'Enregistrer'}
          </button>
        </form>
      </div>

      <div className="admin-card">
        <h3 className="admin-section-title">Partenaires répertoriés</h3>
        {loading ? (
          <div className="admin-empty-state">Chargement...</div>
        ) : partners.length === 0 ? (
          <div className="admin-empty-state">Aucun partenaire enregistré.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Logo</th>
                <th>Nom</th>
                <th>Site</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {partners.map((partner) => (
                <tr key={partner.id}>
                  <td>{partner.logo ? <img src={partner.logo} alt={partner.name} style={{ width: '80px' }} /> : '—'}</td>
                  <td>{partner.name}</td>
                  <td>
                    {partner.website && (
                      <a href={partner.website} target="_blank" rel="noreferrer">
                        <FiExternalLink />
                      </a>
                    )}
                  </td>
                  <td>
                    <button className="admin-btn admin-btn-secondary" onClick={() => handleDelete(partner.id)}>
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

export default AdminPartners


