export interface Venue {
  id: string;
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: Meta[];
  location: Location;
  _count: Count;
}
export type Venues = Array<Venue>

export interface User {
  name: string;
  email: string;
  bio: string;
  avatar: Image;
  banner: Image;
  venueManager: boolean;
  venues: Venue[];
  bookings: Booking[];
  _count: Count;
}

export interface createBooking{
  dateFrom:string;
  dateTo:string;
  guests:number;

}
type Media = {
  url: string;
  alt: string;
};
type Meta = {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
};
type Location = {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
};

type Count = {
  bookings: number;
};

export interface Button {
  text: string;
  secondary?: boolean;
  action: string;
}

interface Image {
  url: string;
  alt: string;
}

export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: Venue;
}

