import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import './CTA.css'

const CTA = () => {
  return (
    <section className="cta">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="cta-content"
        >
          <h2 className="cta-title">Prêt à transformer vos projets ?</h2>
          <p className="cta-description">
            Rejoignez nos partenaires et bénéficiez de solutions innovantes pour un développement durable et prospère.
          </p>
          <div className="cta-actions">
            <Link to="/contact" className="btn btn-primary cta-btn">
              Contactez-nous
              <FiArrowRight />
            </Link>
            <Link to="/services" className="btn btn-secondary cta-btn">
              Découvrir nos services
              <FiArrowRight />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA


