// routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { verifyPractitioner, verifyToken } = require('../middleware/roleMiddleware');

router.get('/', verifyPractitioner, patientController.getAllPatients);
router.get('/:id/medical-history', verifyToken, patientController.getMedicalHistory);
router.post('/:id/allergies', verifyPractitioner, patientController.addAllergy);
router.post('/:id/lab-orders', verifyPractitioner, patientController.addLabOrder);
router.post('/:id/lab-results', verifyPractitioner, patientController.addLabResult);
router.post('/:id/prescriptions', verifyPractitioner, patientController.addPrescription);

module.exports = router;
