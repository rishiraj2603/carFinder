import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { removeFromWishlist } from '../../store/wishlistSlice';
import { Car } from '../../components/services/carService';

interface WishlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cars: Car[];
}

export const WishlistSidebar: React.FC<WishlistSidebarProps> = ({ isOpen, onClose, cars }) => {
  const wishlist = useAppSelector(state => state.wishlist.items);
  const dispatch = useAppDispatch();

  const wishlistCars = cars.filter(car => wishlist.includes(car.id));

  return (
    <div
      className={`fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } z-50`}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Wishlist ({wishlistCars.length})</h2>
          <button
            onClick={onClose}
            className="p-2 transition-colors duration-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <XMarkIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-4rem)]">
        {wishlistCars.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No cars in your wishlist
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {wishlistCars.map(car => (
              <div key={car.id} className="flex items-center p-2 space-x-4 border border-gray-200 rounded-lg dark:border-gray-700">
                <img
                  src={car.img_url}
                  alt={`${car.model}`}
                  className="object-cover w-20 h-20 rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">{car.model}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{car.year}</p>
                  <p className="font-semibold text-blue-600 dark:text-blue-400">${car.price.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => dispatch(removeFromWishlist(car.id))}
                  className="p-2 text-red-500 transition-colors duration-200 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};