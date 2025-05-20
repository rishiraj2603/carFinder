import axios from 'axios';

export interface Car {
  id: number;
  model: string;  // Changed from name to model
  horsepower: number;
  price: number;
  img_url: string;
  year: number;
  make: string;
}

export interface CarFilters {
  make?: string;
  model?: string;
  year?: number;
  minPrice?: number;
  maxPrice?: number;
  fuelType?: string;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  brand?: string;
  limit?: number;
}

const BASE_URL = './api';

export const getCars = async (): Promise<Car[]> => {
  try {
    console.log("🚀 ~ getCars ~ BASE_URL:", BASE_URL)
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};