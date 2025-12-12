import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiFileText, FiGlobe, FiBriefcase, FiBookOpen, FiZap, FiArrowRight } from 'react-icons/fi'
import './Services.css'

const Services = () => {
  const services = [
    {
      icon: <FiFileText />,
      title: 'Études et Recherches',
      description: 'Notre service d\'études et de recherches se concentre sur la collecte et l\'analyse approfondie des données quantitatives et qualitatives pour fournir des informations fiables et précises à nos clients/partenaires. Nous réalisons des études de marché, des analyses sectorielles, le suivi-évaluation intégré, et des recherches spécifiques pour soutenir la prise de décision stratégique et une gestion axée sur les résultats.',
      image: '/assets/OneDrive_1_19-11-2025/IMG_4018.JPG',
      link: '/services/etudes-recherches',
      color: '#3b82f6'
    },
    {
      icon: <FiGlobe />,
      title: 'Coopération internationale',
      description: 'Nous accompagnons les entreprises et les organisations dans leurs projets de coopération internationale. Que ce soit pour l\'expansion dans de nouveaux marchés, la création de partenariats stratégiques ou la gestion des relations internationales, la représentation dans les réseaux pertinents du pays, fournir des informations (situation politique, économique, culturelle, ecclésiale, possibilités de coopération) à jour sur le pays, notre équipe d\'experts vous guide à chaque étape.',
      image: '/assets/OneDrive_1_19-11-2025/IMG_4007.JPG',
      link: '/services/cooperation-internationale',
      color: '#10b981'
    },
    {
      icon: <FiBriefcase />,
      title: 'Gestion des projets/Programmes',
      description: 'Dans le cadre de la gestion de projets/programmes, nous vous assistons dans toutes les phases, de la planification à l\'exécution, en veillant à ce que chaque étape soit optimisée pour maximiser les résultats et la durabilité. Nous garantissons un dialogue avec entre parties prenantes dans le projet/programme. Notre équipe d\'experts s\'emploie également à soutenir votre communication et y collaborer (sensibilisation, campagnes, recherche des fonds).',
      image: '/assets/OneDrive_1_19-11-2025/IMG_3998.JPG',
      link: '/services/gestion-projets',
      color: '#f59e0b'
    },
    {
      icon: <FiBookOpen />,
      title: 'Formations et Coaching',
      description: 'Nos programmes de formation et de coaching sont conçus pour renforcer les compétences des dirigeants, des équipes de mise en œuvre et des collaborateurs. Nous offrons des solutions sur mesure, adaptées aux besoins spécifiques de chaque organisation.',
      image: '/assets/OneDrive_1_19-11-2025/IMG_4056.JPG',
      link: '/services/formations-coaching',
      color: '#8b5cf6'
    },
    {
      icon: <FiZap />,
      title: 'Achats de performances',
      description: 'Nous offrons également des services spécialisés pour l\'achat des performances, permettant à nos clients de garantir un rendement optimal dans leurs processus d\'acquisition de biens et services. Nous mettons l\'accent sur la transparence, l\'efficacité, et la conformité aux normes de qualité édictées.',
      image: '/assets/OneDrive_1_19-11-2025/IMG_4041.JPG',
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

