import { motion } from 'framer-motion'
import { FaTint } from 'react-icons/fa'
import './BloodGroups.css'

const GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

const BloodGroups = () => {
  return (
    <section className="blood-groups section-tight">
      <div className="container">
        <div className="section-header-center">
          <span className="eyebrow">Blood Types</span>
          <h2 className="section-heading">Browse by Blood Group</h2>
          <p className="section-subtext" style={{ margin: '0 auto' }}>
            Select a blood type to instantly see nearby verified donors.
          </p>
        </div>

        <div className="blood-groups-grid">
          {GROUPS.map((group, i) => (
            <motion.div
              key={group}
              className="blood-group-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              <FaTint className="blood-group-icon" />
              <span className="blood-group-label">{group}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BloodGroups
