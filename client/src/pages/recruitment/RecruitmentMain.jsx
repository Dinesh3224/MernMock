import React from 'react'
import {
  FiBriefcase,
  FiUsers,
  FiList,
  FiCalendar,
  FiCheckCircle,
  FiChevronRight,
  FiFileText,
} from 'react-icons/fi'
import { useNavigate } from "react-router-dom"

/*
  RecruitmentMain.jsx
  
  PRIMARY ENTRY POINT for the Recruitment Module.
  
  This page visualizes the complete recruitment workflow:
  
  WORKFLOW STAGES:
  1. Recruitment Main Page (THIS PAGE) ← START
     ↓
  2. Job Openings Page (manage roles)
     ↓
  3. Applicants for a Job (view applications)
     ↓
  4. Candidate Profile Page (individual candidate details)
     ↓
  5. Screening / Document Verification (verify qualifications)
     ↓
  6. Interview Pipeline (schedule & conduct interviews)
     ↓
  7. Offer & Joining (send offers, onboarding handoff)
     ↓
  8. Onboarding Module (transitions to HR onboarding)
  
  PAGE SECTIONS:
  1. Header: Title + "Create Job Opening" CTA
  2. KPI Cards: Snapshot of workflow stages (Open Positions, New Applicants, etc.)
  3. Pipeline Snapshot: Horizontal progression view
  4. Quick Navigation: Entry points to each workflow stage
  5. Recent Activity: Mock activity log showing movement through workflow
  
  Technical:
  - UI only (no backend, no API calls)
  - Static mock data
  - Well-commented for future extension
*/

