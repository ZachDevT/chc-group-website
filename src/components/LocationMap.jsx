import { motion } from 'framer-motion'
import { FiMapPin, FiClock, FiMail, FiPhone } from 'react-icons/fi'
import './LocationMap.css'

const LocationMap = () => {
  const mapUrl = 'https://maps.app.goo.gl/wHDjxx4BsRD6gKWXA'
  const workingHours = 'Lundi - Vendredi: 8h - 17h'

  return (
    <section className="location-map-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2 className="section-title">Notre Localisation</h2>
          <p className="section-subtitle">
            Venez nous rendre visite ou contactez-nous
          </p>
        </motion.div>

        <div className="location-map-content">
          <motion.div
            className="location-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="location-info-card">
              <div className="location-info-item">
                <div className="location-info-icon">
                  <FiMapPin />
                </div>
                <div>
                  <h3>Adresse</h3>
                  <p>Kinshasa, RD. Congo<br />Commune de la Gombe</p>
                  <a 
                    href={mapUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="location-map-link"
                  >
                    Voir sur Google Maps →
                  </a>
                </div>
              </div>

              <div className="location-info-item">
                <div className="location-info-icon">
                  <FiClock />
                </div>
                <div>
                  <h3>Heures d'ouverture</h3>
                  <p>{workingHours}</p>
                </div>
              </div>

              <div className="location-info-item">
                <div className="location-info-icon">
                  <FiPhone />
                </div>
                <div>
                  <h3>Téléphone</h3>
                  <p>+243 993983871</p>
                </div>
              </div>

              <div className="location-info-item">
                <div className="location-info-icon">
                  <FiMail />
                </div>
                <div>
                  <h3>Email</h3>
                  <p><a href="mailto:contact@chcgroup.cd">contact@chcgroup.cd</a></p>
                  <p><a href="mailto:admin@chc-group.org">admin@chc-group.org</a></p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="location-map-wrapper"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.5!2d15.285863!3d-4.308071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMTgnMjkuMSJOIDE1wrAxNycwOS4xIkU!5e0!3m2!1sfr!2sus!4v1234567890123!5m2!1sfr!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '20px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CHC Group Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default LocationMap

