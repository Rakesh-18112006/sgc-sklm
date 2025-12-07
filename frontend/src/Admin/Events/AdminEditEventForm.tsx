import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Calendar, 
  Users, 
  Eye, 
  TrendingUp,
  Clock,
  CheckCircle,
  Edit2,
  AlertCircle,
  XCircle,
  ChevronDown,
  RefreshCw
} from "lucide-react";
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
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [status, setStatus] = useState<"upcoming" | "completed">("upcoming");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showEventList, setShowEventList] = useState(false);

  // Fetch all events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get<Event[]>(
          "http://localhost:5000/api/events"
        );
        setEvents(res.data);
        setFilteredEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Filter events based on search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredEvents(events);
      return;
    }
    
    const filtered = events.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchTerm, events]);

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
    if (!selectedEventId) {
      setError("Please select an event first");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
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

      // Reset after successful update
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Error updating event:", err);
      setError("Failed to update event. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getEventById = (id: string) => {
    return events.find(e => e._id === id);
  };

  const selectedEvent = getEventById(selectedEventId);

  return (
    <motion.div
      className={styles.editFormContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <div className={styles.headerIcon} style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <Edit2 size={24} />
        </div>
        <div>
          <h2 className={styles.heading}>Update Event Details</h2>
          <p className={styles.subtitle}>Edit event summary and status</p>
        </div>
      </div>

      <AnimatePresence>
        {success && (
          <motion.div
            className={styles.successAlert}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <CheckCircle size={20} />
            <span>Event updated successfully!</span>
          </motion.div>
        )}

        {error && (
          <motion.div
            className={styles.errorAlert}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <AlertCircle size={20} />
            <span>{error}</span>
            <button onClick={() => setError(null)} className={styles.alertClose}>
              <XCircle size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search and Event Selection */}
      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <Search size={20} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search events by title, club, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
            onFocus={() => setShowEventList(true)}
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className={styles.clearSearchBtn}
            >
              <XCircle size={18} />
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleUpdate} className={styles.editForm}>
        {/* Event Selection */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <Calendar size={18} />
            Select Event
          </label>
          
          <div className={styles.eventSelector}>
            <button
              type="button"
              className={styles.eventSelectTrigger}
              onClick={() => setShowEventList(!showEventList)}
            >
              {selectedEvent ? (
                <div className={styles.selectedEventPreview}>
                  <img 
                    src={selectedEvent.club.icon} 
                    alt={selectedEvent.club.name}
                    className={styles.eventClubIcon}
                  />
                  <div className={styles.eventInfo}>
                    <span className={styles.eventTitle}>{selectedEvent.title}</span>
                    <span className={styles.eventDate}>
                      {formatDate(selectedEvent.date)} • {selectedEvent.time}
                    </span>
                  </div>
                </div>
              ) : (
                <span className={styles.placeholderText}>Click to select an event...</span>
              )}
              <ChevronDown size={20} className={`${styles.chevron} ${showEventList ? styles.rotated : ''}`} />
            </button>

            {showEventList && (
              <div className={styles.eventDropdown}>
                {isLoading ? (
                  <div className={styles.loadingState}>
                    <div className={styles.spinner}></div>
                    <span>Loading events...</span>
                  </div>
                ) : filteredEvents.length === 0 ? (
                  <div className={styles.emptyState}>
                    <AlertCircle size={24} />
                    <span>No events found</span>
                  </div>
                ) : (
                  filteredEvents.map((event) => (
                    <div
                      key={event._id}
                      className={`${styles.eventItem} ${selectedEventId === event._id ? styles.eventItemSelected : ''}`}
                      onClick={() => {
                        setSelectedEventId(event._id);
                        setShowEventList(false);
                      }}
                    >
                      <div className={styles.eventItemLeft}>
                        <img 
                          src={event.club.icon} 
                          alt={event.club.name}
                          className={styles.eventItemIcon}
                        />
                        <div className={styles.eventItemInfo}>
                          <span className={styles.eventItemTitle}>{event.title}</span>
                          <span className={styles.eventItemClub}>{event.club.name}</span>
                        </div>
                      </div>
                      <div className={styles.eventItemStats}>
                        <div className={styles.stat}>
                          <Eye size={14} />
                          <span>{event.views}</span>
                        </div>
                        <div className={styles.stat}>
                          <Users size={14} />
                          <span>{event.interestedCount}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Selected Event Details */}
        {selectedEvent && (
          <motion.div
            className={styles.eventDetailsCard}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.eventDetailsHeader}>
              <div className={styles.eventDetailLeft}>
                <img 
                  src={selectedEvent.club.icon} 
                  alt={selectedEvent.club.name}
                  className={styles.detailClubIcon}
                />
                <div>
                  <h3 className={styles.detailTitle}>{selectedEvent.title}</h3>
                  <div className={styles.detailMeta}>
                    <span className={styles.detailDate}>
                      <Calendar size={14} />
                      {formatDate(selectedEvent.date)}
                    </span>
                    <span className={styles.detailTime}>
                      <Clock size={14} />
                      {selectedEvent.time}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.eventStats}>
                <div className={styles.statBadge}>
                  <Eye size={16} />
                  <span>{selectedEvent.views} views</span>
                </div>
                <div className={styles.statBadge}>
                  <Users size={16} />
                  <span>{selectedEvent.interestedCount} interested</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Summary Input */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>
            <Edit2 size={18} />
            Event Summary
            <span className={styles.optional}>(Optional)</span>
          </label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Add a summary of the event... (What happened, key moments, outcomes, etc.)"
            className={styles.textarea}
            rows={5}
            maxLength={1000}
          />
          <div className={styles.charCount}>
            {summary.length}/1000
          </div>
        </div>

        {/* Status Selection */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>Update Status</label>
          <div className={styles.statusGrid}>
            <motion.button
              type="button"
              className={`${styles.statusCard} ${status === 'upcoming' ? styles.statusCardActive : ''}`}
              onClick={() => setStatus('upcoming')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.statusIcon} style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
                <Clock size={20} color="#22C55E" />
              </div>
              <div className={styles.statusContent}>
                <h4 className={styles.statusTitle}>Upcoming</h4>
                <p className={styles.statusDescription}>Event is scheduled for the future</p>
              </div>
              {status === 'upcoming' && (
                <div className={styles.statusIndicator}>
                  <CheckCircle size={20} color="#22C55E" />
                </div>
              )}
            </motion.button>

            <motion.button
              type="button"
              className={`${styles.statusCard} ${status === 'completed' ? styles.statusCardActive : ''}`}
              onClick={() => setStatus('completed')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.statusIcon} style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
                <CheckCircle size={20} color="#3B82F6" />
              </div>
              <div className={styles.statusContent}>
                <h4 className={styles.statusTitle}>Completed</h4>
                <p className={styles.statusDescription}>Event has been concluded</p>
              </div>
              {status === 'completed' && (
                <div className={styles.statusIndicator}>
                  <CheckCircle size={20} color="#3B82F6" />
                </div>
              )}
            </motion.button>
          </div>
        </div>

        {/* Submit Button */}
        <div className={styles.formActions}>
          <motion.button
            type="button"
            className={styles.cancelBtn}
            onClick={() => {
              setSelectedEventId('');
              setSummary('');
              setStatus('upcoming');
              setSearchTerm('');
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <XCircle size={18} />
            Clear
          </motion.button>
          
          <motion.button
            type="submit"
            className={styles.submitBtn}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={submitting || !selectedEventId}
          >
            {submitting ? (
              <>
                <div className={styles.spinner}></div>
                Updating...
              </>
            ) : (
              <>
                <RefreshCw size={18} />
                Update Event
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default AdminEditEventForm;