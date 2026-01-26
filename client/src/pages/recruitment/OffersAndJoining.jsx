import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  Filter,
  User,
  Briefcase,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  ArrowRight,
  AlertCircle,
  LogOut
} from 'lucide-react';

/**
 * =====================================================
 * OFFERS & JOINING PAGE
 * =====================================================
 * 
 * WORKFLOW POSITION:
 * Recruitment Main 
 *   → Job Openings 
 *   → Applicants for a Job 
 *   → Candidate Profile 
 *   → Interview Pipeline 
 *   → [OFFERS & JOINING PAGE] ← FINAL RECRUITMENT STAGE
 *   → Onboarding Module
 * 
 * PURPOSE:
 * This is the FINAL STAGE of the recruitment module.
 * HR can:
 * - Track candidates who received offers
 * - Monitor offer acceptance/decline status
 * - Track joining timelines
 * - Move accepted candidates into onboarding
 * 
 * DESIGN:
 * Feels like a "closing desk" - clean, professional, outcome-focused
 * Clear status indicators (sent, accepted, declined, pending)
 * Primary action: Move to Onboarding (only for accepted offers)
 * 
 * NAVIGATION:
 * - Breadcrumb: Recruitment → Offers & Joining
 * - View Profile: Navigate to Candidate Profile
 * - Move to Onboarding: Marks transition (no new page)
 * - Back: Navigate to Recruitment or Interview Pipeline
 * 
 * ROUTING:
 * - Route: /recruitment/offers-joining
 * - Mock data only
 * - No backend integration
 * 
 * BRIDGE TO ONBOARDING:
 * This page represents the handoff point from Recruitment to Onboarding.
 * When "Move to Onboarding" is clicked, candidate transitions out of
 * recruitment workflow (in a real system, this would trigger onboarding).
 */

// =====================================================
// OFFER STATUS CONFIGURATION
// =====================================================
const OFFER_STATUSES = {
  pending: { label: 'Pending', color: 'bg-gray-100', textColor: 'text-gray-800', icon: Clock },
  sent: { label: 'Offer Sent', color: 'bg-blue-100', textColor: 'text-blue-800', icon: Mail },
  accepted: { label: 'Accepted', color: 'bg-green-100', textColor: 'text-green-800', icon: CheckCircle },
  declined: { label: 'Declined', color: 'bg-red-100', textColor: 'text-red-800', icon: XCircle }
};

// =====================================================
// MOCK DATA: Candidates with Offers
// =====================================================
const mockOffersData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    jobApplied: 'Frontend Developer',
    jobId: 1,
    offerStatus: 'accepted', // pending, sent, accepted, declined
    offerSentDate: '2025-01-20',
    expectedJoiningDate: '2025-02-15',
    salary: '$120,000',
    interviewFeedback: 'Excellent technical skills and communication',
    onboardingTransitioned: false
  },
  {
    id: 2,
    name: 'Alex Chen',
    email: 'alex.chen@email.com',
    phone: '+1 (555) 234-5678',
    jobApplied: 'Frontend Developer',
    jobId: 1,
    offerStatus: 'sent',
    offerSentDate: '2025-01-22',
    expectedJoiningDate: '2025-02-20',
    salary: '$110,000',
    interviewFeedback: 'Strong junior developer, good learning attitude',
    onboardingTransitioned: false
  },
  {
    id: 3,
    name: 'Emma Davis',
    email: 'emma.davis@email.com',
    phone: '+1 (555) 345-6789',
    jobApplied: 'UI/UX Designer',
    jobId: 2,
    offerStatus: 'accepted',
    offerSentDate: '2025-01-18',
    expectedJoiningDate: '2025-02-10',
    salary: '$115,000',
    interviewFeedback: 'Outstanding portfolio and design thinking',
    onboardingTransitioned: false
  },
  {
    id: 4,
    name: 'Michael Rodriguez',
    email: 'michael.r@email.com',
    phone: '+1 (555) 456-7890',
    jobApplied: 'Frontend Developer',
    jobId: 1,
    offerStatus: 'declined',
    offerSentDate: '2025-01-19',
    expectedJoiningDate: null,
    salary: '$105,000',
    interviewFeedback: 'Good candidate but declined offer',
    onboardingTransitioned: false
  },
  {
    id: 5,
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    phone: '+1 (555) 567-8901',
    jobApplied: 'Frontend Developer',
    jobId: 1,
    offerStatus: 'pending',
    offerSentDate: null,
    expectedJoiningDate: '2025-02-25',
    salary: '$118,000',
    interviewFeedback: 'Awaiting offer approval from management',
    onboardingTransitioned: false
  },
  {
    id: 6,
    name: 'James Wilson',
    email: 'james.wilson@email.com',
    phone: '+1 (555) 678-9012',
    jobApplied: 'Backend Engineer',
    jobId: 3,
    offerStatus: 'accepted',
    offerSentDate: '2025-01-21',
    expectedJoiningDate: '2025-02-18',
    salary: '$135,000',
    interviewFeedback: 'Senior developer with excellent experience',
    onboardingTransitioned: false
  }
];

