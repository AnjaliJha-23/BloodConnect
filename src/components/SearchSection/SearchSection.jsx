import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearch } from 'react-icons/fa'
import api from "../../services/api";
import './SearchSection.css'
import { useNavigate } from "react-router-dom";

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
const CITIES = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune','West Bengal']

const SearchSection = () => {
  const [bloodGroup, setBloodGroup] = useState('')
  const [city, setCity] = useState('')
  const [area, setArea] = useState('')
  const navigate = useNavigate();

  const [donors, setDonors] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e) => {

    e.preventDefault();

    try {

        setLoading(true);

        const res = await api.get("/donors/search", {

            params: {

                bloodGroup,
                city,
                area

            }

        });

        setDonors(res.data);

    }

    catch(err){

        console.log(err);

        alert("Unable to fetch donors.");

    }

    finally{

        setLoading(false);

    }

};

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
          {loading && <h3>Searching...</h3>}

{hasSearched && !loading && donors.length === 0 && (
  <p style={{ marginTop: "20px" }}>
    No donors found.
  </p>
)}

{donors.length > 0 && (

  <div className="donor-results">

    <h2>Available Donors</h2>

    {donors.map((donor) => (

      <div className="donor-card" key={donor._id}>

        <h3>{donor.name}</h3>

        <p>
          <strong>Blood Group:</strong> {donor.bloodGroup}
        </p>

        <p>
          <strong>Phone:</strong> {donor.phone}
        </p>

        <p>
          <strong>City:</strong> {donor.city}
        </p>

        <p>
          <strong>State:</strong> {donor.state}
        </p>

      </div>

    ))}

  </div>

)}
        </motion.div>
      </div>
    </section>
  )
}

export default SearchSection
