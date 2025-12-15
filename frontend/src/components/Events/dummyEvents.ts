// data/dummyEvents.ts
import type { Event } from "./eventTypes";

export const dummyEvents: Event[] = [
  {
    _id: "1",
    title: "Annual Tech Symposium",
    description:
      "Join us for a day of cutting-edge technology discussions and workshops with industry leaders.",
    date: "2023-10-15",
    time: "09:00 AM",
    views: 1245,
    imageUrl: "https://source.unsplash.com/random/600x400/?tech,conference",
    status: "completed",
    interestedCount: 0,
    club: {
      name: "Tech Club",
      icon: "💻",
    },
  },
  {
    _id: "2",
    title: "Art Exhibition Opening",
    description:
      "Experience the latest works from our talented student artists across various mediums.",
    date: "2023-10-18",
    time: "06:00 PM",
    views: 876,
    imageUrl: "https://source.unsplash.com/random/600x400/?art,exhibition",
    status: "completed",
    interestedCount: 0,
    club: {
      name: "Art Society",
      icon: "🎨",
    },
  },
  {
    _id: "3",
    title: "Sports Day Championship",
    description:
      "Witness the most exciting sports competitions between different departments.",
    date: "2023-10-22",
    time: "08:00 AM",
    views: 1532,
    imageUrl: "https://source.unsplash.com/random/600x400/?sports,competition",
    status: "completed",
    interestedCount: 0,
    club: {
      name: "Sports Club",
      icon: "⚽",
    },
  },
  {
    _id: "4",
    title: "Music Festival",
    description:
      "A night of amazing performances from student bands and solo artists.",
    date: "2023-10-25",
    time: "07:30 PM",
    views: 2103,
    imageUrl: "https://source.unsplash.com/random/600x400/?music,concert",
    status: "completed",
    interestedCount: 0,
    club: {
      name: "Music Society",
      icon: "🎵",
    },
  },
  {
    _id: "5",
    title: "Entrepreneurship Workshop",
    description:
      "Learn how to turn your ideas into successful businesses from experienced entrepreneurs.",
    date: "2023-10-28",
    time: "10:00 AM",
    views: 945,
    imageUrl: "https://source.unsplash.com/random/600x400/?business,workshop",
    status: "completed",
    interestedCount: 0,
    club: {
      name: "Business Club",
      icon: "📈",
    },
  },
  {
    _id: "6",
    title: "Science Fair",
    description:
      "Explore innovative projects from our science and engineering students.",
    date: "2023-11-02",
    time: "11:00 AM",
    views: 1120,
    imageUrl: "https://source.unsplash.com/random/600x400/?science,experiment",
    status: "completed",
    interestedCount: 0,
    club: {
      name: "Science Club",
      icon: "🔬",
    },
  },
  {
    _id: "7",
    title: "Literary Meet",
    description:
      "Poetry readings, book discussions, and creative writing workshops.",
    date: "2023-11-05",
    time: "04:00 PM",
    views: 687,
    imageUrl: "https://source.unsplash.com/random/600x400/?books,literature",
    status: "completed",
    interestedCount: 0,
    club: {
      name: "Literary Club",
      icon: "📚",
    },
  },
  {
    _id: "8",
    title: "Drama Night",
    description:
      "Student-written and directed plays showcasing emerging theatrical talent.",
    date: "2023-11-08",
    time: "06:30 PM",
    views: 1342,
    imageUrl: "https://source.unsplash.com/random/600x400/?theater,drama",
    status: "completed",
    interestedCount: 0,
    club: {
      name: "Drama Club",
      icon: "🎭",
    },
  },
];
