import { useMemo } from 'react';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { calculateDistance } from '../utils/distanceCalculator';

export function useFilteredRestaurants() {
  const restaurants = useRestaurantStore((state) => state.restaurants);
  const searchQuery = useRestaurantStore((state) => state.searchQuery);
  const selectedCuisine = useRestaurantStore((state) => state.selectedCuisine);
  const userLocation = useRestaurantStore((state) => state.userLocation);
  const nearMeActive = useRestaurantStore((state) => state.nearMeActive);

  const { filteredRestaurants, nearestRestaurantIds } = useMemo(() => {
    let result = [...restaurants];
    let nearestIds = [];

    if (searchQuery !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (r) =>
          (r.name && r.name.toLowerCase().includes(q)) ||
          (r.city && r.city.toLowerCase().includes(q)) ||
          (r.address && r.address.toLowerCase().includes(q)) ||
          (r.cuisine && r.cuisine.toLowerCase().includes(q))
      );
    }

    if (selectedCuisine && selectedCuisine !== '') {
      result = result.filter((r) => 
        r.cuisine && r.cuisine.toLowerCase() === selectedCuisine.toLowerCase()
      );
    }

    if (userLocation && restaurants.length > 0) {
      // Always calculate nearest IDs if we have location, for map highlights
      const distances = restaurants.map((r) => ({
        id: `${r.name}-${r.city}`,
        distance: calculateDistance(userLocation.lat, userLocation.lng, r.lat, r.lng)
      }));
      distances.sort((a, b) => a.distance - b.distance);
      nearestIds = distances.slice(0, 5).map(d => d.id);

      // If near me is active, sort and map distances to the filtered result
      if (nearMeActive) {
        result = result.map(r => ({
          ...r,
          distance: calculateDistance(userLocation.lat, userLocation.lng, r.lat, r.lng)
        }));
        result.sort((a, b) => a.distance - b.distance);
      }
    }

    return { filteredRestaurants: result, nearestRestaurantIds: nearestIds };
  }, [restaurants, searchQuery, selectedCuisine, userLocation, nearMeActive]);

  return { filteredRestaurants, nearestRestaurantIds };
}
