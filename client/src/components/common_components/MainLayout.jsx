// components/common_components/MainLayout.jsx
import React from "react";
import LeftSidebar from "../sidebar/LeftSidebar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="sticky top-0 h-screen">
        <LeftSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {/* Your page content will go here */}
      </div>
    </div>
  );
};

export default MainLayout;

