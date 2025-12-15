import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import type { Event } from "./eventTypes";
import styles from "./EventDetails.module.css";
import { ExternalLink, Users } from "lucide-react";

const EventDetail: React.FC = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasRegistered, setHasRegistered] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerMsg, setRegisterMsg] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`https://sgc-sklm-01.onrender.com/api/events/${id}`);
        setEvent(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch event:", error);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleRegistration = async () => {
    if (hasRegistered) return;

    setIsRegistering(true);
    setRegisterMsg("");

    try {
      // If registration link exists, redirect to it
      if (event?.registrationLink) {
        window.open(event.registrationLink, "_blank", "noopener,noreferrer");
        
        // Also increment interested count in backend
        try {
          await axios.patch(
            `http://localhost:5000/api/events/${id}/interested`,
            {
              studentId: localStorage.getItem("studentId") || "",
            }
          );
        } catch (error) {
          // Silently fail for interested count if it fails
          console.log("Failed to update interest count, but registration successful");
        }
        
        setRegisterMsg("Redirecting to registration form...");
        setHasRegistered(true);
      } else {
        // Fallback to old interested API (if no registration link)
        const response = await axios.patch(
          `http://localhost:5000/api/events/${id}/interested`,
          {
            studentId: localStorage.getItem("studentId") || "",
          }
        );

        setRegisterMsg(
          `Successfully registered interest! Total interested: ${response.data.interestedCount}`
        );
        setHasRegistered(true);
      }
    } catch (error: any) {
      setRegisterMsg(
        error.response?.data?.error || "Failed to register. Try again."
      );
    } finally {
      setIsRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className={styles.errorContainer}>
        <motion.div
          className={styles.errorContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Event Not Found</h2>
          <p>
            The event you're looking for doesn't exist or may have been removed.
          </p>
          <Link to="/events" className={styles.backLink}>
            ← Back to Events
          </Link>
        </motion.div>
      </div>
    );
  }

  const getRegistrationButtonText = () => {
    if (hasRegistered) {
      return event.registrationLink ? "Registered ✅" : "Interested ✅";
    }
    
    if (isRegistering) {
      return "Processing...";
    }
    
    return event.registrationLink ? "Register Now" : "Show Interest";
  };

  const getRegistrationSubtitle = () => {
    if (event.registrationLink) {
      return "Click to fill out the registration form";
    }
    return "Let us know you're interested!";
  };

  return (
    <div className={styles.detailPage}>
      {/* Hero Section */}
      <motion.section
        className={styles.heroSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.heroOverlay}></div>
        <motion.div
          className={styles.heroContent}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <h1 className={styles.heroTitle}>{event.title}</h1>
          <p className={styles.heroSubtitle}>
            {event.status === "upcoming" 
              ? event.registrationLink 
                ? "Register now to secure your spot!" 
                : "Show your interest to participate!"
              : "Event has been completed"}
          </p>
          <motion.div
            className={styles.scrollIndicator}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className={styles.mouse}>
              <div className={styles.scroller}></div>
            </div>
            <span>Scroll to explore</span>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Event Details */}
      <motion.div
        className={styles.detailContainer}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className={styles.detailGrid}>
          {/* Main Content */}
          <motion.div
            className={styles.mainContent}
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src={
                event.imageUrl ||
                "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              }
              alt={event.title}
              className={styles.eventImage}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />

            <div className={styles.eventDescription}>
              <h2>About This Event</h2>
              <p>{event.description}</p>
              <p>
                Join us for an unforgettable experience filled with learning,
                networking, and fun. This event is designed to bring together
                like-minded individuals who share a passion for innovation and
                creativity.
              </p>
              
              {event.registrationLink && (
                <div className={styles.registrationLinkInfo}>
                  <h3>Registration Details</h3>
                  <p>
                    <strong>Registration Link:</strong>{" "}
                    <a 
                      href={event.registrationLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.registrationLink}
                    >
                      {event.registrationLink}
                      <ExternalLink size={14} />
                    </a>
                  </p>
                  <p className={styles.registrationNote}>
                    Click the Register button in the sidebar to access the registration form.
                  </p>
                </div>
              )}
            </div>

            <div className={styles.highlights}>
              <h3>Event Highlights</h3>
              <div className={styles.highlightList}>
                <motion.div
                  className={styles.highlightCard}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className={styles.highlightIcon}>🎯</span>
                  <h4>Keynote Sessions</h4>
                  <p>Learn from industry experts and thought leaders</p>
                </motion.div>

                <motion.div
                  className={styles.highlightCard}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className={styles.highlightIcon}>🤝</span>
                  <h4>Networking</h4>
                  <p>Connect with professionals and peers</p>
                </motion.div>

                <motion.div
                  className={styles.highlightCard}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className={styles.highlightIcon}>💡</span>
                  <h4>Workshops</h4>
                  <p>Hands-on learning experiences</p>
                </motion.div>
              </div>
            </div>

            {event.summary && (
              <div className={styles.eventDescription}>
                <h2>Event Summary</h2>
                <p>{event.summary}</p>
                <p>
                  Join us for an unforgettable experience filled with learning,
                  networking, and fun. This event is designed to bring together
                  like-minded individuals who share a passion for innovation and
                  creativity.
                </p>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className={styles.sidebar}
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.eventMeta}>
              <div className={styles.metaCard}>
                <h3>Event Details</h3>

                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}>📅</span>
                  <div>
                    <p className={styles.metaLabel}>Date</p>
                    <p className={styles.metaValue}>
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}>⏰</span>
                  <div>
                    <p className={styles.metaLabel}>Time</p>
                    <p className={styles.metaValue}>{event.time}</p>
                  </div>
                </div>

                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}>👁️</span>
                  <div>
                    <p className={styles.metaLabel}>Views</p>
                    <p className={styles.metaValue}>{event.views}</p>
                  </div>
                </div>

                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}>🏢</span>
                  <div>
                    <p className={styles.metaLabel}>Organizer</p>
                    <p className={styles.metaValue}>{event.club.name}</p>
                  </div>
                </div>

                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}>👥</span>
                  <div>
                    <p className={styles.metaLabel}>Interested</p>
                    <p className={styles.metaValue}>{event.interestedCount} people</p>
                  </div>
                </div>

                {event.registrationLink && (
                  <div className={styles.metaItem}>
                    <span className={styles.metaIcon}>🔗</span>
                    <div>
                      <p className={styles.metaLabel}>Registration</p>
                      <p className={styles.metaValue}>Required</p>
                    </div>
                  </div>
                )}
              </div>

              {event.status === "upcoming" && (
                <motion.div
                  className={styles.registerCard}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3>
                    {event.registrationLink ? "Register Now" : "Show Interest"}
                  </h3>
                  <p>{getRegistrationSubtitle()}</p>
                  
                  <motion.button
                    className={styles.registerButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRegistration}
                    disabled={hasRegistered || isRegistering}
                  >
                    <div className={styles.buttonContent}>
                      {getRegistrationButtonText()}
                      {event.registrationLink && !hasRegistered && !isRegistering && (
                        <ExternalLink size={18} className={styles.buttonIcon} />
                      )}
                    </div>
                  </motion.button>
                  
                  {registerMsg && (
                    <p className={styles.registerMsg}>{registerMsg}</p>
                  )}
                  
                  {event.registrationLink && !hasRegistered && (
                    <p className={styles.registrationHint}>
                      You will be redirected to the registration form
                    </p>
                  )}
                  
                  {!event.registrationLink && (
                    <div className={styles.interestedCountDisplay}>
                      <Users size={16} />
                      <span>Currently {event.interestedCount} people interested</span>
                    </div>
                  )}
                </motion.div>
              )}

              <div className={styles.socialShare}>
                <h4>Share This Event</h4>
                <div className={styles.socialIcons}>
                  {[
                    "Facebook",
                    "Twitter",
                    "Instagram",
                    "LinkedIn",
                    "WhatsApp",
                  ].map((platform, index) => (
                    <motion.a
                      key={platform}
                      href="#"
                      className={styles.socialIcon}
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {platform.slice(0, 2)}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Back Link */}
        <motion.div
          className={styles.backContainer}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link to="/events" className={styles.backLink}>
            <span>←</span> Back to All Events
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EventDetail;