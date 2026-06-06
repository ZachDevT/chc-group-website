import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import './WhatsAppButton.css'

const WhatsAppButton = () => {
  // WhatsApp number - format: countrycode+number (no + sign)
  const whatsappNumber = '243839529477'
  const message = 'Bonjour, je souhaite en savoir plus sur CHC Group.'
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <FaWhatsapp className="whatsapp-icon" />
      <span className="whatsapp-tooltip">Contactez-nous sur WhatsApp</span>
    </motion.a>
  )
}

export default WhatsAppButton

