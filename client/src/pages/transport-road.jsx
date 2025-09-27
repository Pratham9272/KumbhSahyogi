import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

export default function TransportRoad() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  // Load Google Maps API
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setMapLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&libraries=places,directions`;
      script.async = true;
      script.defer = true;
      script.onload = () => setMapLoaded(true);
      script.onerror = () => console.error('Failed to load Google Maps API');
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  // Get user's current location
  const getUserLocation = () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        setIsLoadingLocation(false);
        console.log('User location:', location);
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        setLocationError(errorMessage);
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  // Calculate route to Nashik
  const calculateRoute = (startLocation, endLocation = { lat: 19.9975, lng: 73.7898 }) => {
    if (!mapLoaded || !window.google) return;

    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();

    // Initialize map
    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 7,
      center: startLocation
    });

    directionsRenderer.setMap(map);

    const request = {
      origin: startLocation,
      destination: endLocation,
      travelMode: window.google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
      avoidHighways: false,
      avoidTolls: false
    };

    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);
        
        // Store route information
        const routes = result.routes.map((route, index) => ({
          id: index,
          summary: route.summary || `Route ${index + 1}`,
          distance: route.legs[0].distance.text,
          duration: route.legs[0].duration.text,
          steps: route.legs[0].steps
        }));
        
        setRouteInfo(routes);
        setSelectedRoute(routes[0]);
      } else {
        console.error('Directions request failed:', status);
      }
    });
  };

  // Handle route calculation when user location is available
  useEffect(() => {
    if (userLocation && mapLoaded) {
      calculateRoute(userLocation);
    }
  }, [userLocation, mapLoaded]);

  const majorCities = [
    { name: 'Mumbai', lat: 19.0760, lng: 72.8777, distance: '180 km' },
    { name: 'Pune', lat: 18.5204, lng: 73.8567, distance: '220 km' },
    { name: 'Delhi', lat: 28.7041, lng: 77.1025, distance: '1,400 km' },
    { name: 'Bangalore', lat: 12.9716, lng: 77.5946, distance: '850 km' },
    { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, distance: '650 km' },
    { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714, distance: '450 km' }
  ];

  const handleCitySelect = (city) => {
    const location = { lat: city.lat, lng: city.lng };
    setUserLocation(location);
    if (mapLoaded) {
      calculateRoute(location);
    }
  };

  const roadTransportOptions = [
    {
      id: 'bus',
      name: 'State Transport Bus',
      nameHindi: 'राज्य परिवहन बस',
      icon: '🚌',
      description: 'Government operated buses',
      features: ['Affordable', 'Regular service', 'Multiple stops'],
      price: '₹200-500'
    },
    {
      id: 'private-bus',
      name: 'Private Bus',
      nameHindi: 'निजी बस',
      icon: '🚍',
      description: 'Private operators with AC/Non-AC',
      features: ['Comfortable', 'AC available', 'Direct routes'],
      price: '₹400-800'
    },
    {
      id: 'car',
      name: 'Car Rental',
      nameHindi: 'कार किराया',
      icon: '🚗',
      description: 'Self-drive or chauffeur driven',
      features: ['Flexible timing', 'Door-to-door', 'Privacy'],
      price: '₹2000-4000'
    },
    {
      id: 'taxi',
      name: 'Taxi/Cab',
      nameHindi: 'टैक्सी/कैब',
      icon: '🚕',
      description: 'Ola, Uber, local taxis',
      features: ['Convenient', 'Real-time booking', 'Multiple options'],
      price: '₹3000-6000'
    }
  ];

  return (
    <div className="min-h-screen bg-kumbh-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Button 
              onClick={() => setLocation('/transport/to-city')}
              variant="outline"
              className="mr-4"
            >
              ← Back to Transport
            </Button>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-kumbh-text mb-2">
            Road Transport to Nashik
          </h1>
          <p className="font-devanagari text-xl text-kumbh-orange font-semibold mb-4">
            नासिक तक सड़क परिवहन
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the best road routes to Nashik with real-time navigation
          </p>
        </div>

        {/* Location Section */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold text-kumbh-text mb-4">
            Your Location | आपका स्थान
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* GPS Location */}
            <div>
              <h3 className="text-lg font-semibold text-kumbh-text mb-3">
                Use Current Location | वर्तमान स्थान
              </h3>
              <Button
                onClick={getUserLocation}
                disabled={isLoadingLocation}
                className="w-full bg-kumbh-orange text-white hover:bg-kumbh-deep mb-3"
              >
                {isLoadingLocation ? 'Getting Location...' : '📍 Get My Location'}
              </Button>
              
              {userLocation && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-800 text-sm">
                    ✅ Location found: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                  </p>
                </div>
              )}
              
              {locationError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-800 text-sm">❌ {locationError}</p>
                </div>
              )}
            </div>

            {/* Select from Major Cities */}
            <div>
              <h3 className="text-lg font-semibold text-kumbh-text mb-3">
                Or Select from Major Cities | प्रमुख शहरों से चुनें
              </h3>
              <Select onValueChange={(value) => {
                const city = majorCities.find(c => c.name === value);
                if (city) handleCitySelect(city);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your city" />
                </SelectTrigger>
                <SelectContent>
                  {majorCities.map((city) => (
                    <SelectItem key={city.name} value={city.name}>
                      {city.name} ({city.distance})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Map and Routes */}
        {userLocation && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Map */}
            <div className="lg:col-span-2">
              <Card className="p-4">
                <h3 className="text-lg font-semibold text-kumbh-text mb-3">
                  Route Map | मार्ग मानचित्र
                </h3>
                <div 
                  ref={mapRef} 
                  className="w-full h-96 rounded-lg border"
                  style={{ minHeight: '400px' }}
                />
              </Card>
            </div>

            {/* Route Information */}
            <div>
              <Card className="p-4">
                <h3 className="text-lg font-semibold text-kumbh-text mb-3">
                  Route Options | मार्ग विकल्प
                </h3>
                {routeInfo && routeInfo.map((route) => (
                  <div 
                    key={route.id}
                    className={`p-3 rounded-lg mb-3 cursor-pointer transition-colors ${
                      selectedRoute?.id === route.id 
                        ? 'bg-kumbh-orange text-white' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedRoute(route)}
                  >
                    <h4 className="font-semibold">{route.summary}</h4>
                    <p className="text-sm opacity-90">
                      Distance: {route.distance} | Duration: {route.duration}
                    </p>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        )}

        {/* Transport Options */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold text-kumbh-text mb-6">
            Road Transport Options | सड़क परिवहन विकल्प
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadTransportOptions.map((option) => (
              <Card key={option.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <div className="text-4xl mb-3">{option.icon}</div>
                  <h3 className="text-lg font-bold text-kumbh-text mb-2">
                    {option.name}
                  </h3>
                  <p className="font-devanagari text-kumbh-orange font-semibold mb-2 text-sm">
                    {option.nameHindi}
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    {option.description}
                  </p>
                  <div className="mb-3">
                    <span className="text-lg font-bold text-kumbh-orange">
                      {option.price}
                    </span>
                  </div>
                  <div className="space-y-1 mb-4">
                    {option.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-kumbh-orange rounded-full"></div>
                        <span className="text-xs text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full bg-kumbh-orange text-white hover:bg-kumbh-deep"
                    size="sm"
                  >
                    Book Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Quick Tips */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-kumbh-text mb-4">
            Travel Tips | यात्रा सुझाव
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { tip: 'Book tickets in advance during peak season', icon: '🎫' },
              { tip: 'Check road conditions before departure', icon: '🛣️' },
              { tip: 'Carry water and snacks for long journeys', icon: '🥤' },
              { tip: 'Keep emergency contact numbers handy', icon: '📞' },
              { tip: 'Check weather forecast for your route', icon: '🌤️' },
              { tip: 'Plan rest stops for long drives', icon: '⏸️' }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="text-2xl">{item.icon}</div>
                <p className="text-sm text-gray-700">{item.tip}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
