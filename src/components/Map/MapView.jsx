import { useEffect } from 'react'
import PropTypes from 'prop-types'
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
        {filteredRestaurants.map((restaurant) => (
          <RestaurantMarker key={`${restaurant.name}-${restaurant.city}`} restaurant={restaurant} />
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
