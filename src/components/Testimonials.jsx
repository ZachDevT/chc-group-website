import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMessageSquare, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import './Testimonials.css'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: 'Dr. Jean Mukamba',
      role: 'Directeur, Organisation Partenaire',
      content: 'CHC Group a transformé notre approche de gestion de projets. Leur expertise et leur professionnalisme sont remarquables. Nous avons vu des résultats concrets dans tous nos programmes.',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
    },
    {
      name: 'Marie Kabila',
      role: 'Coordinatrice de Programme',
      content: 'L\'équipe de CHC Group comprend vraiment les défis du développement. Leur approche participative et leurs solutions innovantes ont fait une différence significative dans nos communautés.',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
    },
    {
      name: 'Pierre Mutombo',
      role: 'Chef de Projet International',
      content: 'Travailler avec CHC Group a été une expérience exceptionnelle. Leur capacité à combiner recherche rigoureuse et action pratique est ce qui les distingue dans le secteur.',
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
    }
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="testimonials">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2 className="section-title">Ce que disent nos partenaires</h2>
          <p className="section-subtitle">
            Témoignages de confiance de nos clients et partenaires
          </p>
        </motion.div>

        <div className="testimonials-slider">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="testimonial-card"
            >
              <div className="testimonial-quote">
                <FiMessageSquare />
              </div>
              <p className="testimonial-content">{testimonials[currentIndex].content}</p>
              <div className="testimonial-author">
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].name}
                  className="testimonial-avatar"
                />
                <div className="testimonial-info">
                  <h4 className="testimonial-name">{testimonials[currentIndex].name}</h4>
                  <p className="testimonial-role">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="testimonials-controls">
            <button onClick={prevTestimonial} className="testimonial-btn">
              <FiChevronLeft />
            </button>
            <div className="testimonial-indicators">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${currentIndex === index ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button onClick={nextTestimonial} className="testimonial-btn">
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

