import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPatientRecords } from "../api/api";
import { isAuthenticated } from "../api/auth";
import LogoutButton from "./Logout";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState({
    patient: {},
    allergies: [],
    labOrders: [],
    labResults: [],
    prescriptions: []
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    } else {
      loadRecords();
    }
  }, []);

  const loadRecords = async () => {
    try {
      const data = await fetchPatientRecords();
      setRecords(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Patient Dashboard</h1>
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-2">Patient Information</h2>
        <p><strong>Name:</strong> {records.patient.fullName}</p>
        <p><strong>Age:</strong> {records.patient.age}</p>
        <p><strong>Gender:</strong> {records.patient.gender}</p>
        <p><strong>Contact Info:</strong> {records.patient.contactInfo || "N/A"}</p>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-2">Allergies</h2>
        <ul className="list-disc pl-4">
          {records.allergies.length > 0 ? (
            records.allergies.map((item, index) => (
              <li key={index}>{item.allergy} - {item.severity}</li>
            ))
          ) : (
            <p>No allergies recorded.</p>
          )}
        </ul>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-2">Lab Orders & Results</h2>
        <ul className="list-disc pl-4">
          {records.labOrders.length > 0 ? (
            records.labOrders.map((order, index) => {
              const result = records.labResults.find(res => res.testName === order.testName);
              return (
                <li key={index}>
                  <strong>{order.testName}</strong> - {order.status}
                  {result && <span> | Result: {result.result}</span>}
                </li>
              );
            })
          ) : (
            <p>No lab orders recorded.</p>
          )}
        </ul>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Prescriptions</h2>
        <ul className="list-disc pl-4">
          {records.prescriptions.length > 0 ? (
            records.prescriptions.map((item, index) => (
              <li key={index}>
                <strong>{item.medication}</strong> - {item.dosage}
                <p className="ml-4">{item.instructions}</p>
              </li>
            ))
          ) : (
            <p>No prescriptions recorded.</p>
          )}
        </ul>
      </div>
      <LogoutButton />
    </div>
  );
};

export default PatientDashboard;
