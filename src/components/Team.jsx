import { motion } from 'framer-motion'
import { useRealtimeCollection } from '../hooks/useRealtimeCollection.js'
import './Team.css'

// Données par défaut (fallback)
const defaultTeamMembers = [
  {
    name: 'Germain NYEMBO',
    role: 'Directeur Général',
    title: 'Agri économiste',
    image: '/assets/team/Photo profil_Germain.png',
    description: 'Expert en économie agricole avec une vision stratégique pour le développement durable.'
  },
  {
    name: 'HUGUETTE MINANI',
    role: 'Chargée des opérations',
    title: 'Juriste',
    image: '/assets/team/Photo profil_Huguette.png',
    description: 'Spécialiste en droit et gestion opérationnelle, garantissant l\'excellence dans l\'exécution des projets.'
  },
  {
    name: 'ALEXIS KAJIBWAMI',
    role: 'Chargé de communication',
    title: 'Artiste visuel',
    image: '/assets/team/Photo profil_Alex.png',
    description: 'Créatif et stratégique, il façonne l\'identité visuelle et la communication de CHC Group.'
  }
]

const Team = () => {
  const { data: teamMembersFromDB, loading } = useRealtimeCollection('team', { orderByField: 'createdAt' })
  
  // Utiliser les données de Firestore si disponibles, sinon utiliser les données par défaut
  const teamMembers = teamMembersFromDB && teamMembersFromDB.length > 0 
    ? teamMembersFromDB 
    : defaultTeamMembers

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  return (
    <section id="team" className="team">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2 className="section-title">Notre Équipe</h2>
          <p className="section-subtitle">
            Des professionnels dévoués et expérimentés à votre service
          </p>
        </motion.div>

        {loading && (!teamMembersFromDB || teamMembersFromDB.length === 0) ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
            Chargement de l'équipe...
          </div>
        ) : (
          <motion.div
            className="team-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id || index}
                className="team-card"
                variants={itemVariants}
                whileHover={{ y: -12, scale: 1.02 }}
              >
                <div className="team-image-wrapper">
                  <div className="team-image">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      onError={(e) => {
                        // Fallback si l'image ne charge pas
                        if (member.image && !member.image.startsWith('/assets/')) {
                          e.target.src = '/assets/team/Photo profil_Germain.png'
                        }
                      }}
                    />
                  </div>
                  {member.description && (
                    <div className="team-overlay">
                      <p className="team-description">{member.description}</p>
                    </div>
                  )}
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  {member.title && <p className="team-title">{member.title}</p>}
                  <p className="team-role">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Team

