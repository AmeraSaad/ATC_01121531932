import React, { useEffect, useState } from 'react';
import { useEventStore } from '../store/eventStore';
import LoadingSpinner from '../components/common/LoadingSpinner';

const EventsPage = () => {
  const { events, meta, isLoading, error, getEvents } = useEventStore();
  const [filters, setFilters] = useState({
    page: 1,
    limit: 6,
    category: '',
    venue: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'date',
    sortOrder: 'asc'
  });

  // Local state for input values
  const [inputValues, setInputValues] = useState({
    venue: '',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    getEvents(filters);
  }, [filters]);

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues(prev => ({ ...prev, [name]: value }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const { name, value } = e.target;
      setFilters(prev => ({ ...prev, [name]: value, page: 1 }));
    }
  };

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= meta.pages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-md ${
            meta.curpage === i
              ? 'bg-orange-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {event.images[0] && (
                  <img
                    src={event.images[0]}
                    alt={event.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {event.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">{event.venue}</p>
                  <p className="text-orange-600 font-semibold mt-2">
                    ${event.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-2 mt-8">
            <button
              onClick={() => handlePageChange(meta.curpage - 1)}
              disabled={meta.curpage === 1}
              className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
              &lt;
            </button>
            {renderPagination()}
            <button
              onClick={() => handlePageChange(meta.curpage + 1)}
              disabled={meta.curpage === meta.pages}
              className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </div>

        {/* Filters Sidebar */}
        <div className="w-64 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            
            {/* Venue Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Venue
              </label>
              <input
                type="text"
                name="venue"
                value={inputValues.venue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Search venue..."
              />
            </div>

            {/* Price Range */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="minPrice"
                  value={inputValues.minPrice}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Min"
                />
                <input
                  type="number"
                  name="maxPrice"
                  value={inputValues.maxPrice}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Sorting */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleSortChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value="date">Date</option>
                <option value="price">Price</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order
              </label>
              <select
                name="sortOrder"
                value={filters.sortOrder}
                onChange={handleSortChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
