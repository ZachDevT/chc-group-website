import { motion } from 'framer-motion'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="footer-brand"
          >
            <div className="footer-logo">
              <img src="/assets/logo/LOGO PNG.png" alt="CHC Group" onError={(e) => { e.target.style.display = 'none' }} />
              <div className="footer-logo-text">
                <span className="footer-logo-main">CHC</span>
                <span className="footer-logo-sub">GROUP</span>
              </div>
            </div>
            <p className="footer-tagline">
              Ensemble pour forger notre horizon
            </p>
            <p className="footer-description">
              Solutions innovantes pour le développement durable et la prospérité partagée.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="footer-links"
          >
            <div className="footer-column">
              <h4 className="footer-title">Services</h4>
              <ul className="footer-list">
                <li><a href="#services">Études et Recherches</a></li>
                <li><a href="#services">Coopération internationale</a></li>
                <li><a href="#services">Gestion des projets</a></li>
                <li><a href="#services">Formations et Coaching</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4 className="footer-title">Entreprise</h4>
              <ul className="footer-list">
                <li><a href="#about">À propos</a></li>
                <li><a href="#team">Notre équipe</a></li>
                <li><a href="#partners">Partenaires</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4 className="footer-title">Contact</h4>
              <ul className="footer-list">
                <li>+243 993983871</li>
                <li>contact@chcgroup.cd</li>
                <li>Kinshasa, RD. Congo</li>
                <li>Commune de la Gombe</li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="footer-bottom"
        >
          <p className="footer-copyright">
            © {currentYear} CHC Group. Tous droits réservés.
          </p>
          <p className="footer-slogan">
            Congo Horizon Challenges Group
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

