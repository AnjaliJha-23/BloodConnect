import { useEffect, useState } from "react";
import api from "../../services/api";
import "./BloodRequests.css";

// State to Cities mapping
const stateCityData = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Kakinada", "Nellore", "Kurnool"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal", "Hisar", "Rohtak"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Mandi", "Solan", "Kullu"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi", "Davangere", "Ballari"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Kannur"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Amravati"],
  "Manipur": ["Imphal", "Churachandpur", "Thoubal"],
  "Meghalaya": ["Shillong", "Tura", "Jowai"],
  "Mizoram": ["Aizawl", "Lunglei", "Champhai"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Bhilwara"],
  "Sikkim": ["Gangtok", "Namchi", "Gyalshing"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Noida", "Ghaziabad", "Prayagraj", "Meerut"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rishikesh"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Kharagpur"],
  "Delhi / NCR": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"]
};

function BloodRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Fetch all active requests
  const fetchRequests = async () => {
    try {
      const res = await api.get("/requests");
      setRequests(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Handle State Change -> Reset city when state changes
  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity(""); // Reset city selection
  };

  // Filter requests based on selected State & City
  const filteredRequests = requests.filter((request) => {
    const matchesState = selectedState ? request.state === selectedState : true;
    const matchesCity = selectedCity ? request.city === selectedCity : true;
    return matchesState && matchesCity;
  });

  // Respond to a blood request
  const handleRespond = async (id) => {
    try {
      await api.put(
        `/requests/${id}/respond`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Response Sent Successfully ❤️");
      fetchRequests(); // Refresh requests
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  if (loading) {
    return <h2>Loading Requests...</h2>;
  }

  return (
    <section className="blood-requests">
      <h2>🩸 Active Blood Requests</h2>

      

      {/* Requests Grid */}
      <div className="request-grid">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <div className="request-card" key={request._id}>
              <h3>{request.patientName}</h3>

              <p>
                <strong>🩸 Blood Group:</strong> {request.bloodGroup}
              </p>

              <p>
                <strong>🏥 Hospital:</strong> {request.hospital}
              </p>

              {request.state && (
                <p>
                  <strong>🗺️ State:</strong> {request.state}
                </p>
              )}

              <p>
                <strong>📍 City:</strong> {request.city}
              </p>

              <p>
                <strong>🩸 Units Required:</strong> {request.units}
              </p>

              <p>
                <strong>⚠️ Patient Condition:</strong> {request.condition}
              </p>

              <p>
                <strong>📋 Reason:</strong>{" "}
                {request.reason === "Other"
                  ? request.otherReason
                  : request.reason}
              </p>

              <p>
                <strong>📞 Contact:</strong> {request.contact}
              </p>

              {request.message && (
                <p>
                  <strong>📝 Details:</strong> {request.message}
                </p>
              )}

              <p>
                <strong>❤️ Responses:</strong>{" "}
                {request.responses?.length || 0}
              </p>

              <button
                className="respond-btn"
                onClick={() => handleRespond(request._id)}
              >
                ❤️ I Can Donate
              </button>
            </div>
          ))
        ) : (
          <p className="no-requests">No blood requests found for the selected location.</p>
        )}
      </div>
    </section>
  );
}

export default BloodRequests;