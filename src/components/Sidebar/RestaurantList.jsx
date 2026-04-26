import { useRestaurantStore } from '../../store/useRestaurantStore'
import { RestaurantCard } from './RestaurantCard'
import { CuisineFilter } from '../Filters/CuisineFilter'
import { LoadingSpinner } from '../UI/LoadingSpinner'

export function RestaurantList() {
  const state = useRestaurantStore()
  const filteredRestaurants = state.filteredRestaurants
  const selectedRestaurant = state.selectedRestaurant
  const setSelectedRestaurant = state.setSelectedRestaurant
  const loading = state.loading
  return (
    <div className="flex flex-col h-full bg-[#f4f7f5] overflow-hidden p-6 gap-6">
      <div className="shrink-0">
        <h2 className="text-3xl font-extrabold text-[#0b4d2a] tracking-tight mb-4">
          Top Halal Restaurants
        </h2>
        
        {/* Cuisine Filter Pills */}
        <div className="-mx-6">
          <CuisineFilter />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        {loading ? (
          <LoadingSpinner />
        ) : filteredRestaurants.length === 0 ? (
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
