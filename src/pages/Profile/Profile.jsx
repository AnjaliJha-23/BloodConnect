import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

function Profile() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    bloodGroup: "",
    age: "",
    gender: "",
    city: "",
    state: "",
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

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

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

alert("Profile Updated Successfully!");

// Update localStorage
const updatedUser = await api.get("/users/profile", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

localStorage.setItem("user", JSON.stringify(updatedUser.data));

// Redirect to Home
navigate("/");

    } catch (err) {
      alert("Error Updating Profile");
    }

  };

  return (

    <div className="profile-container">

      <div className="profile-card">

        <h2>Edit Profile</h2>

        <form onSubmit={handleSubmit}>

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
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city || ""}
            onChange={handleChange}
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state || ""}
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

          <button type="submit">
            Save Changes
          </button>

        </form>

      </div>

    </div>

  );

}

export default Profile;