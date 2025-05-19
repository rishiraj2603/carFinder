import React from 'react';
import { Car } from '../services/carService';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface CarGridProps {
  cars: Car[];
  wishlist: number[];
  onWishlistToggle: (carId: number) => void;
}

export const CarGrid: React.FC<CarGridProps> = ({ cars, wishlist, onWishlistToggle }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cars.map((car) => (
        <div
          key={car.id}
          className="relative overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
        >
          <button
            onClick={() => onWishlistToggle(car.id)}
            className="absolute p-2 transition-colors duration-200 rounded-full top-2 right-2 bg-white/80 hover:bg-white"
            aria-label={wishlist.includes(car.id) ? "Remove from wishlist" : "Add to wishlist"}
          >
            {wishlist.includes(car.id) ? (
              <HeartIconSolid className="w-6 h-6 text-red-500" />
            ) : (
              <HeartIcon className="w-6 h-6 text-gray-600" />
            )}
          </button>
          <img
            src={car.img_url}
            alt={car.model}
            className="object-cover w-full h-48"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {car.model}
            </h3>
            <p className="text-sm text-gray-600">Make: {car.make}</p> {/* Display make */}
            <p className="mt-2 text-xl font-bold text-blue-600 dark:text-blue-400">
              ${car.price.toLocaleString()}
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Year: {car.year}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  horsepower:{car.horsepower}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};