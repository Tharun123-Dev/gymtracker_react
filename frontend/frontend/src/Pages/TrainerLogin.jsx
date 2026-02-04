import { useState } from "react";
import api from "../Api/Axios";
import "../Styles/TrainerLogin.css";

function TrainerLogin() {
  const [trainerId, setTrainerId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!trainerId || !password) {
    alert("Trainer ID and Password required");
    return;
  }

  try {
    const res = await api.post("/api/accounts/trainer/login/", {
      trainer_id: trainerId,
      password: password,
    });

    localStorage.setItem("trainer_id", res.data.trainer_id);
    window.location.href = "/trainer-dashboard";
  } catch (err) {
    console.error(err);
    alert("Trainer login failed");
  }
};

  return (
    <div className="trainer-login-page">
      <div className="trainer-login-card">
        <h2>Trainer Login</h2>

        <form onSubmit={handleLogin}>
          <input
            placeholder="Trainer ID"
            value={trainerId}
            onChange={(e) => setTrainerId(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default TrainerLogin;