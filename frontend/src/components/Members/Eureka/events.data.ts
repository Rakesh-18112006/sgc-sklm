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

// Main Events Data Array
export const eventsData: Event[] = [
  {
    id: 'tech-hackathon-2024',
    name: 'Eureka Hackathon 2024',
    description: 'A 24-hour intense coding competition where participants develop innovative solutions for real-world problems. Open to all skill levels.',
    highlights: [
      '24-hour coding marathon',
      '₹1,00,000 total prize pool',
      'Industry expert mentors',
      'Free workshops and sessions',
      'Networking with recruiters'
    ],
    img: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    registrationLink: 'https://forms.google.com/eureka-hackathon-2024',
    venue: 'Tech Innovation Center, Main Campus',
    date: 'October 15-16, 2024 | 9:00 AM - 9:00 AM',
    conductedClubName: 'Tech Club'
  },
  {
    id: 'robo-wars-2024',
    name: 'Robo Wars: Battle Bots',
    description: 'Intense robotics competition where teams design and build combat robots to battle in an electrifying arena.',
    highlights: [
      'Combat robot competition',
      'Weight categories: 15kg, 30kg, 60kg',
      'Safety certified arena',
      'Judges from robotics industry',
      'Live audience voting'
    ],
    img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    registrationLink: 'https://forms.google.com/robo-wars-2024',
    venue: 'Engineering Block Arena',
    date: 'October 17, 2024 | 10:00 AM - 6:00 PM',
    conductedClubName: 'Robotics Society'
  },
  {
    id: 'startup-pitch-2024',
    name: 'Startup Pitch Competition',
    description: 'Entrepreneurs showcase their innovative business ideas to a panel of investors and industry experts.',
    highlights: [
      '₹5,00,000 seed funding',
      'Investor networking session',
      'Business mentoring',
      'Legal and IP consultation',
      'Incubation opportunities'
    ],
    img: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    registrationLink: 'https://forms.google.com/startup-pitch-2024',
    venue: 'Business School Auditorium',
    date: 'October 18, 2024 | 2:00 PM - 8:00 PM',
    conductedClubName: 'Entrepreneurship Cell'
  },
  {
    id: 'ai-workshop-2024',
    name: 'AI & Machine Learning Workshop',
    description: 'Hands-on workshop covering fundamentals of AI, ML models, and practical implementation using Python.',
    highlights: [
      'Hands-on coding sessions',
      'Industry case studies',
      'TensorFlow and PyTorch basics',
      'Real-world project building',
      'Certificate of completion'
    ],
    img: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    registrationLink: 'https://forms.google.com/ai-workshop-2024',
    venue: 'Computer Lab 301, CS Department',
    date: 'October 19, 2024 | 9:00 AM - 5:00 PM',
    conductedClubName: 'AI Club'
  },
  {
    id: 'design-sprint-2024',
    name: 'UI/UX Design Sprint',
    description: 'A rapid design challenge where participants create user interfaces and experiences for given problem statements.',
    highlights: [
      '48-hour design challenge',
      'Figma masterclass',
      'Portfolio review sessions',
      'Design thinking workshops',
      'Industry expert feedback'
    ],
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    registrationLink: 'https://forms.google.com/design-sprint-2024',
    venue: 'Design Studio, Art Center',
    date: 'October 20-21, 2024 | 10:00 AM - 6:00 PM',
    conductedClubName: 'Design Hub'
  },
  {
    id: 'esports-tournament-2024',
    name: 'E-Sports Championship',
    description: 'Multi-game esports tournament featuring popular competitive games with exciting prizes.',
    highlights: [
      'Games: Valorant, CS2, BGMI, FIFA 24',
      '₹2,00,000 prize pool',
      'Professional gaming setup',
      'Live streaming on Twitch',
      'Celebrity gamer appearances'
    ],
    img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    registrationLink: 'https://forms.google.com/esports-2024',
    venue: 'Student Center Gaming Arena',
    date: 'October 22-23, 2024 | 12:00 PM - 10:00 PM',
    conductedClubName: 'Gaming Guild'
  },
  {
    id: 'cyber-security-ctf',
    name: 'Capture The Flag - Cyber Security',
    description: 'Cybersecurity competition where participants solve challenges related to cryptography, forensics, and web exploitation.',
    highlights: [
      'Jeopardy-style CTF',
      'Beginner to advanced levels',
      'Real-world security scenarios',
      'Industry professional challenges',
      'Ethical hacking workshops'
    ],
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    registrationLink: 'https://forms.google.com/cyber-ctf-2024',
    venue: 'Cybersecurity Lab, IT Building',
    date: 'October 24, 2024 | 9:00 AM - 9:00 PM',
    conductedClubName: 'Cyber Security Club'
  },
  {
    id: 'science-expo-2024',
    name: 'Science & Innovation Expo',
    description: 'Showcase of scientific projects, innovations, and research from various departments.',
    highlights: [
      'Research project displays',
      'Live demonstrations',
      'Poster presentation competition',
      'Industry-academia interaction',
      'Special awards for innovation'
    ],
    img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    registrationLink: 'https://forms.google.com/science-expo-2024',
    venue: 'Main Auditorium & Exhibition Hall',
    date: 'October 25-26, 2024 | 10:00 AM - 8:00 PM',
    conductedClubName: 'Science Society'
  },
  {
    id: 'music-festival-2024',
    name: 'Eureka Music Festival',
    description: 'Annual music festival featuring performances by college bands, solo artists, and professional musicians.',
    highlights: [
      'Battle of Bands competition',
      'Professional artist performances',
      'Open mic sessions',
      'DJ night',
      'Food stalls and merchandise'
    ],
    img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    registrationLink: 'https://forms.google.com/music-festival-2024',
    venue: 'Open Air Theater',
    date: 'October 27, 2024 | 4:00 PM - 11:00 PM',
    conductedClubName: 'Music Club'
  },
  {
    id: 'debate-competition-2024',
    name: 'Inter-College Debate Championship',
    description: 'Parliamentary style debate competition on contemporary topics with participants from various colleges.',
    highlights: [
      'British Parliamentary format',
      'National level participation',
      'Renowned adjudicators',
      'Workshops by debate champions',
      'Trophy and certificates'
    ],
    img: 'https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    registrationLink: 'https://forms.google.com/debate-2024',
    venue: 'Law College Moot Court',
    date: 'October 28-29, 2024 | 9:00 AM - 6:00 PM',
    conductedClubName: 'Literary & Debate Society'
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
  // Since we're using string dates, you might want to implement
  // proper date comparison based on your needs
  return eventsData;
};

export const getFeaturedEvents = (count: number = 4): Event[] => {
  return eventsData.slice(0, count);
};

// Event categories (derived from event names/descriptions)
export const eventCategories = [
  'Technology',
  'Robotics',
  'Entrepreneurship',
  'AI/ML',
  'Design',
  'Gaming',
  'Cyber Security',
  'Science',
  'Music',
  'Debate'
];

// Club names for filtering
export const conductingClubs = [
  'Tech Club',
  'Robotics Society',
  'Entrepreneurship Cell',
  'AI Club',
  'Design Hub',
  'Gaming Guild',
  'Cyber Security Club',
  'Science Society',
  'Music Club',
  'Literary & Debate Society'
];