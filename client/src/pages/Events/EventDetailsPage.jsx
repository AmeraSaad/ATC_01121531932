import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/events/${id}`);
        setEvent(response.data.event);
        setIsLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching event details');
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!event) return <div className="text-center mt-8">Event not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-52">
          {event.images && event.images.length > 0 ? (
            <img
              src={event.images[selectedImage]}
              alt={event.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>

        {event.images && event.images.length > 1 && (
          <div className="p-3 bg-gray-50">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {event.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-orange-600"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${event.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{event.name}</h1>
              <p className="text-gray-600 text-sm mt-1">
                {new Date(event.date).toLocaleDateString()}
              </p>
            </div>
            <span className="px-2 py-1 text-xs font-medium text-gray-700 rounded-full border border-gray-300">
              {event.category?.name || "Uncategorized"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4 pb-5">
              <div>
                <div className="my-2">
                  <h2 className="text-lg font-semibold text-gray-900 my-1">
                    Venue
                  </h2>
                  <p className="text-gray-600 text-sm">{event.venue}</p>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h2>
                <div className="max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                  <p className="text-gray-600 text-sm break-words whitespace-pre-wrap p-1">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="mb-3">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Price
                  </h2>
                  <p className="text-xl font-bold text-orange-600">
                    ${event.price}
                  </p>
                </div>

                <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default EventDetailsPage; 