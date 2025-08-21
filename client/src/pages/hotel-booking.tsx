import { useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import HotelCard from '@/components/hotel-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockHotels } from '@/lib/mock-data';

export default function HotelBooking() {
  const { t } = useLanguage();
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    checkin: '',
    guests: ''
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching hotels with filters:', searchFilters);
  };

  const handleBookHotel = (hotelId: string) => {
    console.log('Booking hotel:', hotelId);
  };

  return (
    <div className="min-h-screen bg-kumbh-light py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-kumbh-text mb-2" data-testid="text-page-title">
            {t('hotel.title')} | <span className="font-devanagari">{t('hotel.title.hindi')}</span>
          </h1>
          <p className="text-gray-700">Find and book verified accommodations near the Kumbh venues</p>
        </div>

        {/* Search Form */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <form className="grid grid-cols-1 md:grid-cols-4 gap-4" onSubmit={handleSearch}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('search.location')} | {t('search.location.hindi')}
              </label>
              <Select value={searchFilters.location} onValueChange={(value) => setSearchFilters({...searchFilters, location: value})}>
                <SelectTrigger data-testid="select-location">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ramkund">Near Ramkund</SelectItem>
                  <SelectItem value="panchavati">Near Panchavati</SelectItem>
                  <SelectItem value="tapovan">Near Tapovan</SelectItem>
                  <SelectItem value="railway">Near Railway Station</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('search.checkin')} | {t('search.checkin.hindi')}
              </label>
              <Input 
                type="date" 
                value={searchFilters.checkin}
                onChange={(e) => setSearchFilters({...searchFilters, checkin: e.target.value})}
                data-testid="input-checkin"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('search.guests')} | {t('search.guests.hindi')}
              </label>
              <Select value={searchFilters.guests} onValueChange={(value) => setSearchFilters({...searchFilters, guests: value})}>
                <SelectTrigger data-testid="select-guests">
                  <SelectValue placeholder="Number of guests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3-4">3-4 Guests</SelectItem>
                  <SelectItem value="5+">5+ Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                type="submit" 
                className="w-full bg-kumbh-orange text-white hover:bg-kumbh-deep"
                data-testid="button-search"
              >
                Search Hotels
              </Button>
            </div>
          </form>
        </div>

        {/* Hotel Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockHotels.map((hotel) => (
            <HotelCard 
              key={hotel.id} 
              hotel={hotel} 
              onBook={handleBookHotel}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
