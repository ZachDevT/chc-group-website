import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { useRealtimeCollection } from '../hooks/useRealtimeCollection.js'
import './Footer.css'

const fallbackImages = [
  { id: 'od-3996', image: '/assets/OneDrive_1_19-11-2025/IMG_3996.JPG' },
  { id: 'od-3999', image: '/assets/OneDrive_1_19-11-2025/IMG_3999.JPG' },
  { id: 'od-4004', image: '/assets/OneDrive_1_19-11-2025/IMG_4004.JPG' },
  { id: 'od-4014', image: '/assets/OneDrive_1_19-11-2025/IMG_4014.JPG' },
  { id: 'od-4024', image: '/assets/OneDrive_1_19-11-2025/IMG_4024.JPG' },
  { id: 'od-4035', image: '/assets/OneDrive_1_19-11-2025/IMG_4035.JPG' },
  { id: 'od-4045', image: '/assets/OneDrive_1_19-11-2025/IMG_4045.JPG' },
  { id: 'od-4056', image: '/assets/OneDrive_1_19-11-2025/IMG_4056.JPG' },
  { id: 'od-4018', image: '/assets/OneDrive_1_19-11-2025/IMG_4018.JPG' }
]

const resolveUrl = (item) => item.image || item.url

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { data: remoteImages } = useRealtimeCollection('gallery', { orderByField: 'createdAt' })
  const galleryImages = remoteImages.length > 0 ? remoteImages.slice(0, 9) : fallbackImages.slice(0, 9)

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
            <div className="footer-social">
              <a href="https://www.facebook.com/share/1DAe4TC8H8/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/congo_horizon_challenges_?igsh=YjQ5OWg4aWxlMm93&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/company/congo-horizon-challenges-chc/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="https://wa.me/243839529477" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
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
                <li><a href="mailto:contact@chcgroup.cd">contact@chcgroup.cd</a></li>
                <li><a href="mailto:admin@chc-group.org">admin@chc-group.org</a></li>
                <li>Kinshasa, RD. Congo</li>
                <li>Commune de la Gombe</li>
              </ul>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="footer-column footer-gallery-column"
            >
              <h4 className="footer-title">Ressources</h4>
              <div className="footer-gallery-grid">
                {galleryImages.map((image, index) => (
                  <Link
                    key={image.id || index}
                    to="/resources"
                    className="footer-gallery-item"
                  >
                    <img 
                      src={resolveUrl(image)} 
                      alt={image.title || 'Galerie CHC'} 
                      onError={(e) => {
                        e.target.src = '/assets/OneDrive_1_19-11-2025/IMG_3996.JPG'
                      }}
                    />
                  </Link>
                ))}
              </div>
            </motion.div>
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

