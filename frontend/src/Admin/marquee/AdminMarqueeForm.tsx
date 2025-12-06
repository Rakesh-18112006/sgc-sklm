import { useState } from "react";
import axios from "axios";

export default function AdminMarqueeForm() {
  const [message, setMessage] = useState("{}");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:5000/api/marquee", {
        message,
      });
      setSuccess("Marquee message added successfully!");
      setMessage("");
    } catch (err: any) {
      setError("Failed to add message");
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white shadow-xl p-6 rounded-2xl mt-4">
      <h2 className="text-2xl font-bold mb-4">Add Marquee Message</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter marquee message..."
          className="w-full p-3 border rounded-lg focus:ring focus:outline-none"
          rows={3}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl shadow-md transition"
        >
          {loading ? "Posting..." : "Post Message"}
        </button>

        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}
