import { useRestaurantStore } from '../../store/useRestaurantStore';

export function CuisineFilter() {
  const availableCuisines = useRestaurantStore((state) => state.availableCuisines);
  const selectedCuisine = useRestaurantStore((state) => state.selectedCuisine);
  const setSelectedCuisine = useRestaurantStore((state) => state.setSelectedCuisine);

  return (
    <div
      className="flex flex-wrap gap-2 py-3 px-6"
      role="group"
      aria-label="Filter by cuisine"
    >
      <button
        onClick={() => setSelectedCuisine('')}
        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
          selectedCuisine === ''
            ? 'bg-[#1a432b] text-white'
            : 'bg-white text-gray-700 border border-gray-200 hover:border-[#1a432b]'
        }`}
      >
        All
      </button>
      {availableCuisines.map((cuisine) => (
        <button
          key={cuisine}
          onClick={() => setSelectedCuisine(cuisine)}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
            selectedCuisine === cuisine
              ? 'bg-[#1a432b] text-white'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-[#1a432b]'
          }`}
        >
          {cuisine}
        </button>
      ))}
    </div>
  );
}
