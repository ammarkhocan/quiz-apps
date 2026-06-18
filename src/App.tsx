import { Navigate } from "react-router-dom";

export default function App() {
  const username = localStorage.getItem("username");

  if (username) {
    return <Navigate to="/dashboard" />;
  }

  return <Navigate to="/login" />;
}
