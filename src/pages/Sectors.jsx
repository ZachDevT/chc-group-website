import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiSun, FiShield, FiTrendingUp, FiBarChart2, FiUsers, FiTarget, FiArrowRight } from 'react-icons/fi'
import Sectors from '../components/Sectors'
import './Sectors.css'

const SectorsPage = () => {
  return (
    <div className="sectors-page">
      <motion.section 
        className="sectors-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="sectors-hero-content">
            <h1 className="page-title">Nos Secteurs d'Activités</h1>
            <p className="page-subtitle">
              Des domaines d'expertise variés pour répondre aux défis du développement durable
            </p>
          </div>
        </div>
      </motion.section>
      <Sectors />
    </div>
  )
}

export default SectorsPage

