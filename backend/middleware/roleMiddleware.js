const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Patient } = require("../models"); // Assuming you have a Patient model

const verifyPractitioner = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "practitioner") {
      return res.status(403).json({ error: "Access denied. Practitioners only." });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (decoded.role === "practitioner") {
      return next();
    }

    // Check if the user is the patient associated with the patient ID
    const patient = await Patient.findByPk(req.params.id);
    if (patient && patient.userId === decoded.id) {
      return next();
    }

    return res.status(403).json({ error: "Access denied" });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

const verifyAnyToken = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { verifyPractitioner, verifyToken, verifyAnyToken };