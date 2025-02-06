import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPatients, addMedicalRecord } from "../api/api";
import { isAuthenticated } from "../api/auth";

const PractitionerDashboard = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [recordType, setRecordType] = useState("allergies");
  const [recordData, setRecordData] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    } else {
      loadPatients();
    }
  }, []);

  const loadPatients = async () => {
    try {
      const data = await fetchPatients();
      setPatients(data);
      if (data.length > 0) setSelectedPatient(data[0].id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddRecord = async () => {
    if (!selectedPatient || !Object.values(recordData).some(Boolean)) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await addMedicalRecord(selectedPatient, recordType, recordData);
      setMessage("Record added successfully!");
      setRecordData({});
    } catch (err) {
      setError(err);
    }
  };

  const handleInputChange = (e) => {
    setRecordData({ ...recordData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto practitioner-container">
      <h1 className="text-2xl font-semibold mb-4">Practitioner Dashboard</h1>

      <label className="block mb-2">Select Patient:</label>
      <select
        value={selectedPatient}
        onChange={(e) => setSelectedPatient(e.target.value)}
        className="form-select"
      >
        {patients.map((patient) => (
          <option key={patient.id} value={patient.id}>
            {patient.fullName} - {patient.gender}
          </option>
        ))}
      </select>

      <label className="block mb-2">Record Type:</label>
      <select
        value={recordType}
        onChange={(e) => setRecordType(e.target.value)}
        className="form-select"
      >
        <option value="allergies">Allergies</option>
        <option value="lab-orders">Lab Orders</option>
        <option value="lab-results">Lab Results</option>
        <option value="prescriptions">Prescriptions</option>
      </select>

      {recordType === "allergies" && (
        <>
            <input
            type="text"
            name="allergy"
            placeholder="Allergy"
            className="form-input"
            value={recordData.allergy || ""}
            onChange={handleInputChange}
            />
            <select
            name="severity"
            className="form-select"
            value={recordData.severity || ""}
            onChange={handleInputChange}
            >
            <option value="">Select Severity</option>
            <option value="Mild">Mild</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
            </select>
        </>
       )}

      {recordType === "lab-orders" && (
        <input
          type="text"
          name="testName"
          placeholder="Test Name"
          className="form-input"
          value={recordData.testName || ""}
          onChange={handleInputChange}
        />
      )}

      {recordType === "lab-results" && (
        <>
          <input
            type="text"
            name="testName"
            placeholder="Test Name"
            className="form-input"
            value={recordData.testName || ""}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="result"
            placeholder="Result"
            className="form-input"
            value={recordData.result || ""}
            onChange={handleInputChange}
          />
        </>
      )}

      {recordType === "prescriptions" && (
        <>
          <input
            type="text"
            name="medication"
            placeholder="Medication"
            className="form-input"
            value={recordData.medication || ""}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="dosage"
            placeholder="Dosage"
            className="form-input"
            value={recordData.dosage || ""}
            onChange={handleInputChange}
          />
          <textarea
            name="instructions"
            placeholder="Instructions"
            className="form-textarea"
            value={recordData.instructions || ""}
            onChange={handleInputChange}
          ></textarea>
        </>
      )}

      <button onClick={handleAddRecord} className="form-button">
        Add Record
      </button>

      {message && <p className="text-green-500 mt-3 success-message">{message}</p>}
      {error && <p className="text-red-500 mt-3 error-message">{error}</p>}
    </div>
  );
};

export default PractitionerDashboard;
