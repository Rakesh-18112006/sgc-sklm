import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { Event } from "./eventTypes";
import styles from "./EventCard.module.css";

// Import all club icons
import competative from "../../assets/clubimgs/competative.webp";
import coding from "../../assets/clubimgs/coding.webp";
import dp from "../../assets/clubimgs/photography.webp";
import startup from "../../assets/clubimgs/startup.webp";
import robotics from "../../assets/clubimgs/robotics.webp";
import ls from "../../assets/clubimgs/ls.webp";
import internship from "../../assets/clubimgs/internship.webp";
import linquistic from "../../assets/clubimgs/linguistic.webp";
import Finance from "../../assets/clubimgs/finance.webp";
import sports from "../../assets/clubimgs/sports.webp";
import cc from "../../assets/clubimgs/cc.webp";
import arts from "../../assets/clubimgs/cc.webp";
import electronics from "../../assets/clubimgs/electronics.webp";
import eco from "../../assets/clubimgs/competative.webp";
import yoga from "../../assets/clubimgs/competative.webp";
import he from "../../assets/clubimgs/competative.webp";

const clubIcons: Record<string, string> = {
  "Competitive Club": competative,
  "Coding Club": coding,
  "Studio Club": dp,
  "Startup Club": startup,
  "Robotics Club": robotics,
  "Lecture Series Club": ls,
  "Internship & Career Opportunities Club": internship,
  "Linguistic & Personality Development Club": linquistic,
  "Finance Club": Finance,
  "Sports and Games Club": sports,
  "Cultural & Choreography Club": cc,
  "Arts & Crafts Club": arts,
  "Electronics Club": electronics,
  "Eco Club": eco,
  "Yoga Club": yoga,
  "Higher Education Club": he,
};

interface EventCardProps {
  event: Event;
  index: number;
}

const EventCard: React.FC<EventCardProps> = ({ event, index }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/events/${event._id}`);
  };

  const getClubIcon = () => {
    return clubIcons[event.club.name] || event.club.icon;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString("default", { month: "short" }),
      year: date.getFullYear(),
    };
  };

  const date = formatDate(event.date);

  return (
    <motion.div
      className={styles.eventCard}
      initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -12,
        transition: {
          duration: 0.4,
          ease: "easeOut",
        },
      }}
    >
      <motion.div
        className={styles.cardImageContainer}
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={
            event.imageUrl ||
            "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
          }
          alt={event.title}
          className={styles.cardImage}
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className={styles.imageGradient}></div>

        <motion.div
          className={styles.dateBadge}
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: index * 0.1 + 0.3,
            type: "spring",
            stiffness: 200,
          }}
          whileHover={{ rotate: 5, scale: 1.05 }}
        >
          <span className={styles.dateDay}>{date.day}</span>
          <span className={styles.dateMonth}>{date.month}</span>
          <span className={styles.dateYear}>{date.year}</span>
        </motion.div>

        <motion.div
          className={styles.cardHoverOverlay}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            className={styles.quickViewBtn}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReadMore}
          >
            <span>Quick View</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>

      <div className={styles.cardContent}>
        <div className={styles.clubInfo}>
          <motion.div
            className={styles.clubIconWrapper}
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {getClubIcon() ? (
              <img
                src={getClubIcon()}
                alt={event.club.name}
                className={styles.clubIconImage}
              />
            ) : (
              <span className={styles.clubIconFallback}>
                {event.club.name.charAt(0)}
              </span>
            )}
          </motion.div>
          <span className={styles.clubName}>{event.club.name}</span>
        </div>

        <motion.h3
          className={styles.cardTitle}
          whileHover={{ color: "var(--accent-color)" }}
          transition={{ duration: 0.2 }}
        >
          {event.title}
        </motion.h3>

        <motion.p
          className={styles.cardDescription}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.5 }}
        >
          {event.description.length > 100
            ? `${event.description.substring(0, 100)}...`
            : event.description}
        </motion.p>

        <div className={styles.cardFooter}>
          <div className={styles.eventMeta}>
            <motion.span
              className={styles.eventTime}
              whileHover={{ scale: 1.05 }}
            >
              <span className={styles.metaIcon}>🕒</span> {event.time}
            </motion.span>
            <motion.span
              className={styles.eventViews}
              whileHover={{ scale: 1.05 }}
            >
              <span className={styles.metaIcon}>👁️</span> {event.views} views
            </motion.span>
          </div>
          <motion.button
            className={styles.readMoreBtn}
            onClick={handleReadMore}
            whileHover={{
              scale: 1.05,
              x: 5,
            }}
            whileTap={{ scale: 0.95 }}
          >
            Read More
            <motion.span
              className={styles.arrowIcon}
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              →
            </motion.span>
          </motion.button>
        </div>
      </div>

      {/* Glow effect */}
      <div className={styles.glow}></div>
    </motion.div>
  );
};

export default EventCard;
