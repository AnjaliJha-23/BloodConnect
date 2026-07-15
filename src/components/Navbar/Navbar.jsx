import { useState, useEffect } from "react";
import {
  useNavigate,
  useLocation,
  Link,
  NavLink,
} from "react-router-dom";
import { FaHeart, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const SCROLL_TARGETS = {
  home: "home",
  findDonor: "find-donor",
  requestBlood: "emergency-request",
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navigate = useNavigate();
  const location = useLocation();

  /* Navbar shadow */

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu */

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  /* Detect visible section */

  useEffect(() => {
    if (location.pathname !== "/") return;

    const sections = [
      "home",
      "find-donor",
      "emergency-request",
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;

      for (const id of sections) {
        const section = document.getElementById(id);

        if (!section) continue;

        if (
          scrollPos >= section.offsetTop &&
          scrollPos < section.offsetTop + section.offsetHeight
        ) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
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

  return (
    <header
      className={`navbar ${scrolled ? "navbar-scrolled" : ""
        }`}
    >
      <div className="container navbar-inner">

        <a
          href="/"
          className="navbar-logo"
          onClick={handleHomeClick}
        >
          <FaHeart className="navbar-logo-icon" />

          <span>BloodConnect</span></a>

          <nav
            className={`navbar-links ${menuOpen ? "navbar-links-open" : ""
              }`}
          >
            <NavLink
              to="/"
              end
              onClick={handleHomeClick}
              className={`navbar-link ${activeSection === "home" &&
                  location.pathname === "/"
                  ? "active-link"
                  : ""
                }`}
            >
              Home
            </NavLink>

            <button
              className={`navbar-link navbar-link-btn ${activeSection === "find-donor" &&
                  location.pathname === "/"
                  ? "active-link"
                  : ""
                }`}
              onClick={() =>
                handleSectionClick(
                  SCROLL_TARGETS.findDonor
                )
              }
            >
              Find Donor
            </button>

            <button
              className={`navbar-link navbar-link-btn ${activeSection === "emergency-request" &&
                  location.pathname === "/"
                  ? "active-link"
                  : ""
                }`}
              onClick={() =>
                handleSectionClick(
                  SCROLL_TARGETS.requestBlood
                )
              }
            >
              Request Blood
            </button>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `navbar-link ${isActive ? "active-link" : ""
                }`
              }
            >
              About Us
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `navbar-link ${isActive ? "active-link" : ""
                }`
              }
            >
              Contact Us
            </NavLink>

            <div className="navbar-auth navbar-auth-mobile">
              <Link
                to="/login"
                className="btn btn-outline navbar-btn-sm"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-primary navbar-btn-sm"
              >
                Register
              </Link>
            </div>
          </nav>

          <div className="navbar-auth">
            <Link
              to="/login"
              className="btn btn-outline navbar-btn-sm"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn btn-primary navbar-btn-sm"
            >
              Register
            </Link>
          </div>

          <button
            className="navbar-toggle"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

      </div>
    </header>
  );
};

export default Navbar;