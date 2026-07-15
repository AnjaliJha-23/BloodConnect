import { motion } from 'framer-motion'
import DonorCard from '../DonorCard/DonorCard'
import './Testimonials.css'

const TESTIMONIALS = [
  {
    name: 'Rahul Sharma',
    location: 'Delhi',
    message: 'I found an O- donor within 30 minutes. This platform is a lifesaver!',
    avatarColor: '#E63946',
  },
  {
    name: 'Priya Mehta',
    location: 'Mumbai',
    message: 'Very easy to use and genuinely helpful. Thanks to BloodConnect, we saved a life.',
    avatarColor: '#C1121F',
  },
  {
    name: 'Amit Verma',
    location: 'Bangalore',
    message: 'A wonderful initiative to help people in emergency. Great work, guys!',
    avatarColor: '#22C55E',
  },
]

const Testimonials = () => {
  return (
    <section className="testimonials section" style={{ backgroundColor: 'var(--color-bg-light)' }}>
      <div className="container">
        <div className="section-header-center">
          <span className="eyebrow">Testimonials</span>
          <h2 className="section-heading">What Our Users Say</h2>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <DonorCard {...t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
