/** MET Bhujbal Knowledge City engineering building, Nashik - fixed current location. */
export const MET_BHUJBAL_LOCATION = {
  lat: 20.042065847970886,
  lng: 73.85013884226173,
  name: 'MET Bhujbal Knowledge City Engineering Building, Nashik',
};

export const NASHIK_MAP_CENTER = {
  lat: MET_BHUJBAL_LOCATION.lat,
  lng: MET_BHUJBAL_LOCATION.lng,
};

export function getFixedCurrentLocation() {
  return {
    lat: MET_BHUJBAL_LOCATION.lat,
    lng: MET_BHUJBAL_LOCATION.lng,
    accuracy: 10,
    timestamp: Date.now(),
  };
}

export function getFixedCurrentLocationCoords() {
  return {
    lat: MET_BHUJBAL_LOCATION.lat,
    lng: MET_BHUJBAL_LOCATION.lng,
  };
}

/** Drop-in replacement for navigator.geolocation.getCurrentPosition */
export function requestCurrentLocation(onSuccess, onError) {
  try {
    onSuccess({
      coords: {
        latitude: MET_BHUJBAL_LOCATION.lat,
        longitude: MET_BHUJBAL_LOCATION.lng,
        accuracy: 10,
      },
    });
  } catch (error) {
    onError?.(error);
  }
}
