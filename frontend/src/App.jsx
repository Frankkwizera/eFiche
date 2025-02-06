
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PractitionerDashboard from "./pages/PractitionerDashboard";
import PatientDashboard from "./pages/PatientDashboard";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/practitioner" element={<PractitionerDashboard />} />
        <Route path="/patient" element={<PatientDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

