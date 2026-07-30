import { useState } from "react";
import Layout from "../components/Layout";

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", topic: "", preferredTime: "" });

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <Layout title="Booking" subtitle="Reserve time with a mentor or coach for personalised guidance.">
      <div className="booking-layout">
        <form className="info-card booking-form" onSubmit={handleSubmit}>
          <h3>Request a session</h3>
          <label>
            Name
            <input type="text" placeholder="Your name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
          </label>
          <label>
            Topic
            <input type="text" placeholder="Interview prep, pathway review..." value={form.topic} onChange={(event) => setForm({ ...form, topic: event.target.value })} required />
          </label>
          <label>
            Preferred time
            <input type="text" placeholder="Thursday at 4pm" value={form.preferredTime} onChange={(event) => setForm({ ...form, preferredTime: event.target.value })} required />
          </label>
          <button className="btn-primary" type="submit">Book session</button>
          {submitted ? <p className="success-text" role="status">Thanks, {form.name}. Your request has been received.</p> : null}
        </form>

        <div className="info-card session-list">
          <h3>Upcoming availability</h3>
          <ul className="list-compact">
            <li>Monday — Career clarity session</li>
            <li>Wednesday — Mock interview prep</li>
            <li>Friday — Portfolio feedback</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
