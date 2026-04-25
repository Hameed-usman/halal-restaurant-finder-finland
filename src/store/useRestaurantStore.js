import { create } from 'zustand'
import { calculateDistance } from '../utils/distanceCalculator'

export const useRestaurantStore = create((set, get) => ({
  restaurants: [],
  selectedRestaurant: null,
  searchQuery: '',
  selectedCuisine: '',
  userLocation: null,
  nearMeActive: false,
  loading: false,
  error: null,

  setRestaurants: (data) => set({ restaurants: data }),
  setSelectedRestaurant: (restaurant) => set({ selectedRestaurant: restaurant }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCuisine: (cuisine) => set({ selectedCuisine: cuisine }),
  setUserLocation: (coords) => set({ userLocation: coords }),
  setNearMeActive: (bool) => set({ nearMeActive: bool }),
  setLoading: (bool) => set({ loading: bool }),
  setError: (msg) => set({ error: msg }),

  filteredRestaurants: () => {
    const { restaurants, searchQuery, selectedCuisine, nearMeActive, userLocation } = get()
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
      result.forEach((r) => {
        r.distance = calculateDistance(userLocation.lat, userLocation.lng, r.lat, r.lng)
      })
      result.sort((a, b) => a.distance - b.distance)
    }

    return result
  },

  availableCuisines: () => {
    const { restaurants } = get()
    const cuisines = new Set(restaurants.map((r) => r.cuisine).filter(Boolean))
    return Array.from(cuisines).sort()
  },
}))
