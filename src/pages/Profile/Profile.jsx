import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { State, City } from "country-state-city";

function Profile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bloodGroup: "",
    age: "",
    gender: "",
    city: "",
    state: "",
    area: "",
    available: true,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFormData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "state") {
      setFormData((prev) => ({
        ...prev,
        state: value,
        city: "",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.put("/users/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Profile updated successfully!");

      const updatedUser = await api.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem("user", JSON.stringify(updatedUser.data));
      window.dispatchEvent(new Event("storage"));

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile.");
    }
  };

  const selectedState = State.getStatesOfCountry("IN").find(
    (state) => state.name === formData.state
  );

  const cities = selectedState
    ? City.getCitiesOfState("IN", selectedState.isoCode)
    : [];

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Edit Profile</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name || ""}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone || ""}
            onChange={handleChange}
            maxLength={10}
            inputMode="numeric"
            pattern="[0-9]{10}"
            title="Phone number must contain exactly 10 digits"
          />

          <select
            name="bloodGroup"
            value={formData.bloodGroup || ""}
            onChange={handleChange}
          >
            <option value="">Select Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age || ""}
            onChange={handleChange}
          />

          <select
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          {/* State Dropdown */}
          <select
            name="state"
            value={formData.state || ""}
            onChange={handleChange}
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
            value={formData.city || ""}
            onChange={handleChange}
            disabled={!formData.state}
          >
            <option value="">Select City</option>

            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="area"
            placeholder="Area / Locality"
            value={formData.area || ""}
            onChange={handleChange}
          />

          <label className="checkbox">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />
            Available for Donation
          </label>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;