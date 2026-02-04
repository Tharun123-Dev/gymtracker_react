import { useState } from "react";
import api from "../Api/Axios";
import NavbarUser from "../Components/NavbarUser";
import Footer from "../Components/Footer"






import "../Styles/Layouts.css";

function UserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const res = await api.post("api/accounts/login/", formData);

      if (!res.data.approved) {
        alert(res.data.message);
        return;
      }

      // save username for dashboard
      localStorage.setItem("username", res.data.username);

      window.location.href = "/user-dashboard";
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="app-container">
      <NavbarUser />

      <div className="page-content">
        <h2>User Login</h2>

        <form onSubmit={handleLogin}>
          <input
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button  type="submit">Login</button>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default UserLogin;