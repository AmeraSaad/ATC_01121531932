import React, { useState, useEffect } from "react";
import { useEventStore } from "../../store/eventStore";
import { Toaster } from "react-hot-toast";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import CreateEvent from "./components/EventWindow";
import DashboardTab from "./components/DashboardTab";
import EventsTab from "./components/EventsTab";
import CategoriesTab from "./components/CategoriesTab";

const AdminPanel = () => {
  const { events, isLoading, error, deleteEvent, getEvents } = useEventStore();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const eventsPerPage = 6;

  useEffect(() => {
    getEvents({ limit: 1000 });
  }, []);

  const handleDeleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(id);
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const handleEditEvent = (event) => {
    setEventToEdit(event);
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setEventToEdit(null);
  };

  // Calculate pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <p className="mt-2 text-gray-600">Manage The Events</p>
      </div>

      <div className="border-b border-gray-200 mb-8 ">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`${
              activeTab === "dashboard"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`${
              activeTab === "events"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`${
              activeTab === "categories"
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer`}
          >
            Categories
          </button>
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow">
        {activeTab === "dashboard" && <DashboardTab events={events} />}
        {activeTab === "events" && (
          <EventsTab
            currentEvents={currentEvents}
            handleEditEvent={handleEditEvent}
            handleDeleteEvent={handleDeleteEvent}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            setIsCreateModalOpen={setIsCreateModalOpen}
          />
        )}
        {activeTab === "categories" && <CategoriesTab />}
      </div>

      <CreateEvent
        isOpen={isCreateModalOpen}
        onClose={handleCloseModal}
        eventToEdit={eventToEdit}
      />
    </div>
  );
};

export default AdminPanel;
