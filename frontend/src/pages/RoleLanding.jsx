import { Navigate } from "react-router-dom";
import Home from "./Home";

const RoleLanding = () => {
  const role = localStorage.getItem("role");
  // Student goes straight to Student dashboard
  if (role === "user") return <Navigate to="/student" replace />;
  // Teacher keeps the existing Home landing
  return <Home />;
};

export default RoleLanding;