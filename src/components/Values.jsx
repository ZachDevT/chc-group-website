import { motion } from 'framer-motion'
import { FiUsers, FiUser, FiMessageCircle, FiZap, FiTrendingUp, FiAward, FiStar } from 'react-icons/fi'
import './Values.css'

const Values = () => {
  const values = [
    {
      icon: <FiUsers />,
      title: 'Priorité aux partenaires',
      description: 'Avec une équipe pluridisciplinaire, nous privilégions les besoins des partenaires, pas les nôtres.',
      color: '#3b82f6'
    },
    {
      icon: <FiUser />,
      title: 'Équipe avant l\'individuel',
      description: 'Nous œuvrons pour le succès de l\'organisation, pas celui des individus',
      color: '#10b981'
    },
    {
      icon: <FiMessageCircle />,
      title: 'Être pro-activement franc',
      description: 'Nous parlons et communiquons les informations en toute franchise tout en veillant au respect de la confidentialité',
      color: '#f59e0b'
    },
    {
      icon: <FiZap />,
      title: 'Créer une énergie positive',
      description: 'Nous nous efforçons d\'apporter de l\'énergie positive à nos partenaires et pas de la leur prendre',
      color: '#8b5cf6'
    },
    {
      icon: <FiTrendingUp />,
      title: 'Réfléchir rigoureusement, agir rapidement',
      description: 'Priorité à la rigueur et à l\'action, pas au débat interminable, le respect des délais contractuels',
      color: '#ef4444'
    },
    {
      icon: <FiAward />,
      title: 'Se connaître et se développer',
      description: 'Nous sommes conscients de nos défauts, mais nous les exploitons',
      color: '#ec4899'
    },
    {
      icon: <FiStar />,
      title: 'Accepter la réalité, proposer des solutions',
      description: 'Nous ne nous attardons pas sur les problèmes. Nous créons des solutions et essayons de nous adapter au contexte évolutif',
      color: '#06b6d4'
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
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  return (
    <section className="values">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2 className="section-title">Nos Valeurs</h2>
          <p className="section-subtitle">
            Les principes qui guident notre action et notre engagement envers nos partenaires
          </p>
        </motion.div>

        <motion.div
          className="values-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="value-card"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="value-icon" style={{ color: value.color }}>
                {value.icon}
              </div>
              <h3 className="value-title">{value.title}</h3>
              <p className="value-description">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Values
