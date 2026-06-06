import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiChevronDown, 
  FiSearch, 
  FiMenu, 
  FiX,
  FiFileText,
  FiGlobe,
  FiBriefcase,
  FiBookOpen,
  FiUsers,
  FiTarget,
  FiTrendingUp,
  FiShield,
  FiBarChart2,
  FiZap,
  FiSun,
  FiHome,
  FiInfo,
  FiMail,
  FiImage,
  FiBook,
  FiFolder
} from 'react-icons/fi'
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import './Header.css'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredMenu, setHoveredMenu] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleSearchClick = () => {
    navigate('/blog?search=true')
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  useEffect(() => {
    if (isMobileMenuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY
      // Prevent body scroll when menu is open
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      // Restore body scroll when menu is closed
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }
    // Cleanup on unmount
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const servicesMenu = {
    title: 'Nos Services',
    description: 'Solutions complètes pour vos besoins de développement',
    items: [
      {
        icon: <FiFileText />,
        title: 'Études et Recherches',
        description: 'Conduite d\'études approfondies et recherches',
        link: '/services/etudes-recherches',
        color: '#3b82f6'
      },
      {
        icon: <FiGlobe />,
        title: 'Coopération internationale',
        description: 'Facilitation de partenariats internationaux',
        link: '/services/cooperation-internationale',
        color: '#10b981'
      },
      {
        icon: <FiBriefcase />,
        title: 'Gestion des projets/Programmes',
        description: 'Conception, exécution et suivi-évaluation',
        link: '/services/gestion-projets',
        color: '#f59e0b'
      },
      {
        icon: <FiBookOpen />,
        title: 'Formations et Coaching',
        description: 'Programmes de renforcement des capacités',
        link: '/services/formations-coaching',
        color: '#8b5cf6'
      },
      {
        icon: <FiZap />,
        title: 'Achats de performances',
        description: 'Optimisation des résultats et efficacité',
        link: '/services/achats-performances',
        color: '#ef4444'
      }
    ]
  }

  const sectorsMenu = {
    title: 'Secteurs d\'Activités',
    description: 'Domaines d\'expertise variés pour le développement durable',
    items: [
      {
        icon: <FiSun />,
        title: 'Agroécologie et développement durable',
        description: 'Pratiques agricoles durables',
        link: '/sectors#agroecologie',
        color: '#22c55e'
      },
      {
        icon: <FiShield />,
        title: 'Gouvernance et genre',
        description: 'Renforcement des institutions',
        link: '/sectors#governance',
        color: '#3b82f6'
      },
      {
        icon: <FiTrendingUp />,
        title: 'Gestion des ressources naturelles',
        description: 'Protection et gestion durable',
        link: '/sectors#ressources',
        color: '#10b981'
      },
      {
        icon: <FiBarChart2 />,
        title: 'Entrepreneuriat et développement des marchés',
        description: 'Soutien à l\'entrepreneuriat',
        link: '/sectors#entrepreneuriat',
        color: '#f59e0b'
      },
      {
        icon: <FiUsers />,
        title: 'Économie sociale et solidaire',
        description: 'Économie centrée sur l\'humain',
        link: '/sectors#economie-sociale',
        color: '#ef4444'
      },
      {
        icon: <FiTarget />,
        title: 'Gestion et transformation des conflits',
        description: 'Résolution pacifique des conflits',
        link: '/sectors#conflits',
        color: '#8b5cf6'
      }
    ]
  }

  const menuItems = [
    {
      label: 'Accueil',
      link: '/',
      icon: <FiHome />
    },
    {
      label: 'Services',
      link: '/services',
      submenu: servicesMenu
    },
    {
      label: 'Secteurs',
      link: '/sectors',
      submenu: sectorsMenu
    },
    {
      label: 'À propos',
      link: '/about',
      icon: <FiInfo />
    },
    {
      label: 'Blog',
      link: '/blog',
      icon: <FiBook />
    },
    {
      label: 'Ressources',
      link: '/resources',
      icon: <FiFolder />
    },
    {
      label: 'Équipe',
      link: '/team',
      icon: <FiUsers />
    },
    {
      label: 'Contact',
      link: '/contact',
      icon: <FiMail />
    }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="/assets/logo/LOGO PNG.png" alt="CHC Group" onError={(e) => { e.target.style.display = 'none' }} />
          <div className="logo-text">
            <span className="logo-main">CHC</span>
            <span className="logo-sub">GROUP</span>
          </div>
        </Link>

        <nav className="nav-desktop">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="nav-item"
              onMouseEnter={() => item.submenu && setHoveredMenu(index)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <Link 
                to={item.link} 
                className={`nav-link ${isActive(item.link) ? 'active' : ''}`}
              >
                {item.icon && <span className="nav-icon">{item.icon}</span>}
                {item.label}
                {item.submenu && <FiChevronDown className="nav-arrow" />}
              </Link>
              
              <AnimatePresence>
                {hoveredMenu === index && item.submenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="mega-menu"
                    onMouseEnter={() => setHoveredMenu(index)}
                    onMouseLeave={() => setHoveredMenu(null)}
                  >
                    <div className="mega-menu-content">
                      <div className="mega-menu-header">
                        <h3>{item.submenu.title}</h3>
                        <p>{item.submenu.description}</p>
                      </div>
                      <div className="mega-menu-grid">
                        {item.submenu.items.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.link}
                            className="mega-menu-item"
                            onClick={() => setHoveredMenu(null)}
                          >
                            <div className="mega-menu-icon" style={{ color: subItem.color }}>
                              {subItem.icon}
                            </div>
                            <div className="mega-menu-text">
                              <h4>{subItem.title}</h4>
                              <p>{subItem.description}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="header-actions">
          <button className="header-search" onClick={handleSearchClick} aria-label="Search">
            <FiSearch />
          </button>
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mobile-menu-backdrop"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3 }}
              className="nav-mobile"
            >
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className={`mobile-nav-link ${isActive(item.link) ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon && <span className="mobile-nav-icon">{item.icon}</span>}
                  {item.label}
                </Link>
              ))}
              <div className="mobile-social">
                <a href="https://www.facebook.com/share/1DAe4TC8H8/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="https://www.instagram.com/congo_horizon_challenges_?igsh=YjQ5OWg4aWxlMm93&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="https://www.linkedin.com/company/congo-horizon-challenges-chc/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
                <a href="https://wa.me/243839529477" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <FaWhatsapp />
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
