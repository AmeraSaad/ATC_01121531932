import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import CloseIcon from "../../../components/icons/CloseIcon";

const API_URL = import.meta.env.VITE_API_URL;

const CreateCategory = ({ isOpen, onClose, onCategoryCreated }) => {
  const [newCategory, setNewCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) {
      toast.error("Category name is required");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/v1/categories`, {
        name: newCategory.trim()
      });
      
      onCategoryCreated(response.data.category);
      setNewCategory("");
      onClose();
      toast.success("Category created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create category");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Create New Category
          </h3>
          <button
            onClick={() => {
              onClose();
              setNewCategory("");
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleCreateCategory} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
              className="mt-1 block w-full px-3 py-2 rounded-lg border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition-colors text-sm"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                setNewCategory("");
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 transition-colors text-sm"
            >
              {isLoading ? "Creating..." : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory; 