const RecruitmentMain = () => {
  const navigate = useNavigate()
  
  /*
    Mock KPI data representing key workflow stages.
    Each KPI corresponds to a step in the recruitment journey:
    
    1. Open Positions → Job Openings Page
    2. New Applicants → Applicants for a Job Page
    3. In Screening → Screening / Document Verification Page
    4. Interviews Scheduled → Interview Pipeline Page
  */
  const kpis = [
    {
      label: 'Open Positions',
      value: 12,
      description: 'Active job openings',
      icon: <FiBriefcase className="text-orange-500" />,
      stage: 'Job Management',
    },
    {
      label: 'New Applicants',
      value: 34,
      description: 'Unreviewed applications',
      icon: <FiUsers className="text-orange-500" />,
      stage: 'Initial Review',
    },
    {
      label: 'In Screening',
      value: 18,
      description: 'Candidates being evaluated',
      icon: <FiList className="text-orange-500" />,
      stage: 'Screening Phase',
    },
    {
      label: 'Interviews',
      value: 7,
      description: 'Scheduled interviews',
      icon: <FiCalendar className="text-orange-500" />,
      stage: 'Interview Phase',
    },
  ]

  /*
    Pipeline data visualizing the progression from application to onboarding.
    Reflects the 5 major workflow stages visible on this hub page.
  */
  const pipeline = [
    { name: 'Resume Review', count: 24, pct: 40, stage: 'Initial screening' },
    { name: 'Screening', count: 18, pct: 30, stage: 'Document verification' },
    { name: 'Interview', count: 7, pct: 12, stage: 'Multiple rounds' },
    { name: 'Offer', count: 3, pct: 5, stage: 'Negotiation' },
    { name: 'Onboarding', count: 2, pct: 3, stage: 'Transition to HR' },
  ]

  /*
    Quick Navigation: Entry points to each workflow stage.
    Each card represents a distinct page/workflow in the recruitment module.
    
    Navigation Flow:
    1. Job Openings → Manage roles (STAGE 2)
    2. Resume Library → Global applicant pool (STAGE 2-3)
    3. Shortlisted Candidates → Screening flow (STAGE 4-5)
    4. Interview Pipeline → Interview stages (STAGE 6)
    5. Offers & Joining → Onboarding handoff (STAGE 7-8)
  */
  const quickNav = [
    {
      title: 'Job Openings',
      desc: 'Create and manage job postings',
      icon: <FiBriefcase />,
      stage: 'Step 2',
      order: 1,
    },
    {
      title: 'Resume Library',
      desc: 'Browse all applications and candidates',
      icon: <FiFileText />,
      stage: 'Step 2-3',
      order: 2,
    },
    {
      title: 'Shortlisted Candidates',
      desc: 'View & manage shortlisted profiles',
      icon: <FiUsers />,
      stage: 'Step 4-5',
      order: 3,
    },
    {
      title: 'Interview Pipeline',
      desc: 'Schedule and track interviews',
      icon: <FiCalendar />,
      stage: 'Step 6',
      order: 4,
    },
    {
      title: 'Offers & Joining',
      desc: 'Send offers and coordinate joining',
      icon: <FiCheckCircle />,
      stage: 'Step 7-8',
      order: 5,
    },
  ]

  /*
    Recent Activity Feed: Shows movement through workflow stages.
    Reinforces the multi-page navigation flow to HR users.
  */
  const activities = [
    'John Doe shortlisted for Frontend Developer (moved to screening)',
    'Interview scheduled for UI Designer on 2026-01-30',
    'Offer sent to Backend Engineer - awaiting response',
    'New application: Jane Smith for PHP Developer (in review)',
    'Robert Chen completed onboarding handoff',
  ]

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Recruitment</h2>
          <p className="text-sm text-gray-500">Overview of hiring activities</p>
        </div>

        <div>
          <button
            onClick={() => navigate("/recruitment/jobs")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg shadow-sm hover:bg-orange-600 transition"
          >
            <FiBriefcase />
            <span>Go to Job Openings</span>
          </button>
        </div>
      </div>

      {/* KPI / Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-gray-500">{k.label}</div>
                <div className="mt-2 text-2xl font-semibold text-gray-900">{k.value}</div>
              </div>
              <div className="text-2xl">{k.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recruitment Pipeline Snapshot */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Recruitment Pipeline</h3>
        <div className="flex items-center gap-4">
          {pipeline.map((s) => (
            <div key={s.name} className="flex-1 bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-800">{s.name}</div>
                <div className="text-sm text-gray-500">{s.count}</div>
              </div>
              <div className="mt-3 h-2 bg-white rounded-full overflow-hidden border border-gray-100">
                <div className="h-2 bg-orange-400 rounded-full" style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Quick Navigation */}
        <div className="col-span-2">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Navigation</h3>
            <div className="grid grid-cols-3 gap-3">
              {quickNav.map((q) => {
                const handleNavigation = () => {
                  if (q.title === 'Job Openings') navigate('/recruitment/jobs');
                  else if (q.title === 'Interview Pipeline') navigate('/recruitment/pipeline');
                  else if (q.title === 'Offers & Joining') navigate('/recruitment/offers-joining');
                  else if (q.title === 'Resume Library') alert('Resume Library - Coming Soon');
                  else if (q.title === 'Shortlisted Candidates') alert('Shortlisted Candidates - Coming Soon');
                };
                return (
                  <button 
                    key={q.title} 
                    onClick={handleNavigation}
                    className="text-left p-3 bg-gray-50 rounded-lg hover:shadow-md transition border border-transparent hover:border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 text-orange-600 rounded-md">{q.icon}</div>
                      <div>
                        <div className="font-semibold text-gray-900">{q.title}</div>
                        <div className="text-sm text-gray-500">{q.desc}</div>
                      </div>
                      <div className="ml-auto text-gray-300"><FiChevronRight /></div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional commented upgrades */}
          {/*
            Optional upgrades (not implemented):
            - Analytics charts (hiring trends)
            - SLA indicators (time-to-hire)
            - Recruiter performance metrics
            - Export reports
            - AI resume match score
            - Bulk actions
          */}
        </div>

        {/* Recent Activity Feed */}
        <div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Activity</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {activities.map((a, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 bg-orange-400 rounded-full flex-shrink-0" />
                  <div>{a}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecruitmentMain
