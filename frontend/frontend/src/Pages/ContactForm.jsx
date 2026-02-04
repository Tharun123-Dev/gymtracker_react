import { useState } from "react";
import emailjs from "emailjs-com";
import "../Styles/ContactForm.css";

function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      user_email: email,
      user_message: message,
    };

    emailjs
      .send(
        "service_ge2oq38",
        "template_kbfgv0q",
        templateParams,
        "8UwFK-ScFgNdU0Tqv"
      )
      .then(() => {
        alert("!Message sent successfully 😊");
        setEmail("");
        setMessage("");
        setLoading(false);
      })
      .catch(() => {
        alert("Oops! Try again later");
        setLoading(false);
      });
  };

  return (
    <div className="contact-page">
      {/* LEFT SECTION */}
      <div className="contact-info">
        <h1>Contact Us</h1>
        <p>
          Hyderabad Located 
        </p>

        <div className="info-box">
          <span>📍</span>
          <p>Hyderabad, Telangana</p>
        </div>

        <div className="info-box">
          <span>📧</span>
          <p>support@gymtracker.com</p>
        </div>

        <div className="info-box">
          <span>📞</span>
          <p>+91 98765 43210</p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="contact-form-card">
        <h2>Send us a message</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;