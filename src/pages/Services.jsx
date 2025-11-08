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
import './Services.css'

const ServicesPage = () => {
  const services = [
    {
      icon: <FiFileText />,
      title: 'Études et Recherches',
      description: 'Conduite d\'études approfondies et recherches dans les domaines de la sécurité alimentaire, développement des chaînes de valeur, droits humains, et gestion des ressources naturelles.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
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
      description: 'Facilitation de partenariats entre acteurs nationaux et internationaux pour l\'adoption de solutions concrètes et durables.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
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
      description: 'Conception, exécution, suivi-évaluation et accompagnement de projets/programmes multisectoriels avec gestion objective et apprentissage continu.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
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
      description: 'Programmes de formation et coaching pour renforcer les capacités et compétences des partenaires et bénéficiaires.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
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
      description: 'Services d\'achats de performances pour optimiser les résultats et l\'efficacité des projets et programmes.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
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


