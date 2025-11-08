import { motion } from 'framer-motion'
import { FiEye, FiTarget } from 'react-icons/fi'
import './About.css'

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2 className="section-title">À propos de CHC Group</h2>
        </motion.div>

        <div className="about-content">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="about-text"
          >
            <h3 className="about-subtitle">Qui sommes-nous ?</h3>
            <p className="about-description">
              Congo Horizon Challenges group est un cabinet de droit congolais qui propose des services et solutions innovantes dans le domaine de la conception, du suivi-évaluation des projets/programmes multisectoriels. Les services de CHC group permettent une gestion objective de vos projets et programmes et un apprentissage sur base des leçons tirées des actions menées.
            </p>
            <p className="about-description">
              Grâce à un ensemble des compétences pluridisciplinaire qu'il dispose, le groupe CHC a réussi à orienter ses partenaires nationaux et internationaux dans l'adoption des solutions concrètes pour l'éradication de l'extrême pauvreté et de promotion d'une prospérité partagée. Des nombreuses études et recherches conduites par les experts de CHC group se rapportent au domaine de la sécurité alimentaire, le développement des chaînes de valeur et marchés, des droits humains, analyse et résolution pacifique des conflits ainsi que dans la gestion et protection des ressources naturelles.
            </p>
            <p className="about-highlight">
              Nous sommes les « meilleures perspectives » sur lesquelles vous pouvez compter pour une solution parfaite.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="about-visual"
          >
            <div className="vision-mission">
              <div className="vm-card">
                <div className="vm-icon"><FiEye /></div>
                <h4 className="vm-title">Notre Vision</h4>
                <p className="vm-text">
                  Développer et fournir des solutions innovantes qui répondent aux besoins de nos partenaires avec un regard tourné vers l'horizon
                </p>
              </div>
              <div className="vm-card">
                <div className="vm-icon"><FiTarget /></div>
                <h4 className="vm-title">Notre Mission</h4>
                <p className="vm-text">
                  Vous apporter une réponse adaptée à vos besoins présents et futurs pour une prospérité partagée
                </p>
              </div>
            </div>
            <div className="about-statement">
              <p>
                CHC group se veut être à l'avant-garde de la recherche-action participative et du développement durable. De la conception, exécution au suivi/accompagnement de projets/programmes, nous disposons d'une large gamme d'expertises pour apporter une réponse adaptée à vos défis de gestion et développement sans enfreindre les générations futures.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

