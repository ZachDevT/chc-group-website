import { motion } from 'framer-motion'
import './Partners.css'

const Partners = () => {
  const partners = [
    {
      name: 'Action de Carême',
      logo: '/assets/patners/images.png',
      fallback: 'https://via.placeholder.com/200x100?text=Action+de+Carême'
    },
    {
      name: 'Interpeace',
      logo: '/assets/patners/2019-EN-Interpeace.png',
      fallback: 'https://via.placeholder.com/200x100?text=Interpeace'
    },
    {
      name: 'Miseror',
      logo: '/assets/patners/1691496610226.png',
      fallback: 'https://via.placeholder.com/200x100?text=Miseror'
    },
    {
      name: 'Entraide et Fraternité',
      logo: '/assets/patners/NEW-LOGO-ADC.png',
      fallback: 'https://via.placeholder.com/200x100?text=Entraide+et+Fraternité'
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
    hidden: { opacity: 0, scale: 0.8 },
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
    <section id="partners" className="partners">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2 className="section-title">Nos Partenaires</h2>
          <p className="section-subtitle">
            Des organisations de confiance qui partagent notre vision du développement durable
          </p>
        </motion.div>

        <motion.div
          className="partners-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="partner-card"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.05 }}
            >
              <div className="partner-logo-wrapper">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  onError={(e) => {
                    e.target.src = partner.fallback
                  }}
                  className="partner-logo"
                />
              </div>
              <p className="partner-name">{partner.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Partners


