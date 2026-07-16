// 1. Import useEffect alongside useState
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa'
import './Contact.css'

const CONTACT_CARDS = [
  { icon: <FaEnvelope />, title: 'Email', value: 'support@bloodconnect.com' },
  { icon: <FaPhoneAlt />, title: 'Phone', value: '+91 98765 43210' },
  { icon: <FaMapMarkerAlt />, title: 'Location', value: '123, Health Street, New Delhi, India' },
  { icon: <FaClock />, title: 'Working Hours', value: 'Mon – Sat, 9:00 AM – 7:00 PM' },
]

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  // 2. Add this effect to scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use 'smooth' if you want an animated scroll up
    })
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Contact form submitted:', form)
    setSubmitted(true)
  }

  return (
    <>
      <section className="contact-hero">
        <div className="container">
          <span className="eyebrow">Get In Touch</span>
          <h1 className="contact-hero-title">We'd Love to Hear From You</h1>
          <p className="contact-hero-subtext">
            Questions about donating, requesting blood, or partnering with us? Reach out anytime.
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container contact-cards-grid">
          {CONTACT_CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              className="contact-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="contact-card-icon">{c.icon}</div>
              <h4>{c.title}</h4>
              <p>{c.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section contact-main">
        <div className="container contact-grid">
          <motion.div
            className="contact-form-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
          >
            <h2>Send Us a Message</h2>
            {submitted ? (
              <div className="contact-success">
                <p>Thanks, {form.name.split(' ')[0] || 'friend'}! Your message has been received. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-form-row">
                  <div className="contact-field">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" name="phone" type="tel" placeholder="Your phone number" value={form.phone} onChange={handleChange} />
                  </div>
                </div>
                <div className="contact-field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                </div>
                <div className="contact-field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="5" placeholder="How can we help?" value={form.message} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary contact-submit">
                  Send Message <FaPaperPlane />
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            className="contact-map-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <div className="contact-map-placeholder">
              <FaMapMarkerAlt />
              <p>Map placeholder — embed Google Maps here</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Contact
