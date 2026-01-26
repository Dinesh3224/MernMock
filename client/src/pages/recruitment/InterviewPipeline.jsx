import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  ChevronLeft,
  User,
  Briefcase,
  Filter,
  ArrowRight,
  Clock,
  AlertCircle,
  CheckCircle,
  Home,
  Users
} from 'lucide-react';

/**
 * =====================================================
 * INTERVIEW PIPELINE PAGE
 * =====================================================
 * 
 * WORKFLOW POSITION:
 * Recruitment Main 
 *   → Job Openings 
 *   → Applicants for a Job 
 *   → Candidate Profile 
 *   → [INTERVIEW PIPELINE PAGE] ← PROCESS VISIBILITY
 *   → Offers & Joining
 *   → Onboarding Module
 * 
 * PURPOSE:
 * This page is a CONTROL BOARD for process visibility.
 * HR can:
 * - See candidate distribution across interview stages
 * - Identify bottlenecks
 * - Move candidates between stages
 * - Quickly access candidate profiles
 * - Understand pipeline health at a glance
 * 
 * DESIGN:
 * Kanban-style layout with columns for each interview stage.
 * Each column shows candidates in cards, stacked vertically.
 * Horizontal scrolling supported for wider pipelines.
 * 
 * STAGES:
 * 1. Screening - Initial HR screening
 * 2. Technical Interview - Technical skills assessment
 * 3. Task/Assignment - Practical coding or design task
 * 4. HR Interview - Final HR round
 * 5. Final Review - Management review before offer
 * 
 * NAVIGATION:
 * - Candidate card click → Navigate to Candidate Profile page
 * - Move button → Updates stage (state-based, no separate page)
 * - Breadcrumb/back → Navigate to Recruitment Main
 * - No manual URL typing
 * 
 * ROUTING:
 * - Route: /recruitment/pipeline
 * - Self-contained with mock data
 * - Integrates with CandidateProfile via candidate ID
 */

// =====================================================
// INTERVIEW STAGES CONFIGURATION
// =====================================================
const INTERVIEW_STAGES = [
  {
    id: 'screening',
    name: 'Screening',
    description: 'HR screening',
    color: 'bg-blue-50',
    borderColor: 'border-blue-200',
    badgeColor: 'bg-blue-100 text-blue-800',
    icon: '📋'
  },
  {
    id: 'technical',
    name: 'Technical Interview',
    description: 'Technical assessment',
    color: 'bg-purple-50',
    borderColor: 'border-purple-200',
    badgeColor: 'bg-purple-100 text-purple-800',
    icon: '💻'
  },
  {
    id: 'task',
    name: 'Task/Assignment',
    description: 'Practical assignment',
    color: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    badgeColor: 'bg-yellow-100 text-yellow-800',
    icon: '✍️'
  },
  {
    id: 'hr',
    name: 'HR Interview',
    description: 'HR round',
    color: 'bg-green-50',
    borderColor: 'border-green-200',
    badgeColor: 'bg-green-100 text-green-800',
    icon: '👥'
  },
  {
    id: 'final',
    name: 'Final Review',
    description: 'Management review',
    color: 'bg-orange-50',
    borderColor: 'border-orange-200',
    badgeColor: 'bg-orange-100 text-orange-800',
    icon: '⭐'
  }
];

