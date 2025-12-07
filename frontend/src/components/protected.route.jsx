import React from "react";
import { useAuth } from "../context/auth.context.jsx";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to='/login' />;
  return children;
}
