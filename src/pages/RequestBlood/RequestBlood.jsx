import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { isProfileComplete } from "../../utils/profileComplete";
import "./RequestBlood.css";
import toast from "react-hot-toast";
import { State, City } from "country-state-city";

function RequestBlood() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    patientName: "",
    patientAge: "", // Added age state
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        /*
        const res = await api.get("/users/profile", {
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
        }
        */
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

  const selectedState = State.getStatesOfCountry("IN").find(
    (state) => state.name === formData.state
  );

  const cityList = selectedState
    ? City.getCitiesOfState("IN", selectedState.isoCode)
    : [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      patientAge: Number(formData.patientAge), // Converted to Number for API payload
      reason:
        formData.reason === "Other"
          ? formData.otherReason
          : formData.reason,
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
        patientAge: "",
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
          {/* Patient Name */}
          <input
            name="patientName"
            placeholder="Patient Name"
            value={formData.patientName}
            onChange={handleChange}
            required
          />

          {/* Patient Age Input */}
          <input
            type="text"
            name="patientAge"
            placeholder="Patient Age (Yrs)"
            value={formData.patientAge}
            onChange={handleChange}
            maxLength={3}
            inputMode="numeric"
            required
          />

          {/* Blood Group */}
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
          >
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

          {/* Hospital */}
          <input
            name="hospital"
            placeholder="Hospital"
            value={formData.hospital}
            onChange={handleChange}
            required
          />

          {/* State Dropdown */}
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
            required
          >
            <option value="">Select State</option>

            {State.getStatesOfCountry("IN").map((state) => (
              <option key={state.isoCode} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>

          {/* City Dropdown */}
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!formData.state}
            required
          >
            <option value="">
              {formData.state ? "Select City" : "Select State First"}
            </option>

            {cityList.map((city) => (
              <option
                key={`${city.name}-${city.stateCode}`}
                value={city.name}
              >
                {city.name}
              </option>
            ))}
          </select>

          {/* Units Required */}
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

          {/* Contact Number */}
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

          {/* Patient Condition */}
          <label htmlFor="condition">Patient Condition</label>
          <select
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
          >
            <option value="">Select Patient Condition</option>
            <option value="Stable">Stable</option>
            <option value="Urgent">Urgent</option>
            <option value="Critical">Critical</option>
            <option value="Life Threatening">Life Threatening</option>
          </select>

          {/* Reason for Requirement */}
          <label htmlFor="reason">Reason for Blood Requirement</label>
          <select
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          >
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

          {/* Additional Details */}
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