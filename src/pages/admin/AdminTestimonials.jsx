import { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, orderBy, query } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from '../../firebase/config'
import imageCompression from 'browser-image-compression'
import { motion } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiUpload } from 'react-icons/fi'
import '../admin/Admin.css'

const AdminTestimonials = () => {
    const [testimonials, setTestimonials] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [editingId, setEditingId] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        content: '',
        image: '',
        order: 0
    })
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState('')

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
            setError('Erreur lors du chargement des témoignages')
        } finally {
            setLoading(false)
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const uploadImage = async (file) => {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 800,
            useWebWorker: true
        }

        try {
            const compressedFile = await imageCompression(file, options)
            const storageRef = ref(storage, `testimonials/${Date.now()}_${file.name}`)
            await uploadBytes(storageRef, compressedFile)
            const downloadURL = await getDownloadURL(storageRef)
            return downloadURL
        } catch (error) {
            console.error('Error uploading image:', error)
            throw error
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setUploading(true)
        setError('')

        try {
            let imageURL = formData.image

            if (imageFile) {
                imageURL = await uploadImage(imageFile)
            }

            const testimonialData = {
                name: formData.name,
                role: formData.role,
                content: formData.content,
                image: imageURL,
                order: parseInt(formData.order) || 0,
                updatedAt: serverTimestamp()
            }

            if (editingId) {
                await updateDoc(doc(db, 'testimonials', editingId), testimonialData)
            } else {
                await addDoc(collection(db, 'testimonials'), {
                    ...testimonialData,
                    createdAt: serverTimestamp()
                })
            }

            resetForm()
            fetchTestimonials()
        } catch (err) {
            console.error('Error saving testimonial:', err)
            setError('Erreur lors de l\'enregistrement du témoignage')
        } finally {
            setUploading(false)
        }
    }

    const handleEdit = (testimonial) => {
        setFormData({
            name: testimonial.name,
            role: testimonial.role,
            content: testimonial.content,
            image: testimonial.image,
            order: testimonial.order || 0
        })
        setImagePreview(testimonial.image)
        setEditingId(testimonial.id)
        setShowForm(true)
    }

    const handleDelete = async (id, imageURL) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce témoignage?')) return

        try {
            // Delete from Firestore
            await deleteDoc(doc(db, 'testimonials', id))

            // Delete image from Storage if it exists
            if (imageURL && imageURL.includes('firebase')) {
                try {
                    const imageRef = ref(storage, imageURL)
                    await deleteObject(imageRef)
                } catch (err) {
                    console.error('Error deleting image:', err)
                }
            }

            fetchTestimonials()
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
            image: '',
            order: 0
        })
        setImageFile(null)
        setImagePreview('')
        setEditingId(null)
        setShowForm(false)
    }

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Gestion des Témoignages</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? <><FiX /> Annuler</> : <><FiPlus /> Nouveau Témoignage</>}
                </button>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            {showForm && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="admin-form-card"
                >
                    <h2>{editingId ? 'Modifier le Témoignage' : 'Nouveau Témoignage'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Nom *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    placeholder="Nom complet"
                                />
                            </div>
                            <div className="form-group">
                                <label>Fonction/Titre *</label>
                                <input
                                    type="text"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    required
                                    placeholder="Ex: Directeur, Organisation Partenaire"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Témoignage *</label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                required
                                rows="4"
                                placeholder="Contenu du témoignage..."
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Ordre d'affichage</label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>
                            <div className="form-group">
                                <label>Photo de profil</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <div className="image-preview">
                                        <img src={imagePreview} alt="Preview" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={resetForm}
                            >
                                <FiX /> Annuler
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={uploading}
                            >
                                {uploading ? (
                                    'Enregistrement...'
                                ) : (
                                    <><FiSave /> {editingId ? 'Mettre à jour' : 'Créer'}</>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}

            {loading ? (
                <div className="admin-loading">Chargement des témoignages...</div>
            ) : (
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Nom</th>
                                <th>Fonction</th>
                                <th>Témoignage</th>
                                <th>Ordre</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testimonials.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        Aucun témoignage trouvé
                                    </td>
                                </tr>
                            ) : (
                                testimonials.map((testimonial) => (
                                    <tr key={testimonial.id}>
                                        <td>
                                            {testimonial.image && (
                                                <img
                                                    src={testimonial.image}
                                                    alt={testimonial.name}
                                                    className="table-image"
                                                />
                                            )}
                                        </td>
                                        <td>{testimonial.name}</td>
                                        <td>{testimonial.role}</td>
                                        <td className="text-truncate">{testimonial.content}</td>
                                        <td>{testimonial.order}</td>
                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    className="btn-icon btn-edit"
                                                    onClick={() => handleEdit(testimonial)}
                                                    title="Modifier"
                                                >
                                                    <FiEdit2 />
                                                </button>
                                                <button
                                                    className="btn-icon btn-delete"
                                                    onClick={() => handleDelete(testimonial.id, testimonial.image)}
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
                </div>
            )}
        </div>
    )
}

export default AdminTestimonials
