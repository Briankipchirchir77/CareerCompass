import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
import Recommendations from "./pages/Recommendations";
import Roadmap from "./pages/Roadmap";
import Analytics from "./pages/Analytics";
import AiCoach from "./pages/AiCoach";
import Coaches from "./pages/Coaches";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import CBC from "./pages/CBC";
import ParentPortal from "./pages/ParentPortal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/assessment" element={<Assessment />} />
      <Route path="/recommendations" element={<Recommendations />} />
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/ai-coach" element={<AiCoach />} />
      <Route path="/coaches" element={<Coaches />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/cbc" element={<CBC />} />
      <Route path="/parent-portal" element={<ParentPortal />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
