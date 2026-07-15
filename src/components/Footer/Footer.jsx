// import { Link } from 'react-router-dom'
// import { FaHeart, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'
// import './Footer.css'

// const Footer = () => {
//   const handleNewsletterSubmit = (e) => {
//     e.preventDefault()
//     // Backend integration point: POST to /api/newsletter/subscribe
//     console.log('Subscribe to newsletter')
//   }

//   return (
//     <footer className="footer">
//       <div className="container footer-grid">
//         <div className="footer-brand">
//           <div className="footer-logo">
//             <FaHeart /> <span>BloodConnect</span>
//           </div>
//           <p className="footer-tagline">Connecting Donors. Saving Lives.</p>
//           <div className="footer-social">
//             <a href="/" aria-label="Facebook"><FaFacebookF /></a>
//             <a href="/" aria-label="Twitter"><FaTwitter /></a>
//             <a href="/" aria-label="Instagram"><FaInstagram /></a>
//             <a href="/" aria-label="LinkedIn"><FaLinkedinIn /></a>
//           </div>
//         </div>

//         <div className="footer-col">
//           <h4>Quick Links</h4>
//           <ul>
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/">Find Donor</Link></li>
//             <li><Link to="/">Request Blood</Link></li>
//             <li><Link to="/about">About</Link></li>
//             <li><Link to="/contact">Contact</Link></li>
//           </ul>
//         </div>

//         <div className="footer-col">
//           <h4>Support</h4>
//           <ul>
//             <li><Link to="/contact">Help Center</Link></li>
//             <li><Link to="/contact">FAQs</Link></li>
//             <li><Link to="/contact">Privacy Policy</Link></li>
//             <li><Link to="/contact">Terms &amp; Conditions</Link></li>
//           </ul>
//         </div>

//         <div className="footer-col">
//           <h4>Contact Us</h4>
//           <ul className="footer-contact">
//             <li><FaPhoneAlt /> +91 98765 43210</li>
//             <li><FaEnvelope /> support@bloodconnect.com</li>
//             <li><FaMapMarkerAlt /> 123, Health Street, New Delhi, India - 110001</li>
//           </ul>
//         </div>

//         <div className="footer-col footer-newsletter">
//           <h4>Newsletter</h4>
//           <p>Subscribe to get the latest updates and news.</p>
//           <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
//             <input type="email" placeholder="Enter your email" required />
//             <button type="submit" aria-label="Subscribe"><FaPaperPlane /></button>
//           </form>
//         </div>
//       </div>

//       <div className="footer-bottom">
//         <p>&copy; {new Date().getFullYear()} BloodConnect. All rights reserved.</p>
//       </div>
//     </footer>
//   )
// }

// export default Footer
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

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();

    // Backend Integration
    console.log("Newsletter Subscribe");
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
