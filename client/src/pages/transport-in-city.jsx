import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

export default function TransportInCity() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [selectedTransport, setSelectedTransport] = useState('');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  const [routeFilters, setRouteFilters] = useState({
    from: '',
    to: '',
    time: ''
  });

  const transportOptions = [
    {
      id: 'shuttle',
      name: 'Shuttle Services',
      nameHindi: 'शटल सेवाएं',
      icon: '🚌',
      description: 'Free shuttles between major ghats',
      color: 'bg-yellow-500',
      status: '🟢 Active',
      features: ['Free service', 'Regular intervals', 'Multiple routes']
    },
    {
      id: 'bus',
      name: 'City Buses',
      nameHindi: 'शहर की बसें',
      icon: '🚍',
      description: 'Local bus services around Nashik',
      color: 'bg-blue-500',
      status: '🟢 Running',
      features: ['Affordable fares', 'Wide coverage', 'Frequent service']
    },
    {
      id: 'auto',
      name: 'Auto Rickshaw',
      nameHindi: 'ऑटो रिक्शा',
      icon: '🛺',
      description: 'Short distance travel within city',
      color: 'bg-green-500',
      status: '🟢 Available',
      features: ['Door-to-door', 'Flexible routes', 'Quick service']
    },
    {
      id: 'walking',
      name: 'Walking Routes',
      nameHindi: 'पैदल मार्ग',
      icon: '🚶',
      description: 'Guided walking paths with GPS',
      color: 'bg-purple-500',
      status: '📍 Live GPS',
      features: ['Health benefits', 'Scenic routes', 'Free navigation']
    }
  ];

  const popularRoutes = [
    { from: 'Railway Station', to: 'Ramkund Ghat', distance: '3.2 km', time: '15 min' },
    { from: 'Bus Stand', to: 'Panchavati', distance: '2.8 km', time: '12 min' },
    { from: 'Airport', to: 'Tapovan', distance: '8.5 km', time: '25 min' },
    { from: 'Ramkund', to: 'Panchavati', distance: '1.5 km', time: '8 min' }
  ];

  const handleTransportSelect = (transportId) => {
    setSelectedTransport(transportId);
  };

  const handleRoutePlan = (e) => {
    e.preventDefault();
    console.log('Planning route:', { transport: selectedTransport, filters: routeFilters });
    // Implement route planning logic
  };

  const renderTransportDetails = () => {
    if (!selectedTransport) return null;

    const transport = transportOptions.find(t => t.id === selectedTransport);
    
    return (
      <div className="mt-8">
        <Card className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className={`${transport.color} text-white p-4 rounded-full text-2xl`}>
              {transport.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-kumbh-text">{transport.name}</h3>
              <p className="font-devanagari text-kumbh-orange font-semibold">{transport.nameHindi}</p>
              <p className="text-gray-600">{transport.description}</p>
              <div className="mt-2">
                <span className="text-green-600 text-sm font-semibold">{transport.status}</span>
              </div>
            </div>
          </div>

          {/* Route Planner */}
          <form onSubmit={handleRoutePlan} className="space-y-4">
            <h4 className="text-lg font-semibold text-kumbh-text mb-3">
              Plan Your Route | अपना मार्ग योजना बनाएं
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  From | से
                </label>
                <Select value={routeFilters.from} onValueChange={(value) => setRouteFilters({...routeFilters, from: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select starting point" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current Location</SelectItem>
                    <SelectItem value="ramkund">Ramkund Ghat</SelectItem>
                    <SelectItem value="panchavati">Panchavati</SelectItem>
                    <SelectItem value="tapovan">Tapovan</SelectItem>
                    <SelectItem value="railway">Railway Station</SelectItem>
                    <SelectItem value="bus">Bus Stand</SelectItem>
                    <SelectItem value="airport">Airport</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  To | तक
                </label>
                <Select value={routeFilters.to} onValueChange={(value) => setRouteFilters({...routeFilters, to: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ramkund">Ramkund Ghat</SelectItem>
                    <SelectItem value="panchavati">Panchavati</SelectItem>
                    <SelectItem value="tapovan">Tapovan</SelectItem>
                    <SelectItem value="railway">Railway Station</SelectItem>
                    <SelectItem value="bus">Bus Stand</SelectItem>
                    <SelectItem value="airport">Airport</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Time | समय
                </label>
                <Input 
                  type="time" 
                  value={routeFilters.time}
                  onChange={(e) => setRouteFilters({...routeFilters, time: e.target.value})}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                type="submit" 
                className="bg-kumbh-orange text-white hover:bg-kumbh-deep px-8 py-3"
              >
                Get Directions
              </Button>
            </div>
          </form>

          {/* Features */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-kumbh-text mb-3">Features | विशेषताएं</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {transport.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-kumbh-orange rounded-full"></div>
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-kumbh-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Button 
              onClick={() => setLocation('/')}
              variant="outline"
              className="mr-4"
            >
              ← Back to Home
            </Button>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-kumbh-text mb-2">
            Transport in Nashik
          </h1>
          <p className="font-devanagari text-xl text-kumbh-orange font-semibold mb-4">
            नासिक में परिवहन
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Navigate within Nashik city using various local transport options
          </p>
        </div>

        {/* Transport Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {transportOptions.map((transport) => (
            <Card 
              key={transport.id}
              className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedTransport === transport.id 
                  ? 'ring-2 ring-kumbh-orange bg-kumbh-light' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleTransportSelect(transport.id)}
            >
              <div className="text-center">
                <div className={`${transport.color} text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl`}>
                  {transport.icon}
                </div>
                <h3 className="text-lg font-bold text-kumbh-text mb-2">
                  {transport.name}
                </h3>
                <p className="font-devanagari text-kumbh-orange font-semibold mb-2 text-sm">
                  {transport.nameHindi}
                </p>
                <p className="text-gray-600 text-xs mb-3">
                  {transport.description}
                </p>
                <div className="mb-3">
                  <span className="text-green-600 text-xs font-semibold">{transport.status}</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedTransport === transport.id 
                    ? 'bg-kumbh-orange text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {selectedTransport === transport.id ? 'Selected' : 'Select'}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Transport Details */}
        {renderTransportDetails()}

        {/* Popular Routes */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-kumbh-text mb-6 text-center">
            Popular Routes | लोकप्रिय मार्ग
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularRoutes.map((route, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-kumbh-text">
                      {route.from} → {route.to}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Distance: {route.distance} | Time: {route.time}
                    </p>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-kumbh-orange text-white hover:bg-kumbh-deep"
                  >
                    Get Route
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="text-3xl mb-2">🗺️</div>
            <h3 className="font-semibold text-kumbh-text mb-2">Live Navigation</h3>
            <p className="text-sm text-gray-600">Real-time GPS tracking and directions</p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-semibold text-kumbh-text mb-2">Transparent Pricing</h3>
            <p className="text-sm text-gray-600">Clear fare information upfront</p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="text-3xl mb-2">⏱️</div>
            <h3 className="font-semibold text-kumbh-text mb-2">Real-time Updates</h3>
            <p className="text-sm text-gray-600">Live schedules and delays</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
