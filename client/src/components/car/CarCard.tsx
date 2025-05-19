import React from 'react';
import { Car } from '../services/carService';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className="car-card">
      <img src={car.img_url} alt={car.model} className="car-card__image" />
      <div className="car-card__details">
        <h2 className="car-card__name">{car.model}</h2>
        <p className="car-card__make">Make: {car.make}</p>
        <p className="car-card__price">Price: ${car.price.toLocaleString()}</p>
        <p className="car-card__horsepower">Horsepower: {car.horsepower} HP</p>
      </div>
    </div>
  );
};

export default CarCard;