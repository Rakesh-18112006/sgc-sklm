// types/eventTypes.ts
export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  views: number;
  imageUrl: string;
  status: "upcoming" | "completed";
  interestedCount: number;
  summary?: string;
  registrationLink?: string;
  club: {
    name: string;
    icon: string;
    _id?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginationTypes {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  total?: number;
  error?: string;
}