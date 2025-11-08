import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiCheckCircle, FiFileText, FiUsers, FiTarget } from 'react-icons/fi'
import './ServiceDetail.css'

const ServiceDetail = () => {
  const { slug } = useParams()
  
  const services = {
    'etudes-recherches': {
      title: 'Études et Recherches',
      description: 'Conduite d\'études approfondies et recherches dans les domaines de la sécurité alimentaire, développement des chaînes de valeur, droits humains, et gestion des ressources naturelles.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
      content: 'Nos services d\'études et recherches couvrent un large éventail de domaines essentiels au développement durable. Nous menons des recherches rigoureuses qui éclairent les décisions stratégiques et orientent les actions concrètes.',
      features: [
        'Recherche-action participative',
        'Études de faisabilité approfondies',
        'Analyse de marché et chaînes de valeur',
        'Évaluation d\'impact social et environnemental',
        'Recherche appliquée en développement durable',
        'Études de base et diagnostics',
        'Capitalisation d\'expériences'
      ],
      approach: 'Notre approche combine rigueur scientifique et pertinence pratique, impliquant tous les acteurs concernés dans le processus de recherche.'
    },
    'cooperation-internationale': {
      title: 'Coopération internationale',
      description: 'Facilitation de partenariats entre acteurs nationaux et internationaux pour l\'adoption de solutions concrètes et durables.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80',
      content: 'Nous facilitons la création et le renforcement de partenariats stratégiques entre organisations locales et internationales, favorisant l\'échange de connaissances et le développement de solutions adaptées.',
      features: [
        'Mise en réseau d\'acteurs',
        'Partenariats stratégiques',
        'Coordination multi-acteurs',
        'Échange de bonnes pratiques',
        'Renforcement institutionnel',
        'Mobilisation de ressources',
        'Dialogue politique'
      ],
      approach: 'Notre méthode privilégie la construction de relations durables basées sur la confiance mutuelle et l\'alignement des objectifs communs.'
    },
    'gestion-projets': {
      title: 'Gestion des projets/Programmes',
      description: 'Conception, exécution, suivi-évaluation et accompagnement de projets/programmes multisectoriels avec gestion objective et apprentissage continu.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
      content: 'Nous accompagnons vos projets de la conception à la capitalisation, en garantissant une gestion rigoureuse, transparente et orientée résultats.',
      features: [
        'Conception de projets',
        'Planification stratégique',
        'Suivi-évaluation continu',
        'Gestion budgétaire et financière',
        'Rapportage et capitalisation',
        'Gestion des risques',
        'Apprentissage organisationnel'
      ],
      approach: 'Notre gestion de projet s\'appuie sur des méthodes éprouvées et une approche adaptative qui s\'ajuste aux réalités du terrain.'
    },
    'formations-coaching': {
      title: 'Formations et Coaching',
      description: 'Programmes de formation et coaching pour renforcer les capacités et compétences des partenaires et bénéficiaires.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80',
      content: 'Nous développons les compétences de vos équipes à travers des programmes de formation sur mesure et un accompagnement personnalisé.',
      features: [
        'Formation sur mesure',
        'Coaching individuel et collectif',
        'Renforcement des capacités',
        'Transfert de compétences',
        'Accompagnement personnalisé',
        'Formation de formateurs',
        'Suivi post-formation'
      ],
      approach: 'Nos formations sont pratiques, interactives et directement applicables, avec un suivi pour garantir l\'appropriation des compétences.'
    },
    'achats-performances': {
      title: 'Achats de performances',
      description: 'Services d\'achats de performances pour optimiser les résultats et l\'efficacité des projets et programmes.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80',
      content: 'Nous optimisons vos investissements en liant les paiements aux résultats obtenus, garantissant une meilleure efficacité et un impact réel.',
      features: [
        'Optimisation des résultats',
        'Mesure de performance',
        'Amélioration continue',
        'Efficacité opérationnelle',
        'ROI amélioré',
        'Gestion par objectifs',
        'Évaluation de résultats'
      ],
      approach: 'Notre modèle d\'achat de performances aligne les incitations sur les résultats, créant une dynamique d\'excellence.'
    }
  }

  const service = services[slug] || services['etudes-recherches']

  return (
    <div className="service-detail-page">
      <motion.section 
        className="service-detail-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ backgroundImage: `linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(26, 26, 26, 0.6) 100%), url(${service.image})` }}
      >
        <div className="container">
          <Link to="/services" className="back-link">
            <FiArrowLeft /> Retour aux services
          </Link>
          <div className="service-detail-hero-content">
            <h1 className="page-title">{service.title}</h1>
            <p className="page-subtitle">{service.description}</p>
          </div>
        </div>
      </motion.section>

      <section className="service-detail-content-section">
        <div className="container">
          <div className="service-detail-layout">
            <div className="service-main-content">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="content-block"
              >
                <h2>Notre approche</h2>
                <p>{service.content}</p>
                <p>{service.approach}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="content-block"
              >
                <h2>Nos prestations</h2>
                <ul className="features-list">
                  {service.features.map((feature, index) => (
                    <li key={index}>
                      <FiCheckCircle /> {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.aside
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="service-sidebar"
            >
              <div className="sidebar-card">
                <h3>Besoin d'aide ?</h3>
                <p>Contactez-nous pour discuter de votre projet</p>
                <Link to="/contact" className="btn btn-primary">
                  Nous contacter
                </Link>
              </div>
              <div className="sidebar-card">
                <h3>Autres services</h3>
                <ul className="services-links">
                  {Object.entries(services).map(([key, srv]) => (
                    key !== slug && (
                      <li key={key}>
                        <Link to={`/services/${key}`}>{srv.title}</Link>
                      </li>
                    )
                  ))}
                </ul>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServiceDetail


