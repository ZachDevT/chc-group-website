import Hero from '../components/Hero'
import HeroCards from '../components/HeroCards.jsx'
import AboutCHC from '../components/AboutCHC.jsx'
import Services from '../components/Services'
import Sectors from '../components/Sectors'
import About from '../components/About'
import Values from '../components/Values'
import Team from '../components/Team'
import Partners from '../components/Partners'
import Contact from '../components/Contact'
import Stats from '../components/Stats'
import Testimonials from '../components/Testimonials'
import CTA from '../components/CTA'
import HomeBlog from '../components/HomeBlog.jsx'
import LocationMap from '../components/LocationMap.jsx'
import SEO from '../components/SEO.jsx'

const Home = () => {
  return (
    <>
      <SEO
        title="Accueil"
        description="CHC Group - Cabinet de droit congolais proposant des services et solutions innovantes dans le domaine de la conception, du suivi-évaluation des projets/programmes multisectoriels. Expertise en études, recherche, coopération internationale, gestion de projets et formations."
      />
      <Hero />
      <HeroCards />
      <AboutCHC />
      <Stats />
      <Services />
      <Sectors />
      <About />
      <Values />
      <Testimonials />
      <Team />
      <Partners />
      <HomeBlog />
      <LocationMap />
      <CTA />
      <Contact />
    </>
  )
}

export default Home





