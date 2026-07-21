import { useEffect, useState } from "react";
import api from "../../services/api";
import "./BloodRequests.css";
import toast from "react-hot-toast";

// List of States
const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi / NCR"
];

// Blood Compatibility Matrix: [Donor Group] -> [Allowed Recipient Groups]
const COMPATIBILITY_MAP = {
  "O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"], // Universal Donor
  "O+": ["O+", "A+", "B+", "AB+"],
  "A-": ["A-", "A+", "AB-", "AB+"],
  "A+": ["A+", "AB+"],
  "B-": ["B-", "B+", "AB-", "AB+"],
  "B+": ["B+", "AB+"],
  "AB-": ["AB-", "AB+"],
  "AB+": ["AB+"]
};

function BloodRequests() {
  const [requests, setRequests] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Pagination State (5 items per page)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch Requests & Current User Profile
  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Fetch requests
      const res = await api.get("/requests");
      setRequests(res.data);

      // Fetch user profile if logged in
      if (token) {
        try {
          const profileRes = await api.get("/users/profile", {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUserProfile(profileRes.data);
        } catch (pErr) {
          console.warn("User profile could not be fetched", pErr);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch blood requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter requests based on selected State & City text search
  const filteredRequests = requests.filter((request) => {
    const matchesState = selectedState ? request.state === selectedState : true;
    const matchesCity = selectedCity
      ? request.city?.toLowerCase().includes(selectedCity.toLowerCase())
      : true;
    return matchesState && matchesCity;
  });

  // Calculate Pagination Slices
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Check blood compatibility
  const checkCompatibility = (donorBloodGroup, recipientBloodGroup) => {
    if (!donorBloodGroup || !recipientBloodGroup) return false;
    const allowedRecipients = COMPATIBILITY_MAP[donorBloodGroup] || [];
    return allowedRecipients.includes(recipientBloodGroup);
  };

  // Respond to a blood request with Compatibility Validation
  const handleRespond = async (request) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to respond to requests.");
      return;
    }

    const donorBloodGroup = userProfile?.bloodGroup;
    const recipientBloodGroup = request.bloodGroup;

    if (donorBloodGroup) {
      const isCompatible = checkCompatibility(donorBloodGroup, recipientBloodGroup);

      if (!isCompatible) {
        toast.error(
          `You are not compatible! Your blood group is (${donorBloodGroup}), but patient needs (${recipientBloodGroup}).`,
          { duration: 5000 }
        );
        return;
      }
    }

    try {
      await api.put(
        `/requests/${request._id}/respond`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Response Sent Successfully ❤️");
      fetchData(); // Refresh requests list
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit response.");
    }
  };

  if (loading) {
    return <h2 className="loading-text">Loading Requests...</h2>;
  }

  return (
    <section className="blood-requests">
      <h2>🩸 Active Blood Requests</h2>

      {/* Filter Controls */}
      <div className="filters-container">
        <div className="filter-group">
          <label htmlFor="state-select">Filter by State:</label>
          <select
            id="state-select"
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setCurrentPage(1); // Reset page on filter
            }}
          >
            <option value="">All States</option>
            {STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="city-input">Filter by City:</label>
          <input
            id="city-input"
            type="text"
            placeholder="Type city name..."
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              setCurrentPage(1); // Reset page on filter
            }}
          />
        </div>
      </div>

      {/* Requests List View */}
      <div className="requests-list-container">
        {filteredRequests.length > 0 ? (
          <>
            <div className="requests-table-wrapper">
              <table className="requests-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Blood Group</th>
                    <th>Units</th>
                    <th>Hospital & Location</th>
                    <th>Reason / Condition</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRequests.map((request) => {
                    // Extract and normalize status from MongoDB
                    const rawStatus = request.status || (request.isCompleted ? "Completed" : "Open");
                    const normalizedStatus = String(rawStatus).trim().toLowerCase();

                    // Check if status represents a completed request
                    const isCompleted = normalizedStatus === "completed" || request.isCompleted === true;

                    // Display label formatting
                    const displayStatus = isCompleted
                      ? "Completed"
                      : rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1);

                    return (
                      <tr
                        key={request._id}
                        className={isCompleted ? "row-completed" : ""}
                      >
                        <td className="patient-name-cell">
                          <strong>{request.patientName}</strong>
                        </td>
                        <td>
                          <span className="blood-badge">{request.bloodGroup}</span>
                        </td>
                        <td>
                          <strong>{request.units}</strong> Unit(s)
                        </td>
                        <td>
                          <div className="hospital-info">
                            <strong>{request.hospital}</strong>
                            <small>{request.city}, {request.state}</small>
                          </div>
                        </td>
                        <td>
                          <div className="reason-info">
                            <span>
                              {request.reason === "Other"
                                ? request.otherReason
                                : request.reason}
                            </span>
                            <small>Condition: {request.condition}</small>
                          </div>
                        </td>
                        <td>{request.contact}</td>
                        <td>
                          {/* Dynamic Status Badge */}
                          <span className={`status-badge status-${normalizedStatus}`}>
                            {displayStatus}
                          </span>
                        </td>
                        <td>
                          {isCompleted ? (
                            <span className="completed-action-btn">
                              ✓ Completed
                            </span>
                          ) : (
                            <button
                              className="respond-btn"
                              onClick={() => handleRespond(request)}
                            >
                              ❤️ I Can Donate
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination-container">
                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &laquo; Prev
                </button>

                <div className="pagination-numbers">
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (pageNum) => (
                      <button
                        key={pageNum}
                        className={`pagination-number ${currentPage === pageNum ? "active" : ""
                          }`}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </button>
                    )
                  )}
                </div>

                <button
                  className="pagination-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next &raquo;
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="no-requests">
            No blood requests found for the selected location.
          </p>
        )}
      </div>
    </section>
  );
}

export default BloodRequests;