import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "./EventCard";
import Pagination from "./Pagination";
import styles from "./EventNews.module.css";
import type { Event as EventCardEvent } from "./eventTypes";

interface ClubData {
  name: string;
  icon: string;
  id: string;
}

type ApiEvent = EventCardEvent & {
  clubId: string;
  club: ClubData;
  status: "upcoming" | "completed";
};

const getDefaultClub = (): ClubData => ({
  name: "Unknown Club",
  icon: "/default-club-icon.png",
  id: "unknown",
});

const EventsNews: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<ApiEvent[]>([]);
  const [selectedClub, setSelectedClub] = useState<string>("all");
  const [eventType, setEventType] = useState<"upcoming" | "completed">(
    "upcoming"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [clubs, setClubs] = useState<ClubData[]>([]); // dynamic club filter
  const eventsPerPage = 6;

  // Fetch events once
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<{
          success: boolean;
          data: any[];
          total: number;
        }>("http://localhost:5000/api/events");

        if (!response.data.success) {
          setEvents([]);
          setClubs([]);
          return;
        }

        const processedEvents: ApiEvent[] = response.data.data.map((event) => {
          const clubData: ClubData = event.club
            ? {
                name: event.club.name || "Unknown Club",
                icon: event.club.icon || "/default-club-icon.png",
                id: event.club._id || "unknown",
              }
            : getDefaultClub();

          return {
            ...event,
            _id: event._id || "",
            time: event.time || "00:00",
            views: event.views || 0,
            imageUrl: event.imageUrl || "",
            club: clubData,
            clubId: clubData.id,
            status: event.status || "upcoming",
          };
        });

        setEvents(processedEvents);

        // Generate unique clubs from events dynamically
        const uniqueClubsMap: { [key: string]: ClubData } = {};
        processedEvents.forEach((e) => {
          if (!uniqueClubsMap[e.clubId]) {
            uniqueClubsMap[e.clubId] = e.club;
          }
        });

        setClubs(Object.values(uniqueClubsMap));
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
        setClubs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events by club and status
  useEffect(() => {
    let filtered = events;

    if (selectedClub !== "all") {
      filtered = filtered.filter((event) => event.clubId === selectedClub);
    }

    filtered = filtered.filter((event) => event.status === eventType);

    setFilteredEvents(filtered);
    setCurrentPage(1);
  }, [events, selectedClub, eventType]);

  // Pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const paginate = (pageNumber: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading exciting events...</p>
      </div>
    );
  }

  return (
    <div className={styles.eventsContainer}>
      {/* Hero */}
      <div className={styles.eventsHero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Events & News</h1>
          <p className={styles.heroSubtitle}>
            Stay updated with the latest happenings in our community
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filtersContainer}>
        <div className={styles.eventTypeButtons}>
          <button
            className={`${styles.eventTypeButton} ${
              eventType === "upcoming" ? styles.active : ""
            }`}
            onClick={() => setEventType("upcoming")}
          >
            Upcoming Events
          </button>
          <button
            className={`${styles.eventTypeButton} ${
              eventType === "completed" ? styles.active : ""
            }`}
            onClick={() => setEventType("completed")}
          >
            Completed Events
          </button>
        </div>

        <div className={styles.clubFilter}>
          <select
            value={selectedClub}
            onChange={(e) => setSelectedClub(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Clubs</option>
            {clubs.map((club) => (
              <option key={club.id} value={club.id}>
                {club.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div className={styles.eventsGrid}>
        {currentEvents.length > 0 ? (
          currentEvents.map((event, index) => (
            <div
              key={event._id}
              className={styles.eventCardWrapper}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <EventCard event={event} index={index} />
            </div>
          ))
        ) : (
          <div className={styles.noEvents}>
            <div className={styles.noEventsIcon}>📅</div>
            <h3>No events found</h3>
            <p>Check back later or try a different filter</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredEvents.length > eventsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredEvents.length / eventsPerPage)}
          onPageChange={paginate}
        />
      )}
    </div>
  );
};

export default EventsNews;
