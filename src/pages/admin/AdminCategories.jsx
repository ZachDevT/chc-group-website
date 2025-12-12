import { useState } from 'react'
import { FiPlus, FiTrash2, FiTag, FiUpload, FiX } from 'react-icons/fi'
import { useRealtimeCollection } from '../../hooks/useRealtimeCollection.js'
import { collection, addDoc, deleteDoc, doc, serverTimestamp, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'

const AdminCategories = () => {
  const { data: categories, loading } = useRealtimeCollection('categories', { orderByField: 'name' })
  const [newCategory, setNewCategory] = useState('')
  const [bulkText, setBulkText] = useState('')
  const [showBulkImport, setShowBulkImport] = useState(false)
  const [saving, setSaving] = useState(false)
  const [bulkImporting, setBulkImporting] = useState(false)
  const [toast, setToast] = useState(null)

  const handleAddCategory = async (e) => {
    e.preventDefault()
    if (!newCategory.trim()) return

    setSaving(true)
    try {
      await addDoc(collection(db, 'categories'), {
        name: newCategory.trim(),
        createdAt: serverTimestamp()
      })
      setNewCategory('')
      setToast({ type: 'success', message: 'Catégorie ajoutée avec succès.' })
    } catch (error) {
      setToast({ type: 'error', message: error.message || 'Erreur lors de l\'ajout de la catégorie.' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette catégorie ? Les articles utilisant cette catégorie ne seront pas affectés.')) return
    try {
      await deleteDoc(doc(db, 'categories', id))
      setToast({ type: 'success', message: 'Catégorie supprimée.' })
    } catch (error) {
      setToast({ type: 'error', message: error.message })
    }
  }

  const categoryExists = async (categoryName) => {
    try {
      const categoriesRef = collection(db, 'categories')
      const q = query(categoriesRef, where('name', '==', categoryName.trim()))
      const snapshot = await getDocs(q)
      return !snapshot.empty
    } catch (error) {
      console.error('Error checking category:', error)
      return false
    }
  }

  const handleBulkImport = async (e) => {
    e.preventDefault()
    if (!bulkText.trim()) return

    setBulkImporting(true)
    const categoriesRef = collection(db, 'categories')
    
    // Parse categories from text (one per line)
    const categoryNames = bulkText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates in input

    if (categoryNames.length === 0) {
      setToast({ type: 'error', message: 'Aucune catégorie valide trouvée.' })
      setBulkImporting(false)
      return
    }

    let successCount = 0
    let skippedCount = 0
    let errorCount = 0

    try {
      for (const categoryName of categoryNames) {
        try {
          // Check if category already exists
          const exists = await categoryExists(categoryName)
          
          if (exists) {
            skippedCount++
            continue
          }

          // Add new category
          await addDoc(categoriesRef, {
            name: categoryName,
            createdAt: serverTimestamp()
          })
          successCount++
        } catch (error) {
          errorCount++
          console.error(`Error adding "${categoryName}":`, error)
        }
      }

      // Show summary
      let message = `Import terminé: ${successCount} ajoutées`
      if (skippedCount > 0) {
        message += `, ${skippedCount} déjà existantes`
      }
      if (errorCount > 0) {
        message += `, ${errorCount} erreurs`
      }
      
      setToast({ type: 'success', message })
      setBulkText('')
      setShowBulkImport(false)
    } catch (error) {
      setToast({ type: 'error', message: error.message || 'Erreur lors de l\'import en masse.' })
    } finally {
      setBulkImporting(false)
    }
  }

  return (
    <div className="admin-categories">
      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 className="admin-section-title" style={{ marginBottom: 0 }}>
            <FiPlus /> Ajouter une catégorie
          </h3>
          <button
            className="admin-btn admin-btn-secondary"
            onClick={() => setShowBulkImport(!showBulkImport)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {showBulkImport ? <FiX /> : <FiUpload />}
            {showBulkImport ? 'Annuler' : 'Import en masse'}
          </button>
        </div>

        {!showBulkImport ? (
          <form className="admin-form" onSubmit={handleAddCategory} style={{ maxWidth: '400px' }}>
            <input
              type="text"
              className="admin-input"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Nom de la catégorie"
              required
            />
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving || !newCategory.trim()}>
              <FiPlus /> {saving ? 'Ajout...' : 'Ajouter'}
            </button>
          </form>
        ) : (
          <form className="admin-form" onSubmit={handleBulkImport}>
            <label>
              Collez les catégories (une par ligne):
            </label>
            <textarea
              className="admin-textarea"
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder="Actualités
Recherche
Projets
Formation
Développement
..."
              rows={15}
              style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}
            />
            <div style={{ padding: '12px', background: 'rgba(15, 144, 136, 0.1)', borderRadius: '12px', fontSize: '0.9rem', color: '#475569' }}>
              💡 <strong>Astuce:</strong> Collez une catégorie par ligne. Les doublons seront automatiquement ignorés.
            </div>
            <button
              type="submit"
              className="admin-btn admin-btn-primary"
              disabled={bulkImporting || !bulkText.trim()}
              style={{ width: '100%' }}
            >
              <FiUpload /> {bulkImporting ? 'Import en cours...' : `Importer ${bulkText.split('\n').filter(l => l.trim()).length} catégorie(s)`}
            </button>
          </form>
        )}
      </div>

      <div className="admin-card">
        <h3 className="admin-section-title">
          <FiTag /> Catégories disponibles ({categories.length})
        </h3>
        {loading ? (
          <div className="admin-empty-state">Chargement...</div>
        ) : categories.length === 0 ? (
          <div className="admin-empty-state">Aucune catégorie. Ajoutez-en une pour commencer.</div>
        ) : (
          <div className="categories-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
            {categories.map((category) => (
              <div
                key={category.id}
                className="category-chip"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: 'rgba(15, 144, 136, 0.1)',
                  borderRadius: '12px',
                  border: '1px solid rgba(15, 144, 136, 0.2)'
                }}
              >
                <span style={{ fontWeight: 500, color: '#0f172a' }}>{category.name}</span>
                <button
                  className="admin-btn admin-btn-secondary"
                  onClick={() => handleDelete(category.id)}
                  style={{ padding: '4px 8px', minWidth: 'auto' }}
                  title="Supprimer"
                >
                  <FiTrash2 size={14} />
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

export default AdminCategories

