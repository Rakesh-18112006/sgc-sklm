import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  Eye, 
  Heart, 
  TrendingUp, 
  Zap,
  CalendarDays,
  Flame,
  Star,
  Trophy,
  ChevronRight,
  ExternalLink,
  Loader2,
  AlertCircle,
  Users,
  MapPin,
  Tag
} from "lucide-react";
import styles from "./EventsHighlights.module.css";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  views: number;
  imageUrl: string;
  club: {
    name: string;
    icon: string;
  };
  status: "upcoming" | "completed";
  interestedCount: number;
  summary?: string;
  location?: string;
  tags?: string[];
}

interface EventCardProps {
  event: Event;
  type: 'recent' | 'trending';
  index: number;
}

const EventCard: React.FC<EventCardProps> = ({ event, type, index }) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getEventStatus = () => {
    const eventDate = new Date(event.date);
    const today = new Date();
    
    if (eventDate < today) return 'past';
    if (eventDate.toDateString() === today.toDateString()) return 'today';
    
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) return 'soon';
    return 'upcoming';
  };

  const status = getEventStatus();

  const handleEventClick = () => {
    navigate(`/events/${event._id}`);
  };

  return (
    <motion.div
      className={styles.eventCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      onClick={handleEventClick}
    >
      {/* Event Header */}
      <div className={styles.cardHeader}>
        <div className={styles.eventTypeBadge}>
          {type === 'trending' ? (
            <>
              <Flame size={14} />
              <span>Trending</span>
            </>
          ) : (
            <>
              <CalendarDays size={14} />
              <span>Recent</span>
            </>
          )}
        </div>
        
        <div className={`${styles.statusBadge} ${styles[status]}`}>
          {status === 'today' && <Zap size={12} />}
          {status === 'soon' && <Clock size={12} />}
          {status === 'past' && 'Completed'}
          {status === 'upcoming' && 'Upcoming'}
        </div>
      </div>

      {/* Event Image */}
      <div className={styles.imageContainer}>
        <img
          src={event.imageUrl || "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"}
          alt={event.title}
          className={styles.eventImage}
          loading="lazy"
        />
        <div className={styles.imageOverlay}></div>
        
        {/* View Count */}
        <div className={styles.viewCount}>
          <Eye size={14} />
          <span>{event.views.toLocaleString()}</span>
        </div>
      </div>

      {/* Event Content */}
      <div className={styles.cardContent}>
        {/* Club Info */}
        <div className={styles.clubInfo}>
          {event.club.icon ? (
            <img 
              src={event.club.icon} 
              alt={event.club.name}
              className={styles.clubIcon}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          ) : (
            <div className={styles.clubIconFallback}>
              {event.club.name.charAt(0)}
            </div>
          )}
          <span className={styles.clubName}>{event.club.name}</span>
        </div>

        {/* Event Title */}
        <h3 className={styles.eventTitle}>{event.title}</h3>

        {/* Event Meta */}
        <div className={styles.eventMeta}>
          <div className={styles.metaItem}>
            <Calendar size={14} />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className={styles.metaItem}>
            <Clock size={14} />
            <span>{event.time}</span>
          </div>
          {event.location && (
            <div className={styles.metaItem}>
              <MapPin size={14} />
              <span>{event.location}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className={styles.tagsContainer}>
            {event.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className={styles.tag}>
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className={styles.eventStats}>
          <div className={styles.statItem}>
            <Heart size={16} />
            <span>{event.interestedCount} interested</span>
          </div>
          <div className={styles.statItem}>
            <Users size={16} />
            <span>{Math.floor(event.interestedCount * 1.5)} attending</span>
          </div>
        </div>

        {/* Action Button */}
        <div className={styles.actionContainer}>
          <button className={styles.viewButton}>
            View Details
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Trending Badge */}
      {type === 'trending' && index < 3 && (
        <div className={`${styles.trendingBadge} ${styles[`rank${index + 1}`]}`}>
          <Trophy size={14} />
          <span>#{index + 1} Trending</span>
        </div>
      )}
    </motion.div>
  );
};

const EventsHighlights = () => {
  const [recentEvents, setRecentEvents] = useState<Event[]>([]);
  const [trendingEvents, setTrendingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'recent' | 'trending'>('trending');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get("https://sgc-sklm-01.onrender.com/api/events");
        
        if (response.data.success) {
          const events: Event[] = response.data.data;
          
          // Get recent events (last 4 by date)
          const recent = [...events]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 4);
          
          // Get trending events (most viewed, upcoming)
          const trending = [...events]
            .filter(event => event.status === 'upcoming')
            .sort((a, b) => b.views - a.views)
            .slice(0, 4);
          
          // Add sample tags and location for demonstration
          const enhancedRecent = recent.map(event => ({
            ...event,
            location: ["Main Auditorium", "Conference Hall", "Sports Complex", "Tech Park"][Math.floor(Math.random() * 4)],
            tags: ["Workshop", "Tech", "Networking", "Career"].slice(0, Math.floor(Math.random() * 3) + 1)
          }));
          
          const enhancedTrending = trending.map(event => ({
            ...event,
            location: ["Main Auditorium", "Conference Hall", "Sports Complex", "Tech Park"][Math.floor(Math.random() * 4)],
            tags: ["Workshop", "Tech", "Networking", "Career"].slice(0, Math.floor(Math.random() * 3) + 1)
          }));
          
          setRecentEvents(enhancedRecent);
          setTrendingEvents(enhancedTrending);
        } else {
          throw new Error("Failed to fetch events");
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Unable to load events. Please try again later.");
        
        // Fallback sample data for demonstration
        const sampleEvents: Event[] = [
          {
            _id: "1",
            title: "Web Development Workshop",
            description: "Learn modern web development with industry experts",
            date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
            time: "14:00",
            views: 1240,
            imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            club: { name: "Coding Club", icon: "" },
            status: "upcoming",
            interestedCount: 85,
            location: "Tech Park Auditorium",
            tags: ["Workshop", "Tech", "Development"]
          },
          {
            _id: "2",
            title: "Annual Sports Day",
            description: "Join us for exciting sports competitions and fun activities",
            date: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
            time: "09:00",
            views: 980,
            imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            club: { name: "Sports Club", icon: "" },
            status: "upcoming",
            interestedCount: 120,
            location: "Sports Complex",
            tags: ["Sports", "Competition", "Fun"]
          },
          {
            _id: "3",
            title: "Photography Exhibition",
            description: "Showcasing the best photographs from our talented students",
            date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
            time: "16:00",
            views: 750,
            imageUrl: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            club: { name: "Studio Club", icon: "" },
            status: "upcoming",
            interestedCount: 65,
            location: "Art Gallery",
            tags: ["Art", "Exhibition", "Photography"]
          },
          {
            _id: "4",
            title: "Robotics Competition",
            description: "Battle of the robots - showcase your engineering skills",
            date: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
            time: "10:00",
            views: 520,
            imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            club: { name: "Robotics Club", icon: "" },
            status: "upcoming",
            interestedCount: 45,
            location: "Engineering Block",
            tags: ["Robotics", "Competition", "Tech"]
          }
        ];
        
        setRecentEvents(sampleEvents);
        setTrendingEvents([...sampleEvents].sort((a, b) => b.views - a.views));
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const displayedEvents = activeTab === 'recent' ? recentEvents : trendingEvents;

  return (
    <div className={styles.eventsHighlights}>
      {/* Header */}
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>
              <Star size={32} className={styles.titleIcon} />
              Campus Events Highlights
            </h1>
            <p className={styles.subtitle}>
              Discover the latest and most popular events happening on campus
            </p>
          </div>
          
          <div className={styles.headerStats}>
            <div className={styles.stat}>
              <div className={styles.statIcon}>
                <Calendar size={20} />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statNumber}>{recentEvents.length + trendingEvents.length}</span>
                <span className={styles.statLabel}>Total Events</span>
              </div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statIcon}>
                <TrendingUp size={20} />
              </div>
              <div className={styles.statContent}>
                <span className={styles.statNumber}>
                  {trendingEvents.reduce((sum, event) => sum + event.views, 0).toLocaleString()}
                </span>
                <span className={styles.statLabel}>Total Views</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs Navigation */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'trending' ? styles.active : ''}`}
            onClick={() => setActiveTab('trending')}
          >
            <Flame size={18} />
            <span>Trending Events</span>
            <span className={styles.tabBadge}>{trendingEvents.length}</span>
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'recent' ? styles.active : ''}`}
            onClick={() => setActiveTab('recent')}
          >
            <CalendarDays size={18} />
            <span>Recent Events</span>
            <span className={styles.tabBadge}>{recentEvents.length}</span>
          </button>
        </div>
        
        <Link to="/events" className={styles.viewAllLink}>
          View All Events
          <ExternalLink size={16} />
        </Link>
      </div>

      {/* Error State */}
      <AnimatePresence>
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
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingContent}>
            <Loader2 size={48} className={styles.spinner} />
            <p className={styles.loadingText}>Loading exciting events...</p>
            <p className={styles.loadingSubtext}>Fetching the latest campus happenings</p>
          </div>
        </div>
      ) : (
        <>
          {/* Events Grid */}
          <div className={styles.eventsGrid}>
            <AnimatePresence mode="wait">
              {displayedEvents.length > 0 ? (
                displayedEvents.map((event, index) => (
                  <EventCard
                    key={event._id}
                    event={event}
                    type={activeTab}
                    index={index}
                  />
                ))
              ) : (
                <motion.div
                  className={styles.noEvents}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Calendar size={48} />
                  <h3>No Events Found</h3>
                  <p>There are currently no {activeTab} events available.</p>
                  <Link to="/admin/post-event" className={styles.createEventLink}>
                    Create New Event
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Stats Bar */}
          {displayedEvents.length > 0 && (
            <motion.div 
              className={styles.statsBar}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className={styles.statCard}>
                <div className={styles.statCardIcon} style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
                  <Zap size={20} color="#22c55e" />
                </div>
                <div className={styles.statCardContent}>
                  <span className={styles.statCardNumber}>
                    {displayedEvents.filter(e => {
                      const eventDate = new Date(e.date);
                      const today = new Date();
                      return eventDate.toDateString() === today.toDateString();
                    }).length}
                  </span>
                  <span className={styles.statCardLabel}>Events Today</span>
                </div>
              </div>
              
              <div className={styles.statCard}>
                <div className={styles.statCardIcon} style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                  <Users size={20} color="#3b82f6" />
                </div>
                <div className={styles.statCardContent}>
                  <span className={styles.statCardNumber}>
                    {displayedEvents.reduce((sum, event) => sum + event.interestedCount, 0)}
                  </span>
                  <span className={styles.statCardLabel}>Total Interested</span>
                </div>
              </div>
              
              <div className={styles.statCard}>
                <div className={styles.statCardIcon} style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                  <Star size={20} color="#f59e0b" />
                </div>
                <div className={styles.statCardContent}>
                  <span className={styles.statCardNumber}>
                    {displayedEvents.length}
                  </span>
                  <span className={styles.statCardLabel}>
                    {activeTab === 'trending' ? 'Trending Now' : 'Recent Events'}
                  </span>
                </div>
              </div>
              
              <div className={styles.statCard}>
                <div className={styles.statCardIcon} style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
                  <Eye size={20} color="#8b5cf6" />
                </div>
                <div className={styles.statCardContent}>
                  <span className={styles.statCardNumber}>
                    {displayedEvents.reduce((sum, event) => sum + event.views, 0).toLocaleString()}
                  </span>
                  <span className={styles.statCardLabel}>Total Views</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div 
            className={styles.ctaSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Don't Miss Out on Exciting Events!</h2>
              <p className={styles.ctaText}>
                Stay updated with all campus activities, workshops, and competitions. 
                Join thousands of students who have already discovered amazing opportunities.
              </p>
              <div className={styles.ctaButtons}>
                <Link to="/events" className={styles.ctaButtonPrimary}>
                  <CalendarDays size={18} />
                  Explore All Events
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default EventsHighlights;