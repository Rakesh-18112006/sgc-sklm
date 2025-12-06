import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import styles from "./AdminEventForm.module.css";

interface Club {
  name: string;
  icon: string;
}

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  views: number;
  imageUrl: string;
  club: Club;
  interestedCount: number;
  summary?: string;
  status: "upcoming" | "completed";
}

const AdminEditEventForm: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [status, setStatus] = useState<"upcoming" | "completed">("upcoming");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fetch all events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get<Event[]>(
          "http://localhost:5000/api/events"
        );
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  // When admin selects an event, populate its data
  useEffect(() => {
    if (!selectedEventId) return;
    const event = events.find((e) => e._id === selectedEventId);
    if (event) {
      setSummary(event.summary || "");
      setStatus(event.status);
    }
  }, [selectedEventId, events]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventId) return alert("Select an event first");

    try {
      setSubmitting(true);
      await axios.put(`http://localhost:5000/api/events/${selectedEventId}`, {
        summary,
        status,
      });
      setSuccess(true);

      // Update local state
      setEvents((prev) =>
        prev.map((ev) =>
          ev._id === selectedEventId ? { ...ev, summary, status } : ev
        )
      );
    } catch (err) {
      console.error("Error updating event:", err);
      alert("Failed to update event");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className={styles.formContainer}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={styles.heading}>Update Event Summary / Status</h2>

      <form onSubmit={handleUpdate} className={styles.form}>
        {/* Select Event */}
        <select
          className={styles.select}
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
          required
        >
          <option value="">Select Event</option>
          {events.map((ev) => (
            <option key={ev._id} value={ev._id}>
              {ev.title} ({ev.date})
            </option>
          ))}
        </select>

        {/* Summary Textarea */}
        <textarea
          name="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Event Summary"
          className={styles.textarea}
          required
        />

        {/* Status Select */}
        <select
          name="status"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as "upcoming" | "completed")
          }
          className={styles.select}
          required
        >
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
        </select>

        <motion.button
          type="submit"
          className={styles.submitBtn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={submitting}
        >
          {submitting ? "Updating..." : "Update Event"}
        </motion.button>

        {success && (
          <p className={styles.successMsg}>Event updated successfully!</p>
        )}
      </form>
    </motion.div>
  );
};

export default AdminEditEventForm;
