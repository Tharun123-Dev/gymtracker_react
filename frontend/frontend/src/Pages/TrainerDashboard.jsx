import { useEffect, useState } from "react";
import api from "../Api/Axios";
import NavbarTrainer from "../Components/NavbarTrainer";
import "../Styles/TrainerDashboard.css";
import Footer from "../Components/Footer";

function TrainerDashboard() {
  const [users, setUsers] = useState([]);

  // 🔹 NEW: daily update form state
  const [form, setForm] = useState({
    username: "",
    date: "",
    diet: "",
    attendance: false,
    description: ""
  });

  useEffect(() => {
    const trainerId = localStorage.getItem("trainer_id");

    if (!trainerId) {
      alert("Trainer not logged in");
      return;
    }

    api
      .get(`/api/accounts/trainer/dashboard/?trainer_id=${trainerId}`)
      .then((res) => {
        setUsers(res.data.users || []);
      })
      .catch(() => alert("Failed to load users"));
  }, []);

  // 🔹 NEW: handle form change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // 🔹 NEW: submit daily update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const trainerId = localStorage.getItem("trainer_id");

    const formData = new FormData();
    formData.append("trainer_id", trainerId);
    formData.append("username", form.username);
    formData.append("date", form.date);
    formData.append("diet", form.diet);
    formData.append("attendance", form.attendance);
    formData.append("description", form.description);

    try {
      await api.post("/api/accounts/trainer/add-update/", formData);
      alert("Daily update added");

      // reset form
      setForm({
        username: "",
        date: "",
        diet: "",
        attendance: false,
        description: ""
      });
    } catch {
      alert("Failed to add update");
    }
  };

  return (
    <div className="trainer-page">
      <NavbarTrainer />

      <div className="trainer-content">
        <div className="trainer-card">
          <h2>Trainer Dashboard</h2>

          {/* ✅ EXISTING USER LIST (UNCHANGED) */}
          {users.length === 0 ? (
            <p className="no-users">No users assigned</p>
          ) : (
            <ul className="trainer-user-list">
              {users.map((u, i) => (
                <li key={i}>
                  <b>User:</b> {u.username} <br />
                  <b>Goal:</b> {u.goal}
                </li>
              ))}
            </ul>
          )}

          <hr />

          {/* 🔹 NEW SECTION: DAILY UPDATE FORM */}
          <h3>Add Daily Update</h3>

          <form onSubmit={handleSubmit} className="trainer-update-form">
            <input
              name="username"
              placeholder="User username"
              value={form.username}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />

            <input
              name="diet"
              placeholder="Diet (e.g. High protein)"
              value={form.diet}
              onChange={handleChange}
            />

            <label>
              <input
                type="checkbox"
                name="attendance"
                checked={form.attendance}
                onChange={handleChange}
              />
              Present
            </label>

            <textarea
              name="description"
              placeholder="Workout / notes"
              value={form.description}
              onChange={handleChange}
            />

            <button type="submit">Add Update</button>
          </form>

        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default TrainerDashboard;