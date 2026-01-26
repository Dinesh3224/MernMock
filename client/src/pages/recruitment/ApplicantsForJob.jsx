import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Search, Filter, MapPin, User, Mail, Briefcase, Calendar } from 'lucide-react';

/**
 * =====================================================
 * APPLICANTS FOR JOB PAGE
 * =====================================================
 * 
 * WORKFLOW POSITION:
 * Recruitment Main → Job Openings → [APPLICANTS FOR JOB] → Candidate Profile → Screening/Interview/Offer
 * 
 * PURPOSE:
 * - Display all applicants for a specific job opening
 * - Allow HR to quickly screen, shortlist, or reject candidates
 * - Navigate to individual candidate profiles
 * - Move candidates through the recruitment pipeline
 * 
 * NAVIGATION:
 * - Back button: Returns to Job Openings page (uses React Router navigate)
 * - View Profile: Navigates to Candidate Profile page (future feature)
 * - Empty state CTA: Navigates to Resume Library (future feature)
 * 
 * ROUTING:
 * - Route: /recruitment/jobs/:jobId/applicants
 * - Extracts jobId from URL parameters
 * - Maps jobId to job details from mock data
 * 
 * DATA FLOW:
 * - Receives jobId from URL route params
 * - Manages local state for filters, search, and applicant status
 * - Mock data only (no API calls)
 */

// Mock job data - in production, this would come from an API
const mockJobsDatabase = [
  {
    id: 1,
    title: 'Frontend Developer',
    department: 'Engineering',
    location: 'San Francisco, CA'
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'New York, NY'
  },
  {
    id: 3,
    title: 'Backend Engineer',
    department: 'Engineering',
    location: 'Remote'
  },
  {
    id: 4,
    title: 'Content Writer',
    department: 'Marketing',
    location: 'Austin, TX'
  },
  {
    id: 5,
    title: 'HR Specialist',
    department: 'Human Resources',
    location: 'Los Angeles, CA'
  }
];

