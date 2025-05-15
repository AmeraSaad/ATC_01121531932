import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBookingStore } from '../../../store/bookingStore';
import { useAuthStore } from '../../../store/authStore';
import { toast } from "react-hot-toast";

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { bookEvent, cancelBooking, isEventBooked, getUserBookings } = useBookingStore();
  const isBooked = isEventBooked(event._id);

  useEffect(() => {
    if (isAuthenticated) {
      getUserBookings();
    }
  }, [isAuthenticated]);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await bookEvent(event._id);
      toast.success('Event booked successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error booking event');
    }
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    try {
      const booking = useBookingStore.getState().bookings.find(
        (b) => b.event._id === event._id
      );
      if (booking) {
        await cancelBooking(booking._id);
        toast.success('Booking cancelled successfully!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error cancelling booking');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-[400px]">
      {event.images[0] && (
        <img
          src={event.images[0]}
          alt={event.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">{event.name}</h3>
          <span className="px-2 py-1 text-xs font-medium text-gray-700 rounded-full border border-gray-300 text-center truncate max-w-[120px]">
            {event.category?.name || "Uncategorized"}
          </span>
        </div>
        <p className="text-gray-600 text-sm mt-1">
          {new Date(event.date).toLocaleDateString()}
        </p>
        <div className="flex justify-between items-center mt-1">
          <p className="text-gray-600 text-sm">{event.venue}</p>
        </div>
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <p className="text-orange-600 font-semibold">${event.price}</p>
            <div className="flex items-center gap-3">
              <Link
                to={`/events/${event._id}`}
                className="text-sm text-orange-600 hover:text-orange-700 hover:underline underline-offset-4 transition-all"
              >
                View Details
              </Link>
              <button
                onClick={isBooked ? handleCancel : handleBook}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isBooked
                    ? "bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-700 group"
                    : "bg-orange-600 text-white hover:bg-orange-700"
                }`}
              >
                {isBooked ? (
                  <>
                    <span className="group-hover:hidden">
                      Booked
                    </span>
                    <span className="hidden group-hover:inline ">
                      Cancel
                    </span>
                  </>
                ) : (
                  "Book"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard; 