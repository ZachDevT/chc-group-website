import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import './AboutCHC.css'

const AboutCHC = () => {
  return (
    <section className="about-chc-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="about-chc-content"
        >
          <div className="about-chc-text">
            <h2 className="about-chc-title">À propos de CHC</h2>
            <p className="about-chc-description">
              Congo Horizon Challenges Group est un cabinet de droit congolais qui propose des services et solutions innovantes dans le domaine de la conception, du suivi-évaluation des projets/programmes multisectoriels. Les services de CHC Group permettent une gestion objective de vos projets et programmes et un apprentissage sur base des leçons tirées des actions menées.
            </p>
            <p className="about-chc-description">
              Grâce à un ensemble des compétences pluridisciplinaires dont il dispose, le groupe CHC a réussi à orienter ses partenaires nationaux et internationaux dans l'adoption des solutions concrètes pour l'éradication de l'extrême pauvreté et de promotion d'une prospérité partagée. De nombreuses études et recherches conduites par les experts de CHC Group se rapportent au domaine de la sécurité alimentaire, le développement des chaînes de valeur et marchés, des droits humains, l'analyse et la résolution pacifique des conflits ainsi que la gestion et la protection des ressources naturelles.
            </p>
            <p className="about-chc-highlight">
              Nous sommes les « meilleures perspectives » sur lesquelles vous pouvez compter pour une solution parfaite.
            </p>
            <Link to="/about" className="about-chc-link">
              En savoir plus <FiArrowRight />
            </Link>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="about-chc-visual"
          >
            <div className="about-chc-stats">
              <div className="stat-card">
                <div className="stat-number">+300</div>
                <div className="stat-label">Projets accompagnés</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">60+</div>
                <div className="stat-label">Années d'expertise</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100%</div>
                <div className="stat-label">Engagement qualité</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutCHC





