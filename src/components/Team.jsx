import { motion } from 'framer-motion'
import './Team.css'

const Team = () => {
  const teamMembers = [
    {
      name: 'Germain NYEMBO',
      role: 'Directeur Général',
      title: 'Agri économiste',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      description: 'Expert en économie agricole avec une vision stratégique pour le développement durable.'
    },
    {
      name: 'HUGUETTE MINANI',
      role: 'Chargée des opérations',
      title: 'Juriste',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      description: 'Spécialiste en droit et gestion opérationnelle, garantissant l\'excellence dans l\'exécution des projets.'
    },
    {
      name: 'ALEXIS KAJIBWAMI',
      role: 'Chargé de communication',
      title: 'Artiste visuel',
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      description: 'Créatif et stratégique, il façonne l\'identité visuelle et la communication de CHC Group.'
    }
  ]

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

        <motion.div
          className="team-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="team-card"
              variants={itemVariants}
              whileHover={{ y: -12, scale: 1.02 }}
            >
              <div className="team-image-wrapper">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-overlay">
                  <p className="team-description">{member.description}</p>
                </div>
              </div>
              <div className="team-info">
                <h3 className="team-name">{member.name}</h3>
                <p className="team-title">{member.title}</p>
                <p className="team-role">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Team

