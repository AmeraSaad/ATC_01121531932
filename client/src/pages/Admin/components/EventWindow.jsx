import React, { useState, useEffect } from "react";
import { useEventStore } from "../../../store/eventStore";
import { toast } from "react-hot-toast";
import axios from "axios";
import CloseIcon from "../../../components/icons/CloseIcon";
import UploadIcon from "../../../components/icons/UploadIcon";
import CategoryModal from "./CreateCategory";

const API_URL = import.meta.env.VITE_API_URL;

const CreateEvent = ({ isOpen, onClose, eventToEdit = null }) => {
  const { createEvent, updateEvent } = useEventStore();
  const [categories, setCategories] = useState([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    price: "",
    category: "",
    images: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Set initial form data when editing
  useEffect(() => {
    if (eventToEdit) {
      const eventDate = new Date(eventToEdit.date);
      const formattedDate = eventDate.toISOString().split('T')[0];
      const formattedTime = eventDate.toTimeString().slice(0, 5);
      
      setFormData({
        name: eventToEdit.name,
        description: eventToEdit.description,
        date: formattedDate,
        time: formattedTime,
        venue: eventToEdit.venue,
        price: eventToEdit.price,
        category: eventToEdit.category._id,
        images: eventToEdit.images || [],
      });
      
      // Set image previews for existing images
      setImagePreviews(eventToEdit.images || []);
    }
  }, [eventToEdit]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/categories`);
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    }
  };

  const handleCategoryCreated = (newCategory) => {
    setCategories(prev => [...prev, newCategory]);
    setFormData(prev => ({
      ...prev,
      category: newCategory._id
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Create preview URLs for selected images
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...previews]);
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate time is not in the past if date is today
    const today = new Date();
    const eventDate = new Date(formData.date);
    if (
      formData.date &&
      formData.time &&
      eventDate.toDateString() === today.toDateString()
    ) {
      const [hours, minutes] = formData.time.split(":");
      const eventTime = new Date(eventDate);
      eventTime.setHours(Number(hours), Number(minutes), 0, 0);
      if (eventTime < today) {
        toast.error("Event time cannot be in the past.");
        setIsLoading(false);
        return;
      }
    }

    try {
      // Combine date and time into a single ISO string for the 'date' field
      let combinedDate = formData.date;
      if (formData.date && formData.time) {
        combinedDate = new Date(`${formData.date}T${formData.time}`).toISOString();
      }
      const submitData = {
        ...formData,
        date: combinedDate,
      };
      delete submitData.time; // Remove the time field

      if (eventToEdit) {
        await updateEvent(eventToEdit._id, submitData);
        toast.success("Event updated successfully!");
      } else {
        await createEvent(submitData);
        toast.success("Event created successfully!");
      }

      // Reset form only if creating new event
      if (!eventToEdit) {
        setFormData({
          name: "",
          description: "",
          date: "",
          time: "",
          venue: "",
          price: "",
          category: "",
          images: [],
        });
        setImagePreviews([]);
      }
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || `Error ${eventToEdit ? 'updating' : 'creating'} event`);
    } finally {
      setIsLoading(false);
    }
  };

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {eventToEdit ? "Edit Event" : "Create New Event"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <CloseIcon className="h-5 w-5 cursor-pointer" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter event name"
                className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <div className="flex gap-2">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition-colors text-sm"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(true)}
                  className="mt-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  New
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Venue
              </label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                required
                placeholder="Enter venue location"
                className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="Enter price"
                className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition-colors text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Enter event description"
              rows="3"
              className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition-colors text-sm"
            />
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-orange-500 transition-colors">
            <div className="text-center">
              <UploadIcon className="mx-auto h-10 w-10 text-gray-400" />
              <div className="mt-3 flex text-sm text-gray-600 justify-center items-center">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                >
                  <span>Upload multiple images</span>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF up to 10MB each
              </p>
              {formData.images.length > 0 && (
                <p className="text-xs text-gray-600 mt-1">
                  {formData.images.length} image(s) selected
                </p>
              )}
            </div>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="mt-4">
                <h4 className="text-xs font-medium text-gray-700 mb-2">
                  Selected Images:
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="h-20 w-20 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <CloseIcon className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 transition-colors text-sm cursor-pointer"
            >
              {isLoading
                ? eventToEdit
                  ? "Updating..."
                  : "Creating..."
                : eventToEdit
                ? "Update Event"
                : "Create Event"}
            </button>
          </div>
        </form>

        <CategoryModal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          onCategoryCreated={handleCategoryCreated}
        />
      </div>
    </div>
  );
};

export default CreateEvent;

