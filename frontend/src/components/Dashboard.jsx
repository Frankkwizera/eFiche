import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../api/auth";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, []);

  return (
    <div className="p-5">
      <h1>Welcome to the Dashboard</h1>
    </div>
  );
};

export default Dashboard;
