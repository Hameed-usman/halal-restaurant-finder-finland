import { useRestaurants } from './hooks/useRestaurants'

function App() {
  const { restaurants, loading, error } = useRestaurants()

  // ─── Loading State ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Loading restaurants...</p>
      </div>
    )
  }

  // ─── Error State ──────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="text-center max-w-md px-4">
          <p className="text-red-600 text-lg font-semibold mb-2">
            Something went wrong
          </p>
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  // DAY 1 VERIFICATION — remove this console.log on Day 2
  console.log('✅ Restaurants loaded:', restaurants.length)
  console.log('📋 Sample restaurant object:', restaurants[0])
  console.log('📋 All restaurants:', restaurants)

  // ─── Success State ────────────────────────────────────────────────────────
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-2">
          Halal Restaurant Finder Finland
        </h1>
        <p className="text-gray-600 text-lg">
          ✅ {restaurants.length} restaurants loaded successfully
        </p>
        <p className="text-gray-400 text-sm mt-1">
          Open DevTools → Console to inspect the data
        </p>
      </div>
    </div>
  )
}

export default App