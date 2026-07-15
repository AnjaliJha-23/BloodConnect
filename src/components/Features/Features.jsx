import { motion } from 'framer-motion'
import { FaShieldAlt, FaBolt, FaHospitalUser } from 'react-icons/fa'
import './Features.css'

const FEATURES = [
  {
    icon: <FaShieldAlt />,
    title: 'Verified Donors',
    desc: 'Every donor profile is verified with health and identity checks, so requests connect you with someone genuine.',
  },
  {
    icon: <FaBolt />,
    title: 'Fast Search',
    desc: 'Filter by blood group, city, and area to find a matching donor in seconds, not hours.',
  },
  {
    icon: <FaHospitalUser />,
    title: 'Trusted Hospitals',
    desc: 'Partnered with 180+ hospitals so urgent requests reach verified medical facilities directly.',
  },
]

const Features = () => {
  return (
    <section className="features section">
      <div className="container">
        <div className="section-header-center">
          <span className="eyebrow">Why BloodConnect</span>
          <h2 className="section-heading">Why Choose Us</h2>
        </div>

        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -8 }}
            >
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
