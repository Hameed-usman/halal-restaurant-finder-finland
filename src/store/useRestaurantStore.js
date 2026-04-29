import { create } from 'zustand'

export const useRestaurantStore = create((set) => ({
  restaurants: [],
  availableCuisines: [],
  selectedRestaurant: null,
  searchQuery: '',
  selectedCuisine: '',
  userLocation: null,
  nearMeActive: false,
  loading: false,
  error: null,

  setRestaurants: (data) => {
    const cuisines = new Set(data.map((r) => r.cuisine).filter(Boolean))
    const availableCuisines = Array.from(cuisines).sort()
    set({ restaurants: data, availableCuisines })
  },
  
  setSelectedRestaurant: (restaurant) => set({ selectedRestaurant: restaurant }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCuisine: (cuisine) => set({ selectedCuisine: cuisine }),
  setUserLocation: (coords) => set({ userLocation: coords }),
  setNearMeActive: (bool) => set({ nearMeActive: bool }),
  setLoading: (bool) => set({ loading: bool }),
  setError: (msg) => set({ error: msg }),
}))
