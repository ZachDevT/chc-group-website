import { useMemo, useState, useEffect } from 'react'
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
const normalizeText = (value) => (typeof value === 'string' ? value.trim() : '')

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [filter, setFilter] = useState('all')
  const { data: remoteImages, loading } = useRealtimeCollection('gallery', { orderByField: 'createdAt' })

  const images = remoteImages.length ? remoteImages : fallbackImages

  const preparedImages = useMemo(
    () =>
      images
        .map((image, index) => {
          const imageUrl = resolveUrl(image)
          if (!imageUrl) return null

          return {
            ...image,
            imageUrl,
            categoryLabel: normalizeText(image.category) || 'Général',
            titleLabel: normalizeText(image.title) || `Moment CHC ${index + 1}`,
            descriptionLabel:
              normalizeText(image.description) || 'Découvrez un temps fort capturé sur le terrain par CHC Group.'
          }
        })
        .filter(Boolean),
    [images]
  )

  const categories = useMemo(
    () => ['all', ...new Set(preparedImages.map((image) => image.categoryLabel))],
    [preparedImages]
  )

  const categoryCounts = useMemo(() => {
    const counts = { all: preparedImages.length }

    preparedImages.forEach((image) => {
      counts[image.categoryLabel] = (counts[image.categoryLabel] || 0) + 1
    })

    return counts
  }, [preparedImages])

  const filteredImages =
    filter === 'all'
      ? preparedImages
      : preparedImages.filter((image) => image.categoryLabel === filter)

  const activeFilterLabel = filter === 'all' ? 'Toutes les catégories' : filter

  useEffect(() => {
    if (!selectedImage) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedImage(null)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedImage])

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

          <div className="gallery-toolbar">
            <div className="gallery-summary">
              <p className="gallery-summary-label">
                {filteredImages.length} média{filteredImages.length > 1 ? 's' : ''}
              </p>
              <p className="gallery-summary-meta">{activeFilterLabel}</p>
            </div>

            <div className="gallery-filters" aria-label="Filtres de la galerie">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`filter-btn ${filter === category ? 'active' : ''}`}
                  onClick={() => setFilter(category)}
                  aria-pressed={filter === category}
                  title={`Afficher ${categoryCounts[category] || 0} média${(categoryCounts[category] || 0) > 1 ? 's' : ''}`}
                >
                  {category === 'all' ? 'Tous' : category}
                  <span>{categoryCounts[category] || 0}</span>
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="gallery-grid">
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.button
                  key={image.id || image.imageUrl}
                  layout
                  type="button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="gallery-item"
                  onClick={() => setSelectedImage(image)}
                  aria-label={`Ouvrir l'image ${image.titleLabel}`}
                >
                  <div className="gallery-media">
                    <img src={image.imageUrl} alt={image.titleLabel} />
                    <div className="gallery-overlay">
                      <FiZoomIn />
                    </div>
                  </div>
                  <div className="gallery-item-content">
                    <span className="gallery-item-category">{image.categoryLabel}</span>
                    <p className="gallery-item-title">{image.titleLabel}</p>
                    <p className="gallery-item-description">{image.descriptionLabel}</p>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>

          {!filteredImages.length && !loading && (
            <div className="gallery-loading gallery-empty-state">
              Aucun média trouvé pour ce filtre.
            </div>
          )}
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
            <motion.div
              className="gallery-modal-panel"
              initial={{ scale: 0.92, opacity: 0.9 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0.9 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="gallery-modal-close"
                onClick={() => setSelectedImage(null)}
                aria-label="Fermer l'aperçu"
              >
                <FiX />
              </button>
              <motion.img
                initial={{ scale: 0.94 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.94 }}
                src={selectedImage.imageUrl}
                alt={selectedImage.titleLabel}
              />
              <div className="gallery-modal-caption">
                <span className="gallery-modal-category">{selectedImage.categoryLabel}</span>
                <p className="gallery-modal-title">{selectedImage.titleLabel}</p>
                <p className="gallery-modal-description">{selectedImage.descriptionLabel}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Gallery
