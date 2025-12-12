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

  const categories = useMemo(() => {
    const unique = new Set(articles.map((article) => article.category))
    return ['all', ...unique]
  }, [articles])

  const filteredArticles = useMemo(() => {
    let filtered = selectedCategory === 'all' ? articles : articles.filter((article) => article.category === selectedCategory)
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((article) => 
        article.title?.toLowerCase().includes(query) ||
        article.excerpt?.toLowerCase().includes(query) ||
        article.content?.toLowerCase().includes(query) ||
        article.category?.toLowerCase().includes(query) ||
        article.authorName?.toLowerCase().includes(query) ||
        article.author?.toLowerCase().includes(query)
      )
    }
    
    return filtered
  }, [articles, selectedCategory, searchQuery])

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
              <div className="blog-search-container">
                {showSearch && (
                  <div className="blog-search-box">
                    <FiSearch className="search-icon" />
                    <input
                      type="text"
                      placeholder="Rechercher un article..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="blog-search-input"
                      autoFocus
                    />
                    <button 
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
                )}
                {!showSearch && (
                  <button 
                    className="blog-search-toggle"
                    onClick={() => setShowSearch(true)}
                  >
                    <FiSearch /> Rechercher
                  </button>
                )}
              </div>

              <div className="blog-filters">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'all' ? 'Tous' : category}
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
                        <img src={article.coverImage || article.image} alt={article.title} />
                        <div className="blog-card-category">
                          <FiTag /> {article.category}
                        </div>
                      </div>
                      <div className="blog-card-content">
                        <h2 className="blog-card-title">{article.title}</h2>
                        <p className="blog-card-excerpt">{article.excerpt}</p>
                        <div className="blog-card-meta">
                          <span>
                            <FiUser /> {article.authorName || article.author}
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
                    Aucune publication pour cette catégorie.
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


