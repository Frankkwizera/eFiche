const { Patient, Allergy, LabOrder, LabResult, Prescription } = require('../models');
const { Op } = require('sequelize');

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getMedicalHistory = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return res.status(404).send('Patient not found');
    }

    const allergies = await Allergy.findAll({ where: { patientId: patient.id } });
    const labOrders = await LabOrder.findAll({ where: { patientId: patient.id } });
    const labResults = await LabResult.findAll({ where: { patientId: patient.id } });
    const prescriptions = await Prescription.findAll({ where: { patientId: patient.id } });

    res.json({
      allergies,
      labOrders,
      labResults,
      prescriptions
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.searchPatients = async (req, res) => {
  try {
    const { name, id } = req.query;

    if (!name && !id) {
      return res.status(400).send('At least one search parameter (name or id) is required');
    }

    const searchConditions = [];
    if (name) {
      searchConditions.push({ fullName: { [Op.iLike]: `%${name}%` } });
    }
    if (id) {
      searchConditions.push({ id: { [Op.eq]: id } });
    }

    const patients = await Patient.findAll({
      where: {
        [Op.and]: searchConditions
      }
    });

    if (patients.length === 0) {
      return res.status(404).send('No patients found');
    }

    res.json(patients);
  } catch (err) {
    console.error('Error searching patients:', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.addAllergy = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return res.status(404).send('Patient not found');
    }

    const { allergy, severity } = req.body;
    if (!allergy || !severity) {
      return res.status(400).send('Allergy and severity are required');
    }

    const newAllergy = await Allergy.create({ patientId: patient.id, allergy, severity });
    res.status(201).json(newAllergy);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.addLabOrder = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return res.status(404).send('Patient not found');
    }

    const { testName } = req.body;
    if (!testName) {
      return res.status(400).send('Test name is required');
    }

    const newLabOrder = await LabOrder.create({ patientId: patient.id, testName });
    res.status(201).json(newLabOrder);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.addLabResult = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return res.status(404).send('Patient not found');
    }

    const { testName, result } = req.body;
    if (!testName || !result) {
      return res.status(400).send('Test name and result are required');
    }

    const newLabResult = await LabResult.create({ patientId: patient.id, testName, result });
    res.status(201).json(newLabResult);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.addPrescription = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return res.status(404).send('Patient not found');
    }

    const { medication, dosage, instructions } = req.body;
    if (!medication || !dosage || !instructions) {
      return res.status(400).send('All fields are required');
    }

    const newPrescription = await Prescription.create({
      patientId: patient.id,
      medication,
      dosage,
      instructions
    });
    res.status(201).json(newPrescription);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
