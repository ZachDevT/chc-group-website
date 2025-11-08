import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import './App.css'

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
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
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
          <ChatBot />
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App
