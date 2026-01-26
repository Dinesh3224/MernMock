import React, { useState } from "react";
import {
  FiSettings,
  FiBell,
  FiChevronRight,
  FiCheck,
  FiX,
  FiPlay,
} from "react-icons/fi";

const RightQuickPanel = () => {
  const [selectedDay, setSelectedDay] = useState(24);

  // Schedule calendar days
  const calendarDays = [
    { day: "Mon", date: 22 },
    { day: "Tue", date: 23 },
    { day: "Wed", date: 24 },
    { day: "Thu", date: 25 },
    { day: "Fri", date: 26 },
  ];

  // New applicants data
  const newApplicants = [
    {
      id: 1,
      initials: "JD",
      name: "John Doe",
      position: "UI/UX Designer",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      id: 2,
      initials: "SE",
      name: "Sam Emmanuel",
      position: "PHP Developer",
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
    },
    {
      id: 3,
      initials: "AB",
      name: "Anna Brown",
      position: "Content Designer",
      bgColor: "bg-pink-100",
      textColor: "text-pink-600",
    },
  ];

  // Ready for training data
  const readyForTraining = [
    {
      id: 1,
      initials: "MC",
      name: "Michael Chen",
      role: "Developer",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      id: 2,
      initials: "LP",
      name: "Lisa Park",
      role: "Designer",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
    },
  ];

  return (
    <div className="w-80 h-screen bg-white rounded-l-2xl shadow-lg border-l border-gray-100 flex flex-col overflow-hidden">
      {/* TOP USER SECTION */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-4">
          {/* Action Icons */}
          <div className="flex gap-3">
            <button className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition duration-200">
              <FiSettings size={18} />
            </button>
            <button className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition duration-200">
              <FiBell size={18} />
            </button>
          </div>

          {/* User Avatar */}
          <div className="w-12 h-12 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
            SA
          </div>
        </div>

        {/* User Info */}
        <div className="text-right">
          <h4 className="font-semibold text-gray-900 text-sm">Sara Anderson</h4>
          <button className="text-orange-500 hover:text-orange-600 text-xs font-medium mt-1 transition duration-200">
            View profile →
          </button>
        </div>
      </div>

      {/* SCHEDULE CALENDAR SECTION */}
      <div className="p-6 border-b border-gray-100">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 text-sm">
            Schedule Calendar
          </h3>
          <span className="text-gray-500 text-xs font-medium">May</span>
        </div>

        {/* Day Cards */}
        <div className="flex gap-2">
          {calendarDays.map((dayItem) => (
            <button
              key={dayItem.date}
              onClick={() => setSelectedDay(dayItem.date)}
              className={`flex-1 flex flex-col items-center justify-center py-3 rounded-lg font-medium text-xs transition duration-200 ${
                selectedDay === dayItem.date
                  ? "bg-orange-500 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="text-xs font-medium">{dayItem.day}</span>
              <span className="text-sm font-bold">{dayItem.date}</span>
            </button>
          ))}
        </div>
      </div>

      {/* NEW APPLICANTS SECTION */}
      <div className="p-6 border-b border-gray-100 flex-1 overflow-y-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 text-sm">
            New Applicants
          </h3>
          <button className="text-orange-500 hover:text-orange-600 text-xs font-medium transition duration-200">
            View All
          </button>
        </div>

        {/* Applicants List */}
        <div className="space-y-3">
          {newApplicants.map((applicant) => (
            <div
              key={applicant.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200"
            >
              {/* Applicant Info */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className={`w-10 h-10 ${applicant.bgColor} rounded-full flex items-center justify-center font-semibold text-sm ${applicant.textColor}`}
                >
                  {applicant.initials}
                </div>

                {/* Name & Position */}
                <div>
                  <p className="font-medium text-gray-900 text-xs">
                    {applicant.name}
                  </p>
                  <p className="text-gray-500 text-xs">{applicant.position}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="w-7 h-7 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200 transition duration-200">
                  <FiCheck size={14} />
                </button>
                <button className="w-7 h-7 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition duration-200">
                  <FiX size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* READY FOR TRAINING SECTION */}
      <div className="p-6 border-t border-gray-100 flex-1 overflow-y-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 text-sm">
            Ready For Training
          </h3>
          <button className="text-orange-500 hover:text-orange-600 text-xs font-medium transition duration-200">
            View All
          </button>
        </div>

        {/* Training Cards */}
        <div className="space-y-3">
          {readyForTraining.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-gray-50 rounded-lg p-3 hover:shadow-md transition duration-200 flex flex-col gap-2"
            >
              {/* Card Header with Avatar */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className={`w-10 h-10 ${candidate.bgColor} rounded-full flex items-center justify-center font-semibold text-sm ${candidate.textColor} flex-shrink-0`}
                >
                  {candidate.initials}
                </div>

                {/* Name & Role */}
                <div>
                  <p className="font-medium text-gray-900 text-xs">
                    {candidate.name}
                  </p>
                  <p className="text-gray-500 text-xs">{candidate.role}</p>
                </div>
              </div>

              {/* Start Training Button */}
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-2 transition duration-200">
                <FiPlay size={14} />
                Start Training
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightQuickPanel;
