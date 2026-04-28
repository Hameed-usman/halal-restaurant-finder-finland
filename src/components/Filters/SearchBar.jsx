import { useState, useEffect } from 'react';
import { useRestaurantStore } from '../../store/useRestaurantStore';

let debounceTimer;

export function SearchBar() {
  const [localValue, setLocalValue] = useState('');
  const setSearchQuery = useRestaurantStore((state) => state.setSearchQuery);

  const handleChange = (e) => {
    const value = e.target.value;
    setLocalValue(value);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(() => {
      setSearchQuery(value.trim());
    }, 150);
  };

  const handleClear = () => {
    setLocalValue('');
    setSearchQuery('');
    if (debounceTimer) clearTimeout(debounceTimer);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[150px] md:max-w-[250px]">
      <input
        type="text"
        placeholder="Search restaurants or cities..."
        className="pl-4 pr-10 py-2 bg-white/60 border border-green-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
        value={localValue}
        onChange={handleChange}
        aria-label="Search restaurants"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
        {localValue ? (
          <button
            onClick={handleClear}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-green-600 focus:outline-none"
            aria-label="Clear search"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ) : (
          <svg
            className="w-4 h-4 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
