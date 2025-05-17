import React from "react";

const DashboardTab = ({ events }) => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-orange-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-orange-800">
            Total Events
          </h3>
          <p className="mt-2 text-3xl font-bold text-orange-600">
            {events.length}
          </p>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-blue-800">
            Upcoming Events
          </h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {
              events.filter((event) => new Date(event.date) > new Date())
                .length
            }
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-green-800">
            Past Events
          </h3>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {
              events.filter((event) => new Date(event.date) < new Date())
                .length
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab; 