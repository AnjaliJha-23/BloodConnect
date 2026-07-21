import { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import api from "../../services/api";
import "./SearchSection.css";
import toast from "react-hot-toast";

// Import your BloodGroups component
import BloodGroups from "../bloodgroups/BloodGroups"; // Adjust path according to your folder structure

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

const SearchSection = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");

  const [donors, setDonors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const DONORS_PER_PAGE = 6;
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
      setCurrentPage(1);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Unable to fetch donors.");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(donors.length / DONORS_PER_PAGE);
  const startIndex = (currentPage - 1) * DONORS_PER_PAGE;
  const currentDonors = donors.slice(startIndex, startIndex + DONORS_PER_PAGE);

  return (
    <section className="search-section section" id="find-donor">
      <div className="container">
        {/* Main Search Card */}
        <motion.div
          className="search-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="search-title">Find Blood Donor</h2>

          <form className="search-form" onSubmit={handleSearch}>
            <div className="form-row">
              {/* Blood Group */}
              <div className="search-field">
                <label htmlFor="bloodGroup">Blood Group</label>
                <select
                  id="bloodGroup"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                >
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
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">Select State</option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* City (Text Input) */}
              <div className="search-field">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  type="text"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              {/* Area (Text Input) */}
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
                {currentDonors.map((donor) => (
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
                      }}
                    >
                      <button
                        className="btn btn-outline-primary"
                        style={{ width: "100%" }}
                      >
                        Contact
                      </button>
                    </a>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  <span>
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Embedded Interactive 3D Blood Group Cards */}
        <div style={{ marginTop: "40px" }}>
          <BloodGroups />
        </div>
      </div>
    </section>
  );
};

export default SearchSection;