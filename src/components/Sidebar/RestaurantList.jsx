import { useRestaurantStore } from '../../store/useRestaurantStore'
import { RestaurantCard } from './RestaurantCard'

export function RestaurantList() {
  const state = useRestaurantStore()
  const filteredRestaurants = state.filteredRestaurants()
  const selectedRestaurant = state.selectedRestaurant
  const setSelectedRestaurant = state.setSelectedRestaurant
  const availableCuisines = state.availableCuisines()
  const selectedCuisine = state.selectedCuisine
  const setSelectedCuisine = state.setSelectedCuisine

  return (
    <div className="flex flex-col h-full bg-[#f4f7f5] overflow-hidden p-6 gap-6">
      <div className="shrink-0">
        <h2 className="text-3xl font-extrabold text-[#0b4d2a] tracking-tight mb-4">
          Top Halal Restaurants
        </h2>
        
        {/* Cuisine Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {availableCuisines.map(cuisine => (
            <button
              key={cuisine}
              onClick={() => setSelectedCuisine(selectedCuisine === cuisine ? '' : cuisine)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                selectedCuisine === cuisine
                  ? 'bg-[#0b4d2a] text-white'
                  : 'bg-gray-200/60 text-gray-700 hover:bg-gray-300/60'
              }`}
            >
              {cuisine}
            </button>
          ))}
          <button className="px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap bg-gray-200/60 text-gray-700 hover:bg-gray-300/60 transition-colors">
            Open Now
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        {filteredRestaurants.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 font-medium">
            No restaurants found
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredRestaurants.map((restaurant) => {
              const isSelected = selectedRestaurant && 
                selectedRestaurant.name === restaurant.name && 
                selectedRestaurant.city === restaurant.city;

              return (
                <div 
                  key={`${restaurant.name}-${restaurant.city}`}
                  onClick={() => setSelectedRestaurant(restaurant)}
                  className={`transition-all duration-200 ${isSelected ? 'ring-2 ring-[#0b4d2a] ring-offset-2 rounded-2xl shadow-lg scale-[1.02]' : ''}`}
                >
                  <RestaurantCard restaurant={restaurant} variant="compact" />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
