import { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import api from "../../services/api";
import "./SearchSection.css";
import toast from "react-hot-toast";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const STATES = [
  "Delhi",
  "Maharashtra",
  "Uttar Pradesh",
  "Karnataka",
  "Tamil Nadu",
  "Telangana",
  "Andhra Pradesh",
  "Kerala",
  "Gujarat",
  "Rajasthan",
  "West Bengal",
  "Punjab",
  "Haryana",
  "Bihar",
  "Madhya Pradesh",
  "Odisha",
  "Jharkhand",
  "Assam",
  "Chhattisgarh",
  "Uttarakhand",
  "Himachal Pradesh",
  "Jammu and Kashmir",
];

const STATE_CITIES = {
  Delhi: [
    "New Delhi",
    "North Delhi",
    "South Delhi",
    "East Delhi",
    "West Delhi",
  ],

  Maharashtra: [
    "Mumbai",
    "Pune",
    "Nagpur",
    "Nashik",
    "Thane",
    "Aurangabad",
    "Kolhapur",
  ],

  "Uttar Pradesh": [
    "Lucknow",
    "Kanpur",
    "Agra",
    "Varanasi",
    "Prayagraj",
    "Noida",
    "Ghaziabad",
    "Meerut",
    "Gorakhpur",
  ],

  Karnataka: ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],

  "Tamil Nadu": [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Salem",
    "Tiruchirappalli",
  ],

  Telangana: ["Hyderabad", "Warangal", "Karimnagar", "Nizamabad"],

  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati"],

  Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"],

  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],

  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota"],

  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri"],

  Punjab: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"],

  Haryana: ["Gurugram", "Faridabad", "Panipat", "Hisar"],

  Bihar: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur"],

  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior"],

  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur"],

  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],

  Assam: ["Guwahati", "Silchar", "Dibrugarh", "Tezpur"],

  Chhattisgarh: ["Raipur", "Bilaspur", "Durg", "Korba"],

  Uttarakhand: ["Dehradun", "Haridwar", "Haldwani", "Roorkee"],

  "Himachal Pradesh": ["Shimla", "Dharamshala", "Solan", "Mandi"],

  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla"],
};

const SearchSection = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");

  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setHasSearched(true);

      const res = await api.get("/donors/search", {
        params: {
          bloodGroup,
          state,
          city,
          area,
        },
      });

      setDonors(res.data);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Unable to fetch donors.");
    } finally {
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
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}>
          <h2 className="search-title">Find Blood Donor</h2>

          <form className="search-form" onSubmit={handleSearch}>
            <div className="form-row">
              {/* Blood Group */}
              <div className="search-field">
                <label htmlFor="bloodGroup">Blood Group</label>
                <select
                  id="bloodGroup"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}>
                  <option value="">Select Blood Group</option>

                  {BLOOD_GROUPS.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>

              {/* State */}
              <div className="search-field">
                <label htmlFor="state">State</label>

                <select
                  id="state"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    setCity("");
                  }}>
                  <option value="">Select State</option>

                  {STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div className="search-field">
                <label htmlFor="city">City</label>

                <select
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={!state}>
                  <option value="">
                    {state ? "Select City" : "Select State First"}
                  </option>

                  {STATE_CITIES[state]?.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Area */}
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

              {/* Search Button */}
              <div className="search-btn-wrapper">
                <button type="submit" className="btn btn-primary search-btn">
                  <FaSearch /> Search Donor
                </button>
              </div>
            </div>
          </form>

          {loading && <h3 className="status-text">Searching...</h3>}

          {hasSearched && !loading && donors.length === 0 && (
            <p className="no-results">No donors found.</p>
          )}

          {donors.length > 0 && (
            <div className="results-container">
              <h2 className="results-title">Available Donors</h2>

              <div className="donor-grid">
                {donors.map((donor) => (
                  <div className="donor-card" key={donor._id}>
                    <h3>{donor.name}</h3>

                    <div className="donor-info">
                      <p>
                        <strong>Blood Group:</strong> {donor.bloodGroup}
                      </p>

                      <p>
                        <strong>Phone:</strong> {donor.phone}
                      </p>

                      <p>
                        <strong>State:</strong> {donor.state || "N/A"}
                      </p>

                      <p>
                        <strong>City:</strong> {donor.city || "N/A"}
                      </p>

                      <p>
                        <strong>Area:</strong> {donor.area || "N/A"}
                      </p>
                    </div>

                    <a
                      href={`tel:${donor.phone}`}
                      style={{
                        textDecoration: "none",
                        display: "block",
                        marginTop: "15px",
                      }}>
                      <button
                        className="btn btn-outline-primary"
                        style={{ width: "100%" }}>
                        Contact
                      </button>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SearchSection;
