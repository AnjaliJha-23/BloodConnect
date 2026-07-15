import { useState } from "react";
import api from "../../services/api";
import "./Register.css";
import { FaTint } from "react-icons/fa";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", formData);

      alert(res.data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
      });

    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
  <div className="register-container">
    <div className="register-card">

      <h1 className="logo">
          <FaTint />
        BloodConnect
      </h1>
      <p className="subtitle">Become a Blood Donor Today</p>

      <form onSubmit={handleSubmit} autoComplete="off">

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          autoComplete="off"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          autoComplete="off"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
          required
        />

        <button type="submit">
          Register
        </button>

      </form>

      <p className="login-text">
  Already have an account? <Link to="/login">Login</Link>
</p>

    </div>
  </div>
);
}

export default Register;