import { Hotel } from '@shared/schema';
import { Button } from '@/components/ui/button';

interface HotelCardProps {
  hotel: Hotel;
  onBook: (hotelId: string) => void;
}

export default function HotelCard({ hotel, onBook }: HotelCardProps) {
  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating);
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 !== 0;
    
    return (
      <div className="flex text-yellow-400 mr-2">
        {Array.from({ length: fullStars }, (_, i) => (
          <span key={i}>⭐</span>
        ))}
        {hasHalfStar && <span>⭐</span>}
        {Array.from({ length: 5 - Math.ceil(numRating) }, (_, i) => (
          <span key={i} className="text-gray-300">☆</span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden" data-testid={`card-hotel-${hotel.id}`}>
      <img 
        src={hotel.imageUrl || 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250'} 
        alt={`${hotel.name} room`}
        className="w-full h-48 object-cover"
        data-testid={`img-hotel-${hotel.id}`}
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-kumbh-text" data-testid={`text-hotel-name-${hotel.id}`}>
            {hotel.name}
          </h3>
          <span className={`${hotel.verified ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'} text-xs px-2 py-1 rounded-full`} data-testid={`badge-hotel-verification-${hotel.id}`}>
            {hotel.verified ? 'Verified' : 'Budget'}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3" data-testid={`text-hotel-location-${hotel.id}`}>
          {hotel.distance} km from {hotel.location}
        </p>
        <div className="flex items-center mb-3">
          {renderStars(hotel.rating)}
          <span className="text-sm text-gray-600" data-testid={`text-hotel-rating-${hotel.id}`}>
            {hotel.rating} ({hotel.reviews} reviews)
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-kumbh-orange" data-testid={`text-hotel-price-${hotel.id}`}>
              ₹{hotel.price}
            </span>
            <span className="text-sm text-gray-600">/night</span>
          </div>
          <Button 
            onClick={() => onBook(hotel.id)}
            className="bg-kumbh-orange text-white hover:bg-kumbh-deep"
            data-testid={`button-book-hotel-${hotel.id}`}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}
