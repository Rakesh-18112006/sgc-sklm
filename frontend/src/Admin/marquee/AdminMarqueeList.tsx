import { useEffect, useState } from "react";
import axios from "axios";

type MarqueeMessage = {
  _id: string;
  message: string;
  createdAt: string;
};

export default function AdminMarqueeList() {
  const [messages, setMessages] = useState<MarqueeMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/marquee");
      setMessages(res.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const deleteMessage = async (id: string) => {
    await axios.delete(`http://localhost:5000/api/marquee/${id}`);
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-6 bg-white shadow p-5 rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Marquee Messages</h2>

      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <ul className="space-y-3">
          {messages.map((msg) => (
            <li
              key={msg._id}
              className="flex items-center justify-between p-3 border bg-gray-50 rounded-xl"
            >
              <span className="font-medium">{msg.message}</span>
              <button
                onClick={() => deleteMessage(msg._id)}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
