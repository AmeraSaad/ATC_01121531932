import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {event.images[0] && (
        <img
          src={event.images[0]}
          alt={event.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">{event.name}</h3>
          <span className="px-2 py-1 text-xs font-medium text-gray-700 rounded-full border border-gray-300">
            {event.category?.name || "Uncategorized"}
          </span>
        </div>
        <p className="text-gray-600 text-sm mt-1">
          {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="text-gray-600 text-sm mt-1">{event.venue}</p>
        <div className="flex justify-between items-center mt-3">
          <p className="text-orange-600 font-semibold">${event.price}</p>
          <Link
            to={`/events/${event._id}`}
            className="text-sm text-orange-600 hover:text-orange-700 hover:underline underline-offset-4 transition-all"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard; 