import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useBookingStore } from "../store/bookingStore";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProfilePage = () => {
  const { user } = useAuthStore();
  const { getUserBookings, bookings, isLoading, cancelBooking } = useBookingStore();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (activeTab === "bookings") {
      getUserBookings();
    }
  }, [activeTab]);

  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      toast.success('Booking cancelled successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error cancelling booking');
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("profile")}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === "profile"
                  ? "border-b-2 border-orange-600 text-orange-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === "bookings"
                  ? "border-b-2 border-orange-600 text-orange-600"
                  : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              My Bookings
            </button>
          </nav>
        </div>

        {/* Profile Information */}
        {activeTab === "profile" && (
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Personal Information
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {user.username}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <p className="mt-1 text-sm text-gray-900 capitalize">
                      {user.isAdmin ? 'Admin' : 'User'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Account Status
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {user.isVerified ? (
                        <span className="text-green-600">Verified</span>
                      ) : (
                        <span className="text-red-600">Not Verified</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booked Events */}
        {activeTab === "bookings" && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">
              My Booked Events
            </h3>
            {bookings && bookings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">You haven't booked any events yet.</p>
                <Link 
                  to="/" 
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  Browse Events
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings && bookings.map((booking) => (
                  <div 
                    key={booking._id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Event Image */}
                      {booking.event?.images?.[0] && (
                        <div className="w-full md:w-32 h-32 flex-shrink-0">
                          <img
                            src={booking.event.images[0]}
                            alt={booking.event?.name || 'Event image'}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      )}
                      
                      {/* Event Details */}
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">
                              {booking.event?.name || 'Event not available'}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {booking.event?.date ? new Date(booking.event.date).toLocaleDateString() : 'Date not available'}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-orange-600 font-semibold">
                              ${booking.event?.price || '0'}
                            </span>
                            {booking.event?._id && (
                              <Link
                                to={`/events/${booking.event._id}`}
                                className="text-sm text-orange-600 hover:text-orange-700 hover:underline"
                              >
                                View Details
                              </Link>
                            )}
                          </div>
                        </div>
                        <div className="mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <p className="text-sm text-gray-600">
                              Venue: {booking.event?.venue || 'Venue not available'}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Booked on: {new Date(booking.bookedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            onClick={() => handleCancel(booking._id)}
                            className="mt-2 md:mt-0 px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            Cancel Booking
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
