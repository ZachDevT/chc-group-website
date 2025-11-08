import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiZoomIn } from 'react-icons/fi'
import './Gallery.css'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [filter, setFilter] = useState('all')

  const categories = ['all', 'Projets', 'Événements', 'Formations', 'Équipe', 'Partenaires']

  const images = [
    { id: 1, url: 'https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Projets', title: 'Réunion de coordination' },
    { id: 2, url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Projets', title: 'Projet agroécologique' },
    { id: 3, url: 'https://images.pexels.com/photos/1181516/pexels-photo-1181516.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Formations', title: 'Session de formation' },
    { id: 4, url: 'https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Événements', title: 'Conférence annuelle' },
    { id: 5, url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Projets', title: 'Visite de terrain' },
    { id: 6, url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Projets', title: 'Projet environnemental' },
    { id: 7, url: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Équipe', title: 'Équipe CHC Group' },
    { id: 8, url: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Formations', title: 'Atelier de renforcement' },
    { id: 9, url: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Équipe', title: 'Réunion d\'équipe' },
    { id: 10, url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Événements', title: 'Cérémonie de lancement' },
    { id: 11, url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Partenaires', title: 'Signature de partenariat' },
    { id: 12, url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Projets', title: 'Suivi de projet' }
  ]

  const filteredImages = filter === 'all' 
    ? images 
    : images.filter(img => img.category === filter)

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
                  <img src={image.url} alt={image.title} />
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
              src={selectedImage.url}
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


