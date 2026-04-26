import { useRestaurantStore } from '../../store/useRestaurantStore'
import { RestaurantList } from './RestaurantList'
import { RestaurantCard } from './RestaurantCard'

export function Sidebar() {
  const state = useRestaurantStore()
  const selectedRestaurant = state.selectedRestaurant
  const setSelectedRestaurant = state.setSelectedRestaurant

  // Left Navigation Panel
  const NavPanel = () => (
    <div className="w-64 bg-[#e8f5e9] h-full flex flex-col shrink-0 border-r border-green-100">
      <div className="p-6">
        <h1 className="text-xl font-bold text-[#0b4d2a]">Nordic Concierge</h1>
        <p className="text-xs text-green-700 mt-1">Halal Finder Finland</p>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#d0e8d5] text-[#0b4d2a] rounded-xl font-semibold transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
          Restaurants
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-green-800 hover:bg-[#d0e8d5] rounded-xl font-semibold transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          Mosques
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-green-800 hover:bg-[#d0e8d5] rounded-xl font-semibold transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          Favorites
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-green-800 hover:bg-[#d0e8d5] rounded-xl font-semibold transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          Settings
        </a>
      </nav>

      <div className="p-4">
        <button className="flex items-center justify-center gap-2 w-full py-3 bg-[#1a432b] text-white rounded-xl font-bold hover:bg-[#12311f] transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Restaurant
        </button>
      </div>
    </div>
  )

  if (selectedRestaurant) {
    return (
      <div className="w-full md:w-1/2 h-full bg-white relative flex flex-col shrink-0 border-l border-gray-200 z-10 shadow-2xl sidebar">
        <button 
          onClick={() => setSelectedRestaurant(null)}
          className="absolute top-4 left-4 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-900 shadow hover:bg-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <RestaurantCard restaurant={selectedRestaurant} variant="detail" />
      </div>
    )
  }

  return (
    <div className="w-full md:w-1/2 h-full flex shrink-0 border-r border-gray-200 sidebar">
      <NavPanel />
      <div className="flex-1 bg-[#f4f7f5]">
        <RestaurantList />
      </div>
    </div>
  )
}
