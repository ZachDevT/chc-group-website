import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiFileText, FiGlobe, FiBriefcase, FiBookOpen, FiZap, FiArrowRight } from 'react-icons/fi'
import './Services.css'

const Services = () => {
  const services = [
    {
      icon: <FiFileText />,
      title: 'Études et Recherches',
      description: 'Conduite d\'études approfondies et recherches dans les domaines de la sécurité alimentaire, développement des chaînes de valeur, droits humains, et gestion des ressources naturelles.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      link: '/services/etudes-recherches',
      color: '#3b82f6'
    },
    {
      icon: <FiGlobe />,
      title: 'Coopération internationale',
      description: 'Facilitation de partenariats entre acteurs nationaux et internationaux pour l\'adoption de solutions concrètes et durables.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
      link: '/services/cooperation-internationale',
      color: '#10b981'
    },
    {
      icon: <FiBriefcase />,
      title: 'Gestion des projets/Programmes',
      description: 'Conception, exécution, suivi-évaluation et accompagnement de projets/programmes multisectoriels avec gestion objective et apprentissage continu.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
      link: '/services/gestion-projets',
      color: '#f59e0b'
    },
    {
      icon: <FiBookOpen />,
      title: 'Formations et Coaching',
      description: 'Programmes de formation et coaching pour renforcer les capacités et compétences des partenaires et bénéficiaires.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
      link: '/services/formations-coaching',
      color: '#8b5cf6'
    },
    {
      icon: <FiZap />,
      title: 'Achats de performances',
      description: 'Services d\'achats de performances pour optimiser les résultats et l\'efficacité des projets et programmes.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
      link: '/services/achats-performances',
      color: '#ef4444'
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
    <section id="services" className="services">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2 className="section-title">Nos Services</h2>
          <p className="section-subtitle">
            Des solutions innovantes pour répondre à vos besoins de développement et de gestion de projets
          </p>
        </motion.div>

        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <div className="service-image">
                <img src={service.image} alt={service.title} />
                <div className="service-overlay"></div>
              </div>
              <div className="service-content">
                <div className="service-icon" style={{ color: service.color }}>
                  {service.icon}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <Link to={service.link} className="service-link">
                  En savoir plus <FiArrowRight />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Services

