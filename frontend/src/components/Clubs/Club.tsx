import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaLinkedin, FaCalendar, FaClock, FaEye } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import { clubsData } from "../Clubs/ClubsData";
import axios from "axios";
import styles from "./Club.module.css";

// Define complete event type that matches API
interface ApiEvent {
  id: string;
  _id: string;
  title: string;
  date: string;
  description: string;
  time: string;
  views: number;
  imageUrl: string;
  status: "upcoming" | "completed";
  club: {
    name: string;
    icon: string;
    id?: string;
  };
  clubId?: string;
}

const Club: React.FC = () => {
  const { id } = useParams();
  const club = clubsData.find((e) => e.id === id);
  const [clubEvents, setClubEvents] = useState<ApiEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEventType, setSelectedEventType] = useState<"upcoming" | "completed">("upcoming");
  const controls = useAnimation();

  // Floating animations
  useEffect(() => {
    const sequence = async () => {
      await controls.start({ opacity: 1, y: 0 });
      await controls.start({
        rotate: [0, 5, -5, 0],
        y: [0, -10, 10, 0],
        transition: { duration: 8, repeat: Infinity },
      });
    };
    sequence();
  }, [controls]);

  // Fetch club events from backend
  useEffect(() => {
    const fetchClubEvents = async () => {
      if (!club) return;

      setIsLoading(true);
      try {
        // First try to fetch by club ID
        const response = await axios.get<{
          success: boolean;
          data: ApiEvent[];
          total: number;
        }>(`https://sgc-sklm-01.onrender.com/api/events?clubId=${id}`);

        // If no events found with clubId parameter, fetch all events and filter
        let events: ApiEvent[] = [];
        
        if (response.data.success && response.data.data.length > 0) {
          events = response.data.data;
        } else {
          // Fetch all events and filter by club name
          const allEventsResponse = await axios.get<{
            success: boolean;
            data: ApiEvent[];
            total: number;
          }>("https://sgc-sklm-01.onrender.com/api/events");
          
          if (allEventsResponse.data.success) {
            // Filter events by club name (case-insensitive partial match)
            const clubName = club.name1 + (club.name2 ? ` ${club.name2}` : "");
            events = allEventsResponse.data.data.filter(event => {
              const eventClubName = event.club?.name?.toLowerCase() || "";
              const searchClubName = clubName.toLowerCase();
              
              // Check for partial match or contains
              return eventClubName.includes(searchClubName) || 
                     searchClubName.includes(eventClubName) ||
                     event.clubId === id;
            });
          }
        }

        // Process and set events
        const processedEvents = events.map((event) => ({
          ...event,
          id: event._id || event.id,
          club: {
            name: event.club?.name || club.name1 + (club.name2 ? ` ${club.name2}` : ""),
            icon: event.club?.icon || club.heroImage || "/default-club-icon.png",
            id: event.clubId || club.id,
          },
          clubId: event.clubId || club.id,
          time: event.time || "00:00",
          views: event.views || 0,
          imageUrl: event.imageUrl || club.heroImage || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          status: event.status || "upcoming",
          description: event.description || `An exciting event hosted by ${club.name1} Club`,
        }));

        setClubEvents(processedEvents);
      } catch (error) {
        console.error("Error fetching club events:", error);
        setClubEvents([]); // handle error gracefully
      } finally {
        setIsLoading(false);
      }
    };

    fetchClubEvents();
  }, [id, club]);

  // Filter events by type
  const filteredEvents = clubEvents.filter(event => event.status === selectedEventType);

  if (!club) return <p className={styles.notFound}>Club not found</p>;

  return (
    <div className={styles.mainContainer}>
      {/* Hero Section */}
      <motion.div
        className={styles.mainHero}
        style={{ backgroundImage: `url(${club.backgroundImage})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <motion.h1
            className={styles.mainTitle}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className={`${styles.titlePart} ${styles.techText}`}>
              {club.name1}
            </span>
            {club.name2 && (
              <span className={`${styles.titlePart} ${styles.innovatorsText}`}>
                {club.name2}
              </span>
            )}
            <span className={`${styles.titlePart} ${styles.nameText}`}>
              Club
            </span>
          </motion.h1>
          <motion.div
            className={styles.colorfulUnderline}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          
          {/* Club Info */}
          <motion.div 
            className={styles.clubInfo}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className={styles.foundedYear}>Founded in {club.founded}</p>
            <p className={styles.clubDescription}>{club.description}</p>
          </motion.div>
        </div>

        {/* About Section */}
        <motion.section
          className={styles.aboutSection}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>About Our Club</h2>
            <motion.div
              className={`${styles.floatingElement} ${styles.element1}`}
              animate={controls}
            >
              📘
            </motion.div>
            <motion.div
              className={`${styles.floatingElement} ${styles.element2}`}
              animate={controls}
            >
              📚
            </motion.div>
            <div className={styles.aboutContent}>
              {club.about.map((para, index) => (
                <motion.p
                  key={index}
                  className={styles.aboutText}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </div>
        </motion.section>
      </motion.div>

      {/* Events Section */}
      <motion.section
        className={styles.eventsSection}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.sectionContainer}>
          <div className={styles.eventsHeader}>
            <h2 className={styles.sectionTitle}>Club Events</h2>
            
            {/* Event Type Filter */}
            <div className={styles.eventTypeFilter}>
              <button
                className={`${styles.eventTypeButton} ${selectedEventType === "upcoming" ? styles.active : ""}`}
                onClick={() => setSelectedEventType("upcoming")}
              >
                Upcoming Events
              </button>
              <button
                className={`${styles.eventTypeButton} ${selectedEventType === "completed" ? styles.active : ""}`}
                onClick={() => setSelectedEventType("completed")}
              >
                Past Events
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className={styles.eventsLoading}>
              <div className={styles.loadingSpinner}></div>
              <p>Loading events...</p>
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className={styles.eventsGrid}>
              {filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  className={styles.eventCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                  }}
                >
                  {/* Event Image */}
                  <div className={styles.eventImageContainer}>
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className={styles.eventImage}
                    />
                    <div className={styles.eventStatusBadge}>
                      {event.status === "upcoming" ? "Upcoming" : "Completed"}
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className={styles.eventContent}>
                    <h3>{event.title}</h3>
                    
                    {/* Event Meta */}
                    <div className={styles.eventMeta}>
                      <div className={styles.metaItem}>
                        <FaCalendar className={styles.metaIcon} />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric' 
                        })}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <FaClock className={styles.metaIcon} />
                        <span>{event.time}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <FaEye className={styles.metaIcon} />
                        <span>{event.views} views</span>
                      </div>
                    </div>

                    <p className={styles.eventDescription}>{event.description}</p>
                    
                    {/* Action Buttons */}
                    <div className={styles.eventActions}>
                      <Link 
                        to={`/events/${event.id}`} 
                        className={styles.detailsButton}
                      >
                        View Details
                      </Link>
                      {event.status === "upcoming" && (
                        <button className={styles.registerButton}>
                          Register Now
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className={styles.noEvents}>
              <div className={styles.noEventsIcon}>📅</div>
              <h3>No {selectedEventType} events found</h3>
              <p>Check back later for new events from {club.name1} Club</p>
              {selectedEventType === "upcoming" && (
                <Link to="/events" className={styles.browseAllButton}>
                  Browse All Events →
                </Link>
              )}
            </div>
          )}
        </div>
      </motion.section>

      {/* Members Section (Optional - can be commented out) */}
      {club.members && club.members.length > 0 && (
        <motion.section
          className={styles.membersSection}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          
        </motion.section>
      )}
    </div>
  );
};

export default Club;