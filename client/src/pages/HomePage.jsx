import React from "react";
import EventsPage from "./Events/EventsPage";

const HomePage = () => {
  return (
    <div>
      <div className=" text-gray-600 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4">Discover Amazing Events</h1>
          <p >
            Find and book tickets for the best events in your area
          </p>
        </div>
      </div>

      <EventsPage />
    </div>
  );
};

export default HomePage;
