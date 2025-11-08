import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Hero.css'

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0)

  const heroImages = [
    {
      url: 'https://images.pexels.com/photos/6077296/pexels-photo-6077296.jpeg?_gl=1*1fdw4jn*_ga*MTIxODE0NDA0OS4xNzYyNTc4MDk0*_ga_8JE65Q40S6*czE3NjI1NzgwOTQkbzEkZzEkdDE3NjI1NzgxMDYkajQ4JGwwJGgw',
      title: 'Ensemble pour forger notre horizon',
      subtitle: 'Solutions innovantes pour un développement durable'
    },
    {
      url: 'https://images.pexels.com/photos/1181516/pexels-photo-1181516.jpeg?auto=compress&cs=tinysrgb&w=1920',
      title: 'Expertise pluridisciplinaire',
      subtitle: 'Conception, suivi-évaluation et accompagnement de projets'
    },
    {
      url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920',
      title: 'Partenaires de confiance',
      subtitle: 'Orientation vers des solutions concrètes pour l\'éradication de l\'extrême pauvreté'
    },
    {
      url: 'https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=1920',
      title: 'Recherche-action participative',
      subtitle: 'À l\'avant-garde du développement durable'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  const goToImage = (index) => {
    setCurrentImage(index)
  }

  return (
    <section className="hero">
      <div className="hero-slider">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="hero-slide"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(26, 26, 26, 0.7) 0%, rgba(26, 26, 26, 0.5) 100%), url(${heroImages[currentImage].url})`
            }}
          >
            <div className="hero-content">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="hero-accent"
              >
                <div className="accent-l"></div>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="hero-title"
              >
                {heroImages[currentImage].title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="hero-subtitle"
              >
                {heroImages[currentImage].subtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="hero-actions"
              >
                <a href="#services" className="btn btn-primary">
                  Nos Services
                </a>
                <a href="#about" className="btn btn-secondary">
                  En savoir plus
                </a>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="hero-indicators">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`indicator ${currentImage === index ? 'active' : ''}`}
              onClick={() => goToImage(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="hero-nav">
          <button
            className="hero-nav-btn prev"
            onClick={() => setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="hero-nav-btn next"
            onClick={() => setCurrentImage((prev) => (prev + 1) % heroImages.length)}
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero


