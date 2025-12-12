import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiZoomIn } from 'react-icons/fi'
import { useRealtimeCollection } from '../hooks/useRealtimeCollection.js'
import './Gallery.css'

const fallbackImages = [
  { id: 'od-3996', url: '/assets/OneDrive_1_19-11-2025/IMG_3996.JPG', category: 'Projets', title: 'Visite de terrain - Agroécologie' },
  { id: 'od-3999', url: '/assets/OneDrive_1_19-11-2025/IMG_3999.JPG', category: 'Formations', title: 'Coaching des équipes locales' },
  { id: 'od-4004', url: '/assets/OneDrive_1_19-11-2025/IMG_4004.JPG', category: 'Événements', title: 'Atelier de co-création' },
  { id: 'od-4014', url: '/assets/OneDrive_1_19-11-2025/IMG_4014.JPG', category: 'Partenaires', title: 'Signature d’accord' },
  { id: 'od-4024', url: '/assets/OneDrive_1_19-11-2025/IMG_4024.JPG', category: 'Projets', title: 'Mission de suivi' },
  { id: 'od-4035', url: '/assets/OneDrive_1_19-11-2025/IMG_4035.JPG', category: 'Équipe', title: 'Equipe CHC sur le terrain' },
  { id: 'od-4045', url: '/assets/OneDrive_1_19-11-2025/IMG_4045.JPG', category: 'Événements', title: 'Rencontre multi-acteurs' },
  { id: 'od-4056', url: '/assets/OneDrive_1_19-11-2025/IMG_4056.JPG', category: 'Formations', title: 'Session de renforcement des capacités' }
]

const resolveUrl = (item) => item.image || item.url

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [filter, setFilter] = useState('all')
  const { data: remoteImages, loading } = useRealtimeCollection('gallery', { orderByField: 'createdAt' })

  const images = remoteImages.length ? remoteImages : fallbackImages

  const categories = useMemo(() => ['all', ...new Set(images.map((img) => img.category))], [images])

  const filteredImages = filter === 'all' ? images : images.filter((img) => img.category === filter)

  return (
    <div className="gallery-page">
      <motion.section 
        className="gallery-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="gallery-hero-content">
            <h1 className="page-title">Galerie</h1>
            <p className="page-subtitle">
              Découvrez nos projets, événements et moments forts en images
            </p>
          </div>
        </div>
      </motion.section>

      <section className="gallery-content">
        <div className="container">
          {loading && <div className="gallery-loading">Chargement des médias...</div>}
          <div className="gallery-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${filter === category ? 'active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {category === 'all' ? 'Tous' : category}
              </button>
            ))}
          </div>

          <motion.div
            layout
            className="gallery-grid"
          >
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="gallery-item"
                  onClick={() => setSelectedImage(image)}
                >
                  <img src={resolveUrl(image)} alt={image.title} />
                  <div className="gallery-overlay">
                    <FiZoomIn />
                    <p>{image.title}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="gallery-modal"
            onClick={() => setSelectedImage(null)}
          >
            <button className="gallery-modal-close" onClick={() => setSelectedImage(null)}>
              <FiX />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={resolveUrl(selectedImage)}
              alt={selectedImage.title}
              onClick={(e) => e.stopPropagation()}
            />
            <p className="gallery-modal-title">{selectedImage.title}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Gallery


