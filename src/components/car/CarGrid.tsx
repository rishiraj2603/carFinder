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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <div
          key={car.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative"
        >
          <button
            onClick={() => onWishlistToggle(car.id)}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
            aria-label={wishlist.includes(car.id) ? "Remove from wishlist" : "Add to wishlist"}
          >
            {wishlist.includes(car.id) ? (
              <HeartIconSolid className="h-6 w-6 text-red-500" />
            ) : (
              <HeartIcon className="h-6 w-6 text-gray-600" />
            )}
          </button>
          <img
            src={car.image}
            alt={`${car.year} ${car.make} ${car.model}`}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {car.year} {car.make} {car.model}
            </h3>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-2">
              ${car.price.toLocaleString()}
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  {car.year}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {car.mileage.toLocaleString()} miles
                </span>
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>{car.fuelType}</span>
                <span>•</span>
                <span>{car.transmission}</span>
                <span>•</span>
                <span>{car.horsepower} HP</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {car.features.slice(0, 3).map((feature: string, i: number) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-300"
                  >
                    {feature}
                  </span>
                ))}
                {car.features.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-300">
                    +{car.features.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 