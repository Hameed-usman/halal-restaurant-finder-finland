import { useState } from 'react'
import { useRestaurantStore } from '../store/useRestaurantStore'

export function useGeolocation() {
  const [locating, setLocating] = useState(false)
  const [locationError, setLocationError] = useState(null)
  
  const setUserLocation = useRestaurantStore((state) => state.setUserLocation)
  const setNearMeActive = useRestaurantStore((state) => state.setNearMeActive)

  const getUserLocation = () => {
    setLocating(true)
    setLocationError(null)

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser')
      setLocating(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setUserLocation(coords)
        setNearMeActive(true)
        setLocating(false)
      },
      (error) => {
        switch (error.code) {
          case 1:
            setLocationError('Location access was denied')
            break
          case 2:
            setLocationError('Location not available')
            break
          case 3:
            setLocationError('Location request timed out')
            break
          default:
            setLocationError('An unknown error occurred')
            break
        }
        setLocating(false)
      },
      { timeout: 10000 }
    )
  }

  return { getUserLocation, locating, locationError }
}
