import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      {/* Redirect root "/" to "/login" */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Login page without layout header/sidebar */}
      <Route path="/login" element={<Login />} />

      {/* Pages that use the main Layout (Sidebar + Navbar) */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}