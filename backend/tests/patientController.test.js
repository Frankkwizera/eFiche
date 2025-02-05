// tests/patientController.test.js
const { getAllPatients } = require('../controllers/patientController');
const { Patient } = require('../models');

jest.mock('../models');

describe('Patient Controller', () => {
  describe('getAllPatients', () => {
    it('should return all patients', async () => {
      const req = {};
      const res = {
        json: jest.fn()
      };

      const mockPatients = [
        { id: 1, fullName: 'John Doe', age: 30, gender: 'Male' },
        { id: 2, fullName: 'Jane Doe', age: 25, gender: 'Female' }
      ];

      Patient.findAll.mockResolvedValue(mockPatients);

      await getAllPatients(req, res);

      expect(res.json).toHaveBeenCalledWith(mockPatients);
    });
  });
});