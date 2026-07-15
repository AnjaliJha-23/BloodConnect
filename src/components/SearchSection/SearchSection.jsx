import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearch } from 'react-icons/fa'
import './SearchSection.css'

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
const CITIES = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune']

const SearchSection = () => {
  const [bloodGroup, setBloodGroup] = useState('')
  const [city, setCity] = useState('')
  const [area, setArea] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    // Backend integration point: replace with API call to /api/donors/search
    console.log('Searching donors with:', { bloodGroup, city, area })
  }

  return (
    <section className="search-section section" id="find-donor">
      <div className="container">
        <motion.div
          className="search-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="search-title">Find Blood Donor</h2>
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-field">
              <label htmlFor="bloodGroup">Blood Group</label>
              <select
                id="bloodGroup"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value="">Select Blood Group</option>
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div className="search-field">
              <label htmlFor="city">City</label>
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">Select City</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="search-field">
              <label htmlFor="area">Area</label>
              <input
                id="area"
                type="text"
                placeholder="Enter area / locality"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary search-btn">
              <FaSearch /> Search Donor
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default SearchSection
