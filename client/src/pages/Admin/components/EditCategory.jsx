import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import CloseIcon from "../../../components/icons/CloseIcon";

const API_URL = import.meta.env.VITE_API_URL;

const EditCategory = ({ isOpen, onClose, category, onCategoryUpdated }) => {
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

 
  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
    }
  }, [category]);

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.put(`${API_URL}/api/v1/categories/${category._id}`, {
        name: categoryName.trim()
      });
      
      onCategoryUpdated(response.data.category);
      onClose();
      toast.success("Category updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update category");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Edit Category</h3>
          <button
            onClick={() => {
              onClose();
              setCategoryName(category.name);
            }}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleUpdateCategory} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
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
                setCategoryName(category.name);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 transition-colors text-sm cursor-pointer"
            >
              {isLoading ? "Updating..." : "Update Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory; 