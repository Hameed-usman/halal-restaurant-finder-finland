import { create } from 'zustand'
import { calculateDistance } from '../utils/distanceCalculator'

export const useRestaurantStore = create((set, get) => {
  // Helper to compute filtered restaurants
  const computeFiltered = (restaurants, searchQuery, selectedCuisine, nearMeActive, userLocation) => {
    let result = [...restaurants]

    if (searchQuery !== '') {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (r) =>
          (r.name && r.name.toLowerCase().includes(q)) ||
          (r.city && r.city.toLowerCase().includes(q))
      )
    }

    if (selectedCuisine !== '') {
      result = result.filter((r) => r.cuisine === selectedCuisine)
    }

    if (nearMeActive && userLocation) {
      result = result.map(r => ({
        ...r,
        distance: calculateDistance(userLocation.lat, userLocation.lng, r.lat, r.lng)
      }))
      result.sort((a, b) => a.distance - b.distance)
    }

    return result
  }

  return {
    restaurants: [],
    filteredRestaurants: [],
    availableCuisines: [],
    selectedRestaurant: null,
    searchQuery: '',
    selectedCuisine: '',
    userLocation: null,
    nearMeActive: false,
    nearestRestaurantIds: [],
    loading: false,
    error: null,

    setRestaurants: (data) => {
      const cuisines = new Set(data.map((r) => r.cuisine).filter(Boolean))
      const availableCuisines = Array.from(cuisines).sort()
      set((state) => ({ 
        restaurants: data, 
        availableCuisines,
        filteredRestaurants: computeFiltered(data, state.searchQuery, state.selectedCuisine, state.nearMeActive, state.userLocation)
      }))
    },
    
    setSelectedRestaurant: (restaurant) => set({ selectedRestaurant: restaurant }),
    
    setSearchQuery: (query) => set((state) => ({ 
      searchQuery: query,
      filteredRestaurants: computeFiltered(state.restaurants, query, state.selectedCuisine, state.nearMeActive, state.userLocation)
    })),
    
    setSelectedCuisine: (cuisine) => set((state) => ({ 
      selectedCuisine: cuisine,
      filteredRestaurants: computeFiltered(state.restaurants, state.searchQuery, cuisine, state.nearMeActive, state.userLocation)
    })),
    
    setUserLocation: (coords) => {
      const { restaurants, searchQuery, selectedCuisine, nearMeActive } = get()
      let nearestIds = []
      
      if (coords && restaurants.length > 0) {
        const distances = restaurants.map(r => ({
          id: `${r.name}-${r.city}`,
          distance: calculateDistance(coords.lat, coords.lng, r.lat, r.lng)
        }))
        distances.sort((a, b) => a.distance - b.distance)
        nearestIds = distances.slice(0, 5).map(d => d.id)
      }
      
      set({ 
        userLocation: coords, 
        nearestRestaurantIds: nearestIds,
        filteredRestaurants: computeFiltered(restaurants, searchQuery, selectedCuisine, nearMeActive, coords)
      })
    },
    
    setNearMeActive: (bool) => set((state) => ({ 
      nearMeActive: bool,
      filteredRestaurants: computeFiltered(state.restaurants, state.searchQuery, state.selectedCuisine, bool, state.userLocation)
    })),
    
    setLoading: (bool) => set({ loading: bool }),
    setError: (msg) => set({ error: msg }),
  }
})
