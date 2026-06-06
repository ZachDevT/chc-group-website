import { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import { FiCalendar, FiUser, FiArrowRight, FiTag, FiSearch, FiX } from 'react-icons/fi'
import { useRealtimeCollection } from '../hooks/useRealtimeCollection.js'
import SEO from '../components/SEO.jsx'
import './Blog.css'

const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

const normalizeText = (value) => (typeof value === 'string' ? value.trim() : '')

const normalizeCategoryLabel = (value) => normalizeText(value) || 'Général'

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const { data: articles, loading } = useRealtimeCollection('blogPosts', { orderByField: 'createdAt' })

  useEffect(() => {
    const searchParam = searchParams.get('search')
    if (searchParam === 'true') {
      setShowSearch(true)
    }
  }, [searchParams])

  const preparedArticles = useMemo(
    () =>
      articles.map((article, index) => ({
        ...article,
        titleLabel: normalizeText(article.title) || `Article ${index + 1}`,
        excerptLabel:
          normalizeText(article.excerpt) ||
          'Découvrez bientôt le résumé de cette publication réalisée par CHC Group.',
        authorLabel: normalizeText(article.authorName || article.author) || 'Équipe CHC',
        categoryLabel: normalizeCategoryLabel(article.category),
        imageUrl: article.coverImage || article.image || '/assets/OneDrive_1_19-11-2025/IMG_4045.JPG'
      })),
    [articles]
  )

  const categories = useMemo(() => {
    const unique = new Set(preparedArticles.map((article) => article.categoryLabel))
    return ['all', ...unique]
  }, [preparedArticles])

  const categoryCounts = useMemo(() => {
    const counts = { all: preparedArticles.length }

    preparedArticles.forEach((article) => {
      counts[article.categoryLabel] = (counts[article.categoryLabel] || 0) + 1
    })

    return counts
  }, [preparedArticles])

  const filteredArticles = useMemo(() => {
    let filtered =
      selectedCategory === 'all'
        ? preparedArticles
        : preparedArticles.filter((article) => article.categoryLabel === selectedCategory)

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((article) =>
        article.titleLabel.toLowerCase().includes(query) ||
        article.excerptLabel.toLowerCase().includes(query) ||
        normalizeText(article.content).toLowerCase().includes(query) ||
        article.categoryLabel.toLowerCase().includes(query) ||
        article.authorLabel.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [preparedArticles, selectedCategory, searchQuery])

  const activeFilterLabel = selectedCategory === 'all' ? 'Toutes les catégories' : selectedCategory

  return (
    <div className="blog-page">
      <SEO
        title="Blog & Actualités"
        description="Découvrez nos dernières actualités, articles de recherche et retours d'expérience sur le développement durable, la gestion de projets, la coopération internationale et bien plus."
      />
      <motion.section
        className="blog-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="blog-hero-content">
            <h1 className="page-title">Blog & Actualités</h1>
            <p className="page-subtitle">
              Découvrez nos dernières actualités, articles de recherche et retours d&rsquo;expérience
            </p>
          </div>
        </div>
      </motion.section>

      <section className="blog-content">
        <div className="container">
          {loading && <div className="blog-empty-state">Chargement des articles…</div>}

          {!loading && (
            <>
              <div className="blog-toolbar">
                <div className="blog-search-container">
                  {showSearch ? (
                    <div className="blog-search-box">
                      <FiSearch className="search-icon" />
                      <input
                        type="text"
                        placeholder="Rechercher un article..."
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        className="blog-search-input"
                        autoFocus
                      />
                      <button
                        type="button"
                        className="blog-search-close"
                        onClick={() => {
                          setShowSearch(false)
                          setSearchQuery('')
                          setSearchParams({})
                        }}
                        aria-label="Fermer la recherche"
                      >
                        <FiX />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="blog-search-toggle"
                      onClick={() => setShowSearch(true)}
                    >
                      <FiSearch /> Rechercher
                    </button>
                  )}
                </div>

                <div className="blog-results-bar">
                  <p className="blog-results-label">
                    {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''}
                  </p>
                  <p className="blog-results-meta">
                    {searchQuery.trim()
                      ? `Résultats pour "${searchQuery.trim()}"`
                      : activeFilterLabel}
                  </p>
                </div>
              </div>

              <div className="blog-filters" aria-label="Filtres du blog">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                    aria-pressed={selectedCategory === category}
                    title={`Afficher ${categoryCounts[category] || 0} article${(categoryCounts[category] || 0) > 1 ? 's' : ''}`}
                  >
                    {category === 'all' ? 'Tous' : category}
                    <span>{categoryCounts[category] || 0}</span>
                  </button>
                ))}
              </div>

              <motion.div layout className="blog-grid">
                {filteredArticles.map((article, index) => (
                  <motion.article
                    key={article.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="blog-card"
                  >
                    <Link to={`/blog/${article.slug}`} className="blog-card-link">
                      <div className="blog-card-image">
                        <img src={article.imageUrl} alt={article.titleLabel} />
                        <div className="blog-card-category">
                          <FiTag /> {article.categoryLabel}
                        </div>
                      </div>
                      <div className="blog-card-content">
                        <h2 className="blog-card-title">{article.titleLabel}</h2>
                        <p className="blog-card-excerpt">{article.excerptLabel}</p>
                        <div className="blog-card-meta">
                          <span>
                            <FiUser /> {article.authorLabel}
                          </span>
                          <span>
                            <FiCalendar /> {formatDate(article.createdAt)}{' '}
                          </span>
                        </div>
                        <div className="blog-card-read-more">
                          Lire la suite <FiArrowRight />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
                {!filteredArticles.length && (
                  <div className="blog-empty-state" style={{ gridColumn: '1/-1' }}>
                    Aucune publication trouvée pour ce filtre.
                  </div>
                )}
              </motion.div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default Blog