// =====================================================
// MOCK DATA: Candidates in Pipeline
// =====================================================
const mockPipelineData = [
  // Screening Stage
  {
    id: 1,
    name: 'Sarah Johnson',
    jobApplied: 'Frontend Developer',
    stage: 'screening',
    jobId: 1,
    daysInStage: 3,
    initials: 'SJ',
    avatar: '👩‍💼'
  },
  {
    id: 4,
    name: 'Michael Rodriguez',
    jobApplied: 'Frontend Developer',
    stage: 'screening',
    jobId: 1,
    daysInStage: 5,
    initials: 'MR',
    avatar: '👨‍💼'
  },
  // Technical Interview Stage
  {
    id: 2,
    name: 'Alex Chen',
    jobApplied: 'Frontend Developer',
    stage: 'technical',
    jobId: 1,
    daysInStage: 7,
    initials: 'AC',
    avatar: '👨‍💻'
  },
  {
    id: 6,
    name: 'James Wilson',
    jobApplied: 'Frontend Developer',
    stage: 'technical',
    jobId: 1,
    daysInStage: 2,
    initials: 'JW',
    avatar: '👨‍💼'
  },
  // Task/Assignment Stage
  {
    id: 3,
    name: 'Emma Davis',
    jobApplied: 'UI/UX Designer',
    stage: 'task',
    jobId: 2,
    daysInStage: 4,
    initials: 'ED',
    avatar: '👩‍🎨'
  },
  {
    id: 5,
    name: 'Priya Patel',
    jobApplied: 'Frontend Developer',
    stage: 'task',
    jobId: 1,
    daysInStage: 6,
    initials: 'PP',
    avatar: '👩‍💻'
  },
  // HR Interview Stage
  {
    id: 7,
    name: 'David Lee',
    jobApplied: 'Backend Engineer',
    stage: 'hr',
    jobId: 3,
    daysInStage: 1,
    initials: 'DL',
    avatar: '👨‍💼'
  },
  // Final Review Stage
  {
    id: 8,
    name: 'Jessica Brown',
    jobApplied: 'Senior Developer',
    stage: 'final',
    jobId: 1,
    daysInStage: 2,
    initials: 'JB',
    avatar: '👩‍💼'
  },
  {
    id: 9,
    name: 'Robert Taylor',
    jobApplied: 'Backend Engineer',
    stage: 'final',
    jobId: 3,
    daysInStage: 3,
    initials: 'RT',
    avatar: '👨‍💻'
  }
];

