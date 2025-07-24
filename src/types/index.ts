export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number]; // [lng, lat]
  type?: 'airport' | 'station' | 'stop' | 'custom';
}

export interface RouteSegment {
  id: string;
  from: Location;
  to: Location;
  mode: TransportMode;
  duration: number; // in minutes
  distance: number; // in miles/km
  cost: number;
  carbonFootprint?: number;
  details?: {
    departure?: string;
    arrival?: string;
    carrier?: string;
    flightNumber?: string;
    trainNumber?: string;
    stops?: Location[];
  };
}

export interface Route {
  id: string;
  segments: RouteSegment[];
  totalDuration: number;
  totalDistance: number;
  totalCost: number;
  totalCarbonFootprint?: number;
  isBudgetFriendly: boolean;
  trafficCondition?: 'good' | 'moderate' | 'heavy';
}

export type TransportMode = 
  | 'drive_no_tolls'
  | 'drive_with_tolls'
  | 'flight'
  | 'train'
  | 'metro'
  | 'bus'
  | 'cta'
  | 'metra'
  | 'walking'
  | 'cycling';

export interface TripPreferences {
  budget: 'low' | 'medium' | 'high';
  priority: 'time' | 'cost' | 'comfort' | 'environment';
  maxBreaks: number;
  preferredModes: TransportMode[];
  avoidTolls?: boolean;
  accessibilityNeeds?: boolean;
}

export interface SearchQuery {
  from: string;
  to: string;
  departureDate?: Date;
  returnDate?: Date;
  passengers: number;
  preferences: TripPreferences;
}

export interface MapViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch?: number;
  bearing?: number;
}

export interface FlightDetails {
  flightNumber: string;
  airline: string;
  departure: {
    airport: string;
    time: string;
    terminal?: string;
    gate?: string;
  };
  arrival: {
    airport: string;
    time: string;
    terminal?: string;
    gate?: string;
  };
  duration: number;
  aircraft: string;
  price: number;
  class: 'economy' | 'premium' | 'business' | 'first';
}

export interface WeatherInfo {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}