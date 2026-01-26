import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, Home, ChevronDown, Briefcase, Users, Calendar, FileText, CheckCircle } from 'lucide-react';

/**
 * =====================================================
 * CONTEXTUAL BREADCRUMB / MINI NAVIGATION COMPONENT
 * =====================================================
 * 
 * PURPOSE:
 * Provides intelligent, context-aware breadcrumb navigation for all pages
 * EXCEPT the Dashboard. Replaces the "Welcome, User" message with helpful
 * page hierarchy and quick navigation options.
 * 
 * BENEFITS:
 * 1. Users understand their location in the system
 * 2. Shows logical workflow progression
 * 3. Allows quick jumps to related pages
 * 4. Reduces backtracking and navigation friction
 * 5. Feels like a professional ERP system
 * 
 * DESIGN:
 * - Subtle, non-intrusive header element
 * - WHITE background with ORANGE accents
 * - Contextual dropdowns for key sections
 * - Professional HR ERP aesthetics
 * 
 * USAGE:
 * <ContextualBreadcrumb />
 * 
 * The component automatically detects the current route
 * and generates appropriate breadcrumb navigation.
 * 
 * BREADCRUMB STRUCTURE:
 * Home / Recruitment / Job Openings
 *  ↓        ↓              ↓
 * Link    Dropdown       Current (not clickable)
 *         (optional)
 * 
 * PAGES WITH BREADCRUMBS:
 * 1. /recruitment → Recruitment
 * 2. /recruitment/jobs → Recruitment / Job Openings
 * 3. /recruitment/jobs/:jobId/applicants → Recruitment / Applicants
 * 4. /recruitment/candidates/:candidateId → Recruitment / Candidate Profile
 * 5. /recruitment/pipeline → Recruitment / Interview Pipeline
 * 
 * PAGES WITHOUT BREADCRUMBS:
 * 1. /dashboard → Shows "Welcome, User" instead
 */

// =====================================================
// BREADCRUMB ROUTE CONFIGURATION
// =====================================================
/**
 * Maps routes to their breadcrumb paths and metadata.
 * Each route defines:
 * - breadcrumbs: Array of breadcrumb items
 * - hasDropdown: Whether to show quick nav dropdown
 * - dropdownItems: Quick navigation options (if hasDropdown)
 */
const BREADCRUMB_CONFIG = {
  '/recruitment': {
    breadcrumbs: [
      { label: 'Home', path: '/dashboard', icon: Home },
      { label: 'Recruitment', path: '/recruitment', current: true }
    ],
    hasDropdown: true,
    dropdownPosition: 1 // Position in breadcrumbs array to attach dropdown
  },
  '/recruitment/jobs': {
    breadcrumbs: [
      { label: 'Home', path: '/dashboard', icon: Home },
      { label: 'Recruitment', path: '/recruitment', hasDropdown: true },
      { label: 'Job Openings', path: '/recruitment/jobs', current: true }
    ]
  },
  '/recruitment/jobs/:jobId/applicants': {
    breadcrumbs: [
      { label: 'Home', path: '/dashboard', icon: Home },
      { label: 'Recruitment', path: '/recruitment', hasDropdown: true },
      { label: 'Applicants', path: null, current: true }
    ]
  },
  '/recruitment/candidates/:candidateId': {
    breadcrumbs: [
      { label: 'Home', path: '/dashboard', icon: Home },
      { label: 'Recruitment', path: '/recruitment', hasDropdown: true },
      { label: 'Candidate Profile', path: null, current: true }
    ]
  },
  '/recruitment/pipeline': {
    breadcrumbs: [
      { label: 'Home', path: '/dashboard', icon: Home },
      { label: 'Recruitment', path: '/recruitment', hasDropdown: true },
      { label: 'Interview Pipeline', path: '/recruitment/pipeline', current: true }
    ]
  },
  '/recruitment/offers-joining': {
    breadcrumbs: [
      { label: 'Home', path: '/dashboard', icon: Home },
      { label: 'Recruitment', path: '/recruitment', hasDropdown: true },
      { label: 'Offers & Joining', path: '/recruitment/offers-joining', current: true }
    ]
  }
};

// =====================================================
// RECRUITMENT QUICK NAVIGATION DROPDOWN
// =====================================================
/**
 * Dropdown menu that appears under "Recruitment" breadcrumb.
 * Allows quick jumps to key recruitment pages without backtracking.
 * 
 * Categories:
 * - Job Management: Job Openings
 * - Candidate Management: Applicants, Resume Library, Shortlisted
 * - Workflow: Interview Pipeline, Offers & Joining
 */
const RECRUITMENT_QUICK_NAV = [
  {
    category: 'Job Management',
    items: [
      { label: 'Job Openings', path: '/recruitment/jobs', icon: Briefcase },
      { label: 'Recruitment Overview', path: '/recruitment', icon: Home }
    ]
  },
  {
    category: 'Candidate Management',
    items: [
      { label: 'Resume Library', path: '#', icon: FileText, disabled: true },
      { label: 'Shortlisted Candidates', path: '#', icon: Users, disabled: true }
    ]
  },
  {
    category: 'Workflow',
    items: [
      { label: 'Interview Pipeline', path: '/recruitment/pipeline', icon: Calendar },
      { label: 'Offers & Joining', path: '/recruitment/offers-joining', icon: CheckCircle }
    ]
  }
];

