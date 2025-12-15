import React from "react";
import { Link } from "react-router-dom";
import styles from "./EurekaHomePage.module.css";
import { eventsData } from "./events.data";

const EurekaHomePage: React.FC = () => {
  // Main event poster - updated with Eureka theme
  const mainEventPoster =
    "https://images.unsplash.com/photo-1492684223066-e9e3a5c6e029?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

  // Get first 6 events for marquee
  const marqueeEvents = eventsData.slice(0, 6);

  // Get all events for club events section
  const clubEvents = eventsData;

  // Function to extract first sentence from description for marquee
  const getShortDescription = (description: string): string => {
    const firstSentence = description.split(".")[0];
    return firstSentence.length > 60
      ? firstSentence.substring(0, 57) + "..."
      : firstSentence;
  };

  // Function to format date for display (extract just the date part)
  const formatDateForDisplay = (dateString: string): string => {
    // Extract just the date part before the pipe
    const datePart = dateString.split("|")[0].trim();
    return datePart;
  };

  // Event Highlights from PDF
  const eventHighlights = [
    {
      title: "Diverse Multi-Day Club Events",
      description:
        "A dynamic lineup of technical, professional, cultural, and sports activities conducted by multiple SGC clubs from 26th–31st December.",
    },
    {
      title: "Collaborative & Competitive Rounds",
      description:
        "Well-structured multi-round events encouraging teamwork, innovation, and healthy competition across domains.",
    },
    {
      title: "Grand Finale – EUREKA Night",
      description:
        "A vibrant cultural evening celebrating talent, achievements, and the spirit of campus unity.",
    },
  ];

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
            <h1 className={styles.heroTitle}>EUREKA 2025</h1>
            <p className={styles.heroSubtitle}>
              Where Technical Brilliance Meets Cultural Rhythms
            </p>
            <p className={styles.heroDate}>
              December 26-31, 2025 | Students Gymkhana Center, RGUKT
            </p>
            <p className={styles.heroTagline}>
              Innovate the Mind, Celebrate the Spirit
            </p>
          </div>
        </div>
      </section>

      {/* Event Highlights Section */}
      <section className={styles.highlightsOverviewSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Event Highlights</h2>
          <p className={styles.sectionSubtitle}>
            Experience the best of Eureka 2025
          </p>
        </div>

        <div className={styles.highlightsOverviewGrid}>
          {eventHighlights.map((highlight, index) => (
            <div key={index} className={styles.highlightOverviewCard}>
              <div className={styles.highlightNumberCircle}>{index + 1}</div>
              <h3 className={styles.highlightOverviewTitle}>
                {highlight.title}
              </h3>
              <p className={styles.highlightOverviewDescription}>
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Marquee Section for Sub-events */}
      <section className={styles.marqueeSection}>
        <h2 className={styles.sectionTitle}>Featured Events</h2>
        <p className={styles.sectionSubtitle}>
          Scroll through our exciting 6-day lineup
        </p>

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
                  <p className={styles.marqueeDescription}>
                    {getShortDescription(event.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Club Events Section */}
      <section className={styles.clubEventsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Eureka 2025 Event Schedule</h2>
          <p className={styles.sectionSubtitle}>
            Multi-day, multi-club events from December 26-31
          </p>
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
                  <span className={styles.clubName}>
                    {event.conductedClubName}
                  </span>
                  <h3 className={styles.eventName}>{event.name}</h3>
                </div>
              </div>

              <p className={styles.eventDescription}>{event.description}</p>

              {/* Highlights */}
              <div className={styles.highlightsSection}>
                <h4 className={styles.highlightsTitle}>Key Highlights:</h4>
                <ul className={styles.highlightsList}>
                  {event.highlights.slice(0, 3).map((highlight, index) => (
                    <li key={index} className={styles.highlightItem}>
                      <span className={styles.bullet}>•</span>
                      {highlight}
                    </li>
                  ))}
                  {event.highlights.length > 3 && (
                    <li className={styles.highlightItem}>
                      <span className={styles.bullet}>•</span>+
                      {event.highlights.length - 3} more highlights
                    </li>
                  )}
                </ul>
              </div>

              <div className={styles.eventDetails}>
                <div className={styles.detailItem}>
                  <span className={styles.detailIcon}>📅</span>
                  <span className={styles.detailText}>
                    {formatDateForDisplay(event.date)}
                  </span>
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
                <Link
                  to={`/event/${event.id}`}
                  className={styles.detailsButton}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <h3 className={styles.footerTitle}>EUREKA 2025</h3>
          <p className={styles.footerText}>
            Where Technical Brilliance Meets Cultural Rhythms | Students'
            Gymkhana Center
          </p>
          <div className={styles.footerLinks}>
            <a href="mailto:eureka2025@rgukt.in" className={styles.footerLink}>
              Contact
            </a>
            <Link to="/eureka" className={styles.footerLink}>
              All Events
            </Link>
            <a href="#" className={styles.footerLink}>
              Schedule
            </a>
            <a href="#" className={styles.footerLink}>
              FAQs
            </a>
          </div>
          <p className={styles.copyright}>
            © 2025 EUREKA - Students' Gymkhana Center. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EurekaHomePage;
