import React from 'react';
import styles from './EurekaHomePage.module.css';
import { eventsData, type Event } from './events.data';

const EurekaHomePage: React.FC = () => {
  // Main event poster
  const mainEventPoster = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

  // Get first 6 events for marquee
  const marqueeEvents = eventsData.slice(0, 6);

  // Get all events for club events section
  const clubEvents = eventsData;

  // Function to extract first sentence from description for marquee
  const getShortDescription = (description: string): string => {
    const firstSentence = description.split('.')[0];
    return firstSentence.length > 60 ? firstSentence.substring(0, 57) + '...' : firstSentence;
  };

  // Function to format date for display (extract just the date part)
  const formatDateForDisplay = (dateString: string): string => {
    // Extract just the date part before the pipe
    const datePart = dateString.split('|')[0].trim();
    return datePart;
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroImageContainer}>
          <img 
            src={mainEventPoster} 
            alt="Eureka 2025 - Innovation Festival" 
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay}>
            <h1 className={styles.heroTitle}>EUREKA 2K25</h1>
            <p className={styles.heroSubtitle}>Where Ideas Ignite</p>
            <p className={styles.heroDate}>October 27-29, 2025 | Rgukt Sklm</p>
            {/* <button className={styles.registerButton}>Register Now</button> */}
          </div>
        </div>
      </section>

      {/* Marquee Section for Sub-events */}
      <section className={styles.marqueeSection}>
        <h2 className={styles.sectionTitle}>Featured Events</h2>
        <p className={styles.sectionSubtitle}>Scroll through our exciting lineup</p>
        
        <div className={styles.marqueeContainer}>
          <div className={styles.marquee}>
            {marqueeEvents.concat(marqueeEvents).map((event, index) => (
              <div key={`${event.id}-${index}`} className={styles.marqueeItem}>
                <img 
                  src={event.img} 
                  alt={event.name}
                  className={styles.marqueeImage}
                />
                <div className={styles.marqueeOverlay}>
                  <h3 className={styles.marqueeEventName}>{event.name}</h3>
                  <p className={styles.marqueeDescription}>{getShortDescription(event.description)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Club Events Section */}
      <section className={styles.clubEventsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>All Events</h2>
          <p className={styles.sectionSubtitle}>Events conducted by various clubs</p>
        </div>
        
        <div className={styles.clubEventsGrid}>
          {clubEvents.map((event) => (
            <div key={event.id} className={styles.clubEventCard}>
              <div className={styles.cardHeader}>
                <div className={styles.clubLogoPlaceholder}>
                  <span className={styles.clubInitial}>
                    {event.conductedClubName.charAt(0)}
                  </span>
                </div>
                <div className={styles.clubInfo}>
                  <span className={styles.clubName}>{event.conductedClubName}</span>
                  <h3 className={styles.eventName}>{event.name}</h3>
                </div>
              </div>
              
              <p className={styles.eventDescription}>{event.description}</p>
              
              {/* Highlights */}
              <div className={styles.highlightsSection}>
                <h4 className={styles.highlightsTitle}>Highlights:</h4>
                <ul className={styles.highlightsList}>
                  {event.highlights.slice(0, 3).map((highlight, index) => (
                    <li key={index} className={styles.highlightItem}>
                      <span className={styles.bullet}>•</span>
                      {highlight}
                    </li>
                  ))}
                  {event.highlights.length > 3 && (
                    <li className={styles.highlightItem}>
                      <span className={styles.bullet}>•</span>
                      +{event.highlights.length - 3} more highlights
                    </li>
                  )}
                </ul>
              </div>
              
              <div className={styles.eventDetails}>
                <div className={styles.detailItem}>
                  <span className={styles.detailIcon}>📅</span>
                  <span className={styles.detailText}>{formatDateForDisplay(event.date)}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailIcon}>📍</span>
                  <span className={styles.detailText}>{event.venue}</span>
                </div>
              </div>
              
              <div className={styles.buttonGroup}>
                <a 
                  href={event.registrationLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.registerButton}
                >
                  Register Now
                </a>
                <button className={styles.detailsButton}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <h3 className={styles.footerTitle}>EUREKA 2K25</h3>
          <p className={styles.footerText}>Where Ideas Ignite | RGUKT Sklm</p>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>Contact</a>
            <a href="#" className={styles.footerLink}>Schedule</a>
            <a href="#" className={styles.footerLink}>Sponsors</a>
            <a href="#" className={styles.footerLink}>FAQs</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EurekaHomePage;