// =====================================================
// COMPONENT: Recruitment Quick Nav Dropdown
// =====================================================
/**
 * Dropdown menu for quick navigation to recruitment pages.
 * Shows contextual categories and quick links.
 */
const RecruitmentQuickNav = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNavigation = (path, disabled) => {
    if (disabled) {
      alert('This feature is coming soon!');
      return;
    }
    if (path !== '#') {
      navigate(path);
      onClose();
    }
  };

  return (
    <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
      {RECRUITMENT_QUICK_NAV.map((section, idx) => (
        <div key={idx}>
          {/* Section Header */}
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {section.category}
          </div>

          {/* Section Items */}
          {section.items.map((item, itemIdx) => {
            const Icon = item.icon;
            return (
              <button
                key={itemIdx}
                onClick={() => handleNavigation(item.path, item.disabled)}
                disabled={item.disabled}
                className={`w-full text-left px-4 py-2 flex items-center gap-3 text-sm transition-colors ${
                  item.disabled
                    ? 'text-gray-400 cursor-not-allowed opacity-60'
                    : 'text-gray-700 hover:bg-orange-50 hover:text-orange-700'
                }`}
              >
                <Icon size={16} className="flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Divider */}
          {idx < RECRUITMENT_QUICK_NAV.length - 1 && (
            <div className="my-1 border-t border-gray-100" />
          )}
        </div>
      ))}
    </div>
  );
};

// =====================================================
// MAIN COMPONENT: ContextualBreadcrumb
// =====================================================
/**
 * Main breadcrumb component that:
 * 1. Detects current route
 * 2. Generates breadcrumb path
 * 3. Provides quick navigation via dropdowns
 * 4. Shows current page prominently
 * 
 * PROPS:
 * - userName: (optional) User name to show on dashboard
 * 
 * RETURNS:
 * - Breadcrumb navigation if not on dashboard
 * - Welcome message if on dashboard
 */
const ContextualBreadcrumb = ({ userName = 'User' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  // =====================================================
  // HELPER FUNCTIONS
  // =====================================================

  /**
   * Detect if we're on dashboard or a recruitment page.
   * Dashboard: No breadcrumb needed
   * Other pages: Generate breadcrumb based on route
   */
  const getPageBreadcrumbs = () => {
    // Dashboard - no breadcrumb
    if (location.pathname === '/dashboard' || location.pathname === '/') {
      return null;
    }

    // Check if route matches any configured breadcrumb
    for (const [route, config] of Object.entries(BREADCRUMB_CONFIG)) {
      // Exact match or pattern match (for dynamic routes)
      if (location.pathname === route) {
        return config.breadcrumbs;
      }

      // Handle dynamic routes
      if (route.includes(':')) {
        const routePattern = new RegExp(
          '^' + route.replace(/:\w+/g, '[^/]+') + '$'
        );
        if (routePattern.test(location.pathname)) {
          return config.breadcrumbs;
        }
      }
    }

    return null;
  };

  /**
   * Determine which breadcrumb should have the dropdown.
   * Only "Recruitment" gets a dropdown menu.
   */
  const getDropdownPosition = () => {
    const breadcrumbs = getPageBreadcrumbs();
    if (!breadcrumbs) return null;

    for (let i = 0; i < breadcrumbs.length; i++) {
      if (breadcrumbs[i].hasDropdown) {
        return i;
      }
    }
    return null;
  };

  const breadcrumbs = getPageBreadcrumbs();
  const dropdownPosition = getDropdownPosition();

  // =====================================================
  // RENDER
  // =====================================================

  // Show welcome message on dashboard
  if (!breadcrumbs) {
    return (
      <div className="text-sm text-gray-600">
        Welcome, <span className="font-semibold text-gray-900">{userName}</span>
      </div>
    );
  }

  // Show breadcrumb navigation
  return (
    <nav className="flex items-center gap-1 text-sm">
      {breadcrumbs.map((crumb, idx) => {
        const Icon = crumb.icon;
        const isLast = idx === breadcrumbs.length - 1;
        const hasDropdown = idx === dropdownPosition;

        return (
          <div key={idx} className="flex items-center gap-1">
            {/* Separator (except for first item) */}
            {idx > 0 && (
              <ChevronRight size={16} className="text-gray-400 mx-0.5" />
            )}

            {/* Breadcrumb Item */}
            <div className="relative">
              <button
                onClick={() => {
                  if (hasDropdown) {
                    setOpenDropdown(openDropdown === idx ? null : idx);
                  } else if (crumb.path) {
                    navigate(crumb.path);
                    setOpenDropdown(null);
                  }
                }}
                disabled={!crumb.path && !hasDropdown}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                  isLast
                    ? 'text-gray-900 font-semibold cursor-default'
                    : crumb.path
                    ? 'text-orange-600 hover:text-orange-700 hover:bg-orange-50 cursor-pointer'
                    : 'text-gray-600 cursor-default'
                } ${hasDropdown && 'hover:bg-orange-50'}`}
              >
                {Icon && <Icon size={14} className="flex-shrink-0" />}
                <span>{crumb.label}</span>
                {hasDropdown && (
                  <ChevronDown
                    size={14}
                    className={`flex-shrink-0 transition-transform ${
                      openDropdown === idx ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>

              {/* Dropdown Menu */}
              {hasDropdown && (
                <RecruitmentQuickNav
                  isOpen={openDropdown === idx}
                  onClose={() => setOpenDropdown(null)}
                />
              )}
            </div>
          </div>
        );
      })}
    </nav>
  );
};

export default ContextualBreadcrumb;
