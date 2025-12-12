import { motion } from 'framer-motion'
import { FiUsers, FiMapPin, FiTrendingUp, FiAward } from 'react-icons/fi'
import './Stats.css'

const Stats = () => {
  const stats = [
    {
      icon: <FiUsers />,
      number: '100+',
      label: 'Professionnels',
      description: 'Experts pluridisciplinaires'
    },
    {
      icon: <FiMapPin />,
      number: '6',
      label: 'Secteurs clés',
      description: 'Agroécologie, gouvernance, ESS, marchés, ressources, conflits'
    },
    {
      icon: <FiTrendingUp />,
      number: '200+',
      label: 'Projets',
      description: 'Consultation en gestion'
    },
    {
      icon: <FiAward />,
      number: '15+',
      label: 'Partenaires',
      description: 'Organisations de confiance'
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  return (
    <section className="stats">
      <div className="container">
        <motion.div
          className="stats-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <h3 className="stat-number">{stat.number}</h3>
                <p className="stat-label">{stat.label}</p>
                <p className="stat-description">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Stats




