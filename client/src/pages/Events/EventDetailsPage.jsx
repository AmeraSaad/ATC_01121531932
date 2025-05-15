import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useBookingStore } from '../../store/bookingStore';
import { useAuthStore } from '../../store/authStore';
import { useEventStore } from '../../store/eventStore';
import { toast } from "react-hot-toast";

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { event, getEventById, isLoading, error } = useEventStore();
  const { isAuthenticated } = useAuthStore();
  const { bookEvent, cancelBooking, isEventBooked, getUserBookings } = useBookingStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const isBooked = event ? isEventBooked(event._id) : false;

  useEffect(() => {
    getEventById(id);
  }, [id]);

  useEffect(() => {
    if (isAuthenticated) {
      getUserBookings();
    }
  }, [isAuthenticated]);

  const handleBook = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await bookEvent(id);
      toast.success('Event booked successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error booking event');
    }
  };

  const handleCancel = async () => {
    try {
      const booking = useBookingStore.getState().bookings.find(
        (b) => b.event._id === id
      );
      if (booking) {
        await cancelBooking(booking._id);
        toast.success('Booking cancelled successfully!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error cancelling booking');
    }
  };

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

                <button
                  onClick={isBooked ? handleCancel : handleBook}
                  className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isBooked
                      ? "bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-700 group"
                      : "bg-orange-600 text-white hover:bg-orange-700"
                  }`}
                >
                  {isBooked ? (
                    <>
                      <span className="group-hover:hidden">Booked</span>
                      <span className="hidden group-hover:inline">Cancel</span>
                    </>
                  ) : (
                    "Book Now"
                  )}
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