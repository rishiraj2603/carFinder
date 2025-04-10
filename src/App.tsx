import React, { useState, useEffect } from 'react';
import { getCars } from './components/services/carService';
import Header from './components/ui/Header';
import SearchFilters from './components/filters/SearchFilters';
import { CarGrid } from './components/car/CarGrid';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorMessage from './components/ui/ErrorMessage';
import EmptyState from './components/ui/EmptyState';
import { Pagination } from './components/ui/Pagination';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { addToWishlist, removeFromWishlist } from './store/wishlistSlice';
import { WishlistSidebar } from './components/wishlist/WishlistSidebar';
import { HeartIcon } from '@heroicons/react/24/outline';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { Car } from './components/services/carService';

type SortOrder = 'none' | 'price-asc' | 'price-desc' | 'year-desc' | 'year-asc';

function AppContent() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    fuelType: 'All',
    year: 'All',
    search: ''
  });
  
  const wishlist = useAppSelector(state => state.wishlist.items);
  const dispatch = useAppDispatch();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 10;

  // Fetch cars only once when component mounts
  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCars();
        setCars(data);
      } catch (err) {
        setError('Failed to fetch cars. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Apply filters and sorting whenever filters or sortOrder changes
  useEffect(() => {
    let result = [...cars];

    // Apply filters
    if (filters.brand) {
      result = result.filter(car => 
        car.make.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }

    if (filters.minPrice) {
      result = result.filter(car => 
        car.price >= Number(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      result = result.filter(car => 
        car.price <= Number(filters.maxPrice)
      );
    }

    if (filters.fuelType !== 'All') {
      result = result.filter(car => 
        car.fuelType === filters.fuelType
      );
    }

    if (filters.year !== 'All') {
      result = result.filter(car => 
        car.year === Number(filters.year)
      );
    }

    // Apply sorting
    if (sortOrder !== 'none') {
      result.sort((a, b) => {
        if (sortOrder === 'price-asc') {
          return a.price - b.price;
        } else if (sortOrder === 'price-desc') {
          return b.price - a.price;
        } else if (sortOrder === 'year-desc') {
          return b.year - a.year;
        } else if (sortOrder === 'year-asc') {
          return a.year - b.year;
        }
        return 0;
      });
    }

    setFilteredCars(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [cars, filters, sortOrder]);

  // Calculate pagination values
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWishlistToggle = (carId: number) => {
    if (wishlist.includes(carId)) {
      dispatch(removeFromWishlist(carId));
    } else {
      dispatch(addToWishlist(carId));
    }
  };

  const handleSortChange = (order: SortOrder) => {
    setSortOrder(order);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <Header title="Car Finder" />

      <main className="max-w-7xl mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <SearchFilters filters={filters} onFilterChange={handleFilterChange} />
            <select
              value={sortOrder}
              onChange={(e) => handleSortChange(e.target.value as SortOrder)}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transform transition-all duration-300 hover:scale-105"
            >
              <option value="none">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="year-desc">Year: Newest First</option>
              <option value="year-asc">Year: Oldest First</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
            >
              <HeartIcon className="h-5 w-5 text-red-500" />
              <span className="dark:text-white">Wishlist ({wishlist.length})</span>
            </button>
          </div>
        </div>

        {loading && <LoadingSpinner message="Loading cars..." />}

        {error && <ErrorMessage message={error} />}

        {!loading && !error && filteredCars.length > 0 && (
          <div className="transform transition-all duration-500 ease-in-out">
            <CarGrid 
              cars={currentCars} 
              wishlist={wishlist} 
              onWishlistToggle={handleWishlistToggle} 
            />
            <div className="mt-6">
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
              />
            </div>
          </div>
        )}

        {!loading && !error && filteredCars.length === 0 && <EmptyState />}

        <WishlistSidebar
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          cars={filteredCars}
        />
      </main>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}

export default App; 