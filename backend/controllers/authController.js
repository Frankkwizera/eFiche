const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, Patient } = require("../models");
require("dotenv").config();

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.register = async (req, res) => {
  try {
    const { username, password, role, fullName, age, gender, contactInfo } = req.body;
    if (!["practitioner", "patient"].includes(role)) {
      return res.status(400).json({ error: "Invalid role. Role must be either 'practitioner' or 'patient'." });
    }

    const user = await User.create({ username, password, role });
    if (role === "patient") {
      await Patient.create({
        fullName,
        age,
        gender,
        contactInfo,
        userId: user.id,
      });
    }
    console.log("User registered", user);
    res.json({ message: "User registered successfully", user });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: "Validation error: " + error.errors.map(e => e.message).join(", ") });
    }
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: "Username already exists. Please choose a different username." });
    }
    console.error("Registration error:", error);
    res.status(500).json({ error: "An unexpected error occurred during registration. Please try again later." });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ error: "Invalid credentials" });

    res.json({ token: generateToken(user) });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};
