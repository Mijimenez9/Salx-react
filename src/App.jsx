import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ScheduleExam from './pages/ScheduleExam';
import CancelReschedule from './pages/CancelReschedule';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import CreateExam from './components/CreateExam';
import CaptureGrades from './components/CaptureGrades';
import SearchStudents from './components/SearchStudents';
import Statistics from './components/Statistics';
import RescheduleExam from './components/RescheduleExam';
import './App.css';
import { fetchStatistics, adminLogin, createExam, captureGrades, searchStudent, cancelOrRescheduleExam } from './services/apiService';

const App = () => {
  const handleAdminLogin = async (credentials) => {
    const response = await adminLogin(credentials);
    return response.success;
  };

  const handleCreateExam = async (examData) => {
    await createExam(examData);
  };

  const handleCaptureGrades = async (gradesData) => {
    await captureGrades(gradesData);
  };

  const handleSearchStudent = async (controlNumber) => {
    return await searchStudent(controlNumber);
  };

  const handleCancelOrRescheduleExam = async (actionData) => {
    await cancelOrRescheduleExam(actionData);
  };

  const fetchStatisticsData = async () => {
    return await fetchStatistics();
  };

  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/schedule-exam" element={<ScheduleExam />} />
            <Route
              path="/cancel-reschedule"
              element={<CancelReschedule onCancel={handleCancelOrRescheduleExam} onReschedule={handleCancelOrRescheduleExam} />}
            />
            <Route path="/admin" element={<AdminLogin onLogin={handleAdminLogin} />} />
            <Route path="/admin/dashboard" element={<AdminPanel />} />
            <Route path="/admin/create-exam" element={<CreateExam onCreateExam={handleCreateExam} />} />
            <Route path="/admin/capture-grades" element={<CaptureGrades students={[]} onGradesSubmit={handleCaptureGrades} />} />
            <Route path="/admin/search-students" element={<SearchStudents onSearch={handleSearchStudent} />} />
            <Route path="/admin/statistics" element={<Statistics fetchStatistics={fetchStatisticsData} />} />
            <Route path="/reschedule-exam" element={<RescheduleExam />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;