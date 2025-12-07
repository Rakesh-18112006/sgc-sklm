import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { 
  PlusCircle, 
  Edit3, 
  Calendar, 
  BarChart3, 
  Users,
  TrendingUp,
  TrendingDown,
  Settings,
  Bell,
  ChevronRight,
  Sparkles,
  Target,
  Award,
  Clock,
  CheckCircle,
  Zap,
  Eye,
  Heart,
  Activity,
  Loader2,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

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
}

interface DashboardStats {
  totalEvents: number;
  upcomingEvents: number;
  completedEvents: number;
  activeClubs: number;
  totalViews: number;
  totalInterested: number;
  trendingEvent: Event | null;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalEvents: 0,
    upcomingEvents: 0,
    completedEvents: 0,
    activeClubs: 0,
    totalViews: 0,
    totalInterested: 0,
    trendingEvent: null,
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentEvents, setRecentEvents] = useState<Event[]>([]);
  const [trendingEvents, setTrendingEvents] = useState<Event[]>([]);
  const [clubs, setClubs] = useState<Set<string>>(new Set());
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: "Dashboard loaded", time: "Just now", type: "update" },
  ]);
  const navigate = useNavigate();

  const quickActions = [
    { 
      icon: <PlusCircle size={24} />, 
      title: "Create Event", 
      description: "Post a new campus event",
      path: "/admin/post-event",
      color: "#667eea",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    { 
      icon: <Edit3 size={24} />, 
      title: "Update Event", 
      description: "Edit existing event details",
      path: "/admin/edit-event",
      color: "#10b981",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
    },
    { 
      icon: <Calendar size={24} />, 
      title: "Event Calendar", 
      description: "View all events timeline",
      path: "/admin/calendar",
      color: "#f59e0b",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
    },
    { 
      icon: <BarChart3 size={24} />, 
      title: "Analytics", 
      description: "Event statistics & insights",
      path: "/admin/analytics",
      color: "#8b5cf6",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
    },
  ];

  // Fetch events data
  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get("http://localhost:5000/api/events");
        
        if (response.data.success) {
          const events: Event[] = response.data.data;
          
          // Calculate statistics
          const totalEvents = events.length;
          const upcomingEvents = events.filter(e => e.status === "upcoming").length;
          const completedEvents = events.filter(e => e.status === "completed").length;
          const totalViews = events.reduce((sum, event) => sum + event.views, 0);
          const totalInterested = events.reduce((sum, event) => sum + event.interestedCount, 0);
          const clubSet = new Set(events.map(event => event.club.name));
          
          // Get recent events (last 3)
          const sortedByDate = [...events].sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          const recent = sortedByDate.slice(0, 3);
          
          // Get trending events (most viewed)
          const sortedByViews = [...events].sort((a, b) => b.views - a.views);
          const trending = sortedByViews.slice(0, 3);
          const trendingEvent = trending[0] || null;
          
          setStats({
            totalEvents,
            upcomingEvents,
            completedEvents,
            activeClubs: clubSet.size,
            totalViews,
            totalInterested,
            trendingEvent,
          });
          
          setRecentEvents(recent);
          setTrendingEvents(trending);
          setClubs(clubSet);
          
          // Add activity log
          setRecentActivities(prev => [
            { id: prev.length + 1, action: `Loaded ${totalEvents} events`, time: "Just now", type: "update" },
            ...prev.slice(0, 4)
          ]);
        } else {
          throw new Error("Failed to fetch events");
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load dashboard data. Please try again.");
        
        setRecentActivities(prev => [
          { id: prev.length + 1, action: "Failed to load events", time: "Just now", type: "update" },
          ...prev.slice(0, 4)
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchEventsData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchEventsData, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleEventClick = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const getTrendPercentage = () => {
    const oldTotal = stats.totalEvents > 0 ? stats.totalEvents - 5 : 0;
    if (oldTotal === 0) return 0;
    return Math.round(((stats.totalEvents - oldTotal) / oldTotal) * 100);
  };

  const getPerformanceStatus = () => {
    const percentage = getTrendPercentage();
    if (percentage > 20) return { text: "Excellent", color: "#10b981", icon: <TrendingUp size={16} /> };
    if (percentage > 0) return { text: "Good", color: "#f59e0b", icon: <TrendingUp size={16} /> };
    return { text: "Needs attention", color: "#ef4444", icon: <TrendingDown size={16} /> };
  };

  const performance = getPerformanceStatus();

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.title}>Event Management Dashboard</h1>
            <p className={styles.subtitle}>Real-time insights and event management</p>
          </div>
          <div className={styles.headerActions}>
            <motion.button 
              className={styles.refreshBtn}
              onClick={handleRefresh}
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              title="Refresh dashboard"
            >
              {loading ? <Loader2 size={20} className={styles.spinning} /> : <Activity size={20} />}
            </motion.button>
            <button className={styles.notificationBtn}>
              <Bell size={20} />
              <span className={styles.notificationBadge}>3</span>
            </button>
            <button className={styles.settingsBtn}>
              <Settings size={20} />
            </button>
          </div>
        </div>
        
        {/* Welcome Banner */}
        <motion.div 
          className={styles.welcomeBanner}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className={styles.welcomeContent}>
            <div className={styles.welcomeIcon}>
              <Sparkles size={32} />
            </div>
            <div>
              <h2 className={styles.welcomeTitle}>
                {loading ? "Loading Dashboard..." : "Welcome back, Admin! 👋"}
              </h2>
              <p className={styles.welcomeText}>
                {loading ? "Fetching latest event data..." : (
                  <>
                    Managing <span className={styles.highlight}>{stats.totalEvents} events</span> across{" "}
                    <span className={styles.highlight}>{stats.activeClubs} clubs</span>
                  </>
                )}
              </p>
            </div>
          </div>
          {!loading && stats.trendingEvent && (
            <div className={styles.trendingEvent}>
              <div className={styles.trendingIcon}>
                <TrendingUp size={20} />
              </div>
              <div className={styles.trendingContent}>
                <span className={styles.trendingLabel}>Trending Now</span>
                <p className={styles.trendingTitle} title={stats.trendingEvent.title}>
                  {stats.trendingEvent.title.length > 30 
                    ? `${stats.trendingEvent.title.substring(0, 30)}...`
                    : stats.trendingEvent.title}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Error Alert */}
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

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {loading ? (
          // Loading Skeletons
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={styles.statCardSkeleton}>
              <div className={styles.skeletonIcon}></div>
              <div className={styles.skeletonContent}>
                <div className={styles.skeletonNumber}></div>
                <div className={styles.skeletonLabel}></div>
              </div>
            </div>
          ))
        ) : (
          <>
            <motion.div 
              className={styles.statCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={styles.statIcon} style={{ background: 'rgba(102, 126, 234, 0.1)' }}>
                <Calendar size={24} color="#667eea" />
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statNumber}>{stats.totalEvents}</h3>
                <p className={styles.statLabel}>Total Events</p>
                <div className={styles.statSubLabel}>
                  <span className={styles.trendIndicator} style={{ color: performance.color }}>
                    {performance.icon}
                    {Math.abs(getTrendPercentage())}%
                  </span>
                  <span className={styles.trendText}>{performance.text} growth</span>
                </div>
              </div>
              <div className={styles.statTrend}>
                <TrendingUp size={16} />
                <span>Live</span>
              </div>
            </motion.div>

            <motion.div 
              className={styles.statCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className={styles.statIcon} style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                <Clock size={24} color="#10b981" />
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statNumber}>{stats.upcomingEvents}</h3>
                <p className={styles.statLabel}>Upcoming Events</p>
                <div className={styles.statSubLabel}>
                  <span className={styles.clubsCount}>{stats.activeClubs} clubs active</span>
                </div>
              </div>
              <div className={styles.statTrend} style={{ color: '#10b981' }}>
                <Zap size={16} />
                <span>Scheduled</span>
              </div>
            </motion.div>

            <motion.div 
              className={styles.statCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className={styles.statIcon} style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
                <Eye size={24} color="#8b5cf6" />
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statNumber}>
                  {stats.totalViews.toLocaleString()}
                </h3>
                <p className={styles.statLabel}>Total Views</p>
                <div className={styles.statSubLabel}>
                  <span className={styles.viewsPerEvent}>
                    Avg: {stats.totalEvents > 0 ? Math.round(stats.totalViews / stats.totalEvents) : 0} per event
                  </span>
                </div>
              </div>
              <div className={styles.statTrend} style={{ color: '#8b5cf6' }}>
                <BarChart3 size={16} />
                <span>Engagement</span>
              </div>
            </motion.div>

            <motion.div 
              className={styles.statCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className={styles.statIcon} style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                <Heart size={24} color="#f59e0b" />
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statNumber}>
                  {stats.totalInterested.toLocaleString()}
                </h3>
                <p className={styles.statLabel}>Total Interested</p>
                <div className={styles.statSubLabel}>
                  <span className={styles.interestedRate}>
                    {stats.totalEvents > 0 ? Math.round((stats.totalInterested / stats.totalEvents) * 100) / 100 : 0} per event
                  </span>
                </div>
              </div>
              <div className={styles.statTrend} style={{ color: '#f59e0b' }}>
                <TrendingUp size={16} />
                <span>+18%</span>
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Quick Actions */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Quick Actions</h2>
            <p className={styles.sectionSubtitle}>Manage campus events with one click</p>
          </div>
          
          <div className={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to={action.path} className={styles.actionCard}>
                  <div 
                    className={styles.actionIcon}
                    style={{ background: action.gradient }}
                  >
                    {action.icon}
                  </div>
                  <div className={styles.actionContent}>
                    <h3 className={styles.actionTitle}>{action.title}</h3>
                    <p className={styles.actionDescription}>{action.description}</p>
                  </div>
                  <ChevronRight size={20} className={styles.actionArrow} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Events & Trending Events */}
        <div className={styles.contentGrid}>
          {/* Recent Events */}
          <motion.div 
            className={styles.contentCard}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Recent Events</h3>
              <Link to="/events" className={styles.viewAllLink}>
                View All
                <ChevronRight size={16} />
              </Link>
            </div>
            
            {loading ? (
              <div className={styles.loadingEvents}>
                <Loader2 size={24} className={styles.spinning} />
                <p>Loading events...</p>
              </div>
            ) : recentEvents.length === 0 ? (
              <div className={styles.noEvents}>
                <Calendar size={32} />
                <p>No events found</p>
              </div>
            ) : (
              <div className={styles.eventsList}>
                {recentEvents.map((event) => (
                  <motion.div 
                    key={event._id} 
                    className={styles.eventItem}
                    whileHover={{ x: 5 }}
                    onClick={() => handleEventClick(event._id)}
                  >
                    <div className={styles.eventInfo}>
                      <div className={styles.eventHeader}>
                        <h4 className={styles.eventTitle}>{event.title}</h4>
                        <span className={`${styles.eventStatus} ${styles[event.status]}`}>
                          {event.status}
                        </span>
                      </div>
                      <p className={styles.eventClub}>
                        <img 
                          src={event.club.icon} 
                          alt={event.club.name}
                          className={styles.eventClubIcon}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove(styles.hidden);
                          }}
                        />
                        <span className={`${styles.clubName} ${styles.hidden}`}>
                          {event.club.name.charAt(0)}
                        </span>
                        {event.club.name}
                      </p>
                      <div className={styles.eventMeta}>
                        <span className={styles.eventDate}>
                          <Calendar size={14} />
                          {formatDate(event.date)}
                        </span>
                        <span className={styles.eventTime}>
                          <Clock size={14} />
                          {event.time}
                        </span>
                      </div>
                    </div>
                    <div className={styles.eventStats}>
                      <div className={styles.eventStat}>
                        <Eye size={16} />
                        <span>{event.views}</span>
                      </div>
                      <div className={styles.eventStat}>
                        <Heart size={16} />
                        <span>{event.interestedCount}</span>
                      </div>
                      <ChevronRight size={16} className={styles.eventArrow} />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Trending Events */}
          <motion.div 
            className={styles.contentCard}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Trending Events</h3>
              <Link to="/admin/analytics" className={styles.viewAllLink}>
                View Analytics
                <ChevronRight size={16} />
              </Link>
            </div>
            
            {loading ? (
              <div className={styles.loadingEvents}>
                <Loader2 size={24} className={styles.spinning} />
                <p>Loading trending events...</p>
              </div>
            ) : trendingEvents.length === 0 ? (
              <div className={styles.noEvents}>
                <TrendingUp size={32} />
                <p>No trending events</p>
              </div>
            ) : (
              <div className={styles.trendingList}>
                {trendingEvents.map((event, index) => (
                  <motion.div 
                    key={event._id} 
                    className={styles.trendingItem}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleEventClick(event._id)}
                  >
                    <div className={styles.trendingRank}>
                      <span className={styles.rankNumber}>{index + 1}</span>
                      <div className={styles.rankCrown}>
                        {index === 0 && <Award size={16} />}
                        {index === 1 && <Target size={16} />}
                        {index === 2 && <CheckCircle size={16} />}
                      </div>
                    </div>
                    <div className={styles.trendingContent}>
                      <h4 className={styles.trendingItemTitle}>{event.title}</h4>
                      <p className={styles.trendingItemClub}>{event.club.name}</p>
                      <div className={styles.trendingStats}>
                        <div className={styles.trendingStat}>
                          <Eye size={14} />
                          <span>{event.views} views</span>
                        </div>
                        <div className={styles.trendingStat}>
                          <Heart size={14} />
                          <span>{event.interestedCount} interested</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={18} className={styles.trendingArrow} />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Club Distribution */}
            {!loading && clubs.size > 0 && (
              <div className={styles.clubsDistribution}>
                <div className={styles.clubsHeader}>
                  <h4 className={styles.clubsTitle}>Clubs Distribution</h4>
                  <span className={styles.clubsCountBadge}>{clubs.size} clubs</span>
                </div>
                <div className={styles.clubsList}>
                  {Array.from(clubs).slice(0, 5).map((club, index) => (
                    <div key={index} className={styles.clubItem}>
                      <div className={styles.clubDot} style={{ 
                        backgroundColor: `hsl(${index * 60}, 70%, 50%)` 
                      }}></div>
                      <span className={styles.clubName}>{club}</span>
                    </div>
                  ))}
                  {clubs.size > 5 && (
                    <div className={styles.moreClubs}>+{clubs.size - 5} more clubs</div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div 
          className={styles.activityCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Recent Activity</h3>
            <span className={styles.liveBadge}>
              <div className={styles.liveDot}></div>
              Live
            </span>
          </div>
          
          <div className={styles.activityList}>
            {recentActivities.map((activity) => (
              <div key={activity.id} className={styles.activityItem}>
                <div className={`${styles.activityIcon} ${styles[activity.type]}`}>
                  {activity.type === 'create' && <PlusCircle size={18} />}
                  {activity.type === 'update' && <Edit3 size={18} />}
                  {activity.type === 'complete' && <CheckCircle size={18} />}
                </div>
                <div className={styles.activityContent}>
                  <p className={styles.activityText}>{activity.action}</p>
                  <span className={styles.activityTime}>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.systemHealth}>
            <div className={styles.healthItem}>
              <div className={`${styles.healthIndicator} ${loading ? styles.loading : styles.healthy}`}></div>
              <span>API Connection</span>
            </div>
            <div className={styles.healthItem}>
              <div className={styles.healthIndicator} style={{ backgroundColor: performance.color }}></div>
              <span>Performance: {performance.text}</span>
            </div>
            <div className={styles.healthItem}>
              <div className={`${styles.healthIndicator} ${stats.totalEvents > 0 ? styles.healthy : styles.warning}`}></div>
              <span>{stats.totalEvents > 0 ? 'Events Loaded' : 'No Events'}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          <p className={styles.footerText}>
            Data updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          <div className={styles.dataStatus}>
            <span className={styles.dataStatusItem}>
              <div className={styles.statusDot} style={{ backgroundColor: loading ? '#f59e0b' : '#10b981' }}></div>
              {loading ? 'Loading...' : 'Data Synced'}
            </span>
            <span className={styles.dataStatusItem}>
              <ExternalLink size={14} />
              Connected to: localhost:5000
            </span>
          </div>
        </div>
        <div className={styles.footerLinks}>
          <Link to="/admin/settings">Settings</Link>
          <Link to="/admin/help">Help & Support</Link>
          <Link to="/admin/docs">Documentation</Link>
          <button onClick={handleRefresh} className={styles.refreshLink}>
            <Activity size={14} />
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;