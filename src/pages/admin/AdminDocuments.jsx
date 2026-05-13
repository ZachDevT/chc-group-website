import { useState } from 'react'
import { FiPlus, FiTrash2, FiFile, FiUpload, FiLink, FiHardDrive } from 'react-icons/fi'
import { useRealtimeCollection } from '../../hooks/useRealtimeCollection.js'
import { createDocumentItem, deleteDocumentItem } from '../../services/contentService.js'

const documentCategories = ['Rapport', 'Publication', 'Formation', 'Autre']
const MAX_DIRECT_UPLOAD_BYTES = 700 * 1024
const DOCUMENT_UPLOAD_LIMIT_BYTES = 2 * 1024 * 1024

const emptyDoc = {
  title: '',
  category: documentCategories[0],
  sourceType: 'upload',
  fileDataUrl: '',
  fileName: '',
  fileType: '',
  fileSize: null,
  externalUrl: '',
  description: ''
}

const formatFileSize = (bytes) => {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

const AdminDocuments = () => {
  const { data: documents, loading } = useRealtimeCollection('documents', { orderByField: 'createdAt' })
  const [formData, setFormData] = useState(emptyDoc)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)
  const [fileInputKey, setFileInputKey] = useState(0)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSourceTypeChange = (sourceType) => {
    setFormData((prev) => ({
      ...prev,
      sourceType,
      ...(sourceType === 'link'
        ? { fileDataUrl: '', fileName: '', fileType: '', fileSize: null }
        : { externalUrl: '' })
    }))
    if (sourceType === 'link') {
      setFileInputKey((prev) => prev + 1)
    }
  }

  const handleFile = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > DOCUMENT_UPLOAD_LIMIT_BYTES) {
      setFormData((prev) => ({
        ...prev,
        sourceType: 'link',
        fileDataUrl: '',
        fileName: '',
        fileType: '',
        fileSize: null
      }))
      setToast({
        type: 'error',
        message:
          'Ce document dépasse 2 MB. Publiez-le sur Google Drive, rendez le lien accessible, puis collez le lien partagé.'
      })
      setFileInputKey((prev) => prev + 1)
      return
    }

    if (file.size > MAX_DIRECT_UPLOAD_BYTES) {
      setFormData((prev) => ({
        ...prev,
        sourceType: 'link',
        fileDataUrl: '',
        fileName: '',
        fileType: '',
        fileSize: null
      }))
      setToast({
        type: 'error',
        message:
          'Ce fichier est trop volumineux pour l’envoi direct de ce projet. Publiez-le sur Google Drive puis collez ici le lien partagé.'
      })
      setFileInputKey((prev) => prev + 1)
      return
    }

    const reader = new FileReader()
    reader.onload = (loadEvent) => {
      setFormData((prev) => ({
        ...prev,
        sourceType: 'upload',
        fileDataUrl: loadEvent.target?.result || '',
        fileName: file.name,
        fileType: file.type || 'application/octet-stream',
        fileSize: file.size
      }))
      setToast({
        type: 'success',
        message: `Fichier prêt: ${file.name} (${formatFileSize(file.size)}).`
      })
    }
    reader.readAsDataURL(file)
  }

  const resetForm = () => {
    setFormData(emptyDoc)
    setFileInputKey((prev) => prev + 1)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (formData.sourceType === 'upload' && !formData.fileDataUrl) {
      setToast({ type: 'error', message: 'Veuillez sélectionner un fichier à envoyer.' })
      return
    }

    if (formData.sourceType === 'link' && !formData.externalUrl.trim()) {
      setToast({ type: 'error', message: 'Veuillez coller le lien partagé du document.' })
      return
    }

    setSaving(true)
    try {
      await createDocumentItem(formData)
      setToast({ type: 'success', message: 'Document enregistré avec succès.' })
      resetForm()
    } catch (error) {
      setToast({ type: 'error', message: error.message })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (documentItem) => {
    if (!window.confirm('Supprimer ce document ?')) return

    try {
      await deleteDocumentItem(documentItem.id, documentItem)
      setToast({ type: 'success', message: 'Document supprimé.' })
    } catch (error) {
      setToast({ type: 'error', message: error.message })
    }
  }

  return (
    <div className="admin-gallery">
      <div className="admin-card">
        <h3 className="admin-section-title">
          <FiPlus /> Ajouter un document
        </h3>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label htmlFor="document-title">Titre du document</label>
          <input
            id="document-title"
            name="title"
            className="admin-input"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="document-category">Catégorie</label>
          <select
            id="document-category"
            name="category"
            className="admin-select"
            value={formData.category}
            onChange={handleChange}
          >
            {documentCategories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <label>Mode de partage</label>
          <div className="admin-choice-grid">
            <button
              type="button"
              className={`admin-choice-card ${formData.sourceType === 'upload' ? 'active' : ''}`}
              onClick={() => handleSourceTypeChange('upload')}
            >
              <FiHardDrive />
              <span>Uploader un fichier</span>
              <small>Fichiers jusqu&apos;à 2 MB</small>
            </button>
            <button
              type="button"
              className={`admin-choice-card ${formData.sourceType === 'link' ? 'active' : ''}`}
              onClick={() => handleSourceTypeChange('link')}
            >
              <FiLink />
              <span>Partager un lien</span>
              <small>Idéal pour Google Drive</small>
            </button>
          </div>

          <label htmlFor="document-description">Description</label>
          <textarea
            id="document-description"
            name="description"
            className="admin-textarea"
            value={formData.description}
            onChange={handleChange}
          />

          {formData.sourceType === 'upload' ? (
            <>
              <label>Fichier (PDF, Doc, etc. jusqu&apos;à 2 MB)</label>
              <div className="file-upload-container">
                <label className="admin-btn admin-btn-secondary" style={{ justifyContent: 'center', width: '100%' }}>
                  <FiUpload /> {formData.fileName || 'Choisir un fichier'}
                  <input
                    key={fileInputKey}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFile}
                  />
                </label>
                <p className="admin-helper-text">
                  Les petits fichiers peuvent être envoyés directement. Pour les documents plus lourds, surtout au-delà de 2 MB, utilisez un lien Google Drive.
                </p>
                {!!formData.fileDataUrl && (
                  <div className="admin-upload-summary">
                    <strong>{formData.fileName}</strong>
                    <span>{formatFileSize(formData.fileSize)}</span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <label htmlFor="document-link">Lien partagé du document</label>
              <input
                id="document-link"
                name="externalUrl"
                type="url"
                className="admin-input"
                placeholder="https://drive.google.com/..."
                value={formData.externalUrl}
                onChange={handleChange}
                required={formData.sourceType === 'link'}
              />
              <p className="admin-helper-text">
                Rendez le lien accessible au public ou à vos destinataires avant de l&apos;enregistrer.
              </p>
            </>
          )}

          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving} style={{ marginTop: '20px' }}>
            {saving ? 'Enregistrement...' : 'Enregistrer le document'}
          </button>
        </form>
      </div>

      <div className="admin-card">
        <h3 className="admin-section-title">Documents publiés</h3>
        {loading ? (
          <div className="admin-empty-state">Chargement...</div>
        ) : documents.length === 0 ? (
          <div className="admin-empty-state">Aucun document pour l&apos;instant.</div>
        ) : (
          <div className="admin-grid">
            {documents.map((documentItem) => (
              <div className="admin-card" key={documentItem.id}>
                <div style={{ fontSize: '2rem', marginBottom: '12px', color: 'var(--accent-color)' }}>
                  <FiFile />
                </div>
                <h4>{documentItem.title}</h4>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{documentItem.category}</p>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '4px 0' }}>
                  {documentItem.fileName || (documentItem.sourceType === 'link' ? 'Lien partagé' : 'Fichier')}
                </p>
                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 4px' }}>
                  {documentItem.sourceType === 'link'
                    ? 'Source: lien externe'
                    : `Source: upload${documentItem.fileSize ? ` • ${formatFileSize(documentItem.fileSize)}` : ''}`}
                </p>
                <button
                  className="admin-btn admin-btn-secondary"
                  onClick={() => handleDelete(documentItem)}
                  style={{ marginTop: '12px' }}
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {toast && (
        <div className={`admin-toast ${toast.type === 'error' ? 'error' : ''}`} onClick={() => setToast(null)}>
          {toast.message}
        </div>
      )}
    </div>
  )
}

export default AdminDocuments
