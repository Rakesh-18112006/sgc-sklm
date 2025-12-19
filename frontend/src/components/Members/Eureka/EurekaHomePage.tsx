import React from "react";
import { Link } from "react-router-dom";
import styles from "./EurekaHomePage.module.css";
import { eventsData } from "./events.data";
import poster from "../../../assets/erueka/mainposter.webp";

const EurekaHomePage: React.FC = () => {
  // Main event poster - updated with Eureka theme
  const mainEventPoster = poster;

  // Get first 6 events for marquee
  // const marqueeEvents = eventsData.slice(0, 6);

  // Get all events for club events section
  const clubEvents = eventsData;

  // Function to format date for display (extract just the date part)
  const formatDateForDisplay = (dateString: string): string => {
    // Extract just the date part before the pipe
    const datePart = dateString.split("|")[0].trim();
    return datePart;
  };

  // Function to truncate description to 2-3 lines
  const truncateDescription = (description: string): string => {
    // Get first 150 characters or less
    if (description.length <= 150) return description;

    // Truncate to the last complete sentence within 150 characters
    const truncated = description.substring(0, 150);
    const lastPeriod = truncated.lastIndexOf(".");

    if (lastPeriod > 100) {
      return truncated.substring(0, lastPeriod + 1);
    } else {
      return truncated + "...";
    }
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
      title: "EUREKA Night",
      description:
        "A vibrant cultural evening celebrating talent, achievements, and the spirit of campus unity.",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section - Updated with clear visible image */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroImageContainer}>
            <img
              src={mainEventPoster}
              alt="Eureka 2025 - Innovation Festival"
              className={styles.heroImage}
            />
          </div>
          <div className={styles.heroText}>
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
            <div className={styles.heroButtons}>
              <a href="#events" className={styles.primaryButton}>
                Explore Events
              </a>
              <a href="#highlights" className={styles.secondaryButton}>
                View Highlights
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Event Highlights Section */}
      <section className={styles.highlightsOverviewSection} id="highlights">
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

      {/* Club Events Section */}
      <section className={styles.clubEventsSection} id="events">
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
                <div className={styles.eventIconContainer}>
                  <img
                    src={event.icon}
                    alt={`${event.name} icon`}
                    className={styles.eventIcon}
                  />
                </div>
                <div className={styles.eventInfo}>
                  <h3 className={styles.eventName}>{event.name}</h3>
                  <div className={styles.clubInfo}>
                    <span className={styles.clubBadge}>
                      {event.conductedClubName}
                    </span>
                
                  </div>
                </div>
              </div>

              <p className={styles.eventDescription}>
                {truncateDescription(event.description)}
              </p>

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
      {/* <footer className={styles.footer}>
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
            <a href="#events" className={styles.footerLink}>
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
      </footer> */}
    </div>
  );
};

export default EurekaHomePage;
