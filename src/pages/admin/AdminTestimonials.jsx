import { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiCheck } from 'react-icons/fi'
import '../admin/Admin.css'

const AdminTestimonials = () => {
    const [testimonials, setTestimonials] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [editingId, setEditingId] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        content: '',
        order: 0
    })

    useEffect(() => {
        fetchTestimonials()
    }, [])

    const fetchTestimonials = async () => {
        try {
            setLoading(true)
            const q = query(collection(db, 'testimonials'), orderBy('order', 'asc'))
            const querySnapshot = await getDocs(q)
            const testimonialsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setTestimonials(testimonialsData)
            setError('')
        } catch (err) {
            console.error('Error fetching testimonials:', err)
            setError('Erreur lors du chargement des témoignages. Vérifiez vos permissions.')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setError('')
        setSuccessMsg('')

        try {
            const testimonialData = {
                name: formData.name,
                role: formData.role,
                content: formData.content,
                order: parseInt(formData.order) || 0,
                updatedAt: serverTimestamp()
            }

            if (editingId) {
                await updateDoc(doc(db, 'testimonials', editingId), testimonialData)
                setSuccessMsg('Témoignage mis à jour avec succès')
            } else {
                await addDoc(collection(db, 'testimonials'), {
                    ...testimonialData,
                    createdAt: serverTimestamp()
                })
                setSuccessMsg('Témoignage créé avec succès')
            }

            resetForm()
            fetchTestimonials()

            // Clear success message after 3 seconds
            setTimeout(() => setSuccessMsg(''), 3000)
        } catch (err) {
            console.error('Error saving testimonial:', err)
            setError('Erreur lors de l\'enregistrement du témoignage')
        } finally {
            setSubmitting(false)
        }
    }

    const handleEdit = (testimonial) => {
        setFormData({
            name: testimonial.name,
            role: testimonial.role,
            content: testimonial.content,
            order: testimonial.order || 0
        })
        setEditingId(testimonial.id)
        setShowForm(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce témoignage?')) return

        try {
            await deleteDoc(doc(db, 'testimonials', id))
            setSuccessMsg('Témoignage supprimé')
            fetchTestimonials()
            setTimeout(() => setSuccessMsg(''), 3000)
        } catch (err) {
            console.error('Error deleting testimonial:', err)
            setError('Erreur lors de la suppression du témoignage')
        }
    }

    const resetForm = () => {
        setFormData({
            name: '',
            role: '',
            content: '',
            order: 0
        })
        setEditingId(null)
        setShowForm(false)
    }

    return (
        <div className="admin-page">
            <div className="admin-header">
                <div>
                    <h1>Gestion des Témoignages</h1>
                    <p className="subtitle">Gérez les avis de vos partenaires</p>
                </div>
                <button
                    className={`btn ${showForm ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={() => {
                        if (showForm) resetForm();
                        else setShowForm(true);
                    }}
                >
                    {showForm ? <><FiX /> Annuler</> : <><FiPlus /> Nouveau Témoignage</>}
                </button>
            </div>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="alert alert-error"
                    >
                        {error}
                    </motion.div>
                )}
                {successMsg && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="alert alert-success"
                    >
                        <FiCheck /> {successMsg}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="admin-form-container"
                    >
                        <div className="admin-form-card">
                            <h2>{editingId ? 'Modifier le Témoignage' : 'Nouveau Témoignage'}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Nom du partenaire *</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                            placeholder="Ex: Dr. Jean Mukamba"
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Fonction / Role *</label>
                                        <input
                                            type="text"
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            required
                                            placeholder="Ex: Directeur Général"
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Ordre d'affichage</label>
                                        <input
                                            type="number"
                                            value={formData.order}
                                            onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                                            placeholder="0"
                                            className="form-input"
                                        />
                                    </div>
                                </div>

                                <div className="form-group full-width">
                                    <label>Contenu du témoignage *</label>
                                    <textarea
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        required
                                        rows="4"
                                        placeholder="Le texte du témoignage..."
                                        className="form-textarea"
                                    />
                                </div>

                                <div className="form-actions">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={resetForm}
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={submitting}
                                    >
                                        {submitting ? 'Enregistrement...' : <><FiSave /> {editingId ? 'Mettre à jour' : 'Enregistrer'}</>}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="admin-table-container">
                {loading ? (
                    <div className="loading-state">Chargement...</div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th style={{ width: '20%' }}>Nom</th>
                                <th style={{ width: '20%' }}>Role</th>
                                <th style={{ width: '40%' }}>Témoignage</th>
                                <th style={{ width: '10%' }}>Ordre</th>
                                <th style={{ width: '10%' }} className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testimonials.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center empty-state">
                                        Aucun témoignage enregistré
                                    </td>
                                </tr>
                            ) : (
                                testimonials.map((testimonial) => (
                                    <tr key={testimonial.id}>
                                        <td className="font-medium">{testimonial.name}</td>
                                        <td className="text-muted">{testimonial.role}</td>
                                        <td className="text-truncate" title={testimonial.content}>
                                            {testimonial.content}
                                        </td>
                                        <td>{testimonial.order}</td>
                                        <td>
                                            <div className="table-actions justify-end">
                                                <button
                                                    className="btn-icon btn-edit"
                                                    onClick={() => handleEdit(testimonial)}
                                                    title="Modifier"
                                                >
                                                    <FiEdit2 />
                                                </button>
                                                <button
                                                    className="btn-icon btn-delete"
                                                    onClick={() => handleDelete(testimonial.id)}
                                                    title="Supprimer"
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default AdminTestimonials
