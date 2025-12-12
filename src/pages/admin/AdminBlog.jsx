import { useMemo, useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import { FiPlus, FiTrash2, FiTag, FiImage, FiSave } from 'react-icons/fi'
import { useRealtimeCollection } from '../../hooks/useRealtimeCollection.js'
import { compressToBase64 } from '../../utils/imageTools.js'
import { createBlogPost, deleteBlogPost } from '../../services/contentService.js'
import { slugify } from '../../utils/slugify.js'
import 'react-quill/dist/quill.snow.css'

const AdminBlog = () => {
  const { data: posts, loading } = useRealtimeCollection('blogPosts', { orderByField: 'createdAt' })
  const { data: categories, loading: categoriesLoading } = useRealtimeCollection('categories', { orderByField: 'name' })
  const categoryNames = categories.map((cat) => cat.name)
  const defaultCategory = categoryNames.length > 0 ? categoryNames[0] : 'Actualités'

  const getEmptyForm = () => ({
    title: '',
    category: defaultCategory,
    excerpt: '',
    content: '',
    coverImage: '',
    authorName: '',
    status: 'published'
  })

  const [formData, setFormData] = useState(getEmptyForm())
  const [coverPreview, setCoverPreview] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [compressing, setCompressing] = useState(false)
  const [toast, setToast] = useState(null)

  const sortedPosts = useMemo(() => posts, [posts])

  // Update form category when categories load or change
  useEffect(() => {
    if (categoryNames.length > 0 && !categoryNames.includes(formData.category)) {
      setFormData((prev) => ({ ...prev, category: defaultCategory }))
    }
  }, [categoryNames, defaultCategory, formData.category])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCoverChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    // Vérifier la taille du fichier original
    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > 10) {
      setToast({ type: 'error', message: 'L\'image est trop grande. Veuillez sélectionner une image de moins de 10MB.' })
      return
    }

    setCompressing(true)
    setToast(null)
    
    try {
      const { base64, bytes } = await compressToBase64(file)
      const finalSizeMB = (bytes / (1024 * 1024)).toFixed(2)
      setFormData((prev) => ({ ...prev, coverImage: base64 }))
      setCoverPreview(base64)
      setToast({ 
        type: 'success', 
        message: `Image compressée avec succès (${finalSizeMB} MB).` 
      })
    } catch (error) {
      setToast({ 
        type: 'error', 
        message: error.message || 'Erreur lors de la compression de l\'image. Veuillez réessayer avec une autre image.' 
      })
      setCoverPreview('')
      setFormData((prev) => ({ ...prev, coverImage: '' }))
    } finally {
      setCompressing(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await createBlogPost({
        ...formData,
        slug: slugify(formData.title),
        category: formData.category || defaultCategory
      })
      setToast({ type: 'success', message: 'Article enregistré avec succès.' })
      setFormData(getEmptyForm())
      setCoverPreview('')
      setShowModal(false)
    } catch (error) {
      setToast({ type: 'error', message: error.message })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet article ?')) return
    await deleteBlogPost(id)
    setToast({ type: 'success', message: 'Article supprimé.' })
  }

  return (
    <div className="admin-blog">
      <div className="admin-actions">
        <button className="admin-btn admin-btn-primary" onClick={() => setShowModal(true)}>
          <FiPlus /> Nouvel article
        </button>
      </div>

      <div className="admin-card">
        <h3 className="admin-section-title">
          <FiTag /> Articles publiés
        </h3>
        {loading ? (
          <div className="admin-empty-state">Chargement des articles...</div>
        ) : posts.length === 0 ? (
          <div className="admin-empty-state">Aucun article pour le moment.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Catégorie</th>
                <th>Auteur</th>
                <th>Statut</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sortedPosts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.category}</td>
                  <td>{post.authorName}</td>
                  <td>
                    <span className={`status-pill ${post.status === 'draft' ? 'draft' : 'success'}`}>
                      {post.status === 'draft' ? 'Brouillon' : 'Publié'}
                    </span>
                  </td>
                  <td>
                    <button className="admin-btn admin-btn-secondary" onClick={() => handleDelete(post.id)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <button className="admin-modal-close" onClick={() => setShowModal(false)}>
              ×
            </button>
            <h3 className="admin-section-title">
              <FiPlus /> Ajouter un article
            </h3>
            <form className="admin-form" onSubmit={handleSubmit}>
              <label htmlFor="title">Titre</label>
              <input id="title" name="title" className="admin-input" value={formData.title} onChange={handleInputChange} required />

              <label>Catégorie</label>
              {categoriesLoading ? (
                <div style={{ padding: '12px', color: '#64748b' }}>Chargement des catégories...</div>
              ) : categoryNames.length === 0 ? (
                <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', color: '#dc2626' }}>
                  Aucune catégorie disponible. Veuillez en ajouter dans l&apos;onglet Catégories.
                </div>
              ) : (
                <select name="category" className="admin-select" value={formData.category} onChange={handleInputChange} required>
                  {categoryNames.map((categoryName) => (
                    <option key={categoryName} value={categoryName}>
                      {categoryName}
                    </option>
                  ))}
                </select>
              )}
              {categoryNames.length > 0 && (
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '-8px' }}>
                  Gérer les catégories dans l&apos;onglet <strong>Catégories</strong>
                </p>
              )}

              <label htmlFor="excerpt">Extrait</label>
              <textarea id="excerpt" name="excerpt" className="admin-textarea" value={formData.excerpt} onChange={handleInputChange} required />

              <label>Contenu</label>
              <ReactQuill theme="snow" value={formData.content} onChange={(content) => setFormData((prev) => ({ ...prev, content }))} />

              <label>Image de couverture</label>
              <div className="image-preview">
                {coverPreview ? (
                  <img src={coverPreview} alt="Prévisualisation" />
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
                <FiImage /> {compressing ? 'Compression...' : 'Importer une image (sera compressée automatiquement)'}
                <input 
                  type="file" 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                  onChange={handleCoverChange}
                  disabled={compressing}
                />
              </label>
              {coverPreview && (
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '-8px' }}>
                  L'image sera automatiquement compressée pour être sous 1MB.
                </p>
              )}

              <label htmlFor="authorName">Auteur</label>
              <input id="authorName" name="authorName" className="admin-input" value={formData.authorName} onChange={handleInputChange} required />

              <label>Statut</label>
              <select name="status" className="admin-select" value={formData.status} onChange={handleInputChange}>
                <option value="published">Publié</option>
                <option value="draft">Brouillon</option>
              </select>

              <button type="submit" className="admin-btn admin-btn-primary">
                <FiSave /> {saving ? 'Publication...' : 'Publier'}
              </button>
            </form>
          </div>
        </div>
      )}

      {toast && (
        <div className="admin-toast" role="status">
          {toast.message}
        </div>
      )}
    </div>
  )
}

export default AdminBlog


