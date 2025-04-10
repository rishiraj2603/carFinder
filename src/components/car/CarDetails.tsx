import React from 'react';

interface CarDetailsProps {
  brand: string;
  model: string;
  year: number;
  price: number;
  fuelType: string;
  seatingCapacity: number;
}

const CarDetails: React.FC<CarDetailsProps> = ({
  brand,
  model,
  year,
  price,
  fuelType,
  seatingCapacity
}) => {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800">
        {brand} {model}
      </h3>
      <p className="text-gray-600 text-sm">{year}</p>
      
      <div className="mt-2 space-y-1">
        <p className="text-gray-700">
          <span className="font-medium">Price:</span> ${price.toLocaleString()}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Fuel Type:</span> {fuelType}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Seating:</span> {seatingCapacity} persons
        </p>
      </div>
    </div>
  );
};

export default CarDetails; 