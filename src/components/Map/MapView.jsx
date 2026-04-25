import { useEffect } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { MAP_DEFAULTS } from '../../constants'
import { useRestaurantStore } from '../../store/useRestaurantStore'
import { RestaurantMarker } from './RestaurantMarker'

function MapController({ onMapReady }) {
  const map = useMap()
  
  useEffect(() => {
    if (onMapReady) {
      onMapReady(map)
    }
  }, [map, onMapReady])
  
  return null
}

export function MapView({ onMapReady }) {
  const state = useRestaurantStore()
  const filteredRestaurants = state.filteredRestaurants()

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={MAP_DEFAULTS.center}
        zoom={MAP_DEFAULTS.zoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController onMapReady={onMapReady} />
        {filteredRestaurants.map((restaurant, index) => (
          <RestaurantMarker key={`${restaurant.name}-${index}`} restaurant={restaurant} />
        ))}
      </MapContainer>
    </div>
  )
}
