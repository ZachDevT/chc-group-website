import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch } from 'react-icons/fi'
import './Hero.css'

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = [
    '/assets/newHeros/finalhero.jpg',
    '/assets/newHeros/Okapi.png',
    '/assets/newHeros/leopard.jpg'
  ]



  // Auto-rotate images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="hero">
      <div className="hero-container">
        {/* Left Content Section */}
        <motion.div
          className="hero-content-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="hero-title">
              <span className="hero-title-main">Congo Horizon</span>
              <span className="hero-title-sub">Challenges</span>
            </h1>
          </motion.div>

          <motion.div
            className="hero-slogan-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p className="hero-slogan">Ensemble pour forger notre horizon</p>
          </motion.div>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Nous sommes une organisation dédiée au développement durable et à l'innovation
            en République Démocratique du Congo.
          </motion.p>

          <motion.div
            className="hero-search-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="hero-search-wrapper">
              <FiSearch className="hero-search-icon" />
              <input
                type="text"
                className="hero-search-input"
                placeholder="Découvrez nos services et projets..."
                readOnly
              />
              <button className="hero-search-btn">Rechercher</button>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Image Section with Complex Shapes */}
        <motion.div
          className="hero-image-section"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-image-container">
            {/* Decorative shapes */}
            <div className="hero-shape hero-shape-1"></div>
            <div className="hero-shape hero-shape-2"></div>
            <div className="hero-shape hero-shape-3"></div>

            {/* Image carousel with complex shape frame */}
            <div className="hero-image-frame">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  className="hero-image-wrapper"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.7 }}
                >
                  <img
                    src={images[currentImageIndex]}
                    alt={`Congo Horizon Challenges ${currentImageIndex + 1}`}
                    className="hero-image"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Image indicators */}
            <div className="hero-image-indicators">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`hero-indicator ${currentImageIndex === index ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>


      </div>
    </section>
  )
}

export default Hero


