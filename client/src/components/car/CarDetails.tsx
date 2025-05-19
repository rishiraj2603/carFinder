import React from 'react';

interface Car {
  name: string;
  make: string;
  year: number;
  price: number;
  horsepower: number;
  model: number;
}

interface CarDetailsProps {
  car: Car;
}

const CarDetails: React.FC<CarDetailsProps> = ({ car }) => {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800">
        {car.name}
      </h3>
      <p className="text-sm text-gray-600">Make: {car.make}</p> {/* Display make */}
      <p className="text-sm text-gray-600">Year: {car.year}</p>
      
      <div className="mt-2 space-y-1">
        <p className="text-gray-700">
          <span className="font-medium">Price:</span> ${car.price.toLocaleString()}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Horsepower:</span> {car.horsepower} HP
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Number of model:</span> {car.model}
        </p>
      </div>
    </div>
  );
};

export default CarDetails;