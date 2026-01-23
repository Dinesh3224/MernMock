import React from "react";
import { NavLink } from "react-router-dom";
import {
  HiSquares2X2,
  HiUserGroup,
  HiUserCircle,
  HiClipboardDocumentList,
  HiClipboardDocument,
  HiCalendarDays,
  HiAcademicCap,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";

/**
 * LeftSidebar Component
 * A vertical navigation sidebar with a modern SaaS/HR ERP design
 * Features:
 * - White background with subtle orange accents
 * - Active menu state with light orange background and right indicator bar
 * - Responsive hover effects on inactive items
 * - Fixed logout button at the bottom
 * - Full screen height with smooth transitions
 */
const LeftSidebar = () => {
  // Navigation menu items configuration
  const menuItems = [
    { name: "Dashboard", icon: HiSquares2X2, path: "/dashboard" },
    { name: "Recruitment", icon: HiUserGroup, path: "/recruitment" },
    { name: "Interview", icon: HiUserCircle, path: "/interview" },
    { name: "Onboarding", icon: HiClipboardDocumentList, path: "/onboarding" },
    { name: "Interview Task", icon: HiClipboardDocument, path: "/interview-task" },
    { name: "Appointments", icon: HiCalendarDays, path: "/appointments" },
    { name: "Training", icon: HiAcademicCap, path: "/training" },
  ];

  return (
    <aside className="w-64 h-screen bg-white rounded-2xl shadow-lg flex flex-col border border-gray-100">
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-6 py-8 border-b border-gray-100">
        <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
          <span className="text-orange-600 font-bold text-lg">H</span>
        </div>
        <span className="text-lg font-semibold text-gray-900">Hireism</span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 relative group
                ${
                  isActive
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Icon */}
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  
                  {/* Menu Label */}
                  <span className="flex-1">{item.name}</span>
                  
                  {/* Active Indicator - Thin orange bar on the right */}
                  {isActive && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-orange-500 rounded-l-sm" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout Button - Fixed at bottom */}
      <div className="px-4 py-6 border-t border-gray-100">
        <button 
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-orange-600 rounded-lg transition-all duration-200"
          aria-label="Logout"
        >
          <HiArrowRightOnRectangle className="w-5 h-5 flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default LeftSidebar;