const InterviewPipeline = () => {
  const navigate = useNavigate();

  // =====================================================
  // STATE MANAGEMENT
  // =====================================================
  const [candidates, setCandidates] = useState(mockPipelineData);
  const [filterJob, setFilterJob] = useState('all'); // all, 1, 2, 3
  const [highlightedCandidateId, setHighlightedCandidateId] = useState(null);

  // =====================================================
  // FILTERING LOGIC
  // =====================================================
  const filteredCandidates = useMemo(() => {
    if (filterJob === 'all') return candidates;
    return candidates.filter(c => c.jobId === parseInt(filterJob));
  }, [candidates, filterJob]);

  // Get unique job IDs for filter dropdown
  const uniqueJobs = useMemo(() => {
    const jobs = new Set(candidates.map(c => c.jobId));
    return Array.from(jobs);
  }, [candidates]);

  // Get job name from ID (mock)
  const getJobName = (jobId) => {
    const jobNames = {
      1: 'Frontend Developer',
      2: 'UI/UX Designer',
      3: 'Backend Engineer'
    };
    return jobNames[jobId] || 'Unknown Role';
  };

  // =====================================================
  // HANDLERS
  // =====================================================
  const handleViewProfile = (candidateId) => {
    navigate(`/recruitment/candidates/${candidateId}`);
  };

  const handleMoveToNextStage = (candidateId) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (!candidate) return;

    const stages = INTERVIEW_STAGES.map(s => s.id);
    const currentIndex = stages.indexOf(candidate.stage);

    if (currentIndex < stages.length - 1) {
      const newStage = stages[currentIndex + 1];
      setCandidates(candidates.map(c =>
        c.id === candidateId
          ? { ...c, stage: newStage, daysInStage: 0 }
          : c
      ));
      setHighlightedCandidateId(candidateId);
      setTimeout(() => setHighlightedCandidateId(null), 2000);
    }
  };

  const handleMoveToPreviousStage = (candidateId) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (!candidate) return;

    const stages = INTERVIEW_STAGES.map(s => s.id);
    const currentIndex = stages.indexOf(candidate.stage);

    if (currentIndex > 0) {
      const newStage = stages[currentIndex - 1];
      setCandidates(candidates.map(c =>
        c.id === candidateId
          ? { ...c, stage: newStage, daysInStage: 0 }
          : c
      ));
      setHighlightedCandidateId(candidateId);
      setTimeout(() => setHighlightedCandidateId(null), 2000);
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  // Get candidates for a specific stage
  const getCandidatesInStage = (stageId) => {
    return filteredCandidates.filter(c => c.stage === stageId);
  };

  // Check if SLA is exceeded (more than 7 days)
  const isSlaBreach = (daysInStage) => daysInStage > 7;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* =====================================================
          HEADER SECTION
          ===================================================== */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-full px-6 py-6">

          {/* Page Title */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Interview Pipeline</h1>
              <p className="text-gray-600 mt-1">Track candidates across interview stages</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-orange-600">
                {filteredCandidates.length}
              </div>
              <p className="text-gray-600 text-sm">Active Candidates</p>
            </div>
          </div>

          {/* Filter Section */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-600" />
              <label className="text-sm font-medium text-gray-700">Filter by Job:</label>
            </div>
            <select
              value={filterJob}
              onChange={(e) => setFilterJob(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            >
              <option value="all">All Roles</option>
              {uniqueJobs.map(jobId => (
                <option key={jobId} value={jobId}>
                  {getJobName(jobId)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* =====================================================
          PIPELINE SECTION
          ===================================================== */}
      <div className="px-6 py-8">
        {filteredCandidates.length === 0 ? (
          /* EMPTY STATE */
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
            <Users className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No Candidates in Pipeline
            </h3>
            <p className="text-gray-600 mb-6">
              There are no candidates matching your filter. 
              Go to Applicants page to move candidates to the interview pipeline.
            </p>
            <button
              onClick={() => navigate('/recruitment/jobs')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              <Briefcase size={18} />
              Go to Job Openings
            </button>
          </div>
        ) : (
          /* KANBAN PIPELINE */
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-max">
              {/* Render each stage as a column */}
              {INTERVIEW_STAGES.map((stage) => {
                const stageCandidates = getCandidatesInStage(stage.id);
                return (
                  <div key={stage.id} className="flex-shrink-0 w-80">
                    {/* Stage Header */}
                    <div className={`${stage.color} ${stage.borderColor} border rounded-t-lg p-4 mb-0`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{stage.icon}</span>
                          <h3 className="font-semibold text-gray-900">{stage.name}</h3>
                        </div>
                        <div className={`${stage.badgeColor} px-3 py-1 rounded-full text-sm font-semibold`}>
                          {stageCandidates.length}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">{stage.description}</p>
                    </div>

                    {/* Candidates Container */}
                    <div className={`${stage.borderColor} border-l border-r border-b rounded-b-lg p-4 min-h-96 space-y-3 bg-white`}>
                      {stageCandidates.length === 0 ? (
                        /* Empty stage placeholder */
                        <div className="flex flex-col items-center justify-center h-32 text-center">
                          <AlertCircle size={24} className="text-gray-300 mb-2" />
                          <p className="text-xs text-gray-500">No candidates</p>
                        </div>
                      ) : (
                        /* Candidate Cards */
                        stageCandidates.map((candidate) => (
                          <div
                            key={candidate.id}
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                              highlightedCandidateId === candidate.id
                                ? 'border-orange-500 bg-orange-50 shadow-md'
                                : 'border-gray-200 bg-white hover:border-orange-300'
                            }`}
                          >
                            {/* Candidate Info */}
                            <div className="mb-3">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm font-semibold text-orange-700">
                                  {candidate.avatar}
                                </div>
                                <div className="flex-1">
                                  <button
                                    onClick={() => handleViewProfile(candidate.id)}
                                    className="font-semibold text-gray-900 hover:text-orange-600 transition-colors text-sm"
                                  >
                                    {candidate.name}
                                  </button>
                                </div>
                              </div>
                              <div className="ml-10">
                                <p className="text-xs text-gray-600">{candidate.jobApplied}</p>
                              </div>
                            </div>

                            {/* Days in Stage & SLA Warning */}
                            <div className="flex items-center gap-2 mb-3 text-xs">
                              <Clock size={14} className={isSlaBreach(candidate.daysInStage) ? 'text-red-500' : 'text-gray-400'} />
                              <span className={isSlaBreach(candidate.daysInStage) ? 'text-red-600 font-semibold' : 'text-gray-600'}>
                                {candidate.daysInStage} days
                              </span>
                              {isSlaBreach(candidate.daysInStage) && (
                                <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-semibold">
                                  SLA Breach
                                </span>
                              )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                              {/* Move Back Button */}
                              {stage.id !== 'screening' && (
                                <button
                                  onClick={() => handleMoveToPreviousStage(candidate.id)}
                                  className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-xs font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                                  title="Move to previous stage"
                                >
                                  <ChevronLeft size={14} />
                                </button>
                              )}

                              {/* Move Forward Button */}
                              {stage.id !== 'final' && (
                                <button
                                  onClick={() => handleMoveToNextStage(candidate.id)}
                                  className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-xs font-medium bg-orange-100 text-orange-700 border border-orange-300 rounded hover:bg-orange-200 transition-colors"
                                  title="Move to next stage"
                                >
                                  <ChevronRight size={14} />
                                </button>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* =====================================================
          LEGEND & INFO SECTION
          ===================================================== */}
      {filteredCandidates.length > 0 && (
        <div className="max-w-full px-6 py-6 bg-white border-t border-gray-200 mt-8">
          <div className="grid grid-cols-2 gap-8 max-w-3xl">
            {/* Legend */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Legend</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-400" />
                  <span>Days in current stage</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-semibold">SLA Breach</span>
                  <span>More than 7 days in stage</span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Pipeline Summary</h3>
              <div className="space-y-2 text-sm">
                {INTERVIEW_STAGES.map(stage => {
                  const count = getCandidatesInStage(stage.id).length;
                  return (
                    <div key={stage.id} className="flex items-center justify-between">
                      <span>{stage.name}</span>
                      <span className="font-semibold text-gray-900">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== OPTIONAL UPGRADE PLACEHOLDERS (COMMENTED) ===== */}
      {/* 
        FUTURE ENHANCEMENTS:
        
        1. DRAG-AND-DROP SUPPORT
           - Drag candidates between columns
           - Drop to move to new stage
           - Smooth animations
           - Implementation: react-beautiful-dnd or react-dnd
        
        2. INTERVIEW SCHEDULING MODAL
           - Click candidate → Open modal
           - Schedule interview date/time
           - Select interviewer
           - Implementation: Modal component + calendar picker
        
        3. INTERVIEW FEEDBACK FORMS
           - Submit feedback for each round
           - Rating scale, comments, recommendation
           - Implementation: Modal with form, save feedback state
        
        4. SLA TIMERS & ALERTS
           - Real-time countdown for SLA
           - Red background when breach imminent
           - Email notification system
           - Implementation: useEffect timer, notifications API
        
        5. CANDIDATE PROFILE DRAWER
           - Slide-out panel with candidate details
           - No page navigation
           - Quick actions (move stage, reject, etc.)
           - Implementation: Context-based drawer component
        
        6. STAGE FILTERS & SEARCH
           - Search candidates by name
           - Filter by date added, rating, etc.
           - Advanced filters
           - Implementation: Add search input, enhance filter logic
        
        7. BULK ACTIONS
           - Select multiple candidates
           - Move all to next stage
           - Mass email / communication
           - Implementation: Checkbox selection, bulk action buttons
        
        8. METRICS & ANALYTICS
           - Average time per stage
           - Conversion rates between stages
           - Funnel visualization
           - Implementation: Calculate metrics from data
        
        9. INTERVIEW NOTES PREVIEW
           - Hover to see notes from previous stage
           - Quick reference without navigation
           - Implementation: Tooltip component
        
        10. AUTOMATION RULES
            - Auto-move candidate after 5 days
            - Conditional stage progression
            - Notification triggers
            - Implementation: Background job scheduler, rules engine
      */}
    </div>
  );
};

export default InterviewPipeline;
