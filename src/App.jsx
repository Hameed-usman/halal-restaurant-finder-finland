import { useRef } from 'react'
import { useRestaurants } from './hooks/useRestaurants'
import { useRestaurantStore } from './store/useRestaurantStore'
import { MapView } from './components/Map/MapView'
import { Sidebar } from './components/Sidebar/Sidebar'
import { SearchBar } from './components/Filters/SearchBar'
import { NearMeButton } from './components/Filters/NearMeButton'

function App() {
  useRestaurants()
  const state = useRestaurantStore()
  const mapRef = useRef(null)

  const isDetailView = !!state.selectedRestaurant


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
      <header className="px-4 md:px-6 py-3 bg-[#e8f5e9] flex justify-between items-center z-[1000] relative border-b border-green-100 shrink-0">
        <div className="text-lg md:text-xl font-extrabold text-[#0b4d2a] tracking-tight truncate mr-2">
          Verdant Halal
        </div>
        
        <nav className="hidden lg:flex gap-8 font-semibold text-gray-500 text-sm">
          <span className="text-[#0b4d2a] border-b-2 border-[#0b4d2a] pb-1 cursor-pointer">Discover</span>
          <span className="hover:text-[#0b4d2a] cursor-pointer transition-colors pb-1 border-b-2 border-transparent">Favorites</span>
          <span className="hover:text-[#0b4d2a] cursor-pointer transition-colors pb-1 border-b-2 border-transparent">Recent</span>
        </nav>

        <div className="flex items-center gap-2 md:gap-4 ml-auto">
          <SearchBar />
          <div className="hidden md:block">
            <NearMeButton mapRef={mapRef} />
          </div>
          <div className="w-8 h-8 rounded-full border-2 border-[#1a432b] flex items-center justify-center text-[#1a432b] shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className={`flex-1 flex overflow-hidden app-layout ${isDetailView ? 'flex-row-reverse' : 'flex-row'}`}>
        <Sidebar />
        <div className="flex-1 relative z-0 h-full map-container">
          <MapView onMapReady={(map) => { mapRef.current = map }} />
        </div>
      </main>
    </div>
  )
}

export default App