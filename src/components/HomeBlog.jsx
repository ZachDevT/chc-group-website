import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiCalendar, FiUser, FiArrowRight, FiTag } from 'react-icons/fi'
import { useRealtimeCollection } from '../hooks/useRealtimeCollection.js'
import './HomeBlog.css'

const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

const HomeBlog = () => {
  const { data: articles, loading } = useRealtimeCollection('blogPosts', { 
    orderByField: 'createdAt',
    limit: 3
  })

  if (loading) {
    return null
  }

  if (!articles || articles.length === 0) {
    return null
  }

  return (
    <section className="home-blog">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2 className="section-title">Dernières Actualités</h2>
          <p className="section-subtitle">
            Découvrez nos dernières publications et actualités
          </p>
        </motion.div>

        <motion.div
          className="home-blog-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {articles.slice(0, 3).map((article, index) => (
            <motion.article
              key={article.id}
              className="home-blog-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Link to={`/blog/${article.slug}`} className="home-blog-link">
                <div className="home-blog-image">
                  <img 
                    src={article.coverImage || article.image} 
                    alt={article.title}
                    onError={(e) => {
                      e.target.src = '/assets/heroImages/hero1.jpg'
                    }}
                  />
                  <div className="home-blog-category">
                    <FiTag /> {article.category}
                  </div>
                </div>
                <div className="home-blog-content">
                  <h3 className="home-blog-title">{article.title}</h3>
                  <p className="home-blog-excerpt">{article.excerpt}</p>
                  <div className="home-blog-meta">
                    <span>
                      <FiUser /> {article.authorName || article.author}
                    </span>
                    <span>
                      <FiCalendar /> {formatDate(article.createdAt)}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: '40px' }}
        >
          <Link to="/blog" className="btn btn-primary">
            Voir tous les articles <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default HomeBlog





