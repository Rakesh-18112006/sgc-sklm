// types/eventTypes.ts
export interface Event {
  _id: string; // MongoDB ID
  title: string;
  description: string;
  date: string;
  time: string;
  views: number;
  imageUrl: string;
  status: "upcoming" | "completed";
  interestedCount: number;
  summary?: string;
  club: {
    name: string;
    icon: string;
  };
}

export interface PaginationTypes {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  }