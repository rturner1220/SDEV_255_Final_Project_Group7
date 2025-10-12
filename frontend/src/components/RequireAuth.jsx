// frontend/src/components/RequireAuth.jsx
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const token = localStorage.getItem("token");   // you set this on login/register
  const location = useLocation();

  if (!token) {
    // send user to login and remember where they were going
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
