import { useRestaurantStore } from '../../store/useRestaurantStore';

export function LoadingSpinner() {
  const loading = useRestaurantStore((state) => state.loading);

  if (!loading) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center h-full space-y-4 p-8"
    >
      <div className="w-12 h-12 border-4 border-[#e8f5e9] border-t-[#0b4d2a] rounded-full animate-spin"></div>
      <p className="text-gray-600 font-medium">Loading restaurants...</p>
    </div>
  );
}
