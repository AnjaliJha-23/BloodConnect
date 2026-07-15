import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { FaUsers, FaTint, FaHospital, FaCity } from 'react-icons/fa'
import './Statistics.css'

const STATS = [
  { icon: <FaUsers />, value: 12500, suffix: '+', label: 'Registered Donors' },
  { icon: <FaTint />, value: 4300, suffix: '+', label: 'Blood Requests' },
  { icon: <FaHospital />, value: 180, suffix: '+', label: 'Hospitals Connected' },
  { icon: <FaCity />, value: 35, suffix: '+', label: 'Cities Covered' },
]

const Counter = ({ value, suffix }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.floor(v)),
    })
    return () => controls.stop()
  }, [isInView, value])

  return (
    <span ref={ref} className="stat-number">
      {display.toLocaleString()}{suffix}
    </span>
  )
}

const Statistics = () => {
  return (
    <section className="statistics">
      <div className="container stats-grid">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="stat-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="stat-icon">{stat.icon}</div>
            <div>
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="stat-label">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Statistics
