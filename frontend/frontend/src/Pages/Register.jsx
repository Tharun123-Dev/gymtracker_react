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

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle register
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/api/accounts/register/",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert(res.data.message || "Registered successfully");
      window.location.href = "/login";
    } catch (err) {
      console.error("Register Error:", err.response?.data || err.message);
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
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            name="age"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            required
          />

          <input
            name="height"
            type="number"
            placeholder="Height (cm)"
            value={form.height}
            onChange={handleChange}
            required
          />

          <input
            name="weight"
            type="number"
            placeholder="Weight (kg)"
            value={form.weight}
            onChange={handleChange}
            required
          />

          <select
            name="goal"
            value={form.goal}
            onChange={handleChange}
            required
          >
            <option value="weight_loss">Weight Loss</option>
            <option value="muscle_gain">Muscle Gain</option>
            <option value="fitness">General Fitness</option>
          </select>

          <input
            name="gym_type"
            placeholder="Gym Type"
            value={form.gym_type}
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>

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