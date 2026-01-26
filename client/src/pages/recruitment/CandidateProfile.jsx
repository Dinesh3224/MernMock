import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Phone,
  Briefcase,
  Award,
  FileText,
  Download,
  Eye,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Calendar,
  CheckSquare,
  Square,
  User,
  MapPin,
  Clock,
  FileCheck
} from 'lucide-react';

/**
 * =====================================================
 * CANDIDATE PROFILE PAGE
 * =====================================================
 * 
 * WORKFLOW POSITION:
 * Recruitment Main 
 *   → Job Openings 
 *   → Applicants for a Job 
 *   → [CANDIDATE PROFILE PAGE] ← CORE PAGE
 *   → Screening → Document Verification → Interview → Offer
 * 
 * PURPOSE:
 * This is the CENTRAL page for managing individual candidates.
 * All candidate information and actions are consolidated here.
 * 
 * HR can:
 * - View complete candidate profile
 * - Review documents and education
 * - Add internal screening notes
 * - Move candidate through recruitment pipeline
 * - Reject candidate at any stage
 * 
 * NAVIGATION:
 * - Back button: Returns to Applicants for a Job page (via URL params)
 * - Action buttons: Move candidate through workflow stages
 * - No manual URL typing
 * 
 * ROUTING:
 * - Route: /recruitment/candidates/:candidateId
 * - Extracts candidateId from URL
 * - Displays mock candidate data based on ID
 * 
 * LAYOUT:
 * Single-page scroll layout with sections:
 * 1. Header (candidate name, status, back button)
 * 2. Basic Info (contact, experience, skills)
 * 3. Resume (view/download)
 * 4. Document Verification (status checklist)
 * 5. Screening Notes (HR notes textarea)
 * 6. Action Buttons (workflow progression)
 */

// Mock candidate data - in production, would come from API
const mockCandidatesDatabase = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    jobApplied: 'Frontend Developer',
    jobId: 1,
    appliedDate: '2025-01-20',
    currentStatus: 'new', // new, screening, interview, offer, rejected
    experience: '5 years',
    location: 'San Francisco, CA',
    skills: ['React', 'JavaScript', 'CSS', 'Tailwind', 'Redux', 'REST APIs'],
    education: [
      { degree: 'Bachelor of Science', field: 'Computer Science', school: 'UC Berkeley', year: 2019 },
      { degree: 'Advanced Certification', field: 'Full Stack Development', school: 'General Assembly', year: 2020 }
    ],
    resume: {
      fileName: 'Sarah_Johnson_Resume.pdf',
      uploadedDate: '2025-01-20'
    },
    documents: {
      idProof: { submitted: true, verified: true },
      educationCertificates: { submitted: true, verified: true },
      experienceLetter: { submitted: false, verified: false },
      photo: { submitted: true, verified: true }
    },
    notes: 'Strong technical background. Excellent communication skills during initial screening.',
    matchScore: 85
  },
  {
    id: 2,
    name: 'Alex Chen',
    email: 'alex.chen@email.com',
    phone: '+1 (555) 234-5678',
    jobApplied: 'Frontend Developer',
    jobId: 1,
    appliedDate: '2025-01-18',
    currentStatus: 'screening',
    experience: '3 years',
    location: 'Austin, TX',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Testing'],
    education: [
      { degree: 'Bachelor of Arts', field: 'Information Technology', school: 'University of Texas', year: 2021 }
    ],
    resume: {
      fileName: 'Alex_Chen_Resume.pdf',
      uploadedDate: '2025-01-18'
    },
    documents: {
      idProof: { submitted: true, verified: true },
      educationCertificates: { submitted: true, verified: false },
      experienceLetter: { submitted: true, verified: true },
      photo: { submitted: true, verified: true }
    },
    notes: 'Promising junior developer. Interested in growing with the team.',
    matchScore: 72
  },
  {
    id: 3,
    name: 'Emma Davis',
    email: 'emma.davis@email.com',
    phone: '+1 (555) 345-6789',
    jobApplied: 'UI/UX Designer',
    jobId: 2,
    appliedDate: '2025-01-15',
    currentStatus: 'interview',
    experience: '7 years',
    location: 'New York, NY',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems', 'CSS'],
    education: [
      { degree: 'Bachelor of Fine Arts', field: 'Graphic Design', school: 'School of Visual Arts', year: 2017 },
      { degree: 'Specialized Program', field: 'UX/UI Design', school: 'Interaction Design Foundation', year: 2018 }
    ],
    resume: {
      fileName: 'Emma_Davis_Resume.pdf',
      uploadedDate: '2025-01-15'
    },
    documents: {
      idProof: { submitted: true, verified: true },
      educationCertificates: { submitted: true, verified: true },
      experienceLetter: { submitted: true, verified: true },
      photo: { submitted: true, verified: true }
    },
    notes: 'Excellent portfolio. Interview scheduled for 2026-01-30. Very interested in the role.',
    matchScore: 92
  }
];

