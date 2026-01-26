import React, { useState } from "react";
import { FiSearch, FiPlus, FiMoreVertical } from "react-icons/fi";
import {
  FiUsers,
  FiCode,
  FiLayout,
  FiSmartphone,
  FiCpu,
} from "react-icons/fi";

const Dashboard = () => {
  const [activeRowId, setActiveRowId] = useState(2);

  // Job positions data
  const jobPositions = [
    {
      id: 1,
      icon: "👤",
      title: "Content Designers",
      candidates: "0 Candidates",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      icon: "🎨",
      title: "PHP Developer",
      candidates: "0 Candidates",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      id: 3,
      icon: "✏️",
      title: "UI/UX Designer",
      candidates: "0 Candidates",
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600",
    },
    {
      id: 4,
      icon: "📱",
      title: "iOS Developer",
      candidates: "0 Candidates",
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },
    {
      id: 5,
      icon: "🔧",
      title: "Android Developer",
      candidates: "0 Candidates",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  // Recruitment progress data
  const recruitmentData = [
    {
      id: 1,
      fullName: "John Doe",
      designation: "UI/UX Designer",
      status: "Tech Interview",
      statusColor: "bg-blue-200 text-blue-800",
      dotColor: "bg-blue-500",
    },
    {
      id: 2,
      fullName: "Sam Emmanuel",
      designation: "UI/UX Designer",
      status: "Task",
      statusColor: "bg-yellow-200 text-yellow-800",
      dotColor: "bg-yellow-500",
    },
    {
      id: 3,
      fullName: "John Samuel",
      designation: "PHP Developer",
      status: "Resume Review",
      statusColor: "bg-green-200 text-green-800",
      dotColor: "bg-green-500",
      isActive: true,
    },
    {
      id: 4,
      fullName: "Sam Emmanuel",
      designation: "UI/UX Designer",
      status: "Task",
      statusColor: "bg-yellow-200 text-yellow-800",
      dotColor: "bg-yellow-500",
    },
    {
      id: 5,
      fullName: "John Doe",
      designation: "Content Designer",
      status: "Final Interview",
      statusColor: "bg-purple-200 text-purple-800",
      dotColor: "bg-purple-500",
    },
    {
      id: 6,
      fullName: "John Samuel",
      designation: "PHP Developer",
      status: "Resume Review",
      statusColor: "bg-green-200 text-green-800",
      dotColor: "bg-green-500",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      

      {/* WELCOME BANNER */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-8 mb-10 flex items-center shadow-lg">
        {/* Left Content */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-white mb-2">Good Morning Sara</h2>
          <p className="text-white text-opacity-90 mb-4 text-sm">
            You have 75 new applications. It is a lot of work for today!
            <br />
            So let's start!
          </p>
          <button className="bg-white text-orange-500 hover:bg-gray-100 px-6 py-2 rounded-lg font-semibold text-sm transition duration-200">
            Review it
          </button>
        </div>

        {/* Right Illustration - Placeholder */}
        <div className="flex-1 flex justify-end">
          <div className="text-6xl">👩‍💼</div>
        </div>
      </div>

      {/* YOU NEED TO HIRE SECTION */}
      <div className="mb-10">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">You Need to hire</h3>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            View All
          </button>
        </div>

        {/* Job Cards Row */}
        <div className="grid grid-cols-5 gap-4">
          {jobPositions.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition duration-200 border border-gray-100 flex flex-col items-center text-center"
            >
              <div className={`${job.bgColor} rounded-lg p-4 mb-4 text-2xl`}>
                {job.icon}
              </div>
              <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                {job.title}
              </h4>
              <p className="text-gray-400 text-xs">{job.candidates}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RECRUITMENT PROGRESS SECTION */}
      <div>
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Recruitment Progress</h3>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            View All
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-6 bg-gray-50 px-6 py-4 border-b border-gray-100">
            <div className="font-semibold text-gray-700 text-sm">Full Name</div>
            <div className="font-semibold text-gray-700 text-sm">Designation</div>
            <div className="font-semibold text-gray-700 text-sm">Status</div>
            <div className="font-semibold text-gray-700 text-sm"></div>
          </div>

          {/* Table Rows */}
          <div>
            {recruitmentData.map((row, index) => (
              <div
                key={row.id}
                className={`grid grid-cols-4 gap-6 px-6 py-4 border-b border-gray-100 items-center transition duration-200 ${
                  row.isActive
                    ? "bg-orange-50 hover:bg-orange-100"
                    : "hover:bg-gray-50"
                }`}
              >
                {/* Full Name */}
                <div className="text-gray-900 font-medium text-sm">
                  {row.fullName}
                </div>

                {/* Designation */}
                <div className="text-gray-600 text-sm">{row.designation}</div>

                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${row.dotColor}`}
                  ></span>
                  <span
                    className={`${row.statusColor} px-3 py-1 rounded-full text-xs font-medium`}
                  >
                    {row.status}
                  </span>
                </div>

                {/* Action Menu */}
                <div className="flex justify-end">
                  <button className="text-gray-400 hover:text-gray-600 p-1 transition duration-200">
                    <FiMoreVertical size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
