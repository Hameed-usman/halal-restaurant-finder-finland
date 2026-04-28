import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { MAP_DEFAULTS } from '../../constants'
import { useRestaurantStore } from '../../store/useRestaurantStore'
import { RestaurantMarker } from './RestaurantMarker'

function MapController({ onMapReady }) {
  const map = useMap()
  const selectedRestaurant = useRestaurantStore(state => state.selectedRestaurant)
  const filteredRestaurants = useRestaurantStore(state => state.filteredRestaurants)
  
  useEffect(() => {
    if (onMapReady) {
      onMapReady(map)
    }
  }, [map, onMapReady])

  // Effect to focus on search results
  useEffect(() => {
    if (filteredRestaurants.length > 0) {
      // If only one restaurant is found, fly to it
      if (filteredRestaurants.length === 1) {
        const r = filteredRestaurants[0]
        map.flyTo([r.lat, r.lng], 16, { duration: 1 })
      } else {
        // If multiple are found, fit bounds to show all
        const bounds = filteredRestaurants.map(r => [r.lat, r.lng])
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 })
      }
    }
  }, [filteredRestaurants, map])

  // Effect to focus on selected restaurant (card click)
  useEffect(() => {
    if (selectedRestaurant && selectedRestaurant.lat && selectedRestaurant.lng) {
      map.flyTo([selectedRestaurant.lat, selectedRestaurant.lng], 16, {
        duration: 1.5,
        easeLinearity: 0.25
      })
    }
  }, [selectedRestaurant, map])
  
  return null
}

export function MapView({ onMapReady }) {
  const state = useRestaurantStore()
  const filteredRestaurants = state.filteredRestaurants

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={MAP_DEFAULTS.center}
        zoom={MAP_DEFAULTS.zoom}
        minZoom={MAP_DEFAULTS.minZoom}
        maxZoom={MAP_DEFAULTS.maxZoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController onMapReady={onMapReady} />
        {filteredRestaurants.map((restaurant, idx) => (
          <RestaurantMarker key={`${restaurant.name}-${restaurant.city}-${idx}`} restaurant={restaurant} />
        ))}
      </MapContainer>
    </div>
  )
}

MapController.propTypes = {
  onMapReady: PropTypes.func
}

MapView.propTypes = {
  onMapReady: PropTypes.func
}
