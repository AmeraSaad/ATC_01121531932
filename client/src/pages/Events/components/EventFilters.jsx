import React from 'react';

const EventFilters = ({
  inputValues,
  filters,
  handleInputChange,
  handleKeyPress,
  handleSortChange,
}) => {
  return (
    <div className="w-64 space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>

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
  );
};

export default EventFilters; 