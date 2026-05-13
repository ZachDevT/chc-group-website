import { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiZoomIn, FiFile, FiDownload, FiSearch, FiExternalLink, FiLink2 } from 'react-icons/fi'
import { useRealtimeCollection } from '../hooks/useRealtimeCollection.js'
import './Resources.css'

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

const formatFileSize = (bytes) => {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

const Resources = () => {
  const [activeTab, setActiveTab] = useState('gallery')
  const [selectedImage, setSelectedImage] = useState(null)
  const [galleryFilter, setGalleryFilter] = useState('all')
  const [docSearch, setDocSearch] = useState('')

  const { data: remoteImages, loading: galleryLoading } = useRealtimeCollection('gallery', { orderByField: 'createdAt' })
  const { data: remoteDocuments, loading: docsLoading } = useRealtimeCollection('documents', { orderByField: 'createdAt' })

  const images = remoteImages.length ? remoteImages : fallbackImages
  const documents = remoteDocuments

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

  const galleryCategories = useMemo(
    () => ['all', ...new Set(preparedImages.map((image) => image.categoryLabel))],
    [preparedImages]
  )

  const filteredImages =
    galleryFilter === 'all'
      ? preparedImages
      : preparedImages.filter((image) => image.categoryLabel === galleryFilter)

  const preparedDocuments = useMemo(
    () =>
      documents.map((documentItem, index) => {
        const titleLabel = normalizeText(documentItem.title) || `Document ${index + 1}`
        const categoryLabel = normalizeText(documentItem.category) || 'Autre'
        const descriptionLabel =
          normalizeText(documentItem.description) || 'Document officiel disponible dans la bibliothèque CHC.'
        const fileNameLabel =
          normalizeText(documentItem.fileName) ||
          (documentItem.sourceType === 'link' ? 'Lien partagé' : `${titleLabel}.pdf`)
        const fileSizeLabel = formatFileSize(documentItem.fileSize)

        return {
          ...documentItem,
          titleLabel,
          categoryLabel,
          descriptionLabel,
          fileNameLabel,
          fileSizeLabel,
          actionType: documentItem.sourceType === 'link' || !!documentItem.externalUrl ? 'link' : 'download',
          actionLabel: documentItem.sourceType === 'link' || !!documentItem.externalUrl ? 'Ouvrir le lien' : 'Télécharger'
        }
      }),
    [documents]
  )

  const filteredDocuments = useMemo(() => {
    const query = docSearch.trim().toLowerCase()
    if (!query) return preparedDocuments

    return preparedDocuments.filter((documentItem) =>
      documentItem.titleLabel.toLowerCase().includes(query) ||
      documentItem.categoryLabel.toLowerCase().includes(query) ||
      documentItem.descriptionLabel.toLowerCase().includes(query) ||
      documentItem.fileNameLabel.toLowerCase().includes(query)
    )
  }, [preparedDocuments, docSearch])

  useEffect(() => {
    if (!selectedImage) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedImage(null)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedImage])

  const handleDocumentAction = (documentItem) => {
    if (documentItem.externalUrl) {
      window.open(documentItem.externalUrl, '_blank', 'noopener,noreferrer')
      return
    }

    const link = document.createElement('a')
    link.href = documentItem.fileUrl || documentItem.file
    link.download = documentItem.fileNameLabel || `${documentItem.titleLabel}.pdf`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="resources-page">
      <motion.section
        className="resources-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="resources-hero-content">
            <h1 className="page-title">Ressources</h1>
            <p className="page-subtitle">
              Découvrez nos projets en images et accédez à nos documents officiels
            </p>
          </div>
        </div>
      </motion.section>

      <div className="resources-tabs-container">
        <div className="container">
          <div className="resources-tabs">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
              onClick={() => setActiveTab('gallery')}
            >
              Galerie Photos
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              Documents & Publications
            </button>
          </div>
        </div>
      </div>

      <section className="resources-content">
        <div className="container">
          {activeTab === 'gallery' ? (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="tab-content"
            >
              {galleryLoading && <div className="loading-state">Chargement de la galerie...</div>}

              <div className="gallery-toolbar">
                <div className="gallery-filters">
                  {galleryCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`filter-btn ${galleryFilter === cat ? 'active' : ''}`}
                      onClick={() => setGalleryFilter(cat)}
                    >
                      {cat === 'all' ? 'Tous' : cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="gallery-grid">
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id || index}
                    className="gallery-item"
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="gallery-media">
                      <img src={image.imageUrl} alt={image.titleLabel} />
                      <div className="gallery-overlay">
                        <FiZoomIn />
                      </div>
                    </div>
                    <div className="gallery-info">
                      <span className="category">{image.categoryLabel}</span>
                      <h3>{image.titleLabel}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="documents"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="tab-content"
            >
              {docsLoading && <div className="loading-state">Chargement des documents...</div>}

              <div className="docs-toolbar">
                <div className="search-bar">
                  <FiSearch />
                  <input
                    type="text"
                    placeholder="Rechercher un document..."
                    value={docSearch}
                    onChange={(event) => setDocSearch(event.target.value)}
                  />
                </div>
              </div>

              <div className="docs-list">
                {filteredDocuments.length === 0 && !docsLoading ? (
                  <div className="empty-state">Aucun document trouvé.</div>
                ) : (
                  filteredDocuments.map((documentItem) => (
                    <div key={documentItem.id} className="doc-card">
                      <div className="doc-icon">
                        {documentItem.actionType === 'link' ? <FiLink2 /> : <FiFile />}
                      </div>
                      <div className="doc-info">
                        <span className="doc-category">{documentItem.categoryLabel}</span>
                        <h3>{documentItem.titleLabel}</h3>
                        <p>{documentItem.descriptionLabel}</p>
                        <div className="doc-meta">
                          <span>{documentItem.fileNameLabel}</span>
                          {documentItem.fileSizeLabel && <span>{documentItem.fileSizeLabel}</span>}
                          <span>{documentItem.actionType === 'link' ? 'Lien partagé' : 'Fichier hébergé'}</span>
                        </div>
                      </div>
                      <button type="button" className="download-btn" onClick={() => handleDocumentAction(documentItem)}>
                        {documentItem.actionType === 'link' ? <FiExternalLink /> : <FiDownload />}
                        {documentItem.actionLabel}
                      </button>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
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
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" className="close-modal" onClick={() => setSelectedImage(null)}>
                <FiX />
              </button>
              <img src={selectedImage.imageUrl} alt={selectedImage.titleLabel} />
              <div className="modal-caption">
                <span className="category">{selectedImage.categoryLabel}</span>
                <h2>{selectedImage.titleLabel}</h2>
                <p>{selectedImage.descriptionLabel}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Resources
