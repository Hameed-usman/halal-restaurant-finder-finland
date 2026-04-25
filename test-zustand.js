const { createStore } = require('zustand/vanilla');

const store = createStore((set, get) => ({
  restaurants: [],
  setRestaurants: (data) => set({ restaurants: data }),
  get filteredRestaurants() {
    return get().restaurants.length;
  }
}));

console.log('Initial filtered:', store.getState().filteredRestaurants);
store.getState().setRestaurants([1, 2, 3]);
console.log('After update filtered:', store.getState().filteredRestaurants);
