import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaTint, FaUndo } from 'react-icons/fa'
import './BloodGroups.css'

const BLOOD_INFO = [
  { group: 'A+', give: 'A+, AB+', receive: 'A+, A-, O+, O-' },
  { group: 'A-', give: 'A+, A-, AB+, AB-', receive: 'A-, O-' },
  { group: 'B+', give: 'B+, AB+', receive: 'B+, B-, O+, O-' },
  { group: 'B-', give: 'B+, B-, AB+, AB-', receive: 'B-, O-' },
  { group: 'O+', give: 'O+, A+, B+, AB+', receive: 'O+, O-' },
  { group: 'O-', give: 'Everyone (Universal)', receive: 'O- only' },
  { group: 'AB+', give: 'AB+ only', receive: 'Everyone (Universal)' },
  { group: 'AB-', give: 'AB+, AB-', receive: 'AB-, A-, B-, O-' },
]

const BloodGroups = () => {
  const [flippedCards, setFlippedCards] = useState({})

  const handleCardClick = (group) => {
    setFlippedCards((prev) => ({
      ...prev,
      [group]: !prev[group],
    }))
  }

  return (
    <section className="blood-groups section-tight">
      <div className="container">
        <div className="section-header-center" style={{ marginBottom: '32px' }}>
          <span className="eyebrow">Blood Types</span>
          <h2 className="section-heading">Browse by Blood Group</h2>
          <p className="section-subtext" style={{ margin: '0 auto' }}>
            Click on any blood group card to flip and check compatibility details.
          </p>
        </div>

        <div className="blood-groups-grid">
          {BLOOD_INFO.map((item, i) => {
            const isFlipped = flippedCards[item.group]

            return (
              <motion.div
                key={item.group}
                className="blood-group-card-wrapper"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <motion.div
                  className="blood-group-card"
                  onClick={() => handleCardClick(item.group)}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  whileHover={{ y: -6, scale: 1.02 }}
                >
                  {/* FRONT FACE */}
                  <div className="card-face card-front">
                    <FaTint className="blood-group-icon" />
                    <span className="blood-group-label">{item.group}</span>
                    <span className="flip-hint">Click to flip</span>
                  </div>

                  {/* BACK FACE */}
                  <div className="card-face card-back">
                    <div className="compat-item">
                      <span className="compat-title">Gives to</span>
                      <span className="compat-val">{item.give}</span>
                    </div>
                    <div className="compat-item">
                      <span className="compat-title">Receives from</span>
                      <span className="compat-val">{item.receive}</span>
                    </div>
                    <FaUndo className="flip-back-icon" />
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default BloodGroups