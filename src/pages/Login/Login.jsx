import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

      const res = await api.post("/auth/login", formData);

      // Save JWT
      localStorage.setItem("token", res.data.token);

      // Save logged in user
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.dispatchEvent(new Event("storage"));

      alert("Login Successful!");

      navigate("/dashboard");

    } catch (err) {

      alert(err.response?.data?.message || "Login Failed");

    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h1 className="logo">🩸 BloodConnect</h1>

        <p className="subtitle">
          Welcome Back
        </p>

        <form onSubmit={handleSubmit} autoComplete="off">

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
            autoComplete="current-password"
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;