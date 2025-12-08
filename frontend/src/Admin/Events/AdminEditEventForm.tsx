import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Search,
  Calendar,
  Users,
  Eye,
  Edit2,
  RefreshCw,
  XCircle,
  Building2,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart,
} from "lucide-react";
import "./AdminEditEventForm.css";

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
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [status, setStatus] = useState<"upcoming" | "completed">("upcoming");
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get<{
          success: boolean;
          data: Event[];
          total: number;
        }>("http://localhost:5000/api/events");
        const eventData = res.data.data || [];
        setEvents(eventData);
        setFilteredEvents(eventData);
        if (eventData.length > 0) {
          toast.success("Events loaded successfully");
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        toast.error("Failed to load events", {
          description: "Please check your connection and try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredEvents(events);
      return;
    }

    const filtered = events.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

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
    if (!selectedEventId) {
      toast.error("Please select an event first");
      return;
    }

    try {
      setSubmitting(true);

      await axios.put(`http://localhost:5000/api/events/${selectedEventId}`, {
        summary,
        status,
      });

      toast.success("Event updated successfully!", {
        description: "Event details have been updated in the system.",
        duration: 4000,
      });

      // Update local state
      setEvents((prev) =>
        prev.map((ev) =>
          ev._id === selectedEventId ? { ...ev, summary, status } : ev
        )
      );
    } catch (err) {
      console.error("Error updating event:", err);
      toast.error("Failed to update event", {
        description: "Please try again or contact support.",
        duration: 5000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getEventById = (id: string) => {
    if (!Array.isArray(events)) return undefined;
    return events.find((e) => e._id === id);
  };

  const selectedEvent = getEventById(selectedEventId);

  const clearForm = () => {
    setSelectedEventId("");
    setSummary("");
    setStatus("upcoming");
    setSearchTerm("");
    toast.info("Form cleared");
  };

  return (
    <div className="admin-edit-form">
      <motion.div
        className="admin-edit-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="admin-edit-header-card">
          <div className="admin-edit-header-gradient">
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div className="admin-edit-header-icon">
                <Building2
                  style={{ width: "32px", height: "32px", color: "#ffffff" }}
                />
              </div>
              <div>
                <h1 className="admin-edit-header-title">
                  SGC Event Management System
                </h1>
                <p className="admin-edit-header-subtitle">
                  Update and manage official campus events
                </p>
              </div>
            </div>
          </div>

          <div className="admin-edit-header-content">
            <div className="admin-edit-section-header">
              <div className="admin-edit-section-icon">
                <Edit2
                  style={{ width: "20px", height: "20px", color: "#1d4ed8" }}
                />
              </div>
              <h2 className="admin-edit-section-title">Update Event Details</h2>
            </div>
            <p className="admin-edit-section-description">
              Search and select events to update their summary and status
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="admin-edit-search-container">
          <div className="admin-edit-search-wrapper">
            <Search className="admin-edit-search-icon" size={20} />
            <input
              type="text"
              placeholder="Search events by title, club, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-edit-search-input"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="admin-edit-clear-search"
              >
                <XCircle size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="admin-edit-grid">
          {/* Event Selection Panel */}
          <div className="admin-edit-events-panel">
            <div className="admin-edit-panel-header">
              <h3 className="admin-edit-panel-title">
                {searchTerm
                  ? `Search Results for "${searchTerm}"`
                  : "All Events"}
              </h3>
              {searchTerm && filteredEvents.length > 0 && (
                <span className="admin-edit-results-count">
                  {filteredEvents.length} found
                </span>
              )}
            </div>

            <div className="admin-edit-events-list">
              {isLoading ? (
                <div className="admin-edit-loading">
                  <div className="admin-edit-spinner"></div>
                  <p className="admin-edit-loading-text">Loading events...</p>
                </div>
              ) : !Array.isArray(filteredEvents) ||
                filteredEvents.length === 0 ? (
                <div className="admin-edit-empty">
                  <AlertCircle className="admin-edit-empty-icon" size={48} />
                  <p className="admin-edit-empty-text">
                    {searchTerm ? "No events found" : "No events available"}
                  </p>
                  <p className="admin-edit-empty-hint">
                    {searchTerm
                      ? "Try a different search term"
                      : "Check back later"}
                  </p>
                </div>
              ) : (
                filteredEvents.map((event) => (
                  <div
                    key={event._id}
                    className={`admin-edit-event-item ${
                      selectedEventId === event._id
                        ? "admin-edit-event-item-selected"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedEventId(event._id);
                    }}
                  >
                    <div className="admin-edit-event-icon-wrapper">
                      {event.club.icon &&
                        (event.club.icon.startsWith("/") ||
                        event.club.icon.startsWith("http") ||
                        event.club.icon.startsWith("data:image") ? (
                          <img
                            src={event.club.icon}
                            alt={event.club.name}
                            className="admin-edit-event-icon"
                          />
                        ) : (
                          <span className="admin-edit-event-icon-text">
                            {event.club.icon || "🏢"}
                          </span>
                        ))}
                    </div>
                    <div className="admin-edit-event-content">
                      <p className="admin-edit-event-title">{event.title}</p>
                      <p className="admin-edit-event-club">{event.club.name}</p>
                      <div className="admin-edit-event-meta">
                        <span className="admin-edit-meta-item">
                          <Calendar size={12} />
                          {formatDate(event.date)}
                        </span>
                        <span className="admin-edit-meta-item">
                          <Eye size={12} />
                          {event.views}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`admin-edit-event-status ${
                        event.status === "upcoming"
                          ? "admin-edit-status-upcoming"
                          : "admin-edit-status-completed"
                      }`}
                    >
                      {event.status}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Edit Form Panel */}
          <div>
            {selectedEvent ? (
              <motion.div
                className="admin-edit-form-panel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <form
                  onSubmit={handleUpdate}
                  className="admin-edit-form-content"
                >
                  {/* Event Header */}
                  <div className="admin-edit-event-header">
                    <div className="admin-edit-header-row">
                      <div className="admin-edit-event-main">
                        <div className="admin-edit-event-main-icon-wrapper">
                          {selectedEvent.club.icon &&
                            (selectedEvent.club.icon.startsWith("/") ||
                            selectedEvent.club.icon.startsWith("http") ||
                            selectedEvent.club.icon.startsWith("data:image") ? (
                              <img
                                src={selectedEvent.club.icon}
                                alt={selectedEvent.club.name}
                                className="admin-edit-event-main-icon"
                              />
                            ) : (
                              <span className="admin-edit-event-main-icon-text">
                                {selectedEvent.club.icon || "🏢"}
                              </span>
                            ))}
                        </div>
                        <div className="admin-edit-event-details">
                          <h3>{selectedEvent.title}</h3>
                          <p>{selectedEvent.club.name}</p>
                          <div className="admin-edit-event-meta-row">
                            <span className="admin-edit-detail-item">
                              <Calendar size={12} />
                              {formatDate(selectedEvent.date)} at{" "}
                              {selectedEvent.time}
                            </span>
                            <span className="admin-edit-detail-item">
                              <Users size={12} />
                              {selectedEvent.interestedCount} interested
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="admin-edit-event-stats">
                        <div className="admin-edit-stat">
                          <div className="admin-edit-stat-value">
                            {selectedEvent.views}
                          </div>
                          <div className="admin-edit-stat-label">Views</div>
                        </div>
                        <div className="admin-edit-stat">
                          <div className="admin-edit-stat-value">
                            {selectedEvent.interestedCount}
                          </div>
                          <div className="admin-edit-stat-label">
                            Interested
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary Input */}
                  <div className="admin-edit-form-section">
                    <label className="admin-edit-label">
                      <FileText size={16} />
                      <span>Event Summary</span>
                      <span className="admin-edit-label-optional">
                        (Optional post-event update)
                      </span>
                    </label>
                    <textarea
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      placeholder="Add a summary of the event... (What happened, key moments, outcomes, etc.)"
                      className="admin-edit-textarea"
                      rows={5}
                      maxLength={1000}
                    />
                    <div className="admin-edit-char-count">
                      <span>Post-event report and outcomes</span>
                      <span>{summary.length}/1000</span>
                    </div>
                  </div>

                  {/* Status Selection */}
                  <div className="admin-edit-form-section">
                    <label className="admin-edit-label">
                      <BarChart size={16} />
                      <span>Event Status</span>
                    </label>

                    <div className="admin-edit-status-grid">
                      <motion.button
                        type="button"
                        className={`admin-edit-status-card ${
                          status === "upcoming"
                            ? "admin-edit-status-card-active"
                            : ""
                        }`}
                        onClick={() => setStatus("upcoming")}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div
                          className="admin-edit-status-icon"
                          style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}
                        >
                          <Clock
                            size={20}
                            color={
                              status === "upcoming" ? "#22c55e" : "#6b7280"
                            }
                          />
                        </div>
                        <div className="admin-edit-status-content">
                          <div className="admin-edit-status-title">
                            Upcoming
                          </div>
                          <div className="admin-edit-status-description">
                            Event is scheduled for future
                          </div>
                        </div>
                        {status === "upcoming" && (
                          <CheckCircle
                            className="admin-edit-status-indicator"
                            size={20}
                            color="#22c55e"
                          />
                        )}
                      </motion.button>

                      <motion.button
                        type="button"
                        className={`admin-edit-status-card ${
                          status === "completed"
                            ? "admin-edit-status-card-active"
                            : ""
                        }`}
                        onClick={() => setStatus("completed")}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div
                          className="admin-edit-status-icon"
                          style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                        >
                          <CheckCircle
                            size={20}
                            color={
                              status === "completed" ? "#3b82f6" : "#6b7280"
                            }
                          />
                        </div>
                        <div className="admin-edit-status-content">
                          <div className="admin-edit-status-title">
                            Completed
                          </div>
                          <div className="admin-edit-status-description">
                            Event has been concluded
                          </div>
                        </div>
                        {status === "completed" && (
                          <CheckCircle
                            className="admin-edit-status-indicator"
                            size={20}
                            color="#3b82f6"
                          />
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="admin-edit-actions">
                    <motion.button
                      type="button"
                      className="admin-edit-clear-btn"
                      onClick={clearForm}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <XCircle size={16} />
                      <span>Clear Selection</span>
                    </motion.button>

                    <motion.button
                      type="submit"
                      className="admin-edit-submit-btn"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <div className="admin-edit-submit-spinner"></div>
                          <span>Updating Event...</span>
                        </>
                      ) : (
                        <>
                          <RefreshCw size={16} />
                          <span>Update Event Details</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <div className="admin-edit-empty-form">
                <div className="admin-edit-empty-form-icon">
                  <Search size={32} color="#9ca3af" />
                </div>
                <h3 className="admin-edit-empty-form-title">Select an Event</h3>
                <p className="admin-edit-empty-form-text">
                  Choose an event from the list to edit its details
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="admin-edit-footer">
          <p className="admin-edit-footer-text">
            This is an official government portal. All updates will be reflected
            in the public system.
          </p>
          <p className="admin-edit-footer-copyright">
            © {new Date().getFullYear()} Government Event Management System. All
            rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminEditEventForm;
