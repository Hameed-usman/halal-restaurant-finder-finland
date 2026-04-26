import { useRestaurantStore } from '../../store/useRestaurantStore';
import { useGeolocation } from '../../hooks/useGeolocation';
import PropTypes from 'prop-types';

export function NearMeButton({ mapRef }) {
  const { getUserLocation, locating, locationError } = useGeolocation();
  const nearMeActive = useRestaurantStore((state) => state.nearMeActive);
  const setNearMeActive = useRestaurantStore((state) => state.setNearMeActive);
  const setUserLocation = useRestaurantStore((state) => state.setUserLocation);

  const handleClick = async () => {
    if (nearMeActive) {
      setNearMeActive(false);
      setUserLocation(null);
    } else {
      const coords = await getUserLocation();
      if (coords) {
        setUserLocation(coords);
        setNearMeActive(true);
        if (mapRef && mapRef.current) {
          mapRef.current.flyTo([coords.lat, coords.lng], 13);
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleClick}
        disabled={locating}
        aria-pressed={nearMeActive}
        aria-label="Find restaurants near me"
        className={`px-4 py-2 text-white rounded-full transition-colors flex items-center gap-2 text-sm font-semibold shadow-sm ${
          nearMeActive ? 'bg-[#0b4d2a] hover:bg-[#07361d]' : 'bg-[#1a432b] hover:bg-[#12311f]'
        } disabled:opacity-70 disabled:cursor-not-allowed`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
        {locating ? 'Locating...' : nearMeActive ? '📍 Near Me ✓' : '📍 Near Me'}
      </button>
      {locationError && (
        <p className="text-red-500 text-xs mt-1 bg-red-50 px-2 py-1 rounded shadow-sm" role="alert">
          {locationError}
        </p>
      )}
    </div>
  );
}

NearMeButton.propTypes = {
  mapRef: PropTypes.shape({
    current: PropTypes.any
  })
};
