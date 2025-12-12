import { motion } from 'framer-motion'
import { FiBriefcase, FiMapPin, FiClock, FiDollarSign, FiCalendar, FiMail, FiArrowRight } from 'react-icons/fi'
import { useRealtimeCollection } from '../hooks/useRealtimeCollection.js'
import SEO from '../components/SEO.jsx'
import './Recruitment.css'

const formatDate = (dateString) => {
  if (!dateString) return ''
  try {
    return new Date(dateString).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch {
    return dateString
  }
}

const Recruitment = () => {
  const { data: jobOffers, loading } = useRealtimeCollection('jobOffers', { 
    orderByField: 'createdAt'
  })

  const activeJobs = jobOffers?.filter(job => job.status === 'active') || []

  return (
    <div className="recruitment-page">
      <SEO
        title="Recrutement"
        description="Découvrez les opportunités de carrière chez CHC Group. Rejoignez notre équipe et contribuez à forger notre horizon ensemble."
      />
      
      <motion.section 
        className="recruitment-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="recruitment-hero-content">
            <h1 className="page-title">Rejoignez Notre Équipe</h1>
            <p className="page-subtitle">
              Contribuez à forger notre horizon ensemble. Découvrez les opportunités de carrière chez CHC Group.
            </p>
          </div>
        </div>
      </motion.section>

      <section className="recruitment-content">
        <div className="container">
          {loading ? (
            <div className="recruitment-empty-state">Chargement des offres d'emploi...</div>
          ) : activeJobs.length === 0 ? (
            <div className="recruitment-empty-state">
              <FiBriefcase size={48} style={{ marginBottom: '20px', opacity: 0.5 }} />
              <h3>Aucune offre d'emploi disponible pour le moment</h3>
              <p>Revenez bientôt pour découvrir de nouvelles opportunités de carrière.</p>
            </div>
          ) : (
            <div className="recruitment-grid">
              {activeJobs.map((job, index) => (
                <motion.article
                  key={job.id}
                  className="recruitment-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="recruitment-card-header">
                    <h2 className="recruitment-job-title">{job.title}</h2>
                    <div className="recruitment-job-meta">
                      <span><FiBriefcase /> {job.department}</span>
                      <span><FiMapPin /> {job.location}</span>
                      <span><FiClock /> {job.type}</span>
                    </div>
                  </div>

                  <div className="recruitment-card-body">
                    {job.description && (
                      <div className="recruitment-section">
                        <h3>Description</h3>
                        <p>{job.description}</p>
                      </div>
                    )}

                    {job.responsibilities && (
                      <div className="recruitment-section">
                        <h3>Responsabilités</h3>
                        <ul>
                          {job.responsibilities.split('\n').filter(line => line.trim()).map((item, idx) => (
                            <li key={idx}>{item.trim()}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {job.requirements && (
                      <div className="recruitment-section">
                        <h3>Exigences</h3>
                        <ul>
                          {job.requirements.split('\n').filter(line => line.trim()).map((item, idx) => (
                            <li key={idx}>{item.trim()}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {job.benefits && (
                      <div className="recruitment-section">
                        <h3>Avantages</h3>
                        <ul>
                          {job.benefits.split('\n').filter(line => line.trim()).map((item, idx) => (
                            <li key={idx}>{item.trim()}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="recruitment-card-footer">
                    <div className="recruitment-job-details">
                      {job.salary && (
                        <span><FiDollarSign /> {job.salary}</span>
                      )}
                      {job.applicationDeadline && (
                        <span><FiCalendar /> Échéance: {formatDate(job.applicationDeadline)}</span>
                      )}
                    </div>
                    <a 
                      href={`mailto:${job.contactEmail}?subject=Candidature - ${job.title}`}
                      className="btn btn-primary"
                    >
                      <FiMail /> Postuler maintenant <FiArrowRight />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Recruitment





