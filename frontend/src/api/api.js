// src/api/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5001"; // Update this based on your backend URL

const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
    return response.data; // Should return the JWT token
  } catch (error) {
    throw error.response?.data?.message || "Login failed!";
  }
};

export const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
};

export const fetchPatients = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/patients`, getAuthHeaders());
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch patients.";
    }
};

export const addMedicalRecord = async (patientId, recordType, data) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/patients/${patientId}/${recordType}`,
        data,
        getAuthHeaders()
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to add record.";
    }
};

export const fetchPatientRecords = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/patients/medical-history`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch records.";
  }
};
