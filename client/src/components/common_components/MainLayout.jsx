// components/common_components/MainLayout.jsx
import React, { useState } from "react";
import LeftSidebar from "../sidebar/LeftSidebar";
import AppRoutes from "../../routes/AppRoutes";
import Header from "./Header";
import RightQuickPanel from "./RightQuickPanel";

const MainLayout = () => {
  const [showRightPanel, setShowRightPanel] = useState(false);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Sidebar - Fixed position */}
      <div className="fixed left-0 top-0 h-screen w-64">
        <LeftSidebar />
      </div>

      {/*
        Content + Right panel container
        - When `showRightPanel` is true the right panel is rendered as a sibling
          so it takes layout space and pushes/shrinks the main content (no overlap).
        - The main content area contains a click-catcher overlay (transparent)
          that closes the panel when clicking outside the panel area.
      */}
      <div className="ml-64 flex h-screen w-full transition-all">

        {/* Main content (scrolls independently) */}
        <div className="flex-1 h-screen overflow-y-auto overflow-x-hidden relative scrollbar-hide">
          {/* Header with Panel Toggle */}
          <Header onTogglePanel={() => setShowRightPanel((s) => !s)} />

          {/* Page Content */}
          <AppRoutes />

          {/* Overlay click-catcher: appears above content but under panel to capture outside clicks */}
          {showRightPanel && (
            <button
              aria-label="Close quick panel"
              onClick={() => setShowRightPanel(false)}
              className="absolute inset-0 z-20 bg-transparent"
            />
          )}
        </div>

        {/* Right Quick Panel - sibling so content shrinks instead of panel overlapping */}
        {showRightPanel && (
          <div className="w-80 h-screen flex-shrink-0 z-30 border-l bg-white">
            <RightQuickPanel />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainLayout;

