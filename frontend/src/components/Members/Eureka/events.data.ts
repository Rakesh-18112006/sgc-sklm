// Event Data Interface
export interface Event {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  img: string;
  registrationLink: string;
  venue: string;
  date: string;
  conductedClubName: string;
}

// Main Events Data Array - Updated with consolidated schedule
export const eventsData: Event[] = [
  {
    id: 'finance-lecture-series',
    name: 'Finance & Lecture Series',
    description: 'Collaborative event by Finance Club and Lecture Series Club focusing on financial literacy and expert talks.',
    highlights: [
      'Financial planning workshops',
      'Guest lectures from industry experts',
      'Investment strategies discussion',
      'Networking with finance professionals',
      'Interactive Q&A sessions'
    ],
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    registrationLink: 'https://forms.google.com/finance-lecture-series',
    venue: 'SGC Auditorium',
    date: 'December 26, 2025 | 5:30 PM - 8:30 PM',
    conductedClubName: 'Finance Club & Lecture Series Club'
  },
  {
    id: 'linguistic-personality-dev',
    name: 'Linguistic & Personality Development',
    description: 'Communication skills and personality enhancement competition with multiple rounds throughout the day.',
    highlights: [
      'First Round: 6:00 PM - 7:00 PM (Seminar Hall 1)',
      'Second Round: 2:30 PM - 5:00 PM (Multiple Venues)',
      'Public speaking competition',
      'Debate on contemporary topics',
      'Personality assessment workshops',
      'Expert feedback sessions'
    ],
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    registrationLink: 'https://forms.google.com/linguistic-personality',
    venue: 'Seminar Hall 1 & Multiple Venues',
    date: 'December 27, 2025 | First Round: 6:00 PM - 7:00 PM | Second Round: December 28, 2:30 PM - 5:00 PM',
    conductedClubName: 'Linguistic & Personality Development Club'
  },
  {
    id: 'eco-club-event',
    name: 'Eco Club Sustainability Drive',
    description: 'Environmental awareness and sustainability initiatives workshop and competition.',
    highlights: [
      'Sustainable practices workshop',
      'Green innovation competition',
      'Tree plantation drive',
      'Waste management solutions',
      'Eco-friendly product exhibition'
    ],
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    registrationLink: 'https://forms.google.com/eco-club-event',
    venue: 'Botanical Garden',
    date: 'December 27, 2025 | 5:30 PM - 8:30 PM',
    conductedClubName: 'Eco Club'
  },
  {
    id: 'internship-startup-research',
    name: 'Internship, Startup & Research Fair',
    description: 'Two-part collaborative event showcasing internship opportunities, startup ideas and research projects with morning and afternoon sessions.',
    highlights: [
      'First Round: 9:30 AM - 11:30 AM (Innovation Center)',
      'Second Round: 2:30 PM - 5:00 PM (Multiple Venues)',
      'Internship opportunities showcase',
      'Startup pitch sessions (morning & afternoon)',
      'Research project exhibitions',
      'Industry mentor interactions',
      'Career guidance workshops'
    ],
    img: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    registrationLink: 'https://forms.google.com/internship-startup-research',
    venue: 'Innovation Center & Multiple Venues',
    date: 'December 28, 2025 | First Round: 9:30 AM - 11:30 AM | Second Round: 2:30 PM - 5:00 PM',
    conductedClubName: 'Internship, Startup & Research Clubs'
  },
  {
    id: 'competitive-higher-education',
    name: 'Competitive & Higher Education Expo',
    description: 'Two-part event focusing on competitive exams and higher education opportunities with morning and afternoon sessions.',
    highlights: [
      'First Round: 11:30 AM - 1:00 PM (Academic Block)',
      'Second Round: 2:30 PM - 5:00 PM (Multiple Venues)',
      'Competitive exam guidance sessions',
      'Higher education counseling',
      'Study abroad opportunities fair',
      'Scholarship information desk',
      'Alumni success stories panel'
    ],
    img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    registrationLink: 'https://forms.google.com/competitive-higher-education',
    venue: 'Academic Block & Multiple Venues',
    date: 'December 28, 2025 | First Round: 11:30 AM - 1:00 PM | Second Round: 2:30 PM - 5:00 PM',
    conductedClubName: 'Competitive Club & Higher Education Clubs'
  },
  {
    id: 'sparc-event',
    name: 'SPARC Innovation Challenge',
    description: 'Student Project and Research Competition showcasing innovative projects and research at Kredavedika.',
    highlights: [
      'Venue: Kredavedika',
      'Full-day event: 10:00 AM - 5:00 PM',
      'Research paper presentations',
      'Project demonstrations',
      'Industry evaluation panel',
      'Innovation awards ceremony',
      'Publication opportunities showcase'
    ],
    img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    registrationLink: 'https://forms.google.com/sparc-event',
    venue: 'Kredavedika',
    date: 'December 28, 2025 | 10:00 AM - 5:00 PM',
    conductedClubName: 'Research Club'
  },
  {
    id: 'tech-expo',
    name: 'Eureka Tech Expo',
    description: 'Technology exhibition showcasing latest innovations, gadgets, and tech solutions at Kredavedika.',
    highlights: [
      'Venue: Kredavedika',
      'Full-day event: 10:00 AM - 5:00 PM',
      'Latest tech gadgets display',
      'Innovative projects showcase',
      'Tech workshops and demos',
      'Startup tech presentations',
      'Interactive tech experience zones'
    ],
    img: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    registrationLink: 'https://forms.google.com/tech-expo',
    venue: 'Kredavedika',
    date: 'December 28, 2025 | 10:00 AM - 5:00 PM',
    conductedClubName: 'Tech Clubs'
  },
  {
    id: 'electronics-robotics',
    name: 'Electronics & Robotics Showcase',
    description: 'Collaborative event showcasing electronics projects and robotics innovations.',
    highlights: [
      'Robotics demonstrations',
      'Electronics projects display',
      'DIY workshops',
      'Drone technology showcase',
      'Interactive robot challenges'
    ],
    img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    registrationLink: 'https://forms.google.com/electronics-robotics',
    venue: 'Engineering Block',
    date: 'December 29, 2025 | 5:30 PM - 8:30 PM',
    conductedClubName: 'Electronics Club & Robotics Club'
  },
  {
    id: 'coding-competition',
    name: 'Eureka Coding Challenge',
    description: 'Intense coding competition for programmers of all levels with exciting problems.',
    highlights: [
      'Multiple problem tracks',
      'Real-world coding challenges',
      'Team and individual categories',
      'Hackathon-style rounds',
      'Industry standard judging'
    ],
    img: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    registrationLink: 'https://forms.google.com/coding-competition',
    venue: 'Computer Center',
    date: 'December 29, 2025 | 5:30 PM - 8:30 PM',
    conductedClubName: 'Coding Club'
  },
  {
    id: 'sports-ipl-auction',
    name: 'Sports Club - IPL Auction',
    description: 'Interactive IPL-style auction event for sports enthusiasts.',
    highlights: [
      'Fantasy IPL auction',
      'Team building strategy',
      'Player bidding wars',
      'Sports analytics workshop',
      'Prizes for best teams'
    ],
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    registrationLink: 'https://forms.google.com/sports-ipl-auction',
    venue: 'Sports Complex',
    date: 'December 30, 2025 | 5:30 PM - 8:30 PM',
    conductedClubName: 'Sports Club'
  },
  {
    id: 'rangoli-competition',
    name: 'Rangoli Art Competition',
    description: 'Traditional rangoli making competition celebrating cultural heritage and creativity.',
    highlights: [
      'Traditional art showcase',
      'Creative designs competition',
      'Team collaboration event',
      'Cultural heritage celebration',
      'Judging by art experts'
    ],
    img: 'https://images.unsplash.com/photo-1542744095-68b6a2c5cd3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    registrationLink: 'https://forms.google.com/rangoli-competition',
    venue: 'Main Campus Ground',
    date: 'December 31, 2025 | 6:00 AM - 9:00 AM',
    conductedClubName: 'Cultural Club'
  },
  {
    id: 'eureka-night',
    name: 'EUREKA Night - Grand Finale',
    description: 'The grand cultural night celebrating achievements, creativity, and campus unity with performances, awards, and celebrations.',
    highlights: [
      'Live musical performances',
      'Dance shows and cultural events',
      'Award ceremony for competition winners',
      'Fireworks display',
      'Special guest appearances',
      'Food stalls and celebrations'
    ],
    img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    registrationLink: 'https://forms.google.com/eureka-night',
    venue: 'Open Air Theater',
    date: 'December 31, 2025 | 6:00 PM - 12:00 Midnight',
    conductedClubName: 'EUREKA Organizing Committee'
  }
];

// Utility functions for event data
export const getEventById = (id: string): Event | undefined => {
  return eventsData.find(event => event.id === id);
};

export const getEventsByClub = (clubName: string): Event[] => {
  return eventsData.filter(event => 
    event.conductedClubName.toLowerCase().includes(clubName.toLowerCase())
  );
};

export const getUpcomingEvents = (): Event[] => {
  return eventsData;
};

export const getFeaturedEvents = (count: number = 4): Event[] => {
  return eventsData.slice(0, count);
};

// Event categories (derived from event names/descriptions)
export const eventCategories = [
  'Finance',
  'Language',
  'Environment',
  'Career',
  'Education',
  'Technology',
  'Research',
  'Electronics',
  'Coding',
  'Sports',
  'Cultural',
  'Entertainment'
];

// Club names for filtering
export const conductingClubs = [
  'Finance Club & Lecture Series Club',
  'Linguistic & Personality Development Club',
  'Eco Club',
  'Internship, Startup & Research Clubs',
  'Competitive Club & Higher Education Clubs',
  'Research Club',
  'Tech Clubs',
  'Electronics Club & Robotics Club',
  'Coding Club',
  'Sports Club',
  'Cultural Club',
  'EUREKA Organizing Committee'
];