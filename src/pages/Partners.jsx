import { motion } from 'framer-motion'
import Partners from '../components/Partners'
import './Partners.css'

const PartnersPage = () => {
  return (
    <div className="partners-page">
      <motion.section 
        className="partners-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="partners-hero-content">
            <h1 className="page-title">Nos Partenaires</h1>
            <p className="page-subtitle">
              Des organisations de confiance qui partagent notre vision du développement durable
            </p>
          </div>
        </div>
      </motion.section>
      <Partners />
    </div>
  )
}

export default PartnersPage


