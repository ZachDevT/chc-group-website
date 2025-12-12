import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FiFileText, 
  FiGlobe, 
  FiBriefcase, 
  FiBookOpen, 
  FiZap, 
  FiArrowRight,
  FiCheckCircle
} from 'react-icons/fi'
import SEO from '../components/SEO.jsx'
import './Services.css'

const ServicesPage = () => {
  const services = [
    {
      icon: <FiFileText />,
      title: 'Études et Recherches',
      description: 'Notre service d\'études et de recherches se concentre sur la collecte et l\'analyse approfondie des données quantitatives et qualitatives pour fournir des informations fiables et précises à nos clients/partenaires. Nous réalisons des études de marché, des analyses sectorielles, le suivi-évaluation intégré, et des recherches spécifiques pour soutenir la prise de décision stratégique et une gestion axée sur les résultats.',
      image: '/assets/OneDrive_1_19-11-2025/IMG_4018.JPG',
      link: '/services/etudes-recherches',
      color: '#3b82f6',
      features: [
        'Recherche-action participative',
        'Études de faisabilité',
        'Analyse de marché',
        'Évaluation d\'impact',
        'Recherche appliquée'
      ]
    },
    {
      icon: <FiGlobe />,
      title: 'Coopération internationale',
      description: 'Nous accompagnons les entreprises et les organisations dans leurs projets de coopération internationale. Que ce soit pour l\'expansion dans de nouveaux marchés, la création de partenariats stratégiques ou la gestion des relations internationales, la représentation dans les réseaux pertinents du pays, fournir des informations (situation politique, économique, culturelle, ecclésiale, possibilités de coopération) à jour sur le pays, notre équipe d\'experts vous guide à chaque étape.',
      image: '/assets/OneDrive_1_19-11-2025/IMG_4007.JPG',
      link: '/services/cooperation-internationale',
      color: '#10b981',
      features: [
        'Mise en réseau',
        'Partenariats stratégiques',
        'Coordination multi-acteurs',
        'Échange de bonnes pratiques',
        'Renforcement institutionnel'
      ]
    },
    {
      icon: <FiBriefcase />,
      title: 'Gestion des projets/Programmes',
      description: 'Dans le cadre de la gestion de projets/programmes, nous vous assistons dans toutes les phases, de la planification à l\'exécution, en veillant à ce que chaque étape soit optimisée pour maximiser les résultats et la durabilité. Nous garantissons un dialogue avec entre parties prenantes dans le projet/programme. Notre équipe d\'experts s\'emploie également à soutenir votre communication et y collaborer (sensibilisation, campagnes, recherche des fonds).',
      image: '/assets/OneDrive_1_19-11-2025/IMG_3998.JPG',
      link: '/services/gestion-projets',
      color: '#f59e0b',
      features: [
        'Conception de projets',
        'Planification stratégique',
        'Suivi-évaluation',
        'Gestion budgétaire',
        'Rapportage et capitalisation'
      ]
    },
    {
      icon: <FiBookOpen />,
      title: 'Formations et Coaching',
      description: 'Nos programmes de formation et de coaching sont conçus pour renforcer les compétences des dirigeants, des équipes de mise en œuvre et des collaborateurs. Nous offrons des solutions sur mesure, adaptées aux besoins spécifiques de chaque organisation.',
      image: '/assets/OneDrive_1_19-11-2025/IMG_4056.JPG',
      link: '/services/formations-coaching',
      color: '#8b5cf6',
      features: [
        'Formation sur mesure',
        'Coaching individuel et collectif',
        'Renforcement des capacités',
        'Transfert de compétences',
        'Accompagnement personnalisé'
      ]
    },
    {
      icon: <FiZap />,
      title: 'Achats de performances',
      description: 'Nous offrons également des services spécialisés pour l\'achat des performances, permettant à nos clients de garantir un rendement optimal dans leurs processus d\'acquisition de biens et services. Nous mettons l\'accent sur la transparence, l\'efficacité, et la conformité aux normes de qualité édictées.',
      image: '/assets/OneDrive_1_19-11-2025/IMG_4041.JPG',
      link: '/services/achats-performances',
      color: '#ef4444',
      features: [
        'Optimisation des résultats',
        'Mesure de performance',
        'Amélioration continue',
        'Efficacité opérationnelle',
        'ROI amélioré'
      ]
    }
  ]

  return (
    <div className="services-page">
      <SEO
        title="Nos Services"
        description="Découvrez nos services : Études et Recherches, Coopération internationale, Gestion des projets/Programmes, Formations et Coaching, Achats de performances. Solutions innovantes pour vos défis de développement."
      />
      <motion.section 
        className="services-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="services-hero-content">
            <h1 className="page-title">Nos Services</h1>
            <p className="page-subtitle">
              Des solutions complètes et innovantes pour répondre à tous vos besoins 
              de développement et de gestion de projets
            </p>
          </div>
        </div>
      </motion.section>

      <section className="services-list">
        <div className="container">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="service-detail-card"
            >
              <div className="service-detail-content">
                <div className="service-detail-header">
                  <div className="service-detail-icon" style={{ color: service.color }}>
                    {service.icon}
                  </div>
                  <div>
                    <h2 className="service-detail-title">{service.title}</h2>
                    <p className="service-detail-description">{service.description}</p>
                  </div>
                </div>
                <div className="service-features">
                  <h3>Nos prestations :</h3>
                  <ul>
                    {service.features.map((feature, idx) => (
                      <li key={idx}>
                        <FiCheckCircle /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to={service.link} className="service-detail-link">
                  En savoir plus <FiArrowRight />
                </Link>
              </div>
              <div className="service-detail-image">
                <img src={service.image} alt={service.title} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ServicesPage




