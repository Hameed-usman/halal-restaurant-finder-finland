import { useRef } from 'react'
import { useRestaurants } from './hooks/useRestaurants'
import { useRestaurantStore } from './store/useRestaurantStore'
import { MapView } from './components/Map/MapView'
import { Sidebar } from './components/Sidebar/Sidebar'
import { useGeolocation } from './hooks/useGeolocation'

function App() {
  useRestaurants()
  const state = useRestaurantStore()
  const mapRef = useRef(null)
  const { getUserLocation, locating, locationError } = useGeolocation()

  const isDetailView = !!state.selectedRestaurant

  if (state.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f4f7f5]">
        <p className="text-gray-600 text-lg">Loading restaurants...</p>
      </div>
    )
  }

  if (state.error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="text-center max-w-md px-4">
          <p className="text-red-600 text-lg font-semibold mb-2">Something went wrong</p>
          <p className="text-red-500 text-sm">{state.error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans">
      {/* Top Header */}
      <header className="px-6 py-3 bg-[#e8f5e9] flex justify-between items-center z-[1000] relative border-b border-green-100 shrink-0">
        <div className="text-xl font-extrabold text-[#0b4d2a] tracking-tight">
          Verdant Halal
        </div>
        
        <nav className="hidden md:flex gap-8 font-semibold text-gray-500 text-sm">
          <span className="text-[#0b4d2a] border-b-2 border-[#0b4d2a] pb-1 cursor-pointer">Discover</span>
          <span className="hover:text-[#0b4d2a] cursor-pointer transition-colors pb-1 border-b-2 border-transparent">Favorites</span>
          <span className="hover:text-[#0b4d2a] cursor-pointer transition-colors pb-1 border-b-2 border-transparent">Recent</span>
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <input type="text" placeholder="Search Helsinki..." className="pl-4 pr-10 py-2 bg-white/60 border border-green-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-400 w-64" />
            <svg className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <button 
            onClick={getUserLocation}
            className="px-4 py-2 bg-[#1a432b] text-white rounded-full hover:bg-[#12311f] transition-colors flex items-center gap-2 text-sm font-semibold shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            {locating ? 'Locating...' : 'Near Me'}
          </button>
          <div className="w-8 h-8 rounded-full border-2 border-[#1a432b] flex items-center justify-center text-[#1a432b]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className={`flex-1 flex overflow-hidden ${isDetailView ? 'flex-row-reverse' : 'flex-row'}`}>
        <Sidebar />
        <div className="flex-1 relative z-0 h-full">
          <MapView onMapReady={(map) => { mapRef.current = map }} />
        </div>
      </main>
    </div>
  )
}

export default App