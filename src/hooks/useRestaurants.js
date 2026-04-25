import { useEffect } from 'react'
import { parseSheetData } from '../utils/sheetParser'
import { useRestaurantStore } from '../store/useRestaurantStore'

/**
 * Custom hook to fetch and parse restaurant data from Google Sheets.
 * Reads the URL from import.meta.env.VITE_SHEET_URL.
 * Includes AbortController for cleanup.
 */
export const useRestaurants = () => {
  const setRestaurants = useRestaurantStore((state) => state.setRestaurants)
  const setLoading = useRestaurantStore((state) => state.setLoading)
  const setError = useRestaurantStore((state) => state.setError)

  useEffect(() => {
    const controller = new AbortController()
    const url = import.meta.env.VITE_SHEET_URL

    if (!url) {
      setError('VITE_SHEET_URL is not defined in environment variables')
      setLoading(false)
      return
    }

    const fetchRestaurants = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(url, { signal: controller.signal })
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`)
        }

        const csvText = await response.text()
        const data = parseSheetData(csvText)
        
        console.log('✅ CSV Restaurants loaded from URL:', data)
        setRestaurants(data)
      } catch (err) {
        if (err.name === 'AbortError') {
          return
        }
        console.error('❌ Error loading restaurants:', err)
        setError(err.message || 'An unexpected error occurred')
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchRestaurants()

    return () => {
      controller.abort()
    }
  }, [setRestaurants, setLoading, setError])
}
