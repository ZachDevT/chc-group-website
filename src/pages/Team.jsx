import { motion } from 'framer-motion'
import Team from '../components/Team'
import './Team.css'

const TeamPage = () => {
  return (
    <div className="team-page">
      <motion.section 
        className="team-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="team-hero-content">
            <h1 className="page-title">Notre Équipe</h1>
            <p className="page-subtitle">
              Des professionnels dévoués et expérimentés à votre service
            </p>
          </div>
        </div>
      </motion.section>
      <Team />
    </div>
  )
}

export default TeamPage


