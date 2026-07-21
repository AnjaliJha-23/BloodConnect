import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { isProfileComplete } from "../../utils/profileComplete";
import "./RequestBlood.css";
import toast from "react-hot-toast";

function RequestBlood() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "",
    hospital: "",
    state: "",
    city: "",
    units: "",
    contact: "",
    condition: "",
    reason: "",
    otherReason: "",
    message: "",
  });

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
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        /*const res = await api.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);

        if (!isProfileComplete(res.data)) {
          toast.error("Please complete your profile before requesting blood.");

          setTimeout(() => {
            navigate("/profile");
          }, 800);

          return;
          navigate("/profile");
          return;
        }*/
      } catch (err) {
        console.log("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload: if "Other" is selected, use the custom text from otherReason
    const payload = {
      ...formData,
      reason:
        formData.reason === "Other" ? formData.otherReason : formData.reason,
    };

    try {
      const token = localStorage.getItem("token");

      await api.post("/requests", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Blood request submitted successfully!");

      setFormData({
        patientName: "",
        bloodGroup: "",
        hospital: "",
        state: "",
        city: "",
        units: "",
        contact: "",
        condition: "",
        reason: "",
        otherReason: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(
  err.response?.data?.message || "Failed to submit blood request."
);
    }
  };

  return (
    <div className="request-container">
      <div className="request-card">
        <h2>Emergency Blood Request</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="patientName"
            placeholder="Patient Name"
            value={formData.patientName}
            onChange={handleChange}
            required
          />

          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required>
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          <input
            name="hospital"
            placeholder="Hospital"
            value={formData.hospital}
            onChange={handleChange}
            required
          />
          <select
            name="state"
            value={formData.state}
            onChange={(e) => {
              setFormData({
                ...formData,
                state: e.target.value,
                city: "",
              });
            }}
            required>
            <option value="">Select State</option>

            {STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!formData.state}
            required>
            <option value="">
              {formData.state ? "Select City" : "Select State First"}
            </option>

            {formData.state &&
              STATE_CITIES[formData.state]?.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>

          <input
            type="text"
            name="units"
            placeholder="Units Required"
            value={formData.units}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^[1-9]\d*$/.test(value)) {
                setFormData({
                  ...formData,
                  units: value,
                });
              }
            }}
            inputMode="numeric"
            required
          />

          <input
            type="tel"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 10) {
                setFormData({
                  ...formData,
                  contact: value,
                });
              }
            }}
            maxLength={10}
            inputMode="numeric"
            pattern="[0-9]{10}"
            required
          />

          <label htmlFor="condition">Patient Condition</label>
          <select
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required>
            <option value="">Select Patient Condition</option>
            <option value="Stable">Stable</option>
            <option value="Urgent">Urgent</option>
            <option value="Critical">Critical</option>
            <option value="Life Threatening">Life Threatening</option>
          </select>

          <label htmlFor="reason">Reason for Blood Requirement</label>
          <select
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required>
            <option value="">Select Reason</option>
            <option value="Accident">Accident</option>
            <option value="Disease">Disease</option>
            <option value="Major Surgery">Major Surgery</option>
            <option value="Emergency Surgery">Emergency Surgery</option>
            <option value="Cancer Treatment">Cancer Treatment</option>
            <option value="Thalassemia">Thalassemia</option>
            <option value="Severe Anemia">Severe Anemia</option>
            <option value="Pregnancy / Delivery">Pregnancy / Delivery</option>
            <option value="Organ Transplant">Organ Transplant</option>
            <option value="Dengue">Dengue</option>
            <option value="Other">Other</option>
          </select>

          {formData.reason === "Other" && (
            <input
              type="text"
              name="otherReason"
              placeholder="Please specify the reason"
              value={formData.otherReason}
              onChange={handleChange}
              required
            />
          )}

          <textarea
            name="message"
            placeholder="Additional Details"
            value={formData.message}
            onChange={handleChange}
            rows={4}
          />

          <button type="submit">Submit Request</button>
        </form>
      </div>
    </div>
  );
}

export default RequestBlood;
