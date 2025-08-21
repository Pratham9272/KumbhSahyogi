export interface Location {
  latitude: number;
  longitude: number;
}

export interface SearchFilters {
  location: string;
  checkin: string;
  guests: string;
}

export interface RouteRequest {
  from: string;
  to: string;
  transportType?: string;
}

export interface LanguageContext {
  language: 'en' | 'hi';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

export interface EmergencyAlert {
  id: string;
  location: Location;
  timestamp: Date;
  status: 'active' | 'resolved';
  message?: string;
}
