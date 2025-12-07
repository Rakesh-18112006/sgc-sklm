// AdminMarqueeForm.tsx (updated with better error handling)
import { useState } from "react";
import axios from "axios";
import styles from "./AdminMarqueeForm.module.css";

export default function AdminMarqueeForm() {
  const [message, setMessage] = useState(""); // Changed from "{}"
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      console.log("Sending POST request to: http://localhost:5000/api/marquee");
      console.log("Payload:", { message });
      
      const res = await axios.post("http://localhost:5000/api/marquee", {
        message,
      });
      
      console.log("Response:", res.data);
      console.log("Status:", res.status);
      
      setSuccess("🎉 Marquee message added successfully!");
      setMessage("");
      
      // Refresh the list automatically after successful submission
      // You might want to use a callback or context for this in production
      window.dispatchEvent(new Event('messageAdded'));
    } catch (err: any) {
      console.error("Error adding message:", err);
      
      if (err.response) {
        // Server responded with error status
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
        setError(`❌ Failed to add message: ${err.response.data.message || err.response.statusText}`);
      } else if (err.request) {
        // Request was made but no response received
        console.error("No response received:", err.request);
        setError("❌ No response from server. Please check if backend is running.");
      } else {
        // Something else happened
        console.error("Error:", err.message);
        setError(`❌ Error: ${err.message}`);
      }
    }

    setLoading(false);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Create New Message</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your announcement here..."
          className={styles.textarea}
          rows={4}
          required
          minLength={3}
        />

        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? (
            <>
              <span className={styles.spinner}></span>
              Posting...
            </>
          ) : (
            "📤 Post Message"
          )}
        </button>

        {success && <p className={styles.successMessage}>{success}</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
    </div>
  );
}