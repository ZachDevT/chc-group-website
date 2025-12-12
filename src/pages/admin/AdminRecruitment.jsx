import { useState } from 'react'
import { FiPlus, FiTrash2, FiEdit2, FiBriefcase, FiCalendar, FiMapPin, FiDollarSign, FiClock } from 'react-icons/fi'
import { useRealtimeCollection } from '../../hooks/useRealtimeCollection.js'
import { createJobOffer, updateJobOffer, deleteJobOffer } from '../../services/contentService.js'

const emptyJobOffer = {
  title: '',
  department: '',
  location: '',
  type: 'Temps plein', // Temps plein, Temps partiel, Stage, CDD, CDI
  salary: '',
  description: '',
  requirements: '',
  responsibilities: '',
  benefits: '',
  applicationDeadline: '',
  contactEmail: '',
  status: 'active' // active, closed
}

const AdminRecruitment = () => {
  const { data: jobOffers, loading } = useRealtimeCollection('jobOffers', { orderByField: 'createdAt' })
  const [formData, setFormData] = useState(emptyJobOffer)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEdit = (job) => {
    setFormData({
      title: job.title || '',
      department: job.department || '',
      location: job.location || '',
      type: job.type || 'Temps plein',
      salary: job.salary || '',
      description: job.description || '',
      requirements: job.requirements || '',
      responsibilities: job.responsibilities || '',
      benefits: job.benefits || '',
      applicationDeadline: job.applicationDeadline || '',
      contactEmail: job.contactEmail || '',
      status: job.status || 'active'
    })
    setEditingId(job.id)
  }

  const handleCancel = () => {
    setFormData(emptyJobOffer)
    setEditingId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editingId) {
        await updateJobOffer(editingId, formData)
        setToast({ type: 'success', message: 'Offre mise à jour avec succès.' })
      } else {
        await createJobOffer(formData)
        setToast({ type: 'success', message: 'Offre créée avec succès.' })
      }
      setFormData(emptyJobOffer)
      setEditingId(null)
    } catch (error) {
      setToast({ type: 'error', message: error.message || 'Erreur lors de l\'enregistrement.' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette offre d\'emploi ?')) return
    try {
      await deleteJobOffer(id)
      setToast({ type: 'success', message: 'Offre supprimée.' })
    } catch (error) {
      setToast({ type: 'error', message: error.message })
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    } catch {
      return dateString
    }
  }

  return (
    <div className="admin-recruitment">
      <div className="admin-card">
        <h3 className="admin-section-title">
          <FiPlus /> {editingId ? 'Modifier l\'offre' : 'Créer une nouvelle offre d\'emploi'}
        </h3>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Titre du poste *</label>
              <input 
                name="title" 
                className="admin-input" 
                value={formData.title} 
                onChange={handleChange} 
                required 
                placeholder="Ex: Développeur Full Stack"
              />
            </div>
            <div className="admin-form-group">
              <label>Département *</label>
              <input 
                name="department" 
                className="admin-input" 
                value={formData.department} 
                onChange={handleChange} 
                required 
                placeholder="Ex: Technologies"
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Localisation *</label>
              <input 
                name="location" 
                className="admin-input" 
                value={formData.location} 
                onChange={handleChange} 
                required 
                placeholder="Ex: Kinshasa, RD. Congo"
              />
            </div>
            <div className="admin-form-group">
              <label>Type de contrat *</label>
              <select 
                name="type" 
                className="admin-input" 
                value={formData.type} 
                onChange={handleChange} 
                required
              >
                <option value="Temps plein">Temps plein</option>
                <option value="Temps partiel">Temps partiel</option>
                <option value="Stage">Stage</option>
                <option value="CDD">CDD</option>
                <option value="CDI">CDI</option>
              </select>
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Salaire</label>
              <input 
                name="salary" 
                className="admin-input" 
                value={formData.salary} 
                onChange={handleChange} 
                placeholder="Ex: À négocier ou 1000-2000 USD"
              />
            </div>
            <div className="admin-form-group">
              <label>Date limite de candidature</label>
              <input 
                type="date"
                name="applicationDeadline" 
                className="admin-input" 
                value={formData.applicationDeadline} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Email de contact *</label>
              <input 
                type="email"
                name="contactEmail" 
                className="admin-input" 
                value={formData.contactEmail} 
                onChange={handleChange} 
                required 
                placeholder="recrutement@chcgroup.cd"
              />
            </div>
            <div className="admin-form-group">
              <label>Statut</label>
              <select 
                name="status" 
                className="admin-input" 
                value={formData.status} 
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="closed">Fermée</option>
              </select>
            </div>
          </div>

          <label>Description du poste *</label>
          <textarea 
            name="description" 
            className="admin-textarea" 
            value={formData.description} 
            onChange={handleChange} 
            required
            rows="4"
            placeholder="Description générale du poste..."
          />

          <label>Responsabilités *</label>
          <textarea 
            name="responsibilities" 
            className="admin-textarea" 
            value={formData.responsibilities} 
            onChange={handleChange} 
            required
            rows="5"
            placeholder="Liste des responsabilités principales (une par ligne)..."
          />

          <label>Exigences / Qualifications *</label>
          <textarea 
            name="requirements" 
            className="admin-textarea" 
            value={formData.requirements} 
            onChange={handleChange} 
            required
            rows="5"
            placeholder="Liste des exigences et qualifications requises (une par ligne)..."
          />

          <label>Avantages</label>
          <textarea 
            name="benefits" 
            className="admin-textarea" 
            value={formData.benefits} 
            onChange={handleChange} 
            rows="4"
            placeholder="Liste des avantages offerts (une par ligne)..."
          />

          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
              {saving ? 'Enregistrement...' : editingId ? 'Mettre à jour' : 'Créer l\'offre'}
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
        <h3 className="admin-section-title">Offres d'emploi publiées</h3>
        {loading ? (
          <div className="admin-empty-state">Chargement...</div>
        ) : jobOffers.length === 0 ? (
          <div className="admin-empty-state">Aucune offre d'emploi enregistrée.</div>
        ) : (
          <div className="admin-job-offers-list">
            {jobOffers.map((job) => (
              <div key={job.id} className={`admin-job-card ${job.status === 'closed' ? 'closed' : ''}`}>
                <div className="admin-job-header">
                  <div>
                    <h4 className="admin-job-title">{job.title}</h4>
                    <div className="admin-job-meta">
                      <span><FiBriefcase /> {job.department}</span>
                      <span><FiMapPin /> {job.location}</span>
                      <span><FiClock /> {job.type}</span>
                      {job.salary && <span><FiDollarSign /> {job.salary}</span>}
                      {job.applicationDeadline && (
                        <span><FiCalendar /> Échéance: {formatDate(job.applicationDeadline)}</span>
                      )}
                    </div>
                  </div>
                  <div className="admin-job-status">
                    <span className={`status-badge ${job.status}`}>
                      {job.status === 'active' ? 'Active' : 'Fermée'}
                    </span>
                  </div>
                </div>
                <div className="admin-job-actions">
                  <button 
                    className="admin-btn admin-btn-secondary" 
                    onClick={() => handleEdit(job)}
                  >
                    <FiEdit2 /> Modifier
                  </button>
                  <button 
                    className="admin-btn admin-btn-danger" 
                    onClick={() => handleDelete(job.id)}
                  >
                    <FiTrash2 /> Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {toast && (
        <div className={`admin-toast ${toast.type}`} onAnimationEnd={() => setToast(null)}>
          {toast.message}
        </div>
      )}
    </div>
  )
}

export default AdminRecruitment





