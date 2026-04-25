import { useMemo } from 'react'
import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { useRestaurantStore } from '../../store/useRestaurantStore'
import { NEAR_ME, CUISINE_COLORS } from '../../constants'

export function RestaurantMarker({ restaurant }) {
  const state = useRestaurantStore()
  const setSelectedRestaurant = state.setSelectedRestaurant
  const nearMeActive = state.nearMeActive
  const filteredRestaurants = state.filteredRestaurants()

  const pinColor = useMemo(() => {
    if (nearMeActive) {
      // Assuming filteredRestaurants is already sorted by distance
      const top5 = filteredRestaurants.slice(0, 5)
      if (top5.some((r) => r.name === restaurant.name && r.city === restaurant.city)) {
        return NEAR_ME.highlightColor
      }
    }
    return CUISINE_COLORS[restaurant.cuisine] ?? CUISINE_COLORS.Default
  }, [nearMeActive, filteredRestaurants, restaurant])

  const icon = useMemo(() => {
    return L.divIcon({
      className: '',
      html: `<div style="
        width: 14px;
        height: 14px;
        background: ${pinColor};
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 1px 4px rgba(0,0,0,0.4);
      "></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    })
  }, [pinColor])

  return (
    <Marker
      position={[restaurant.lat, restaurant.lng]}
      icon={icon}
      eventHandlers={{
        click: () => setSelectedRestaurant(restaurant),
      }}
    >
      <Popup>
        <strong>{restaurant.name}</strong>
        <br />
        {restaurant.city}
      </Popup>
    </Marker>
  )
}
