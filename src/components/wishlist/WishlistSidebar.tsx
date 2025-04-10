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
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Wishlist ({wishlistCars.length})</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
          >
            <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
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
              <div key={car.id} className="flex items-center space-x-4 p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                <img
                  src={car.image}
                  alt={`${car.make} ${car.model}`}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">{car.make} {car.model}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{car.year}</p>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold">${car.price.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => dispatch(removeFromWishlist(car.id))}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors duration-200"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 