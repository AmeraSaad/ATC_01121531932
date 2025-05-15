import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useEventStore = create((set) => ({
  events: [],
  event: null,
  isLoading: false,
  error: null,
  meta: {
    total: 0,
    pages: 0,
    curpage: 1,
    limit: 6,
  },

  // Get all events with filters
  getEvents: async (filters = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/api/v1/events`, { params: filters });
      set({
        events: response.data.events,
        meta: response.data.meta,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error fetching events",
        isLoading: false,
      });
      throw error;
    }
  },

  // Get single event by ID
  getEventById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/api/v1/events/${id}`);
      set({
        event: response.data.event,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error fetching event",
        isLoading: false,
      });
      throw error;
    }
  },

  // Create new event (Admin only)
  createEvent: async (eventData) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      Object.keys(eventData).forEach(key => {
        if (key === 'images' && eventData[key]) {
          eventData[key].forEach(image => {
            formData.append('images', image);
          });
        } else {
          formData.append(key, eventData[key]);
        }
      });

      const response = await axios.post(`${API_URL}/api/v1/events`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      set({
        events: [response.data.event, ...useEventStore.getState().events],
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error creating event",
        isLoading: false,
      });
      throw error;
    }
  },

  // Update event (Admin only)
  updateEvent: async (id, eventData) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      Object.keys(eventData).forEach(key => {
        if (key === 'images' && eventData[key]) {
          eventData[key].forEach(image => {
            formData.append('images', image);
          });
        } else {
          formData.append(key, eventData[key]);
        }
      });

      const response = await axios.put(`${API_URL}/api/v1/events/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      set({
        events: useEventStore.getState().events.map(event => 
          event._id === id ? response.data.event : event
        ),
        event: response.data.event,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error updating event",
        isLoading: false,
      });
      throw error;
    }
  },

  // Delete event (Admin only)
  deleteEvent: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}/api/v1/events/${id}`);
      set({
        events: useEventStore.getState().events.filter(event => event._id !== id),
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error deleting event",
        isLoading: false,
      });
      throw error;
    }
  },

  // Clear current event
  clearEvent: () => {
    set({ event: null });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
})); 