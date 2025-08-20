export type UserProps = {
  id: string;
  email: string;
  name: string;
  profileImage: string;
  hostProfile: HostProfileProps | null;
  phoneNumber: string;
};

export type HostProfileProps = {
  bio: string;
  id: string;
  isActive: boolean;
  rating: number;
  ratingCount: number;
  userId: string;
};

export type Address = {
  country: string;
  city: string;
  address: string;
  zipCode: string;
};

export type Booking = {
  spaceId: string;
  customerId: string;
  userId: string;
  endAt: string;
  status: string;
  startAt: string;
  closed: boolean;
  price?: number;
};

export type Review = {
  spaceId: string;
  userId: string;
  review: string;
  user?: {
    name: string;
  };
  rating: number;
};

export type SpaceProps = {
  id: string;
  hostId: string;
  title: string;
  description: string;
  images: string[];
  categories: string[];
  price: number;
  currency: string;
  rating: number;
  ratingCount: number;
  isBooked: boolean;
  Address: Address;
  bookings: string[];
  reviews: Review[];
  host: HostProfileProps;
};
