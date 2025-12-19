import innovation from "../../../assets/erueka/innovation-hackathon.webp";
import cash from "../../../assets/erueka/cash-crash.webp";

// Import icon images
import tedxIcon from "../../../assets/erueka/tedxIcon.webp";
import lexihuntIcon from "../../../assets/erueka/lexihuntIcon.webp";
import rapidRushIcon from "../../../assets/erueka/rapidRushIcon.webp";
import hackathonIcon from "../../../assets/erueka/hackathonIcon.webp";
import iqArenaIcon from "../../../assets/erueka/iqArenaIcon.webp";
import synergyIcon from "../../../assets/erueka/synergyIcon.webp";
import cashCrashIcon from "../../../assets/erueka/cash-crash.webp";
import clashBidIcon from "../../../assets/erueka/clashBidIcon.webp";
import rangoliIcon from "../../../assets/erueka/rangoliIcon.webp";
import eurekaNightIcon from "../../../assets/erueka/eurekaNightIcon.webp";

// Event Data Interface
export interface Event {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  img: string; // Main poster/image
  icon: string; // Icon image for cards
  registrationLink: string;
  venue: string;
  date: string;
  conductedClubName: string;
}

// Main Events Data Array - Updated with detailed Eureka schedule
export const eventsData: Event[] = [
  {
    id: 'tedx-trades',
    name: 'TEDx Trades',
    description: 'An engaging finance-focused event jointly organized by the Finance Club and Lecture Series Club. The event blends interactive learning with real-life financial decision-making through fun quizzes and practical scenarios. It aims to improve financial awareness, quick thinking, and money management skills in an exciting and competitive environment.',
    highlights: [
      'Two-round event featuring a fast-paced Kahoot quiz followed by a real-life finance decision round',
      'Kahoot round tests finance and lecture-based knowledge, scoring based on accuracy and speed',
      'Top 10 teams qualify for the final "Money Moves" round',
      'Final round focuses on practical personal finance decisions like saving, investing, borrowing, and emergencies',
      'Team Size: 3 to 5',
      'Registration Fee: 10/- per head'
    ],
    img: tedxIcon,
    icon: tedxIcon, // Add icon
    registrationLink: 'https://forms.gle/ShSg6dFWVgmEUd5d8',
    venue: 'Suvarnamukhi',
    date: 'December 26, 2025 | 5:30 PM - 8:30 PM',
    conductedClubName: 'Finance Club & Lecture Series Club'
  },
  {
    id: 'lexihunt-arena',
    name: 'LEXIHUNT Arena',
    description: 'A high-energy linguistic and personality development event designed as a competitive word battle that tests participants\' speed, vocabulary, logical thinking, and teamwork. The event consists of two rounds: Rush Hour and Cipher Hunt. In the first round, teams compete by solving language-based questions of varying difficulty levels, while in the final round, qualified teams race against time to decode riddles and clues spread across the campus to find the final treasure.',
    highlights: [
      'Team-based linguistic competition with 3–5 members, featuring live scoring and increasing difficulty levels',
      'Rush Hour round includes jumbled words, sentence rearrangement, foreign phrases, one-word substitutes, and emoji-based questions',
      'Top teams qualify for the final Cipher Hunt, a clue-based treasure hunt using riddles and campus hints',
      'Winners are decided by fastest completion time, with penalties for wrong answers or extra clues',
      'Team Size: 3 to 5',
      'Registration Fee: 10/- per head'
    ],
    img: lexihuntIcon,
    icon: lexihuntIcon, // Add icon
    registrationLink: 'https://forms.gle/75TYyqEYcaqAnNES8',
    venue: 'Suvarnamukhi',
    date: 'December 27, 2025 | 6:00 PM - 7:00 PM (Round 1) | December 28, 2025 | 2:30 PM - 5:00 PM (Round 2)',
    conductedClubName: 'Linguistic & Personality Development Club'
  },
  {
    id: 'rapid-rush',
    name: 'Rapid Rush',
    description: 'A fast-paced, team-based eco adventure race where teams of 2–5 members compete to complete a series of fun, environment-themed challenges across multiple stations. Teams start at the Start Point and must clear all eco-stations and return as quickly as possible while collecting signatures and avoiding time penalties.',
    highlights: [
      'Eco Challenge Stations: Four engaging stations with sounds, images, riddles, taboo-style guessing, and quizzes based on environmental themes',
      'Race Against Time: Final score is based on total time taken, including penalties for wrong answers or skipped stations',
      'Signature-Based Progress: Teams must collect the Station Master\'s signature at each station to move ahead',
      'Team Activity: 3–5 members per team, promoting teamwork, quick thinking, and eco-awareness',
      'Registration Fee: 10/- per head'
    ],
    img: rapidRushIcon,
    icon: rapidRushIcon, // Add icon
    registrationLink: 'https://forms.gle/Bz6a7dgjPjtwVE3c7',
    venue: 'Suvarnamukhi',
    date: 'December 27, 2025 | 5:30 PM - 8:30 PM',
    conductedClubName: 'Eco Club'
  },
  {
    id: 'innovation-hackathon',
    name: 'Innovation Hackathon',
    description: 'A fast-paced, research-driven innovation challenge that simulates how real companies solve problems and pitch solutions. Participants work in teams to develop research-backed, startup-oriented ideas under time pressure and present them through role-based corporate pitching, gaining hands-on exposure to research, strategy, and professional skills.',
    highlights: [
      'Teams tackle real-world technical and social problem statements through a research-based mini hackathon',
      'Guided mentorship from Startup, Research, and Career clubs covering research, market analysis, and industry expectations',
      'Role-based corporate pitching where participants act as CEO, CTO, Marketing, HR, etc., evaluated by role-specific judges',
      'Focus on innovation, teamwork, communication, and career-oriented learning at a minimal entry fee',
      'Team Size: 3 to 5',
      'Registration Fee: 10/- per head'
    ],
    img: innovation, // Use imported image
    icon: hackathonIcon, // Add icon
    registrationLink: 'https://forms.gle/LHzDUA4GPPNZeGLa8',
    venue: 'Suvarnamukhi',
    date: 'December 28, 2025 | Round 1: 9:30 AM - 11:30 AM | Round 2: 2:30 PM - 5:00 PM',
    conductedClubName: 'Internship, Startup & Research Clubs'
  },
  {
    id: 'iq-arena',
    name: 'IQ Arena',
    description: 'A high-intensity, competitive-exam–inspired administrative simulation designed for aspirants of SSC, Banking, UPSC, State Services, and students interested in higher or overseas education. The event challenges participants on knowledge, decision-making, teamwork, and crisis management through a two-round format that simulates real-time district administration.',
    highlights: [
      'Two-Level Challenge: A fast-paced screening round followed by an in-depth District Collector–style administrative simulation',
      'Realistic Governance Experience: Teams earn and manage development funds, build district zones, and handle real-life crisis scenarios',
      'Skill-Focused Evaluation: Tests speed, accuracy, leadership, teamwork, and decision-making under pressure',
      'Competitive & Strategic: Winners are decided based on overall district stability, fund management, and crisis handling ability',
      'Team Size: 3 to 4',
      'Registration Fee: 10/- per head'
    ],
    img: iqArenaIcon,
    icon: iqArenaIcon, // Add icon
    registrationLink: 'https://forms.gle/8MgTD4i1vhhWq9pj9',
    venue: 'Suvarnamukhi',
    date: 'December 28, 2025 | Round 1: 11:30 AM - 1:00 PM | Round 2: 2:30 PM - 5:00 PM',
    conductedClubName: 'Competitive Club & Higher Education Clubs'
  },
  {
    id: 'synergy',
    name: 'SYNERGY',
    description: 'A hands-on technical competition for teams of four students that blends electronics puzzles, component identification, quizzes, and practical circuit building under time and resource constraints. The event tests technical knowledge, teamwork, and innovation, leading to an exciting final IoT-based car race.',
    highlights: [
      'Two-Round Format: Round 1 includes parallel practical and quiz-based challenges; top 4 teams advance to the final round',
      'Hands-on Learning: Activities like breadboard circuit building, component puzzles, IoT identification, and sensor recognition',
      'Final F1 Race: Qualified teams build and race IoT-enabled car models within a fixed time',
      'Skill Development: Promotes problem-solving, teamwork, speed, and accuracy using minimal resources',
      'Team Size: 3 to 5',
      'Registration Fee: 10/- per head'
    ],
    img: synergyIcon,
    icon: synergyIcon, // Add icon
    registrationLink: 'https://forms.gle/ZgN2ZRphivFVzvfx5',
    venue: 'Suvarnamukhi',
    date: 'December 29, 2025 | 5:30 PM - 8:30 PM',
    conductedClubName: 'Electronics Club & Robotics Club'
  },
  {
    id: 'cash-or-crash',
    name: 'Cash or Crash',
    description: 'A high-energy, strategy-based tech challenge where teams compete using virtual money, bidding on hidden questions from mixed categories. With no prerequisites required, the event tests quick thinking, smart bidding, teamwork, and decision-making under pressure.',
    highlights: [
      'Unique Bidding Format: Teams bid virtual money to unlock questions; correct answers double the bid, while wrong answers result in a loss',
      'Mixed Question Categories: Coding & tech, GK, fun puzzles, tasks, games, and surprise rounds ensure excitement for everyone',
      'Strategic Lifelines: Limited lifeline options add an extra layer of planning and risk management',
      'Exciting Rewards: Cash prizes/goodies with winner e-certificates make the competition rewarding and memorable',
      'Team Size: 3 to 5',
      'Registration Fee: 10/- per head'
    ],
    img: cash,
    icon: cashCrashIcon, // Add icon
    registrationLink: 'https://forms.gle/6X37Wf6dUGfzyxex6',
    venue: 'Suvarnamukhi',
    date: 'December 29, 2025 | 5:30 PM - 8:30 PM',
    conductedClubName: 'Coding Club'
  },
  {
    id: 'clash-bid',
    name: 'CLASH TO BID',
    description: 'An exciting two-round team event that blends cricket knowledge with strategy and decision-making. Teams first compete in a quiz-based screening round to earn their way into a Mini IPL-style auction, where smart bidding and team planning decide the winners.',
    highlights: [
      'Khaansar Clash (Round 1): A quiz round testing cricket knowledge with MCQs and fill-in-the-blanks; top 8 teams qualify',
      'Mini IPL Auction (Final Round): Qualified teams bid for retired T20 players to build a balanced squad',
      'Strategy & Planning: Winning depends on smart budgeting, role balance, and captain/vice-captain selection',
      'Performance-Based Scoring: Teams are ranked based on players\' overall T20 statistics to decide winners and runners-up',
      'Team Size: 3 to 5',
      'Registration Fee: 10/- per head'
    ],
    img: clashBidIcon,
    icon: clashBidIcon, // Add icon
    registrationLink: 'https://forms.gle/ckEEL3DtPmZn3uVN6',
    venue: 'Suvarnamukhi',
    date: 'December 30, 2025 | 5:30 PM - 8:30 PM',
    conductedClubName: 'Sports & Games Club'
  },
  {
    id: 'rangoli-competition',
    name: 'Rangoli Competition',
    description: 'A vibrant and creative event that celebrates traditional art, color harmony, and cultural expression. Participants design beautiful rangoli patterns using colors, flowers, or eco-friendly materials, showcasing creativity, precision, and artistic skills within a given time.',
    highlights: [
      'Encourages creativity and artistic expression rooted in Indian culture',
      'Focus on themes such as festivals, unity, nature, or social messages',
      'Judged on creativity, color combination, neatness, and overall presentation',
      'Promotes teamwork, time management, and cultural appreciation',
      'Team Size: 3 to 4',
      'Registration Fee: 40/- per group' ,
    ],
    img: rangoliIcon,
    icon: rangoliIcon, // Add icon
    registrationLink: 'https://forms.gle/H8tQZF8YUikt2VDLA',
    venue: 'Suvarnamukhi',
    date: 'December 31, 2025 | 6:00 AM - 9:00 AM',
    conductedClubName: 'Cultural Club'
  },
  {
    id: 'eureka-night',
    name: 'EUREKA Night',
    description: 'The grand cultural night celebrating achievements, creativity, and campus unity with performances, awards, and celebrations. Featuring cultural performances, student ramp walk, and student achievement video presentation.',
    highlights: [
      'Cultural Performances: Energetic dance routines, hilarious skits, soulful singing, vibrant cultural showcases',
      'Student Ramp Walk: Creative and dazzling costumes, spectacular display of style and confidence',
      'Student Achievement Video Presentation: Heartwarming showcase of talented students, celebrating student excellence and diversity',
      'Award Ceremony: Recognition of competition winners and outstanding participants',
      'Fireworks Display & Celebrations',
    ],
    img: eurekaNightIcon,
    icon: eurekaNightIcon, // Add icon
    registrationLink: 'https://docs.google.com/forms/d/e/1FAIpQLSe5Jd3xOlp9NZYpQwk3894SATuE0uTVL4dZu2yLfimwHpd5lQ/viewform?usp=header',
    venue: 'Kreeda Vedika',
    date: 'December 31, 2025 | 6:00 PM - 12:00 Midnight',
    conductedClubName: 'Cultural & Choreography Club'
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
  'Electronics Club & Robotics Club',
  'Coding Club',
  'Sports Club',
  'Cultural Club',
  'Cultural & Choreography Club'
];