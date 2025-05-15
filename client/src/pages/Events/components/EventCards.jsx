import React from 'react';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import EventCard from './EventCard';

const EventCards = ({ events, meta, isLoading, error, handlePageChange }) => {
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= meta.pages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-md ${
            meta.curpage === i
              ? 'bg-orange-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="flex-1">
      {isLoading ? (
        <div className="flex justify-center items-center h-[400px]">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center h-[400px] flex items-center justify-center">
          {error}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-2 mt-8">
            <button
              onClick={() => handlePageChange(meta.curpage - 1)}
              disabled={meta.curpage === 1}
              className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
              &lt;
            </button>
            {renderPagination()}
            <button
              onClick={() => handlePageChange(meta.curpage + 1)}
              disabled={meta.curpage === meta.pages}
              className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EventCards; 