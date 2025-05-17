import React from "react";

const EventsTab = ({
  currentEvents,
  handleEditEvent,
  handleDeleteEvent,
  currentPage,
  totalPages,
  handlePageChange,
  setIsCreateModalOpen,
}) => {
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-md ${
            currentPage === i
              ? "bg-orange-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Manage Events
        </h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 cursor-pointer"
        >
          Create New Event
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Venue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentEvents.map((event) => (
              <tr key={event._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {event.images[0] && (
                      <img
                        src={event.images[0]}
                        alt={event.name}
                        className="h-10 w-10 rounded-full object-cover mr-3"
                      />
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {event.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {event.category?.name || "Uncategorized"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {event.venue}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${event.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEditEvent(event)}
                      className="text-orange-600 hover:text-orange-900 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="text-red-600 hover:text-red-900 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
        >
          &lt;
        </button>
        {renderPagination()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default EventsTab; 