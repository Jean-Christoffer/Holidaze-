
export interface VenueData {
  data: Venue;
}
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
  meta: Meta;
  location: Location;
  _count: Count;
  bookings: Booking[];
  owner: User;
}
export interface VenueForm {
  name: string;
  description: string;
  media: [
    {
      url: string;
    },
  ],
  price: number;
  maxGuests: number;
  rating: number;
  meta: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  },
  location: {
    address: string;
    city: string;
    zip: string;
    country: string;
    continent: string;
    lat?: number;
    lng?: number;
  },
}

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

export interface createBooking {
  dateFrom: string;
  dateTo: string;
  guests: number;

}
type Media = {
  url: string;
  alt: string;
};
export type Meta = {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
};
export type Location = {
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
  customer:Customer;
}
interface Customer{
  name:string;
  avatar:{
    url:string;
    alt:string;
  }
}

