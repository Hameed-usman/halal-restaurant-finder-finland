import { Badge } from '../UI/Badge'
import PropTypes from 'prop-types'

// Pool of high-quality food and restaurant images from Unsplash
const FOOD_IMAGES = [
  "photo-1555939594-58d7cb561ad1", // BBQ
  "photo-1513104890138-7c749659a591", // Pizza 2
  "photo-1567620905732-2d1ec7bb7445", // Breakfast
  "photo-1540189549336-e6e99c3679fe", // Salad
  "photo-1565958011703-44f9829ba187", // Dessert
  "photo-1512621776951-a57141f2eef", // Salad 2
  "photo-1529193591184-b1d58b35ec16", // Kebab
  "photo-1590593162211-f98f7f462153", // Rice/Middle Eastern
  "photo-1504674900247-0877df9cc836", // Table spread
  "photo-1504754524776-8f4f37790ca0", // Varied
  "photo-1514327605112-b887c0e61c0a", // Hummus/Platter
  "photo-1585937421612-70a008356fbe", // Curry/Indian
  "photo-1562059390-a761a084768e", // Tacos
  "photo-1594000191219-c12902bc673e", // Asian Noodles
];

// Function to get a unique but consistent image for each restaurant
const getRestaurantImage = (restaurant) => {
  if (restaurant.image && restaurant.image.startsWith('http')) {
    return restaurant.image;
  }

  // Simple hash function to consistently map a name to an image index
  const str = restaurant.name + restaurant.city;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  const index = Math.abs(hash) % FOOD_IMAGES.length;
  const imageId = FOOD_IMAGES[index];

  return `https://images.unsplash.com/${imageId}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80`;
};

export function RestaurantCard({ restaurant, variant = "compact" }) {
  const imageUrl = getRestaurantImage(restaurant)

  // Read clean data from the normalized restaurant object
  const halalStatus = restaurant.halalStatus;
  const cuisine = restaurant.cuisine;
  const price = restaurant.price;
  const rating = restaurant.rating;
  const reviews = restaurant.reviews;

  // Build full address from CSV fields
  const fullAddress = restaurant.address
    ? (restaurant.city ? `${restaurant.address}, ${restaurant.city}` : restaurant.address)
    : (restaurant.city || "Address not available")

  const hours = restaurant.hours || "Contact restaurant for hours"
  const phone = restaurant.phone || "Not available"
  const website = restaurant.website || ""

  if (variant === "compact") {
    return (
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col cursor-pointer mb-4">
        {/* Image Section */}
        <div className="relative h-40 w-full">
          <img
            src={imageUrl}
            alt={restaurant.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80";
            }}
          />
          <div className="absolute top-3 right-3">
            <Badge status={halalStatus} />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-900 leading-tight">{restaurant.name}</h3>
            <div className="flex items-center gap-1 bg-green-100 px-2 py-0.5 rounded text-green-800 font-semibold text-xs whitespace-nowrap">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {rating}
            </div>
          </div>

          <p className="text-gray-500 text-sm flex items-center gap-1 flex-wrap">
            <span>{cuisine}</span>
            <span>•</span>
            <span>{fullAddress.split(',')[0]}</span>
            {restaurant.distance && (
              <>
                <span className="text-green-600 font-bold ml-1">
                  • {restaurant.distance < 1 ? `${(restaurant.distance * 1000).toFixed(0)}m` : `${restaurant.distance.toFixed(1)}km`} away
                </span>
              </>
            )}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-[10px] font-bold uppercase tracking-wide">
              {cuisine}
            </span>
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-[10px] font-bold uppercase tracking-wide">
              {price}
            </span>
          </div>
        </div>
      </div>
    )
  }

  if (variant === "detail") {
    return (
      <div className="flex flex-col h-full bg-white overflow-y-auto">
        {/* Header Image Area */}
        <div className="relative h-64 w-full shrink-0">
          <img
            src={imageUrl}
            alt={restaurant.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80";
            }}
          />

          {/* Overlay gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
            <Badge status={halalStatus} />
            <div className="flex items-center gap-1 text-white text-sm font-medium">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{rating} <span className="text-gray-300 font-normal">({reviews} reviews)</span></span>
            </div>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Title and Meta Row */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
                {restaurant.name}
              </h1>
              <div className="flex items-center gap-4 text-gray-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" /></svg>
                  {cuisine}
                </span>
                <span className="text-gray-300">•</span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {price}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="p-3 bg-[#0b4d2a] text-white rounded-xl hover:bg-[#083b20] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
              </button>
              <button className="p-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" /></svg>
              </button>
            </div>
          </div>

          {/* Info Cards - NOW USING REAL CSV DATA */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#f0f7f2] p-5 rounded-2xl border border-green-50/50">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Location</h4>
              <p className="text-gray-900 font-medium leading-relaxed">
                {fullAddress}
              </p>
              {phone !== "Not available" && (
                <p className="text-gray-600 text-sm mt-2">
                  📞 {phone}
                </p>
              )}
            </div>

            <div className="bg-[#f0f7f2] p-5 rounded-2xl border border-green-50/50">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Opening Hours</h4>
              <div className="text-sm font-medium">
                <p className="text-gray-900 whitespace-pre-line">
                  {hours}
                </p>
              </div>
            </div>
          </div>

          {/* Action Button - using real website URL from CSV */}
          {website && website !== "" && (
            <div className="mt-auto pt-6">
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-4 bg-[#0b4d2a] text-white font-bold rounded-xl hover:bg-[#083b20] transition-colors gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                Visit Website
              </a>
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}

RestaurantCard.propTypes = {
  restaurant: PropTypes.object.isRequired,
  variant: PropTypes.string
}