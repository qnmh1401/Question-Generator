import React from "react";
import { useAuth } from "../context/auth.context.jsx";

export default function TeacherRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <h3>Please login</h3>;
  if (user.role !== "teacher") return <h3>Only teachers allowed</h3>;
  return children;
}
