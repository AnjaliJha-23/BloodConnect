import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearch } from 'react-icons/fa'
import api from "../../services/api";
import './SearchSection.css'

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
const STATES = ['Delhi', 'Maharashtra', 'Telangana', 'Hyderabad', 'Chennai', 'Pune', 'West Bengal', 'Rajasthan', 'Gujarat', 'Madhya Pradesh', 'Uttar Pradesh', 'Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Kerala', 'Odisha', 'Bihar', 'Jharkhand', 'Assam', 'Punjab', 'Haryana', 'Chhattisgarh', 'Uttarakhand', 'Himachal Pradesh', 'Jammu and Kashmir']
const CITIES = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Pune', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad']

const SearchSection = () => {
  const [bloodGroup, setBloodGroup] = useState('')
  const [state, setState] = useState('') // Fixed: Added missing state hook
  const [city, setCity] = useState('')
  const [area, setArea] = useState('')

  const [donors, setDonors] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    try {
      setLoading(true);
      setHasSearched(true);
      const res = await api.get("/donors/search", {
        // Fixed: Added state to the sent query parameters
        params: { bloodGroup, state, city, area }
      });
      setDonors(res.data);
    } catch (err) {
      console.log(err);
      alert("Unable to fetch donors.");
    } finally {
      setLoading(false);
    }
  };
=======

    setHasSearched(true);
    setDonors([]);

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
>>>>>>> d1b1af2996c5c5ebf39b7c683d539e1c23de045f

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

          {/* Form wrapper */}
          <form className="search-form" onSubmit={handleSearch}>
            <div className="form-row">
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
                <label htmlFor="state">State</label>
                <select
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">Select State</option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

<<<<<<< HEAD
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
=======
            <div className="search-field">
              <label htmlFor="area">Area</label>
              <input
                id="area"
                type="text"
                placeholder="Example: Dwarka, Salt Lake"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </div>
>>>>>>> d1b1af2996c5c5ebf39b7c683d539e1c23de045f

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

              <div className="search-btn-wrapper">
                <button type="submit" className="btn btn-primary search-btn">
                  <FaSearch /> Search Donor
                </button>
              </div>
            </div>
          </form>
<<<<<<< HEAD

          {loading && <h3 className="status-text">Searching...</h3>}

          {hasSearched && !loading && donors.length === 0 && (
            <p className="no-results">No donors found.</p>
          )}

          {/* Results Outer Layout */}
          {donors.length > 0 && (
            <div className="results-container">
              <h2 className="results-title">Available Donors</h2>
              <div className="donor-grid">
                {donors.map((donor) => (
                  <div className="donor-card" key={donor._id}>
                    <h3>{donor.name}</h3>
                    <div className="donor-info">
                      <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
                      <p><strong>Phone:</strong> {donor.phone}</p>
                      <p><strong>State:</strong> {donor.state || 'N/A'}</p>
                      <p><strong>City:</strong> {donor.city || 'N/A'}</p>
                      <p><strong>Area:</strong> {donor.area || 'N/A'}</p>
                    </div>
                    <a href={`tel:${donor.phone}`} style={{ textDecoration: 'none', display: 'block', marginTop: '15px' }}>
                      <button className="btn btn-outline-primary" style={{ width: '100%' }}>
                        Contact
                      </button>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
=======
          {loading && (
    <h3 style={{ marginTop: "25px" }}>
        Searching...
    </h3>
)}

{hasSearched && !loading && donors.length === 0 && (
    <div
        style={{
            marginTop: "30px",
            textAlign: "center",
            color: "#777",
            fontSize: "18px",
        }}
    >
        No donors found.
    </div>
)}

{donors.length > 0 && (
    <div className="donor-results">

        <h2>Available Donors ({donors.length})</h2>

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
>>>>>>> d1b1af2996c5c5ebf39b7c683d539e1c23de045f
        </motion.div>
      </div>
    </section>
  )
}

export default SearchSection;