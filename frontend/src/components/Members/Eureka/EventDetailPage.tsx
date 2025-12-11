import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './EventDetailPage.module.css';
import { getEventById, type Event } from './events.data';

const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (eventId) {
      const foundEvent = getEventById(eventId);
      setEvent(foundEvent || null);
      setLoading(false);
    }
  }, [eventId]);

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
      <div className={styles.notFoundContainer}>
        <h2>Event Not Found</h2>
        <p>The event you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className={styles.backButton}>
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Back Navigation */}
      <div className={styles.navigation}>
        <Link to="/eureka" className={styles.backLink}>
          ← Back to All Events
        </Link>
        <span className={styles.clubTag}>{event.conductedClubName}</span>
      </div>

      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroImageContainer}>
          <img 
            src={event.img} 
            alt={event.name} 
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay}>
            <div className={styles.eventMeta}>
              <span className={styles.eventDate}>{event.date}</span>
              <span className={styles.eventVenue}>{event.venue}</span>
            </div>
            <h1 className={styles.heroTitle}>{event.name}</h1>
          </div>
        </div>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.mainContent}>
          {/* Description */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>About This Event</h2>
            <p className={styles.description}>{event.description}</p>
          </section>

          {/* Highlights */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Event Highlights</h2>
            <div className={styles.highlightsGrid}>
              {event.highlights.map((highlight, index) => (
                <div key={index} className={styles.highlightCard}>
                  <div className={styles.highlightNumber}>{index + 1}</div>
                  <p className={styles.highlightText}>{highlight}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Event Details */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Event Details</h2>
            <div className={styles.detailsGrid}>
              <div className={styles.detailCard}>
                <div className={styles.detailIcon}>📅</div>
                <div className={styles.detailContent}>
                  <h3 className={styles.detailTitle}>Date & Time</h3>
                  <p className={styles.detailValue}>{event.date}</p>
                </div>
              </div>
              
              <div className={styles.detailCard}>
                <div className={styles.detailIcon}>📍</div>
                <div className={styles.detailContent}>
                  <h3 className={styles.detailTitle}>Venue</h3>
                  <p className={styles.detailValue}>{event.venue}</p>
                </div>
              </div>
              
              <div className={styles.detailCard}>
                <div className={styles.detailIcon}>👥</div>
                <div className={styles.detailContent}>
                  <h3 className={styles.detailTitle}>Organized By</h3>
                  <p className={styles.detailValue}>{event.conductedClubName}</p>
                </div>
              </div>
              
              <div className={styles.detailCard}>
                <div className={styles.detailIcon}>🎯</div>
                <div className={styles.detailContent}>
                  <h3 className={styles.detailTitle}>Registration</h3>
                  <p className={styles.detailValue}>Open to All Students</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.registrationCard}>
            <h3 className={styles.registrationTitle}>Ready to Join?</h3>
            <p className={styles.registrationText}>
              Don't miss this exciting opportunity to participate in {event.name}
            </p>
            
            <div className={styles.actionButtons}>
              <a 
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.registerButton}
              >
                Register Now
              </a>
              
              <div className={styles.shareSection}>
                <p className={styles.shareText}>Share this event:</p>
                <div className={styles.shareButtons}>
                  <button className={styles.shareButton}>📱</button>
                  <button className={styles.shareButton}>📧</button>
                  <button className={styles.shareButton}>🔗</button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className={styles.contactCard}>
            <h3 className={styles.contactTitle}>Need Help?</h3>
            <p className={styles.contactText}>
              For queries about this event, contact the organizing club:
            </p>
            <div className={styles.contactInfo}>
              <span className={styles.contactClub}>{event.conductedClubName}</span>
              <a href="mailto:contact@eureka2025.edu" className={styles.contactEmail}>
                contact@eureka2025.edu
              </a>
              <span className={styles.contactPhone}>+91 98765 43210</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Similar Events Section */}
      <section className={styles.similarEventsSection}>
        <h2 className={styles.sectionTitle}>Other Events You Might Like</h2>
        <p className={styles.sectionSubtitle}>Check out these exciting events happening during Eureka 2025</p>
        
        <Link to="/eureka" className={styles.exploreButton}>
          Explore All Events →
        </Link>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <h3 className={styles.footerTitle}>EUREKA 2K25</h3>
          <p className={styles.footerText}>Where Ideas Ignite | RGUKT Sklm</p>
          <p className={styles.copyright}>© 2025 Eureka Innovation Festival. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default EventDetailPage;