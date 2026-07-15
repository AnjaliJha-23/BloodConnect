import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'
import './EmergencySection.css'

const EmergencySection = () => {
  const handleRequest = () => {
    // Backend integration point: navigate to /request-blood or open a request modal
    console.log('Navigate to emergency blood request flow')
  }

  return (
    <section className="emergency-section" id="emergency-request">
      <div className="container">
        <motion.div
          className="emergency-card"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55}}
        >
          <div className="emergency-content">
            <h2 className="emergency-title">Need Blood Urgently?</h2>
            <p className="emergency-desc">
              Post your emergency request and get help from nearby donors within minutes.
            </p>
            <button className="btn btn-white emergency-btn" onClick={handleRequest}>
              Request Blood Now <FaArrowRight />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default EmergencySection
