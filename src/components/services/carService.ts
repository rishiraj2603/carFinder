export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  description: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  horsepower: number;
  features: string[];
  color: string;
  engine: string;
  owners: number;
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

const BASE_URL = 'https://freetestapi.com/api/v1/cars';
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

export const getCars = async (): Promise<Car[]> => {
  try {
    const url = encodeURIComponent(`${BASE_URL}`);
    const response = await fetch(`${CORS_PROXY}${url}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch cars');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
}; 