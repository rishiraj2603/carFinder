import React from 'react';
import FilterInput from './FilterInput';
import FilterSelect from './FilterSelect';

interface SearchFiltersProps {
  filters: {
    brand: string;
    minPrice: string;
    maxPrice: string;
    fuelType: string;
    year: string;
  };
  onFilterChange: (name: string, value: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onFilterChange }) => {
  const fuelTypes = ['All', 'Gasoline', 'Diesel', 'Electric', 'Hybrid'];
  const years = ['All', ...Array.from({ length: 24 }, (_, i) => (2024 - i).toString())];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6 transform transition-all duration-300 ease-in-out hover:shadow-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Search Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Brand Search */}
        <div className="transform transition-all duration-300 hover:scale-105">
          <FilterInput
            id="brand"
            label="Brand"
            type="text"
            value={filters.brand}
            onChange={(value) => onFilterChange('brand', value)}
            placeholder="Search by brand"
          />
        </div>

        {/* Year */}
        <div className="transform transition-all duration-300 hover:scale-105">
          <FilterSelect
            id="year"
            label="Year"
            value={filters.year}
            onChange={(value) => onFilterChange('year', value)}
            options={years}
          />
        </div>

        {/* Price Range */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 transform transition-all duration-300 hover:scale-105">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price Range</label>
          <div className="flex gap-2">
            <FilterInput
              id="minPrice"
              label=""
              type="number"
              value={filters.minPrice}
              onChange={(value) => onFilterChange('minPrice', value)}
              placeholder="Min price"
            />
            <FilterInput
              id="maxPrice"
              label=""
              type="number"
              value={filters.maxPrice}
              onChange={(value) => onFilterChange('maxPrice', value)}
              placeholder="Max price"
            />
          </div>
        </div>

        {/* Fuel Type */}
        <div className="transform transition-all duration-300 hover:scale-105">
          <FilterSelect
            id="fuelType"
            label="Fuel Type"
            value={filters.fuelType}
            onChange={(value) => onFilterChange('fuelType', value)}
            options={fuelTypes}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilters; 