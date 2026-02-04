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

    const formData = new FormData();
    formData.append("trainer_id", trainerId);
    formData.append("password", password);

    try {
      const res = await api.post(
  "/api/accounts/trainer/login/",
  {
    trainer_id: trainerId,
    password: password,
  },
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);
    } catch {
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