const ApplicantsForJob = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  
  // Get job details from mock database based on jobId from URL
  const jobData = mockJobsDatabase.find(job => job.id === parseInt(jobId)) || mockJobsDatabase[0];
  // =====================================================
  // MOCK DATA: Applicants for this job
  // =====================================================
  const mockApplicants = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      experience: '5 years',
      appliedDate: '2025-01-20',
      status: 'new', // new, shortlisted, rejected
      phone: '+1 (555) 123-4567',
      skills: ['React', 'JavaScript', 'CSS', 'Tailwind']
    },
    {
      id: 2,
      name: 'Alex Chen',
      email: 'alex.chen@email.com',
      experience: '3 years',
      appliedDate: '2025-01-18',
      status: 'new',
      phone: '+1 (555) 234-5678',
      skills: ['React', 'TypeScript', 'Node.js']
    },
    {
      id: 3,
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      experience: '7 years',
      appliedDate: '2025-01-15',
      status: 'shortlisted',
      phone: '+1 (555) 345-6789',
      skills: ['React', 'Vue', 'Angular', 'JavaScript']
    },
    {
      id: 4,
      name: 'Michael Rodriguez',
      email: 'michael.r@email.com',
      experience: '2 years',
      appliedDate: '2025-01-10',
      status: 'new',
      phone: '+1 (555) 456-7890',
      skills: ['React', 'CSS-in-JS', 'Responsive Design']
    },
    {
      id: 5,
      name: 'Priya Patel',
      email: 'priya.patel@email.com',
      experience: '6 years',
      appliedDate: '2025-01-08',
      status: 'rejected',
      phone: '+1 (555) 567-8901',
      skills: ['React', 'Next.js', 'Performance Optimization']
    },
    {
      id: 6,
      name: 'James Wilson',
      email: 'james.wilson@email.com',
      experience: '4 years',
      appliedDate: '2025-01-05',
      status: 'new',
      phone: '+1 (555) 678-9012',
      skills: ['React', 'GraphQL', 'Web Performance']
    }
  ];

  // =====================================================
  // STATE MANAGEMENT
  // =====================================================
  const [applicants, setApplicants] = useState(mockApplicants);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, new, shortlisted, rejected
  const [experienceFilter, setExperienceFilter] = useState('all'); // all, 0-2, 2-5, 5+
  const [skillsFilter, setSkillsFilter] = useState('');

  // =====================================================
  // FILTERING & SEARCH LOGIC
  // =====================================================
  const filteredApplicants = useMemo(() => {
    return applicants.filter((applicant) => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.email.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus = statusFilter === 'all' || applicant.status === statusFilter;

      // Experience filter
      let matchesExperience = true;
      if (experienceFilter !== 'all') {
        const yearsMatch = applicant.experience.match(/\d+/);
        const years = yearsMatch ? parseInt(yearsMatch[0]) : 0;
        if (experienceFilter === '0-2') matchesExperience = years <= 2;
        if (experienceFilter === '2-5') matchesExperience = years > 2 && years <= 5;
        if (experienceFilter === '5+') matchesExperience = years > 5;
      }

      // Skills filter
      const matchesSkills = skillsFilter === '' ||
        applicant.skills.some(skill => 
          skill.toLowerCase().includes(skillsFilter.toLowerCase())
        );

      return matchesSearch && matchesStatus && matchesExperience && matchesSkills;
    });
  }, [applicants, searchTerm, statusFilter, experienceFilter, skillsFilter]);

  // =====================================================
  // ACTION HANDLERS
  // =====================================================
  const handleBackToJobs = () => {
    // Navigate back to Job Openings page using React Router
    navigate('/recruitment/jobs');
  };

  const handleViewProfile = (applicantId, applicantName) => {
    // Navigate to Candidate Profile page
    navigate(`/recruitment/candidates/${applicantId}`);
  };

  const handleGoToResumeLibrary = () => {
    // TODO: Future implementation - navigate to Resume Library page
    // Route would be: /recruitment/resume-library
    console.log('Navigating to Resume Library');
    alert('Feature coming soon: Resume Library');
  };

  const handleShortlist = (applicantId) => {
    setApplicants(applicants.map(app =>
      app.id === applicantId ? { ...app, status: 'shortlisted' } : app
    ));
  };

  const handleReject = (applicantId) => {
    setApplicants(applicants.map(app =>
      app.id === applicantId ? { ...app, status: 'rejected' } : app
    ));
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch(status) {
      case 'new':
        return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'shortlisted':
        return 'bg-orange-50 text-orange-700 border border-orange-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // =====================================================
  // RENDER: EMPTY STATE
  // =====================================================
  if (applicants.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <button
            onClick={handleBackToJobs}
            className="flex items-center gap-2 text-gray-700 hover:text-orange-600 mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Job Openings</span>
          </button>

          {/* Empty State Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-16 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 rounded-full p-4">
                <Briefcase size={32} className="text-gray-400" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              No Applicants Yet
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              There are no applicants for this job opening yet. 
              Check back soon or explore our resume library to find candidates.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleBackToJobs}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Back to Job Openings
              </button>
              <button
                onClick={handleGoToResumeLibrary}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                Go to Resume Library
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // RENDER: MAIN PAGE
  // =====================================================
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER SECTION */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Back Button */}
          <button
            onClick={handleBackToJobs}
            className="flex items-center gap-2 text-gray-700 hover:text-orange-600 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Job Openings</span>
          </button>

          {/* Page Title & Job Info */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {jobData.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <Briefcase size={16} />
                  <span>{jobData.department}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>{jobData.location}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-orange-600">
                {applicants.length}
              </div>
              <p className="text-gray-600 text-sm">Total Applicants</p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        
        {/* FILTER & SEARCH SECTION */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Filter size={20} className="text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-800">Filters & Search</h2>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by candidate name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Filter Controls - Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Experience Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Range
              </label>
              <select
                value={experienceFilter}
                onChange={(e) => setExperienceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              >
                <option value="all">All Levels</option>
                <option value="0-2">0-2 years</option>
                <option value="2-5">2-5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>

            {/* Skills Filter */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills (Search)
              </label>
              <input
                type="text"
                placeholder="e.g., React, TypeScript..."
                value={skillsFilter}
                onChange={(e) => setSkillsFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Reset Filters Button - Optional */}
          {(searchTerm || statusFilter !== 'all' || experienceFilter !== 'all' || skillsFilter) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setExperienceFilter('all');
                setSkillsFilter('');
              }}
              className="mt-4 text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* RESULTS COUNT */}
        <div className="mb-4 text-gray-600 text-sm font-medium">
          Showing {filteredApplicants.length} of {applicants.length} applicants
        </div>

        {/* NO RESULTS STATE */}
        {filteredApplicants.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
            <Search className="mx-auto mb-4 text-gray-400" size={32} />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No Applicants Match Your Filters
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters to find candidates
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setExperienceFilter('all');
                setSkillsFilter('');
              }}
              className="inline-block px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg font-medium transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          /* APPLICANTS TABLE */
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Candidate
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Experience
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Applied Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredApplicants.map((applicant, index) => (
                  <tr
                    key={applicant.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      index === filteredApplicants.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    {/* Candidate Name & Email */}
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                            <User size={20} className="text-orange-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            {applicant.name}
                          </p>
                          <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                            <Mail size={14} />
                            <a 
                              href={`mailto:${applicant.email}`}
                              className="text-orange-600 hover:text-orange-700 transition-colors"
                            >
                              {applicant.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Experience */}
                    <td className="px-6 py-4">
                      <p className="text-gray-900 font-medium">
                        {applicant.experience}
                      </p>
                    </td>

                    {/* Applied Date */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar size={16} className="text-gray-400" />
                        <span>{formatDate(applicant.appliedDate)}</span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(applicant.status)}`}>
                        {getStatusLabel(applicant.status)}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        {/* View Profile Button */}
                        <button
                          onClick={() => handleViewProfile(applicant.id, applicant.name)}
                          className="px-3 py-1.5 text-sm font-medium text-orange-600 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors"
                          title="Navigate to Candidate Profile page"
                        >
                          View Profile
                        </button>

                        {/* Shortlist Button - Only if not rejected */}
                        {applicant.status !== 'rejected' && (
                          <button
                            onClick={() => handleShortlist(applicant.id)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                              applicant.status === 'shortlisted'
                                ? 'bg-orange-600 text-white'
                                : 'text-orange-600 border border-orange-300 hover:bg-orange-50'
                            }`}
                            title="Shortlist this candidate for next round"
                          >
                            {applicant.status === 'shortlisted' ? '✓ Shortlisted' : 'Shortlist'}
                          </button>
                        )}

                        {/* Reject Button - Only if not rejected */}
                        {applicant.status !== 'rejected' && (
                          <button
                            onClick={() => handleReject(applicant.id)}
                            className="px-3 py-1.5 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                            title="Reject this candidate"
                          >
                            Reject
                          </button>
                        )}

                        {/* Rejected State - Show badge instead of buttons */}
                        {applicant.status === 'rejected' && (
                          <div className="text-red-600 font-medium text-sm px-3 py-1.5">
                            Rejected
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ===== OPTIONAL UPGRADE PLACEHOLDERS (COMMENTED) ===== */}
      {/* 
        FUTURE ENHANCEMENTS:
        
        1. BULK ACTIONS
           - Checkbox column for multi-select
           - Bulk shortlist / reject buttons in footer
           - Implementation: Add state for selectedIds, render checkboxes, add footer bar
        
        2. RESUME PREVIEW MODAL
           - Click on candidate row to preview resume
           - Inline PDF viewer or modal drawer
           - Implementation: Add modal state, render PDF viewer, integrate resume API
        
        3. ASSIGN RECRUITER
           - Dropdown to assign recruiter to each candidate
           - Recruiter assignment column
           - Implementation: Add recruiter state, dropdown in table, update UI
        
        4. AI RESUME MATCH SCORE
           - Add match score column (visual bar)
           - Show % match based on job requirements
           - Color coding: Red (0-30%), Yellow (30-70%), Green (70%+)
           - Implementation: Add score data to mock, render progress bar, add legend
        
        5. COMMUNICATION LOG
           - Track emails/messages sent to candidates
           - Last contact date, contact history
           - Implementation: Add communication state, modal to view history
        
        6. BATCH EMAIL
           - Send emails to selected candidates
           - Email template selection
           - Implementation: Add modal with template picker, batch send logic
        
        7. SORTING
           - Click column headers to sort
           - Sort by name, date, experience, status
           - Implementation: Add sort state (key, direction), update filtered list
        
        8. PAGINATION
           - Show 10 per page, add pagination controls
           - Previous/Next buttons, page indicators
           - Implementation: Add currentPage state, slice data, add controls
        
        9. EXPORT CANDIDATES
           - Export to CSV
           - Download selected candidates list
           - Implementation: Add export function, format data, trigger download
        
        10. INTERVIEW SCHEDULING
            - Schedule interview directly from table
            - Calendar picker, time slot selection
            - Implementation: Add scheduling modal, calendar integration
      */}
    </div>
  );
};

export default ApplicantsForJob;
