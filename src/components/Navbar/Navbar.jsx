import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link, NavLink } from "react-router-dom";
import { FaHeart, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import toast from "react-hot-toast";

const SCROLL_TARGETS = {
  home: "home",
  findDonor: "find-donor",
  requestBlood: "emergency-request",
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("home");

  const navigate = useNavigate();
  const location = useLocation();

  // Update logged-in user
  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    updateUser();

    window.addEventListener("storage", updateUser);

    return () => window.removeEventListener("storage", updateUser);
  }, []);

  // Navbar shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu after changing page
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Highlight active section on Home page
  useEffect(() => {
    if (location.pathname !== "/") return;

    // We track the inner feature blocks sequentially
    const sections = ["find-donor", "emergency-request"];

    const handleScroll = () => {
      // FIX: Force 'home' highlight instantly when the user is at the top fold of the screen
      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }

      // Buffer clearance padding to accommodate sticky header bounds nicely
      const scrollPos = window.scrollY + 140;
      let matched = false;

      for (const id of sections) {
        const section = document.getElementById(id);

        if (!section) continue;

        if (
          scrollPos >= section.offsetTop &&
          scrollPos < section.offsetTop + section.offsetHeight
        ) {
          setActiveSection(id);
          matched = true;
          break;
        }
      }

      // Default fallback state if coordinates slide outside section blocks
      if (!matched) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger immediate check on component mount framework cycles

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSectionClick = (sectionId) => {
    if (location.pathname === "/") {
      scrollToSection(sectionId);
    } else {
      navigate("/", {
        state: {
          scrollTo: sectionId,
        },
      });
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();

    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("storage"));

    toast.success("Logged out successfully.");

    navigate("/", { replace: true });
  };

  return (
    <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo" onClick={handleHomeClick}>
          <FaHeart className="navbar-logo-icon" />
          <span>BloodConnect</span>
        </Link>

        <nav className={`navbar-links ${menuOpen ? "navbar-links-open" : ""}`}>
          <NavLink
            to="/"
            end
            onClick={handleHomeClick}
            className={`navbar-link ${
              activeSection === "home" && location.pathname === "/"
                ? "active-link"
                : ""
            }`}>
            Home
          </NavLink>

          <button
            className={`navbar-link navbar-link-btn ${
              activeSection === "find-donor" && location.pathname === "/"
                ? "active-link"
                : ""
            }`}
            onClick={() => handleSectionClick(SCROLL_TARGETS.findDonor)}>
            Find Donor
          </button>

          <button
            className={`navbar-link navbar-link-btn ${
              activeSection === "emergency-request" && location.pathname === "/"
                ? "active-link"
                : ""
            }`}
            onClick={() => handleSectionClick(SCROLL_TARGETS.requestBlood)}>
            Request Blood
          </button>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `navbar-link ${isActive ? "active-link" : ""}`
            }>
            About Us
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `navbar-link ${isActive ? "active-link" : ""}`
            }>
            Contact Us
          </NavLink>

          {/* Mobile Auth */}
          <div className="navbar-auth navbar-auth-mobile">
            {user ? (
              <>
                <Link to="/dashboard" className="btn btn-outline navbar-btn-sm">
                  Dashboard
                </Link>

                <button
                  className="btn btn-primary navbar-btn-sm"
                  onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline navbar-btn-sm">
                  Login
                </Link>

                <Link to="/register" className="btn btn-primary navbar-btn-sm">
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Desktop Auth */}
        <div className="navbar-auth">
          {user ? (
            <>
              <Link to="/dashboard" className="btn btn-outline navbar-btn-sm">
                Dashboard
              </Link>

              <button
                className="btn btn-primary navbar-btn-sm"
                onClick={handleLogout}
                type="button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline navbar-btn-sm">
                Login
              </Link>

              <Link to="/register" className="btn btn-primary navbar-btn-sm">
                Register
              </Link>
            </>
          )}
        </div>

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
          type="button">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;

export { SCROLL_TARGETS };
