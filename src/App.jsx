import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ChatBot from './components/ChatBot'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Sectors from './pages/Sectors'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Team from './pages/Team'
import Partners from './pages/Partners'
import Recruitment from './pages/Recruitment'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminBlog from './pages/admin/AdminBlog.jsx'
import AdminCategories from './pages/admin/AdminCategories.jsx'
import AdminPartners from './pages/admin/AdminPartners.jsx'
import AdminGallery from './pages/admin/AdminGallery.jsx'
import AdminTeam from './pages/admin/AdminTeam.jsx'
import AdminRecruitment from './pages/admin/AdminRecruitment.jsx'
import AdminTestimonials from './pages/admin/AdminTestimonials.jsx'
import AdminUsers from './pages/admin/AdminUsers.jsx'
import AdminSettings from './pages/admin/AdminSettings.jsx'
import AdminBecomeSuperAdmin from './pages/admin/AdminBecomeSuperAdmin.jsx'
import { useAuth } from './context/AuthContext.jsx'
import './App.css'

const SiteLayout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
    <WhatsAppButton />
    <ChatBot />
  </>
)

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="page-loader">Chargement de l’espace admin...</div>
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/sectors" element={<Sectors />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/team" element={<Team />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/recruitment" element={<Recruitment />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="partners" element={<AdminPartners />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="team" element={<AdminTeam />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="recruitment" element={<AdminRecruitment />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="become-super-admin" element={<AdminBecomeSuperAdmin />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App
