import { Navigate } from "react-router-dom";

export default function RequireRole({ role, children }) {
  const current = localStorage.getItem("role"); // "teacher" | "user"
  if (current !== role) return <Navigate to="/" replace />;
  return children;
}
