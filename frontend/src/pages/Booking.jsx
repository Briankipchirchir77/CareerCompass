import { useContext, useState } from "react";
import Layout from "../components/Layout";
import { UserContext } from "../context/userContext";
import { getBookings, getAssessmentResult, saveBooking } from "../services/localData";

const coachOptions = ["Maya Chen", "Daniel Okafor", "Sofia Alvarez", "Amina Patel"];

export default function Booking() {
  const { user } = useContext(UserContext);
  const assessment = getAssessmentResult();
  const [submitted, setSubmitted] = useState(false);
  const [bookings, setBookings] = useState(() => getBookings());
  const [form, setForm] = useState({
    name: user?.name || "",
    coach: assessment?.topPathway?.id === "creative" ? "Daniel Okafor" : "Maya Chen",
    topic: assessment?.topPathway ? `${assessment.topPathway.title} pathway review` : "",
    preferredTime: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const booking = {
      id: crypto.randomUUID(),
      ...form,
      createdAt: new Date().toISOString(),
      status: "Requested",
    };
    setBookings(saveBooking(booking));
    setSubmitted(true);
    setForm((current) => ({ ...current, topic: "", preferredTime: "" }));
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
            Coach
            <select value={form.coach} onChange={(event) => setForm({ ...form, coach: event.target.value })}>
              {coachOptions.map((coach) => (
                <option key={coach}>{coach}</option>
              ))}
            </select>
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
          {submitted ? <p className="success-text" role="status">Thanks, {form.name || "Explorer"}. Your request has been saved.</p> : null}
        </form>

        <div className="info-card session-list">
          <h3>Your session requests</h3>
          {bookings.length ? (
            <ul className="list-compact">
              {bookings.map((booking) => (
                <li key={booking.id}>
                  <strong>{booking.coach}</strong> — {booking.topic || "Career guidance"} ({booking.preferredTime})
                </li>
              ))}
            </ul>
          ) : (
            <p>No sessions requested yet. Choose a coach and time to get started.</p>
          )}
          <h3 className="section-subhead">Upcoming availability</h3>
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
