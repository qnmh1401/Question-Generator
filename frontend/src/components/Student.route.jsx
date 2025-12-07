import React from "react";
import { useAuth } from "../context/auth.context.jsx";

export default function StudentRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <h3>Please login</h3>;
  if (user.role !== "student") return <h3>Only students allowed</h3>;
  return children;
}