const OffersAndJoining = () => {
  const navigate = useNavigate();

  // =====================================================
  // STATE MANAGEMENT
  // =====================================================
  const [offers, setOffers] = useState(mockOffersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, pending, sent, accepted, declined
  const [jobFilter, setJobFilter] = useState('all'); // all, 1, 2, 3
  const [showConfirmation, setShowConfirmation] = useState(null); // ID of offer being transitioned

  // =====================================================
  // FILTERING & SEARCH LOGIC
  // =====================================================
  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => {
      // Search filter
      const matchesSearch = searchTerm === '' ||
        offer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.email.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus = statusFilter === 'all' || offer.offerStatus === statusFilter;

      // Job filter
      const matchesJob = jobFilter === 'all' || offer.jobId === parseInt(jobFilter);

      return matchesSearch && matchesStatus && matchesJob;
    });
  }, [offers, searchTerm, statusFilter, jobFilter]);

  // Get unique job IDs
  const uniqueJobs = useMemo(() => {
    const jobs = new Set(offers.map(o => o.jobId));
    return Array.from(jobs);
  }, [offers]);

  // Get job name from ID
  const getJobName = (jobId) => {
    const jobNames = {
      1: 'Frontend Developer',
      2: 'UI/UX Designer',
      3: 'Backend Engineer'
    };
    return jobNames[jobId] || 'Unknown Role';
  };

  // =====================================================
  // ACTION HANDLERS
  // =====================================================
  const handleViewProfile = (candidateId) => {
    navigate(`/recruitment/candidates/${candidateId}`);
  };

  const handleViewOffer = (offerName) => {
    alert(`Viewing offer for ${offerName}.\n\n(Future: Opens offer letter PDF preview)`);
  };

  const handleChangeStatus = (offerId, newStatus) => {
    setOffers(offers.map(offer =>
      offer.id === offerId ? { ...offer, offerStatus: newStatus } : offer
    ));
  };

  const handleMoveToOnboarding = (offerId) => {
    const offer = offers.find(o => o.id === offerId);
    if (!offer || offer.offerStatus !== 'accepted') return;

    setShowConfirmation(offerId);
  };

  const confirmMoveToOnboarding = (offerId) => {
    const offer = offers.find(o => o.id === offerId);
    setOffers(offers.map(o =>
      o.id === offerId ? { ...o, onboardingTransitioned: true } : o
    ));
    setShowConfirmation(null);
    alert(`✅ ${offer.name} has been moved to Onboarding!\n\nThey will receive onboarding materials and setup instructions.`);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate days until joining
  const daysUntilJoining = (joiningDate) => {
    if (!joiningDate) return null;
    const today = new Date();
    const joining = new Date(joiningDate);
    const days = Math.ceil((joining - today) / (1000 * 60 * 60 * 24));
    return days;
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-50">
      {/* =====================================================
          HEADER SECTION
          ===================================================== */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Offers & Joining
          </h1>
          <p className="text-gray-600 mb-6">
            Manage offers and track joining status for accepted candidates
          </p>

          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-700">{offers.length}</div>
              <p className="text-sm text-blue-600 mt-1">Total Offers</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-700">
                {offers.filter(o => o.offerStatus === 'accepted').length}
              </div>
              <p className="text-sm text-green-600 mt-1">Accepted</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-700">
                {offers.filter(o => o.offerStatus === 'sent').length}
              </div>
              <p className="text-sm text-yellow-600 mt-1">Pending Response</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-700">
                {offers.filter(o => o.offerStatus === 'declined').length}
              </div>
              <p className="text-sm text-red-600 mt-1">Declined</p>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Offer Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Offer Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="sent">Offer Sent</option>
                <option value="accepted">Accepted</option>
                <option value="declined">Declined</option>
              </select>
            </div>

            {/* Job Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Role
              </label>
              <select
                value={jobFilter}
                onChange={(e) => setJobFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              >
                <option value="all">All Roles</option>
                {uniqueJobs.map(jobId => (
                  <option key={jobId} value={jobId}>
                    {getJobName(jobId)}
                  </option>
                ))}
              </select>
            </div>

            {/* Show Active Filters */}
            <div className="flex items-end">
              {(searchTerm || statusFilter !== 'all' || jobFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setJobFilter('all');
                  }}
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* RESULTS COUNT */}
        <div className="mb-4 text-gray-600 text-sm font-medium">
          Showing {filteredOffers.length} of {offers.length} offers
        </div>

        {/* NO RESULTS STATE */}
        {filteredOffers.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
            <AlertCircle className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No Offers Found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search to find offers
            </p>
            {filteredOffers.length === 0 && offers.length === 0 && (
              <>
                <p className="text-gray-600 mb-6">
                  No offers created yet. Complete interviews and create offers from the Interview Pipeline.
                </p>
                <button
                  onClick={() => navigate('/recruitment/pipeline')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                >
                  <ArrowLeft size={18} />
                  Go to Interview Pipeline
                </button>
              </>
            )}
          </div>
        ) : (
          /* OFFERS TABLE */
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Candidate
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Job Role
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Offer Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Sent Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Joining Date
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOffers.map((offer, index) => {
                  const statusConfig = OFFER_STATUSES[offer.offerStatus];
                  const StatusIcon = statusConfig.icon;
                  const daysToJoin = daysUntilJoining(offer.expectedJoiningDate);

                  return (
                    <tr
                      key={offer.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        index === filteredOffers.length - 1 ? 'border-b-0' : ''
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
                              {offer.name}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">{offer.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Job Role */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-900 font-medium">
                          <Briefcase size={16} className="text-gray-400" />
                          {offer.jobApplied}
                        </div>
                      </td>

                      {/* Offer Status */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5 ${statusConfig.color} ${statusConfig.textColor}`}>
                            <StatusIcon size={14} />
                            {statusConfig.label}
                          </div>
                        </div>
                      </td>

                      {/* Offer Sent Date */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar size={16} className="text-gray-400" />
                          <span>{formatDate(offer.offerSentDate)}</span>
                        </div>
                      </td>

                      {/* Expected Joining Date */}
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">
                            {formatDate(offer.expectedJoiningDate)}
                          </p>
                          {daysToJoin !== null && (
                            <p className={`text-xs mt-1 ${
                              daysToJoin < 0 ? 'text-red-600' : daysToJoin < 7 ? 'text-orange-600' : 'text-gray-600'
                            }`}>
                              {daysToJoin < 0
                                ? `${Math.abs(daysToJoin)} days ago`
                                : daysToJoin === 0
                                ? 'Joining today'
                                : `${daysToJoin} days`
                              }
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2 flex-wrap">
                          {/* View Profile */}
                          <button
                            onClick={() => handleViewProfile(offer.id)}
                            className="px-3 py-1.5 text-sm font-medium text-orange-600 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors"
                            title="View candidate profile"
                          >
                            Profile
                          </button>

                          {/* View Offer */}
                          <button
                            onClick={() => handleViewOffer(offer.name)}
                            className="px-3 py-1.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            title="View offer details"
                          >
                            <FileText size={14} className="inline mr-1" />
                            Offer
                          </button>

                          {/* Move to Onboarding (only if accepted) */}
                          {offer.offerStatus === 'accepted' && !offer.onboardingTransitioned && (
                            <button
                              onClick={() => handleMoveToOnboarding(offer.id)}
                              className="px-3 py-1.5 text-sm font-medium bg-green-100 text-green-700 border border-green-300 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-1"
                              title="Move to onboarding module"
                            >
                              <LogOut size={14} />
                              Onboard
                            </button>
                          )}

                          {/* Already transitioned */}
                          {offer.onboardingTransitioned && (
                            <div className="px-3 py-1.5 text-sm font-medium text-green-600 bg-green-50 rounded-lg">
                              ✓ Onboarded
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* =====================================================
          CONFIRMATION MODAL
          ===================================================== */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <div className="text-center mb-6">
              <LogOut className="mx-auto text-green-600 mb-4" size={48} />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Move to Onboarding?
              </h2>
              <p className="text-gray-600">
                This candidate will be transitioned from recruitment to the onboarding module.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => confirmMoveToOnboarding(showConfirmation)}
                className="w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Yes, Move to Onboarding
              </button>
              <button
                onClick={() => setShowConfirmation(null)}
                className="w-full px-4 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== OPTIONAL UPGRADE PLACEHOLDERS (COMMENTED) ===== */}
      {/* 
        FUTURE ENHANCEMENTS:
        
        1. OFFER LETTER PREVIEW
           - PDF preview of generated offer letter
           - Customizable templates
           - Download functionality
           - Implementation: PDF library, modal component
        
        2. SALARY BREAKDOWN
           - Base salary, bonus, benefits
           - Visible in expanded row or modal
           - Implementation: Add salary details, expandable rows
        
        3. AUTO-REMINDERS
           - Send reminders to candidates on joining date
           - Reminder settings per candidate
           - Email integration
           - Implementation: useEffect timer, email service
        
        4. OFFER EXPIRY TRACKING
           - Show when offer expires if not accepted
           - Days remaining for acceptance
           - Red alert if about to expire
           - Implementation: Calculate expiry date, show countdown
        
        5. BULK OFFER ACTIONS
           - Select multiple candidates
           - Send bulk reminders
           - Update multiple statuses
           - Implementation: Checkbox selection, bulk action buttons
        
        6. OFFER HISTORY
           - Track all offers sent to a candidate
           - Previous offers, declined offers
           - Implementation: Add history array, expandable timeline
        
        7. DOCUMENT CHECKLIST
           - Track documents needed for onboarding
           - Bank details, address proof, etc.
           - Implementation: Checklist component, document tracking
        
        8. JOINING SCHEDULE
           - Track first-day activities
           - Equipment setup, training schedule
           - Implementation: Calendar integration, task tracking
        
        9. OFFER NEGOTIATION LOG
           - Track salary negotiations
           - Counters and responses
           - Final agreed terms
           - Implementation: Add negotiation history
        
        10. BATCH ONBOARDING
            - Move multiple accepted candidates at once
            - Bulk transition to onboarding
            - Implementation: Multi-select with confirm
      */}
    </div>
  );
};

export default OffersAndJoining;
