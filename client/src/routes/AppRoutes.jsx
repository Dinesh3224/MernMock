import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import RecruitmentMain from "../pages/recruitment/RecruitmentMain";
import JobOpenings from "../pages/recruitment/JobOpenings";
import ApplicantsForJob from "../pages/recruitment/ApplicantsForJob";
import CandidateProfile from "../pages/recruitment/CandidateProfile";
import InterviewPipeline from "../pages/recruitment/InterviewPipeline";
import OffersAndJoining from "../pages/recruitment/OffersAndJoining";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/recruitment" element={<RecruitmentMain />} />
      <Route path="/recruitment/jobs" element={<JobOpenings />} />
      <Route path="/recruitment/jobs/:jobId/applicants" element={<ApplicantsForJob />} />
      <Route path="/recruitment/candidates/:candidateId" element={<CandidateProfile />} />
      <Route path="/recruitment/pipeline" element={<InterviewPipeline />} />
      <Route path="/recruitment/offers-joining" element={<OffersAndJoining />} />
      {/* More routes will be added here */}
    </Routes>
  );
};

export default AppRoutes;
