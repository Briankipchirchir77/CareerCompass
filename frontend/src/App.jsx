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
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/assessment" element={<ProtectedRoute><Assessment /></ProtectedRoute>} />
      <Route path="/recommendations" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
      <Route path="/roadmap" element={<ProtectedRoute><Roadmap /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/ai-coach" element={<ProtectedRoute><AiCoach /></ProtectedRoute>} />
      <Route path="/coaches" element={<ProtectedRoute><Coaches /></ProtectedRoute>} />
      <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/cbc" element={<ProtectedRoute><CBC /></ProtectedRoute>} />
      <Route path="/parent-portal" element={<ProtectedRoute><ParentPortal /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;