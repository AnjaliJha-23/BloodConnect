import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaBullseye, FaEye, FaHeartbeat, FaArrowRight } from 'react-icons/fa'
import Statistics from '../../components/Statistics/Statistics'
import DonorCard from '../../components/DonorCard/DonorCard'
import './About.css'

const TEAM = [
  { name: 'Dr. Ananya Rao', location: 'Medical Director', message: 'Leading our clinical partnerships with hospitals across India.', avatarColor: '#E63946' },
  { name: 'Karan Malhotra', location: 'Head of Operations', message: 'Making sure every request reaches a verified donor, fast.', avatarColor: '#C1121F' },
  { name: 'Sneha Iyer', location: 'Community Lead', message: 'Building a donor community rooted in trust and consistency.', avatarColor: '#22C55E' },
]

const TIMELINE = [
  { year: '2019', text: 'BloodConnect started as a small city-level donor directory.' },
  { year: '2021', text: 'Crossed 5,000 registered donors and partnered with 50 hospitals.' },
  { year: '2023', text: 'Launched emergency request matching across 35+ cities.' },
  { year: '2026', text: 'Serving 12,500+ donors and 180+ hospitals nationwide.' },
]

const About = () => {
  return (
    <>
      <section className="about-hero">
        <div className="container about-hero-inner">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Us
          </motion.span>
          <motion.h1
            className="about-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Built to make blood donation simple, fast, and trustworthy.
          </motion.h1>
          <motion.p
            className="about-hero-subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            BloodConnect exists to close the gap between people who need blood
            and people willing to give it, in the moments when minutes matter most.
          </motion.p>
        </div>
      </section>

      <Statistics />

      <section className="section">
        <div className="container mission-vision-grid">
          <motion.div
            className="mv-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="mv-icon"><FaBullseye /></div>
            <h3>Our Mission</h3>
            <p>To connect every blood request with a verified, willing donor as quickly as possible, anywhere in the country.</p>
          </motion.div>

          <motion.div
            className="mv-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="mv-icon"><FaEye /></div>
            <h3>Our Vision</h3>
            <p>A future where no life is lost simply because blood couldn't be found in time.</p>
          </motion.div>

          <motion.div
            className="mv-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mv-icon"><FaHeartbeat /></div>
            <h3>Our Story</h3>
            <p>Founded after a founder's own family struggled to find a rare blood type in an emergency, we built the platform we wished had existed.</p>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--color-bg-light)' }}>
        <div className="container">
          <div className="section-header-center">
            <span className="eyebrow">Our Journey</span>
            <h2 className="section-heading">How We Got Here</h2>
          </div>

          <div className="about-timeline">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                className="about-timeline-item"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <span className="about-timeline-year">{item.year}</span>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header-center">
            <span className="eyebrow">Meet The Team</span>
            <h2 className="section-heading">The People Behind BloodConnect</h2>
          </div>

          <div className="team-grid">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <DonorCard {...member} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section why-matters" style={{ backgroundColor: 'var(--color-bg-light)' }}>
        <div className="container why-matters-inner">
          <div>
            <span className="eyebrow">Why It Matters</span>
            <h2 className="section-heading">Why Blood Donation Matters</h2>
            <p className="section-subtext" style={{ maxWidth: '620px' }}>
              A single donation can save up to three lives. Blood cannot be manufactured,
              it can only come from willing donors, which means the gap between supply and
              need is closed one person at a time. Regular donation also keeps the emergency
              supply chain healthy so hospitals aren't caught off guard during accidents,
              surgeries, or maternal emergencies.
            </p>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container about-cta-inner">
          <h2>Ready to make a difference?</h2>
          <p>Join thousands of donors already saving lives across the country.</p>
          <Link to="/register" className="btn btn-white">
            Become a Donor <FaArrowRight />
          </Link>
        </div>
      </section>
    </>
  )
}

export default About
