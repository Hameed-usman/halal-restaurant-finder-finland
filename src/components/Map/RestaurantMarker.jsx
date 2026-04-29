import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { useRestaurantStore } from '../../store/useRestaurantStore'
import { useFilteredRestaurants } from '../../hooks/useFilteredRestaurants'
import { NEAR_ME, CUISINE_COLORS } from '../../constants'

export function RestaurantMarker({ restaurant }) {
  const state = useRestaurantStore()
  const { nearestRestaurantIds } = useFilteredRestaurants()
  const setSelectedRestaurant = state.setSelectedRestaurant
  const nearMeActive = state.nearMeActive

  const pinColor = useMemo(() => {
    if (nearMeActive) {
      if (nearestRestaurantIds.includes(`${restaurant.name}-${restaurant.city}`)) {
        return NEAR_ME.highlightColor
      }
    }
    return CUISINE_COLORS[restaurant.cuisine] ?? CUISINE_COLORS.Default
  }, [nearMeActive, nearestRestaurantIds, restaurant])

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
        mouseover: (e) => {
          e.target.openPopup()
        },
        mouseout: (e) => {
          e.target.closePopup()
        }
      }}
    >
      <Popup closeButton={false}>
        <div style={{ pointerEvents: 'none' }}>
          <strong>{restaurant.name}</strong>
          <br />
          {restaurant.city}
        </div>
      </Popup>
    </Marker>
  )
}

RestaurantMarker.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string,
    city: PropTypes.string,
    lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    lng: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    cuisine: PropTypes.string
  }).isRequired
}
