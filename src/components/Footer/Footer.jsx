import { useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import {
  FaHeart,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");

  const scrollToSection = (id) => {
    if (location.pathname === "/") {
      const section = document.getElementById(id);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      navigate("/", {
        state: {
          scrollTo: id,
        },
      });
    }
  };

  const handleNewsletterSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await api.post("/newsletter/subscribe", {
      email,
    });

    toast.success(res.data.message);
    setEmail("");

  } catch (err) {
    toast.error(
      err.response?.data?.message ||
      "Something went wrong"
    );
  }
};

  return (
    <footer className="footer">

      <div className="container footer-grid">

        {/* Brand */}

        <div className="footer-brand">

          <div className="footer-logo">
            <FaHeart />
            <span>BloodConnect</span>
          </div>

          <p className="footer-tagline">
            Connecting Donors, Saving Lives.
            Making blood donation accessible to everyone,
            everywhere.
          </p>

          <div className="footer-social">

            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaTwitter />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaLinkedinIn />
            </a>

          </div>

        </div>

        {/* Quick Links */}

        <div className="footer-col">

          <h4>Quick Links</h4>

          <ul>

            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <button onClick={() => scrollToSection("find-donor")}>
                Find Donor
              </button>
            </li>

            <li>
              <button onClick={() => scrollToSection("emergency-request")}>
                Request Blood
              </button>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>

          </ul>

        </div>

        {/* Support */}

        <div className="footer-col">

          <h4>Support</h4>

          <ul>

            <li><Link to="/contact">Help Center</Link></li>

            <li><Link to="/contact">FAQs</Link></li>

            <li><Link to="/contact">Privacy Policy</Link></li>

            <li><Link to="/contact">Terms & Conditions</Link></li>

          </ul>

        </div>

        {/* Contact */}

        <div className="footer-col">

          <h4>Contact Us</h4>

          <ul className="footer-contact">

            <li>
              <FaPhoneAlt />
              +91 98765 43210
            </li>

            <li>
              <FaEnvelope />
              support@bloodconnect.com
            </li>

            <li>
              <FaMapMarkerAlt />
              New Delhi, India
            </li>

          </ul>

        </div>

        {/* Newsletter */}

        <div className="footer-col footer-newsletter">

          <h4>Newsletter</h4>

          <p>
            Subscribe to receive blood donation updates,
            awareness campaigns and emergency alerts.
          </p>

          <form
            className="newsletter-form"
            onSubmit={handleNewsletterSubmit}
          >

            <input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>

            <button type="submit">
              <FaPaperPlane />
            </button>

          </form>

        </div>

      </div>

      <div className="footer-bottom">

        © {new Date().getFullYear()} BloodConnect. All Rights Reserved.

      </div>

    </footer>
  );
};

export default Footer;