const CandidateProfile = () => {
  const navigate = useNavigate();
  const { candidateId } = useParams();

  // Get candidate data from mock database
  const candidate = mockCandidatesDatabase.find(c => c.id === parseInt(candidateId)) || mockCandidatesDatabase[0];

  // =====================================================
  // STATE MANAGEMENT
  // =====================================================
  const [candidateStatus, setCandidateStatus] = useState(candidate.currentStatus);
  const [notes, setNotes] = useState(candidate.notes);
  const [verifiedDocs, setVerifiedDocs] = useState(candidate.documents);

  // =====================================================
  // HELPER FUNCTIONS
  // =====================================================

  const handleBackToApplicants = () => {
    // Navigate back to applicants page for the job
    navigate(`/recruitment/jobs/${candidate.jobId}/applicants`);
  };

  const handleMoveToScreening = () => {
    setCandidateStatus('screening');
    alert(`✓ ${candidate.name} moved to Screening`);
  };

  const handleScheduleInterview = () => {
    setCandidateStatus('interview');
    alert(`✓ Interview scheduled for ${candidate.name}. (Future: Opens calendar)`);
  };

  const handleMoveToOffer = () => {
    setCandidateStatus('offer');
    alert(`✓ ${candidate.name} moved to Offer stage. (Future: Generates offer letter)`);
  };

  const handleRejectCandidate = () => {
    const confirm = window.confirm(`Are you sure you want to reject ${candidate.name}?`);
    if (confirm) {
      setCandidateStatus('rejected');
      alert(`✗ ${candidate.name} has been rejected.`);
    }
  };

  const handleVerifyDocument = (docType) => {
    setVerifiedDocs({
      ...verifiedDocs,
      [docType]: {
        ...verifiedDocs[docType],
        verified: !verifiedDocs[docType].verified
      }
    });
  };

  const handleDownloadResume = () => {
    alert(`Downloading: ${candidate.resume.fileName}`);
  };

  const handleViewResume = () => {
    alert(`Opening: ${candidate.resume.fileName} (Future: PDF viewer modal)`);
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch(status) {
      case 'new':
        return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', label: 'New Application' };
      case 'screening':
        return { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', label: 'In Screening' };
      case 'interview':
        return { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', label: 'Interview Scheduled' };
      case 'offer':
        return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', label: 'Offer Extended' };
      case 'rejected':
        return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', label: 'Rejected' };
      default:
        return { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', label: 'Unknown' };
    }
  };

  const statusBadge = getStatusBadge(candidateStatus);

  // Get available actions based on current status
  const getAvailableActions = () => {
    switch(candidateStatus) {
      case 'new':
        return [
          { label: 'Move to Screening', action: handleMoveToScreening, style: 'primary' },
          { label: 'Reject', action: handleRejectCandidate, style: 'danger' }
        ];
      case 'screening':
        return [
          { label: 'Schedule Interview', action: handleScheduleInterview, style: 'primary' },
          { label: 'Reject', action: handleRejectCandidate, style: 'danger' }
        ];
      case 'interview':
        return [
          { label: 'Move to Offer', action: handleMoveToOffer, style: 'primary' },
          { label: 'Reject', action: handleRejectCandidate, style: 'danger' }
        ];
      case 'offer':
        return [
          { label: 'View Offer Letter', action: () => alert('Opening offer letter...'), style: 'secondary' }
        ];
      case 'rejected':
        return [];
      default:
        return [];
    }
  };

  const availableActions = getAvailableActions();

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-50">
      {/* =====================================================
          HEADER SECTION
          ===================================================== */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-6">
          {/* Back Button */}
          <button
            onClick={handleBackToApplicants}
            className="flex items-center gap-2 text-gray-700 hover:text-orange-600 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Applicants</span>
          </button>

          {/* Candidate Header */}
          <div className="flex items-start justify-between gap-4">
            {/* Left: Name and Job Info */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <User size={32} className="text-orange-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{candidate.name}</h1>
                  <div className="flex items-center gap-3 text-gray-600 mt-1">
                    <Briefcase size={16} />
                    <span>{candidate.jobApplied}</span>
                    <span className="text-gray-400">•</span>
                    <MapPin size={16} />
                    <span>{candidate.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Status Badge */}
            <div className="flex-shrink-0">
              <div className={`px-4 py-2 rounded-full border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border} font-semibold text-sm`}>
                {statusBadge.label}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* LEFT COLUMN: Candidate Info & Resume */}
          <div className="col-span-2 space-y-6">

            {/* =====================================================
                SECTION 1: BASIC INFORMATION
                ===================================================== */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <User size={20} className="text-orange-600" />
                Basic Information
              </h2>

              <div className="grid grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="flex items-center gap-2 text-gray-900">
                    <Mail size={16} className="text-gray-400" />
                    <a href={`mailto:${candidate.email}`} className="text-orange-600 hover:text-orange-700">
                      {candidate.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <div className="flex items-center gap-2 text-gray-900">
                    <Phone size={16} className="text-gray-400" />
                    <a href={`tel:${candidate.phone}`} className="text-orange-600 hover:text-orange-700">
                      {candidate.phone}
                    </a>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                  <div className="flex items-center gap-2 text-gray-900">
                    <Clock size={16} className="text-gray-400" />
                    <span className="font-medium">{candidate.experience}</span>
                  </div>
                </div>

                {/* Applied Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Applied Date</label>
                  <div className="flex items-center gap-2 text-gray-900">
                    <Calendar size={16} className="text-gray-400" />
                    <span>{new Date(candidate.appliedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* =====================================================
                SECTION 2: SKILLS
                ===================================================== */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award size={20} className="text-orange-600" />
                Skills
              </h2>

              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-orange-50 text-orange-700 border border-orange-200 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* =====================================================
                SECTION 3: EDUCATION
                ===================================================== */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award size={20} className="text-orange-600" />
                Education
              </h2>

              <div className="space-y-4">
                {candidate.education.map((edu, idx) => (
                  <div key={idx} className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                    <div className="font-semibold text-gray-900">{edu.degree}</div>
                    <div className="text-sm text-gray-600">{edu.field}</div>
                    <div className="text-xs text-gray-500 mt-1">{edu.school} • {edu.year}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* =====================================================
                SECTION 4: RESUME
                ===================================================== */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText size={20} className="text-orange-600" />
                Resume
              </h2>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <FileText size={24} className="text-orange-600" />
                  <div>
                    <div className="font-medium text-gray-900">{candidate.resume.fileName}</div>
                    <div className="text-xs text-gray-500">Uploaded: {new Date(candidate.resume.uploadedDate).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleViewResume}
                    className="inline-flex items-center gap-1 px-3 py-2 text-orange-600 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors text-sm font-medium"
                  >
                    <Eye size={16} />
                    View
                  </button>
                  <button
                    onClick={handleDownloadResume}
                    className="inline-flex items-center gap-1 px-3 py-2 bg-orange-50 text-orange-600 border border-orange-300 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium"
                  >
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Documents, Notes & Actions */}
          <div className="col-span-1 space-y-6">

            {/* =====================================================
                SECTION 5: DOCUMENT VERIFICATION
                ===================================================== */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileCheck size={20} className="text-orange-600" />
                Documents
              </h2>

              <div className="space-y-3">
                {/* ID Proof */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {verifiedDocs.idProof.submitted ? (
                      <CheckCircle size={18} className="text-green-600" />
                    ) : (
                      <AlertCircle size={18} className="text-gray-400" />
                    )}
                    <span className="text-sm font-medium text-gray-800">ID Proof</span>
                  </div>
                  <button
                    onClick={() => handleVerifyDocument('idProof')}
                    className="p-1 hover:bg-white rounded transition-colors"
                    title="Toggle verification"
                  >
                    {verifiedDocs.idProof.verified ? (
                      <CheckSquare size={18} className="text-orange-600" />
                    ) : (
                      <Square size={18} className="text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Education Certificates */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {verifiedDocs.educationCertificates.submitted ? (
                      <CheckCircle size={18} className="text-green-600" />
                    ) : (
                      <AlertCircle size={18} className="text-gray-400" />
                    )}
                    <span className="text-sm font-medium text-gray-800">Education</span>
                  </div>
                  <button
                    onClick={() => handleVerifyDocument('educationCertificates')}
                    className="p-1 hover:bg-white rounded transition-colors"
                    title="Toggle verification"
                  >
                    {verifiedDocs.educationCertificates.verified ? (
                      <CheckSquare size={18} className="text-orange-600" />
                    ) : (
                      <Square size={18} className="text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Experience Letter */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {verifiedDocs.experienceLetter.submitted ? (
                      <CheckCircle size={18} className="text-green-600" />
                    ) : (
                      <AlertCircle size={18} className="text-gray-400" />
                    )}
                    <span className="text-sm font-medium text-gray-800">Experience</span>
                  </div>
                  <button
                    onClick={() => handleVerifyDocument('experienceLetter')}
                    className="p-1 hover:bg-white rounded transition-colors"
                    title="Toggle verification"
                  >
                    {verifiedDocs.experienceLetter.verified ? (
                      <CheckSquare size={18} className="text-orange-600" />
                    ) : (
                      <Square size={18} className="text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Photo */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {verifiedDocs.photo.submitted ? (
                      <CheckCircle size={18} className="text-green-600" />
                    ) : (
                      <AlertCircle size={18} className="text-gray-400" />
                    )}
                    <span className="text-sm font-medium text-gray-800">Photo</span>
                  </div>
                  <button
                    onClick={() => handleVerifyDocument('photo')}
                    className="p-1 hover:bg-white rounded transition-colors"
                    title="Toggle verification"
                  >
                    {verifiedDocs.photo.verified ? (
                      <CheckSquare size={18} className="text-orange-600" />
                    ) : (
                      <Square size={18} className="text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-600">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle size={14} className="text-green-600" />
                  <span>Submitted</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle size={14} className="text-gray-400" />
                  <span>Missing</span>
                </div>
              </div>
            </div>

            {/* =====================================================
                SECTION 6: SCREENING NOTES
                ===================================================== */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare size={20} className="text-orange-600" />
                Screening Notes
              </h2>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add internal notes about this candidate..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-sm"
              />

              <div className="mt-3 text-xs text-gray-500">
                These notes are visible to your team only
              </div>
            </div>

          </div>
        </div>

        {/* =====================================================
            SECTION 7: ACTION BUTTONS
            ===================================================== */}
        <div className="mt-8 mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>

            {candidateStatus === 'rejected' ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
                This candidate has been rejected and cannot be progressed further.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {availableActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={action.action}
                    className={`py-3 px-4 rounded-lg font-medium transition-colors text-sm ${
                      action.style === 'primary'
                        ? 'bg-orange-600 text-white hover:bg-orange-700'
                        : action.style === 'danger'
                        ? 'bg-red-100 text-red-700 border border-red-300 hover:bg-red-150'
                        : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-150'
                    }`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== OPTIONAL UPGRADE PLACEHOLDERS (COMMENTED) ===== */}
      {/* 
        FUTURE ENHANCEMENTS:
        
        1. INTERVIEW TIMELINE
           - Show interview rounds: Phone Screen → Technical → HR Round
           - Display dates, interviewer names, feedback
           - Implementation: Add timeline data to mock, render timeline component
        
        2. ACTIVITY LOG
           - Show all actions taken on candidate profile
           - Timeline: "Moved to Screening - Jan 26, 10:30 AM"
           - "Document verified - Jan 26, 10:15 AM"
           - Implementation: Add activity array, render activity feed
        
        3. OFFER PREVIEW
           - Show offer details before sending
           - Salary, position, start date
           - Implementation: Add offer state, modal preview
        
        4. COMMUNICATION HISTORY
           - Show all emails/messages sent to candidate
           - Log of candidate interactions
           - Implementation: Add communication array, collapsible section
        
        5. ASSESSMENT SCORES
           - Show technical assessment results
           - Coding challenge score, assessment percentage
           - Implementation: Add assessment data, visual score bars
        
        6. REFERENCE CHECKS
           - Add section for reference verification status
           - Contact info for references
           - Implementation: Add references array, verification checkboxes
        
        7. BACKGROUND CHECK
           - Show background check status
           - Pass/Fail/Pending
           - Implementation: Add background check state, status badge
        
        8. SALARY NEGOTIATION
           - Expected salary vs offered salary
           - Negotiation history
           - Implementation: Add salary range state, edit capability
        
        9. OFFER LETTER GENERATION
           - Generate and download offer letter PDF
           - Customize terms
           - Implementation: Add PDF library, template
        
        10. BULK EMAIL TEMPLATE
            - Send templated emails to candidate
            - Pre-written templates for each stage
            - Implementation: Add email templates, modal with options
      */}
    </div>
  );
};

export default CandidateProfile;
