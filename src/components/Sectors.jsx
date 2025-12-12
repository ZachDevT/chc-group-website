import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiSun, FiShield, FiTrendingUp, FiBarChart2, FiUsers, FiTarget, FiArrowRight } from 'react-icons/fi'
import './Sectors.css'

const Sectors = () => {
  const sectors = [
    {
      icon: <FiSun />,
      title: 'Agroécologie et développement durable',
      description: 'Promotion de pratiques agricoles durables et respectueuses de l\'environnement pour un avenir meilleur.',
      color: '#22c55e',
      link: '/sectors#agroecologie'
    },
    {
      icon: <FiShield />,
      title: 'Gouvernance et genre',
      description: 'Renforcement des institutions et promotion de la participation citoyenne pour une gouvernance efficace.',
      color: '#3b82f6',
      link: '/sectors#governance'
    },
    {
      icon: <FiTrendingUp />,
      title: 'Gestion des ressources naturelles',
      description: 'Protection et gestion durable des ressources naturelles pour les générations futures.',
      color: '#10b981',
      link: '/sectors#ressources'
    },
    {
      icon: <FiBarChart2 />,
      title: 'Entrepreneuriat et développement des marchés',
      description: 'Soutien à l\'entrepreneuriat et développement de marchés inclusifs et durables.',
      color: '#f59e0b',
      link: '/sectors#entrepreneuriat'
    },
    {
      icon: <FiUsers />,
      title: 'Économie sociale et solidaire',
      description: 'Promotion d\'une économie centrée sur l\'humain et le bien-être collectif.',
      color: '#ef4444',
      link: '/sectors#economie-sociale'
    },
    {
      icon: <FiTarget />,
      title: 'Gestion et transformation des conflits',
      description: 'Analyse et résolution pacifique des conflits pour construire la paix durable.',
      color: '#8b5cf6',
      link: '/sectors#conflits'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  return (
    <section id="sectors" className="sectors">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2 className="section-title">Nos Secteurs d&rsquo;Activités</h2>
          <p className="section-subtitle">
            Des domaines d&rsquo;expertise variés pour répondre aux défis du développement durable
          </p>
        </motion.div>

        <motion.div
          className="sectors-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {sectors.map((sector, index) => (
            <motion.div
              key={index}
              className="sector-card"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="sector-icon-wrapper">
                <div className="sector-icon" style={{ '--sector-color': sector.color }}>
                  {sector.icon}
                </div>
              </div>
              <h3 className="sector-title">{sector.title}</h3>
              <p className="sector-description">{sector.description}</p>
              <Link to={sector.link} className="sector-link">
                Découvrir <FiArrowRight />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Sectors
