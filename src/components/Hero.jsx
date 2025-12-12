import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram, FiYoutube, FiSearch } from 'react-icons/fi'
import './Hero.css'

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = [
    '/assets/newHeros/finalhero.jpg',
    '/assets/newHeros/Okapi.png',
    '/assets/newHeros/leopard.jpg'
  ]

  const socialLinks = [
    { icon: <FiFacebook />, url: 'https://www.facebook.com/share/1DAe4TC8H8/?mibextid=wwXIfr', label: 'Facebook' },
    { icon: <FiTwitter />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <FiLinkedin />, url: 'https://www.linkedin.com/company/congo-horizon-challenges-chc/', label: 'LinkedIn' },
    { icon: <FiInstagram />, url: 'https://www.instagram.com/congo_horizon_challenges_?igsh=YjQ5OWg4aWxlMm93&utm_source=qr', label: 'Instagram' },
    { icon: <FiYoutube />, url: 'https://youtube.com', label: 'YouTube' }
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
              <span className="hero-title-abbr">CHC</span>
            </h1>
          </motion.div>

          <motion.p
            className="hero-slogan"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Ensemble pour forger notre horizon
          </motion.p>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Nous sommes une organisation dédiée au développement durable et à l'innovation
            en République Démocratique du Congo. Notre mission est de créer des opportunités,
            de renforcer les capacités et de bâtir un avenir meilleur pour tous.
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
                placeholder="Découvrez nos services..."
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

        {/* Social Links */}
        <div className="hero-social-links">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
              whileHover={{ x: -5, scale: 1.1 }}
              aria-label={social.label}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero


