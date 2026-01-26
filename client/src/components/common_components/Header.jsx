import React, { useState, useRef } from 'react'
import {
  FiSearch,
  FiBell,
  FiInbox,
  FiMenu,
  FiChevronDown,
} from 'react-icons/fi'
import ContextualBreadcrumb from './ContextualBreadcrumb'

const Header = ({ onTogglePanel }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const notifExists = true
  const menuRef = useRef(null)

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-6 py-3">
      <div className="max-w-full mx-auto flex items-center gap-4">
        
        {/* Contextual Breadcrumb Navigation or Welcome Message */}
        <div className="flex items-center gap-2">
          <ContextualBreadcrumb userName="Sara Anderson" />
        </div>

        {/* Search */}
        <div className="flex-1 px-4">
          <div className="relative max-w-xl mx-auto">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search anything..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-100 bg-gray-50 text-sm focus:ring-1 focus:ring-orange-200"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-orange-50">
            <FiBell size={18} />
            {notifExists && (
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Inbox (static, no backend) */}
          <button className="relative p-2 rounded-lg hover:bg-orange-50" aria-label="Inbox">
            <FiInbox size={18} />
            {/* static unread badge example */}
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-orange-500 rounded-full ring-2 ring-white" />
          </button>

          {/* Quick panel toggle */}
          <button
            onClick={onTogglePanel}
            className="p-2 rounded-lg hover:bg-orange-50"
          >
            <FiMenu size={18} />
          </button>

          {/* Profile */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-50"
            >
              <div className="w-9 h-9 rounded-full bg-orange-400 text-white flex items-center justify-center font-semibold">
                SA
              </div>
              <FiChevronDown />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-md">
                <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50">View Profile</button>
                <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50">Settings</button>
                <div className="border-t my-1" />
                <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
