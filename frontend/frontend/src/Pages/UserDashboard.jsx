import { useEffect, useState } from "react";
import api from "../Api/Axios";
import NavbarUser from "../Components/NavbarUser";
import Footer from "../Components/Footer";
import "../Styles/Layouts.css";

function UserDashboard() {
  const [data, setData] = useState(null);

  // 🔹 NEW: trainer updates state
  const [updates, setUpdates] = useState([]);
  const [presentDays, setPresentDays] = useState(0);

  const username = localStorage.getItem("username");

  useEffect(() => {
    // ✅ EXISTING DASHBOARD API (unchanged)
    api.get(`/api/accounts/dashboard/?username=${username}`)
      .then(res => setData(res.data))
      .catch(() => alert("Failed to load dashboard"));

    // 🔹 NEW: fetch daily updates
    api.get(`/api/accounts/user/updates/?username=${username}`)
      .then(res => {
        setUpdates(res.data.updates || []);
        setPresentDays(res.data.present_days || 0);
      })
      .catch(() => console.log("No daily updates yet"));

  }, [username]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="app-container">
      <NavbarUser />

      <div className="page-content">
        <h2>User Dashboard</h2>

        {!data.approved ? (
          <p>{data.message}</p>
        ) : (
          <>
            {/* ✅ EXISTING INFO (UNCHANGED) */}
            <p><b>Username:</b> {data.username}</p>
            <p><b>Goal:</b> {data.goal}</p>
            <p><b>Status:</b> Approved</p>
            <p><b>Trainer:</b> {data.trainer || "Not assigned yet"}</p>

            <hr />

            {/* 🔹 NEW SECTION: MONTHLY SUMMARY */}
            <h3>Monthly Attendance</h3>
            <p><b>Present Days:</b> {presentDays}</p>

            <hr />

            {/* 🔹 NEW SECTION: DAY-WISE UPDATES */}
            <h3>Daily Updates</h3>

            {updates.length === 0 ? (
              <p>No daily updates yet</p>
            ) : (
              updates.map((u, i) => (
                <div key={i} style={{ marginBottom: "15px" }}>
                  <p><b>Date:</b> {u.date}</p>
                  <p><b>Diet:</b> {u.diet}</p>
                  <p><b>Attendance:</b> {u.attendance ? "Present" : "Absent"}</p>
                  <p><b>Notes:</b> {u.description}</p>
                  <hr />
                </div>
              ))
            )}
          </>
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default UserDashboard;