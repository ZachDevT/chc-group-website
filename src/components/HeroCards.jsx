import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import './HeroCards.css'

const HeroCards = () => {
  const cards = [
    {
      title: 'Ensemble pour forger notre horizon',
      description: 'Des solutions ancrées dans la réalité congolaise depuis notre création'
    },
    {
      title: 'Expertise pluridisciplinaire',
      description: 'Conception, suivi et évaluation de projets multisectoriels'
    },
    {
      title: 'Coopération et impact partagé',
      description: 'Nous relions partenaires nationaux et internationaux pour des résultats concrets'
    }
  ]

  return (
    <section className="hero-cards-section">
      <div className="hero-cards-container">
        <div className="hero-cards-scroll">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="hero-card"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <h3 className="hero-card-title">{card.title}</h3>
              <p className="hero-card-description">{card.description}</p>
              <div className="hero-card-arrow">
                <FiArrowRight />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroCards





