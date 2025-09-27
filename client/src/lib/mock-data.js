// Note: This is ONLY for demonstration purposes as the design reference contains mock data
// In production, this would be replaced with actual API calls

export const mockHotels = [
  {
    id: '1',
    name: 'Kumbh Heritage Inn',
    location: 'Near Ramkund',
    address: '123 Ramkund Road, Nashik',
    price: '2500',
    rating: '4.2',
    reviews: 120,
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
    amenities: ['WiFi', 'AC', 'Restaurant'],
    distance: '0.5'
  },
  {
    id: '2',
    name: "Pilgrim's Rest Hotel",
    location: 'Near Panchavati',
    address: '456 Panchavati Street, Nashik',
    price: '3200',
    rating: '4.8',
    reviews: 89,
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
    amenities: ['WiFi', 'AC', 'Parking', 'Restaurant'],
    distance: '1.2'
  },
  {
    id: '3',
    name: 'Dharamshala Nashik',
    location: 'Near Tapovan',
    address: '789 Tapovan Road, Nashik',
    price: '800',
    rating: '3.5',
    reviews: 45,
    verified: false,
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
    amenities: ['Basic Rooms', 'Shared Bath'],
    distance: '0.8'
  }
];

export const mockMedicalFacilities = [
  {
    id: '1',
    name: 'Nashik District Hospital',
    type: 'Multi-specialty Hospital',
    address: 'College Road, Nashik',
    phone: '+91-253-2571234',
    emergency24x7: true,
    distance: '2.5',
    services: ['Emergency', 'Surgery', 'Medicine', 'Orthopedics']
  },
  {
    id: '2',
    name: 'Kumbh Medical Camp - Ramkund',
    type: 'Primary Healthcare Camp',
    address: 'Near Ramkund Ghat',
    phone: '+91-253-2345890',
    emergency24x7: false,
    distance: '0.3',
    services: ['Basic Treatment', 'First Aid', 'Consultation']
  }
];

export const mockTransportRoutes = [
  {
    id: '1',
    name: 'Bus Route #12',
    type: 'Bus',
    fromLocation: 'Current Location',
    toLocation: 'Ramkund',
    duration: 15,
    cost: '20',
    description: 'Via College Road',
    active: true
  },
  {
    id: '2',
    name: 'Walking Route',
    type: 'Walking',
    fromLocation: 'Current Location',
    toLocation: 'Ramkund',
    duration: 25,
    cost: '0',
    description: '1.8 km walk with shaded paths',
    active: true
  }
];

export const mockEmergencyContacts = [
  {
    id: '1',
    name: 'Police Control Room',
    phone: '100',
    type: 'Police',
    available24x7: true
  },
  {
    id: '2',
    name: 'Emergency Ambulance',
    phone: '108',
    type: 'Medical',
    available24x7: true
  },
  {
    id: '3',
    name: 'Fire & Rescue',
    phone: '101',
    type: 'Fire',
    available24x7: true
  },
  {
    id: '4',
    name: 'Kumbh Helpdesk',
    phone: '1800-123-4567',
    type: 'General',
    available24x7: true
  }
];
