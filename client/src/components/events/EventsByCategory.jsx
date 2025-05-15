import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EventsByCategory = () => {
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await axios.get('http://localhost:5000/api/v1/categories');
        setCategories(categoriesResponse.data.categories);

        // Fetch events
        const eventsResponse = await axios.get('http://localhost:5000/api/v1/events');
        setEvents(eventsResponse.data.events);
      } catch (err) {
        setError('Failed to load events and categories');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Group events by category
  const eventsByCategory = categories.reduce((acc, category) => {
    const categoryEvents = events.filter(event => event.category._id === category._id);
    if (categoryEvents.length > 0) {
      acc[category.name] = categoryEvents;
    }
    return acc;
  }, {});

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <div className="space-y-8">
      {Object.entries(eventsByCategory).map(([categoryName, categoryEvents]) => (
        <div key={categoryName} className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{categoryName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryEvents.map(event => (
              <div key={event._id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {event.images[0] && (
                  <img
                    src={event.images[0]}
                    alt={event.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {event.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    {event.venue}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-600 font-semibold">
                      ${event.price}
                    </span>
                    <Link
                      to={`/events/${event._id}`}
                      className="text-orange-600 hover:text-orange-700 font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {Object.keys(eventsByCategory).length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No events found in any category
        </div>
      )}
    </div>
  );
};

export default EventsByCategory; 