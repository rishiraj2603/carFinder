import React from 'react';
import CarImage from './CarImage';
import CarDetails from './CarDetails';

interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuelType: string;
  seatingCapacity: number;
  image: string;
}

interface CarCardProps {
  car: Car;
  isInWishlist: boolean;
  onWishlistToggle: (carId: number) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, isInWishlist, onWishlistToggle }) => {
  const handleWishlistToggle = () => {
    onWishlistToggle(car.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CarImage 
        imageUrl={car.image}
        brand={car.brand}
        model={car.model}
        isInWishlist={isInWishlist}
        onWishlistToggle={handleWishlistToggle}
      />
      
      <CarDetails 
        brand={car.brand}
        model={car.model}
        year={car.year}
        price={car.price}
        fuelType={car.fuelType}
        seatingCapacity={car.seatingCapacity}
      />
    </div>
  );
};

export default CarCard; 