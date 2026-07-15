import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { FaHeart, FaBars, FaTimes } from 'react-icons/fa'
import './Navbar.css'

// Section ids that live on the Home page and are reachable from anywhere
const SCROLL_TARGETS = {
  findDonor: 'find-donor',
  requestBlood: 'emergency-request',
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])
  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (!element) return;

    const navbarHeight = 90;

    const elementTop =
      element.getBoundingClientRect().top + window.pageYOffset;

    const offset =
      elementTop -
      (window.innerHeight / 2 - element.offsetHeight / 2) -
      navbarHeight / 2;

    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  };

  const handleSectionClick = (sectionId) => {
    if (location.pathname === '/') {
      scrollToSection(sectionId)
    } else {
      // Navigate home first, then scroll once Home has mounted
      navigate('/', { state: { scrollTo: sectionId } })
    }
  }

  const handleHomeClick = (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-inner">
        <a href="/" className="navbar-logo" onClick={handleHomeClick}>
          <FaHeart className="navbar-logo-icon" />
          <span>BloodConnect</span>
        </a>

        <nav className={`navbar-links ${menuOpen ? 'navbar-links-open' : ''}`}>
          <a href="/" onClick={handleHomeClick} className="navbar-link active-link">Home</a>
          <button className="navbar-link navbar-link-btn" onClick={() => handleSectionClick(SCROLL_TARGETS.findDonor)}>
            Find Donor
          </button>
          <button className="navbar-link navbar-link-btn" onClick={() => handleSectionClick(SCROLL_TARGETS.requestBlood)}>
            Request Blood
          </button>
          <Link to="/about" className="navbar-link">About Us</Link>
          <Link to="/contact" className="navbar-link">Contact Us</Link>

          <div className="navbar-auth navbar-auth-mobile">
            <Link to="/login" className="btn btn-outline navbar-btn-sm">Login</Link>
            <Link to="/register" className="btn btn-primary navbar-btn-sm">Register</Link>
          </div>
        </nav>

        <div className="navbar-auth">
          <Link to="/login" className="btn btn-outline navbar-btn-sm">Login</Link>
          <Link to="/register" className="btn btn-primary navbar-btn-sm">Register</Link>
        </div>

        <button className="navbar-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  )
}

export default Navbar
export { SCROLL_TARGETS }
