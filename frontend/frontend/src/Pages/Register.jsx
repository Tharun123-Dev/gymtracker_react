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
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      const res = await api.post("api/accounts/register/", formData);
      alert(res.data.message);
      window.location.href = "/login";
    } catch (err) {
      alert("Registration failed");
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