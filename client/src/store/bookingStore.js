import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/bookings";

export const useBookingStore = create((set) => ({
  bookings: [],
  isLoading: false,
  error: null,

  bookEvent: async (eventId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(API_URL, { eventId });
      set((state) => ({
        bookings: [...state.bookings, response.data.booking],
        isLoading: false,
      }));
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error booking event",
        isLoading: false,
      });
      throw error;
    }
  },

  getUserBookings: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/me`);
      set({
        bookings: response.data.bookings,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error fetching bookings",
        isLoading: false,
      });
      throw error;
    }
  },

  cancelBooking: async (bookingId) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}/${bookingId}`);
      set((state) => ({
        bookings: state.bookings.filter((booking) => booking._id !== bookingId),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error canceling booking",
        isLoading: false,
      });
      throw error;
    }
  },

  // Check if an event is booked
  isEventBooked: (eventId) => {
    const state = useBookingStore.getState();
    return state.bookings.some((booking) => booking.event && booking.event._id === eventId);
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
})); 