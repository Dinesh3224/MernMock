import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FiBriefcase,
  FiPlus,
  FiUsers,
  FiEdit2,
  FiPause,
  FiX,
  FiSearch,
  FiFilter,
  FiChevronRight,
} from 'react-icons/fi'

/*
  JobOpenings.jsx
  
  WORKFLOW POSITION:
  Recruitment Main Page
    ↓
  Job Openings Page (THIS PAGE) ← Manages job roles
    ↓
  Applicants for a Job Page ← View applications for a specific job
    ↓
  Candidate Profile → Screening → Interview → Offer
  
  PAGE PURPOSE:
  - View all active, on-hold, and closed job openings
  - Manage job details (title, department, type)
  - Navigate to applicants for a specific job
  - Create new job openings
  
  SECTIONS:
  1. Page header (title, subtitle, primary CTA)
  2. Filters & search (department, status, employment type)
  3. Job openings list (cards showing job details)
  4. Job actions (View Applicants, Edit, Pause/Close)
  5. Empty state (when no jobs exist)
  
  Technical:
  - UI only (no backend, no API calls)
  - Static mock data
  - Frontend-only filtering and search
  - Comments mark optional upgrades
*/

const JobOpenings = () => {
  const navigate = useNavigate()
  
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')

  // ============================================
  // MOCK DATA: Job Openings
  // ============================================
  
  /*
    Each job represents a ROLE being filled.
    Users will click "View Applicants" to see applications for this job.
    
    Fields:
    - id: unique identifier
    - title: job role title
    - department: hiring department
    - type: employment type (Full-time, Contract, etc.)
    - status: Open, On Hold, Closed
    - applicants: count of applications
    - postedDate: when job was posted
  */
  const jobsData = [
    {
      id: 1,
      title: 'Frontend Developer',
      department: 'Engineering',
      type: 'Full-time',
      status: 'Open',
      applicants: 12,
      postedDate: '2025-12-15',
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      department: 'Design',
      type: 'Full-time',
      status: 'Open',
      applicants: 8,
      postedDate: '2025-12-10',
    },
    {
      id: 3,
      title: 'Backend Engineer',
      department: 'Engineering',
      type: 'Full-time',
      status: 'Open',
      applicants: 15,
      postedDate: '2025-12-20',
    },
    {
      id: 4,
      title: 'Content Writer',
      department: 'Marketing',
      type: 'Contract',
      status: 'On Hold',
      applicants: 5,
      postedDate: '2025-12-01',
    },
    {
      id: 5,
      title: 'HR Specialist',
      department: 'Human Resources',
      type: 'Full-time',
      status: 'Closed',
      applicants: 22,
      postedDate: '2025-11-15',
    },
  ]

  // Filter options
  const departments = ['All', 'Engineering', 'Design', 'Marketing', 'Human Resources']
  const statuses = ['All', 'Open', 'On Hold', 'Closed']

  // ============================================
  // FILTERING & SEARCH LOGIC
  // ============================================
  
  /*
    Frontend-only filtering. In production, this would be handled by backend.
    Filters jobs based on:
    1. Search term (job title or department)
    2. Department filter
    3. Status filter
  */
  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = filterDepartment === 'All' || job.department === filterDepartment
    const matchesStatus = filterStatus === 'All' || job.status === filterStatus
    return matchesSearch && matchesDepartment && matchesStatus
  })

  // ============================================
  // COMPONENT: Status Badge
  // ============================================
  
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      Open: { bg: 'bg-green-100', text: 'text-green-800', label: 'Open' },
      'On Hold': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'On Hold' },
      Closed: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Closed' },
    }
    const config = statusConfig[status] || statusConfig.Closed
    return (
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    )
  }

  return (
    <div className="p-6">
      {/* ============================================
          SECTION 1: PAGE HEADER
          ============================================
          
          - Title: "Job Openings"
          - Subtitle: Explains this page focuses on role management
          - Primary CTA: "Create Job Opening"
            → Conceptually opens a form to create new job
            → Does not lead to applicants; leads to job creation form
      */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Job Openings</h2>
          <p className="text-sm text-gray-500 mt-1">Manage roles and track hiring status</p>
        </div>

        <button className="inline-flex items-center gap-2 px-5 py-3 bg-orange-500 text-white rounded-lg shadow-sm hover:bg-orange-600 transition font-medium">
          <FiPlus size={20} />
          <span>Create Job Opening</span>
        </button>
      </div>

      {/* ============================================
          SECTION 2: FILTERS & SEARCH
          ============================================
          
          Frontend-only filtering UI:
          - Search input: filter by job title or department
          - Department dropdown: filter by hiring department
          - Status dropdown: filter by job status (Open/On Hold/Closed)
          
          All state changes are local (no backend calls).
      */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-6">
        <div className="grid grid-cols-12 gap-4 items-end">
          {/* Search Input */}
          <div className="col-span-5">
            <label className="block text-xs font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by job title or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-100 bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Department Filter */}
          <div className="col-span-3">
            <label className="block text-xs font-medium text-gray-700 mb-2">Department</label>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-100 bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-orange-200"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="col-span-3">
            <label className="block text-xs font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-100 bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-orange-200"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ============================================
          SECTION 3 & 4: JOB OPENINGS LIST & ACTIONS
          ============================================
          
          Display jobs as CARDS (modern, scalable UI).
          
          Each card shows:
          - Job title
          - Department
          - Employment type
          - Job status badge
          - Applicant count
          
          ACTIONS on each card:
          1. View Applicants (PRIMARY)
             → Conceptually navigates to "Applicants for this Job" page
             → Shows all applications for this specific job
          
          2. Edit Job
             → Opens job editing form
          
          3. Pause / Close Job
             → Changes job status or pauses hiring
          
          OPTIONAL UPGRADES (commented):
          - Show hiring manager
          - Show salary range
          - Show application deadline
          - Quick duplicate job action
      */}

      {filteredJobs.length > 0 ? (
        <div className="grid gap-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left: Job Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-orange-100 text-orange-600 rounded-md">
                      <FiBriefcase size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-xs text-gray-500">{job.department}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-sm">
                    {/* Employment Type */}
                    <div className="flex items-center gap-1 text-gray-600">
                      <span className="font-medium">{job.type}</span>
                    </div>

                    {/* Applicant Count */}
                    <div className="flex items-center gap-1 text-gray-600">
                      <FiUsers size={16} />
                      <span>{job.applicants} applicants</span>
                    </div>

                    {/* Posted Date */}
                    <div className="text-xs text-gray-500">
                      Posted: {new Date(job.postedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Middle: Status Badge */}
                <div className="flex-shrink-0">
                  <StatusBadge status={job.status} />
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* View Applicants - PRIMARY ACTION */}
                  <button
                    onClick={() => navigate(`/recruitment/jobs/${job.id}/applicants`)}
                    className="inline-flex items-center gap-1 px-3 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition text-sm font-medium"
                    title="View applications for this job"
                  >
                    <FiUsers size={16} />
                    View Applicants
                    <FiChevronRight size={14} />
                  </button>

                  {/* Edit Job */}
                  <button
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                    title="Edit this job opening"
                  >
                    <FiEdit2 size={18} />
                  </button>

                  {/* Job Status Action (Pause/Close) */}
                  {job.status === 'Open' ? (
                    <button
                      className="p-2 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 rounded-lg transition"
                      title="Pause this job opening"
                    >
                      <FiPause size={18} />
                    </button>
                  ) : (
                    <button
                      className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition"
                      title="Close or remove this job"
                    >
                      <FiX size={18} />
                    </button>
                  )}
                </div>
              </div>

              {/* Optional: Additional info row (commented for future use) */}
              {/*
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <div>Hiring Manager: TBD</div>
                  <div>Salary Range: TBD</div>
                  <div>Application Deadline: TBD</div>
                </div>
              */}
            </div>
          ))}
        </div>
      ) : (
        /* ============================================
            SECTION 5: EMPTY STATE
            ============================================
            
            Shown when no job openings match current filters.
            Provides friendly messaging and CTA.
        */
        <div className="bg-white rounded-lg p-12 shadow-sm border border-gray-100 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gray-100 text-gray-600 rounded-lg">
              <FiBriefcase size={32} />
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">No job openings found</h3>
          <p className="text-sm text-gray-500 mb-4">
            {searchTerm || filterDepartment !== 'All' || filterStatus !== 'All'
              ? 'Try adjusting your filters or search terms'
              : 'Get started by creating your first job opening'}
          </p>

          {!searchTerm && filterDepartment === 'All' && filterStatus === 'All' && (
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-sm font-medium">
              <FiPlus size={16} />
              Create Job Opening
            </button>
          )}
        </div>
      )}

      {/* ============================================
          OPTIONAL UPGRADES (COMMENTED)
          ============================================
          
          These features can be added without restructuring:
          
          1. Job Approval Workflow
             - Show approval status for new job openings
             - Track approvals from hiring managers/HR lead
          
          2. Hiring Manager Assignment
             - Display assigned hiring manager per job
             - Quick change assignment
          
          3. Job Performance Metrics
             - Average time-to-hire per role
             - Offer acceptance rate
             - Time spent in each stage
          
          4. Bulk Actions
             - Select multiple jobs
             - Batch pause/close
             - Batch export
          
          5. Duplicate Job Opening
             - Quick create similar job from existing template
             - Copy all details except title/department
          
          6. Archive Closed Jobs
             - Hide closed jobs by default
             - View archived jobs section
      */}
    </div>
  )
}

export default JobOpenings
