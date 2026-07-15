import { motion } from 'framer-motion'
import { FaUserPlus, FaSearch, FaPhoneAlt, FaTint, FaSmile } from 'react-icons/fa'
import './HowItWorks.css'

const STEPS = [
  { icon: <FaUserPlus />, title: 'Register', desc: 'Create your account easily.' },
  { icon: <FaSearch />, title: 'Search Donor', desc: 'Search donors by blood group and location.' },
  { icon: <FaPhoneAlt />, title: 'Contact', desc: 'Connect with donor instantly.' },
  { icon: <FaTint />, title: 'Donate', desc: 'Donate blood and save a life.' },
  { icon: <FaSmile />, title: 'Save Lives', desc: 'Your donation can bring happiness to families.' },
]

const HowItWorks = () => {
  return (
    <section className="how-it-works section">
      <div className="container">
        <div className="section-header-center">
          <span className="eyebrow">The Process</span>
          <h2 className="section-heading">How It Works</h2>
        </div>

        <div className="timeline">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              className="timeline-step"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
            >
              <div className="timeline-icon">{step.icon}</div>
              <h4 className="timeline-title">{i + 1}. {step.title}</h4>
              <p className="timeline-desc">{step.desc}</p>
              {i < STEPS.length - 1 && <span className="timeline-connector" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
