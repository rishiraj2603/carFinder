import React from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface CarImageProps {
  imageUrl: string;
  brand: string;
  model: string;
  isInWishlist: boolean;
  onWishlistToggle: () => void;
}

const CarImage: React.FC<CarImageProps> = ({ 
  imageUrl, 
  brand, 
  model, 
  isInWishlist, 
  onWishlistToggle 
}) => {
  return (
    <div className="relative">
      <img 
        src={imageUrl} 
        alt={`${brand} ${model}`} 
        className="object-cover w-full h-48"
      />
      <button
        onClick={onWishlistToggle}
        className="absolute p-2 transition-colors duration-200 rounded-full top-2 right-2 bg-white/80 hover:bg-white"
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <div>
          {isInWishlist ? (
            <HeartIconSolid className="w-6 h-6 text-red-500" />
          ) : (
            <HeartIcon className="w-6 h-6 text-gray-600" />
          )}
        </div>
      </button>
    </div>
  );
};

export default CarImage; 