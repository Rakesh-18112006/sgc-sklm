// AdminMarqueeList.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminMarqueeList.module.css";

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
      const res = await axios.get("http://localhost:5000/api/marquee/all");
      setMessages(res.data.marquee || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const deleteMessage = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      await axios.delete(`http://localhost:5000/api/marquee/delete/${id}`);
      fetchMessages();
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) return <p className={styles.loading}>Loading messages...</p>;

  return (
    <div className={styles.listContainer}>
      <h2 className={styles.title}>Current Messages</h2>

      {messages.length === 0 ? (
        <div className={styles.emptyState}>
          No messages found. Create your first announcement!
        </div>
      ) : (
        <div className={styles.messageList}>
          {messages.map((msg) => (
            <div key={msg._id} className={styles.messageItem}>
              <span className={styles.messageText}>{msg.message}</span>
              <button
                onClick={() => deleteMessage(msg._id)}
                className={styles.deleteButton}
              >
                🗑️ Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
