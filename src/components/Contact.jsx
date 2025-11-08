import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPhone, FiMapPin, FiMail } from 'react-icons/fi'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Merci pour votre message! Nous vous contacterons bientôt.')
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 1000)
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2 className="section-title">Contactez-nous</h2>
          <p className="section-subtitle">
            Prêt à discuter de votre projet? Nous sommes là pour vous aider.
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="contact-info"
          >
            <div className="contact-item">
              <div className="contact-icon"><FiPhone /></div>
              <div>
                <h3 className="contact-label">Téléphone</h3>
                <a href="tel:+243993983871" className="contact-value">
                  +243 993983871
                </a>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><FiMapPin /></div>
              <div>
                <h3 className="contact-label">Adresse</h3>
                <p className="contact-value">
                  Kinshasa, RD. Congo<br />
                  Commune de la Gombe
                </p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><FiMail /></div>
              <div>
                <h3 className="contact-label">Email</h3>
                <a href="mailto:contact@chcgroup.cd" className="contact-value">
                  contact@chcgroup.cd
                </a>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="name">Nom complet *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Votre nom"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="votre@email.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Téléphone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+243 XXX XXX XXX"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Votre message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default Contact

