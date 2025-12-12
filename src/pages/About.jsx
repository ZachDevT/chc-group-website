import { motion } from 'framer-motion'
import { FiUsers, FiAward, FiTrendingUp } from 'react-icons/fi'
import AboutSection from '../components/About'
import Values from '../components/Values'
import Team from '../components/Team'
import Stats from '../components/Stats'
import CTA from '../components/CTA'
import SEO from '../components/SEO.jsx'
import './About.css'

const AboutPage = () => {
  return (
    <div className="about-page">
      <SEO
        title="À propos"
        description="Découvrez CHC Group, un cabinet de droit congolais spécialisé dans la conception et le suivi-évaluation de projets/programmes multisectoriels. Notre vision, mission et valeurs."
      />
      <motion.section 
        className="about-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="about-hero-content">
            <h1 className="page-title">À propos de CHC Group</h1>
            <p className="page-subtitle">
              Un cabinet de droit congolais proposant des services et solutions innovantes 
              dans le domaine de la conception, du suivi-évaluation des projets/programmes multisectoriels.
            </p>
          </div>
        </div>
      </motion.section>

      <AboutSection />
      <Stats />
      <Values />
      
      <section className="why-choose-us">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="section-header"
          >
            <h2 className="section-title">Pourquoi nous choisir ?</h2>
            <p className="section-subtitle">
              Des avantages qui font la différence
            </p>
          </motion.div>

          <div className="features-grid">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="feature-card"
            >
              <div className="feature-icon"><FiUsers /></div>
              <h3>Équipe pluridisciplinaire</h3>
              <p>Des experts dans divers domaines travaillant ensemble pour vos projets</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="feature-card"
            >
              <div className="feature-icon"><FiAward /></div>
              <h3>Excellence reconnue</h3>
              <p>Des résultats prouvés et une réputation solide dans le secteur</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="feature-card"
            >
              <div className="feature-icon"><FiTrendingUp /></div>
              <h3>Approche innovante</h3>
              <p>Des solutions modernes et adaptées aux défis contemporains</p>
            </motion.div>
          </div>
        </div>
      </section>

      <Team />
      <CTA />
    </div>
  )
}

export default AboutPage

