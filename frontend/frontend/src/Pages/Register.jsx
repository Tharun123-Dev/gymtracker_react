import { useState } from "react";
import api from "../Api/Axios";
import "../Styles/Auth.css";

function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    age: "",
    height: "",
    weight: "",
    goal: "weight_loss",
    gym_type: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const res = await api.post(
      "/api/accounts/register/",
      form,
      { headers: { "Content-Type": "application/json" } }
    );

    alert(res.data.message || "Registered successfully");
    window.location.href = "/login";
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Registration failed. Check console.");
  }
};

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>User Register</h2>

        <form onSubmit={handleRegister}>
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <input name="age" placeholder="Age" onChange={handleChange} />

          <input
            name="height"
            placeholder="Height (cm)"
            onChange={handleChange}
          />

          <input
            name="weight"
            placeholder="Weight (kg)"
            onChange={handleChange}
          />

          <select name="goal" onChange={handleChange}>
            <option value="weight_loss">Weight Loss</option>
            <option value="muscle_gain">Muscle Gain</option>
            <option value="fitness">General Fitness</option>
          </select>

          <input
            name="gym_type"
            placeholder="Gym Type"
            onChange={handleChange}
          />

          <button type="submit">Register</button>

          {/* ✅ INLINE LOGIN LINK */}
          <p className="auth-switch">
            Already registered?{" "}
            <span
              className="auth-link"
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;