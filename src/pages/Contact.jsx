import { motion } from 'framer-motion'
import { FiPhone, FiMapPin, FiMail, FiWatch } from 'react-icons/fi'
import Contact from '../components/Contact'
import './Contact.css'

const ContactPage = () => {
  return (
    <div className="contact-page">
      <motion.section
        className="contact-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="contact-hero-content">
            <h1 className="page-title">Contactez-nous</h1>
            <p className="page-subtitle">
              Nous sommes là pour répondre à toutes vos questions et discuter de vos projets
            </p>
          </div>
        </div>
      </motion.section>

      <Contact />

      <section className="contact-info-section">
        <div className="container">
          <div className="contact-info-grid">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="contact-info-card"
            >
              <div className="contact-info-icon"><FiPhone /></div>
              <h3>Téléphone</h3>
              <p>+243 992 150 129</p>
              <p>Lun - Ven: 8h00 - 18h00</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="contact-info-card"
            >
              <div className="contact-info-icon"><FiMail /></div>
              <h3>Email</h3>
              <p><a href="mailto:contact@chcgroup.cd">contact@chcgroup.cd</a></p>
              <p><a href="mailto:admin@chc-group.org">admin@chc-group.org</a></p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="contact-info-card"
            >
              <div className="contact-info-icon"><FiMapPin /></div>
              <h3>Adresse</h3>
              <p>Kinshasa, RD. Congo</p>
              <p>Commune de la Gombe</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="contact-info-card"
            >
              <div className="contact-info-icon"><FiWatch /></div>
              <h3>Horaires</h3>
              <p>Lundi - Vendredi</p>
              <p>8h00 - 18h00</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage


