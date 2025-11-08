import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiCalendar, FiUser, FiTag, FiShare2 } from 'react-icons/fi'
import './BlogPost.css'

const BlogPost = () => {
  const { slug } = useParams()
  
  const posts = {
    'recherche-action-participative': {
      title: 'L\'importance de la recherche-action participative dans le développement durable',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
      category: 'Recherche',
      author: 'Dr. Germain NYEMBO',
      date: '15 Mars 2025',
      content: `
        <p>La recherche-action participative représente une approche fondamentale dans le domaine du développement durable. Contrairement aux méthodes de recherche traditionnelles, cette approche implique activement tous les acteurs concernés dans le processus de recherche, depuis la définition des questions jusqu'à l'analyse des résultats.</p>
        
        <h2>Les principes de la recherche-action participative</h2>
        <p>Cette méthodologie repose sur plusieurs principes clés :</p>
        <ul>
          <li><strong>Participation active</strong> : Tous les acteurs, y compris les bénéficiaires, sont impliqués à chaque étape</li>
          <li><strong>Apprentissage mutuel</strong> : Les chercheurs et les participants apprennent les uns des autres</li>
          <li><strong>Action immédiate</strong> : Les résultats sont directement applicables sur le terrain</li>
          <li><strong>Durabilité</strong> : Les solutions émergentes sont ancrées dans les réalités locales</li>
        </ul>
        
        <h2>Impact sur le développement durable</h2>
        <p>Notre expérience montre que cette approche permet de créer des solutions plus adaptées, mieux acceptées et donc plus durables. Les projets développés avec cette méthodologie ont un taux de réussite significativement plus élevé.</p>
        
        <h2>Cas d'étude : Projet agroécologique en RDC</h2>
        <p>Dans le cadre d'un projet récent, nous avons appliqué cette méthodologie pour développer des pratiques agroécologiques adaptées aux conditions locales. Le résultat : une adoption de 85% des pratiques recommandées, contre 45% dans les projets utilisant des approches traditionnelles.</p>
      `
    },
    'partenariat-interpeace': {
      title: 'Nouveau partenariat avec Interpeace pour la gestion des conflits',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80',
      category: 'Actualités',
      author: 'HUGUETTE MINANI',
      date: '10 Mars 2025',
      content: `
        <p>CHC Group est fier d'annoncer un nouveau partenariat stratégique avec Interpeace, une organisation internationale reconnue pour son expertise en matière de consolidation de la paix.</p>
        <p>Ce partenariat permettra de renforcer nos capacités dans le domaine de la gestion et transformation des conflits, un secteur clé pour le développement durable en RDC.</p>
      `
    }
  }

  const post = posts[slug] || posts['recherche-action-participative']

  return (
    <div className="blog-post-page">
      <motion.section 
        className="blog-post-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ backgroundImage: `linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(26, 26, 26, 0.6) 100%), url(${post.image})` }}
      >
        <div className="container">
          <Link to="/blog" className="back-link">
            <FiArrowLeft /> Retour au blog
          </Link>
          <div className="blog-post-hero-content">
            <div className="blog-post-meta">
              <span className="blog-post-category"><FiTag /> {post.category}</span>
              <span><FiCalendar /> {post.date}</span>
              <span><FiUser /> {post.author}</span>
            </div>
            <h1 className="blog-post-title">{post.title}</h1>
          </div>
        </div>
      </motion.section>

      <section className="blog-post-content">
        <div className="container">
          <div className="blog-post-layout">
            <article 
              className="blog-post-article"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <aside className="blog-post-sidebar">
              <div className="sidebar-card">
                <h3>Partager</h3>
                <button className="share-btn">
                  <FiShare2 /> Partager cet article
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogPost


