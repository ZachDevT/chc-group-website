import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiCalendar, FiUser, FiArrowRight, FiTag } from 'react-icons/fi'
import './Blog.css'

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', 'Actualités', 'Recherche', 'Projets', 'Formation', 'Développement']

  const articles = [
    {
      id: 1,
      title: 'L\'importance de la recherche-action participative dans le développement durable',
      excerpt: 'Découvrez comment notre approche de recherche-action participative transforme les projets de développement en créant un impact réel et durable...',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Recherche',
      author: 'Dr. Germain NYEMBO',
      date: '15 Mars 2025',
      slug: 'recherche-action-participative'
    },
    {
      id: 2,
      title: 'Nouveau partenariat avec Interpeace pour la gestion des conflits',
      excerpt: 'CHC Group annonce un nouveau partenariat stratégique avec Interpeace pour renforcer les capacités de gestion et transformation des conflits...',
      image: 'https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Actualités',
      author: 'HUGUETTE MINANI',
      date: '10 Mars 2025',
      slug: 'partenariat-interpeace'
    },
    {
      id: 3,
      title: 'Formation en gestion de projets : Retour sur la session de février',
      excerpt: 'Une formation intensive de 5 jours a réuni 25 professionnels du développement pour renforcer leurs compétences en gestion de projets...',
      image: 'https://images.pexels.com/photos/1181516/pexels-photo-1181516.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Formation',
      author: 'ALEXIS KAJIBWAMI',
      date: '5 Mars 2025',
      slug: 'formation-gestion-projets'
    },
    {
      id: 4,
      title: 'Agroécologie : Vers une agriculture durable en RDC',
      excerpt: 'Notre étude sur les pratiques agroécologiques montre des résultats prometteurs pour l\'amélioration de la sécurité alimentaire...',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Projets',
      author: 'Dr. Germain NYEMBO',
      date: '28 Février 2025',
      slug: 'agroecologie-rdc'
    },
    {
      id: 5,
      title: 'Économie sociale et solidaire : Un modèle pour l\'avenir',
      excerpt: 'L\'économie sociale et solidaire offre des solutions innovantes pour créer de la prospérité partagée tout en respectant l\'environnement...',
      image: 'https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Développement',
      author: 'HUGUETTE MINANI',
      date: '20 Février 2025',
      slug: 'economie-sociale-solidaire'
    },
    {
      id: 6,
      title: 'Suivi-évaluation : Méthodes et bonnes pratiques',
      excerpt: 'Un guide pratique sur les méthodes de suivi-évaluation efficaces pour maximiser l\'impact de vos projets de développement...',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Recherche',
      author: 'Dr. Germain NYEMBO',
      date: '15 Février 2025',
      slug: 'suivi-evaluation-methodes'
    }
  ]

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory)

  return (
    <div className="blog-page">
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
              Découvrez nos dernières actualités, articles de recherche et retours d'expérience
            </p>
          </div>
        </div>
      </motion.section>

      <section className="blog-content">
        <div className="container">
          <div className="blog-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'Tous' : category}
              </button>
            ))}
          </div>

          <motion.div
            layout
            className="blog-grid"
          >
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
                    <img src={article.image} alt={article.title} />
                    <div className="blog-card-category">
                      <FiTag /> {article.category}
                    </div>
                  </div>
                  <div className="blog-card-content">
                    <h2 className="blog-card-title">{article.title}</h2>
                    <p className="blog-card-excerpt">{article.excerpt}</p>
                    <div className="blog-card-meta">
                      <span><FiUser /> {article.author}</span>
                      <span><FiCalendar /> {article.date}</span>
                    </div>
                    <div className="blog-card-read-more">
                      Lire la suite <FiArrowRight />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Blog


