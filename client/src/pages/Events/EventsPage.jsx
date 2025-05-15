import React, { useEffect, useState } from "react";
import { useEventStore } from "../../store/eventStore";
import axios from "axios";
import EventCards from "./components/EventCards";
import EventFilters from "./components/EventFilters";

const EventsPage = () => {
  const { events, meta, isLoading, error, getEvents } = useEventStore();
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 6,
    category: "",
    venue: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "date",
    sortOrder: "asc",
  });

  // Local state for input values
  const [inputValues, setInputValues] = useState({
    venue: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/categories"
        );
        setCategories(response.data.categories);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    getEvents(filters);
  }, [filters]);

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const { name, value } = e.target;
      setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
    }
  };

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (categoryId) => {
    console.log("Selected category:", categoryId); // Debug log
    setFilters((prev) => ({ ...prev, category: categoryId, page: 1 }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange("")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              !filters.category
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => handleCategoryChange(category._id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filters.category === category._id
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-8 relative">
        <div className="flex-1">
          <EventCards
            events={events}
            meta={meta}
            isLoading={isLoading}
            error={error}
            handlePageChange={handlePageChange}
          />
        </div>

        <div className="w-64 flex-shrink-0">
          <div className="sticky top-4">
            <EventFilters
              inputValues={inputValues}
              filters={filters}
              handleInputChange={handleInputChange}
              handleKeyPress={handleKeyPress}
              handleSortChange={handleSortChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
