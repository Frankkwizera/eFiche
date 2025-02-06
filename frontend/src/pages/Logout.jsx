import { useNavigate } from "react-router-dom";
import { logout } from "../api/api";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <button onClick={handleLogout} className="form-button">
      Logout
    </button>
  );
};

export default LogoutButton;