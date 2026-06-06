import { motion } from 'framer-motion'
import { useRealtimeCollection } from '../hooks/useRealtimeCollection.js'
import './Partners.css'

const fallbackPartners = [
  {
    name: 'Misereor',
    logo: '/assets/patners/images.png'
  },
  {
    name: 'Interpeace',
    logo: '/assets/patners/2019-EN-Interpeace.png'
  },
  {
    name: 'Entraide et Fraternité',
    logo: '/assets/patners/1691496610226.png'
  },
  {
    name: 'Action de Carême',
    logo: '/assets/patners/NEW-LOGO-ADC.png'
  }
]

const partnerNameOverrides = [
  { match: 'images.png', name: 'Misereor' },
  { match: '2019-en-interpeace', name: 'Interpeace' },
  { match: '1691496610226', name: 'Entraide et Fraternité' },
  { match: 'new-logo-adc', name: 'Action de Carême' }
]

const normalizeText = (value, fallback) => {
  if (typeof value !== 'string') return fallback
  const trimmed = value.trim()
  return trimmed || fallback
}

const normalizeWebsite = (value) => {
  if (typeof value !== 'string') return ''
  const trimmed = value.trim()
  if (!trimmed) return ''
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

const Partners = () => {
  const { data: partners, loading } = useRealtimeCollection('partners', { orderByField: 'createdAt' })
  const sourcePartners = partners.length ? partners : fallbackPartners
  const displayPartners = sourcePartners.map((partner, index) => {
    const logo = typeof partner.logo === 'string' ? partner.logo.toLowerCase() : ''
    const override = partnerNameOverrides.find((item) => logo.includes(item.match))

    return {
      ...partner,
      displayName: override?.name || normalizeText(partner.name, `Partenaire ${index + 1}`),
      websiteUrl: normalizeWebsite(partner.website)
    }
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  return (
    <section id="partners" className="partners">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2 className="section-title">Nos Partenaires</h2>
          <p className="section-subtitle">
            Des organisations de confiance qui partagent notre vision du développement durable
          </p>
        </motion.div>

        {loading && <div className="partner-loading">Chargement des partenaires…</div>}

        {!loading && (
          <motion.div
            className="partners-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {displayPartners.map((partner, index) => (
              <motion.div
                key={partner.id || index}
                className="partner-card"
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.05 }}
              >
                <span className="partner-chip">Organisation partenaire</span>
                <div className="partner-logo-wrapper">
                  <img
                    src={partner.logo}
                    alt={partner.displayName}
                    className="partner-logo"
                  />
                </div>
                <p className="partner-name">{partner.displayName}</p>
                {partner.websiteUrl ? (
                  <a
                    href={partner.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="partner-link"
                  >
                    Visiter le site
                  </a>
                ) : (
                  <p className="partner-caption">Collaboration pour un impact durable</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Partners



