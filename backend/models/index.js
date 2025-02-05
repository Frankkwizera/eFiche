const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = require("./user")(sequelize, Sequelize);
const Patient = require("./patient")(sequelize, Sequelize);
const Allergy = require("./allergy")(sequelize, Sequelize);
const LabOrder = require("./laborder")(sequelize, Sequelize);
const LabResult = require("./labresult")(sequelize, Sequelize);
const Prescription = require("./prescription")(sequelize, Sequelize);

// Relationships
User.hasMany(Patient, { foreignKey: "userId" });
Patient.belongsTo(User, { foreignKey: "userId" });

Patient.hasMany(Allergy, { foreignKey: "patientId" });
Patient.hasMany(LabOrder, { foreignKey: "patientId" });
Patient.hasMany(LabResult, { foreignKey: "patientId" });
Patient.hasMany(Prescription, { foreignKey: "patientId" });

module.exports = { 
    sequelize, User, Patient, 
    Allergy, LabOrder, LabResult, Prescription 
};
