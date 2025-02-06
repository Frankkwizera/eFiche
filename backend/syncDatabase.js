const { sequelize, User, Patient, Allergy, LabOrder, LabResult, Prescription } = require("./models");

(async () => {
  try {
    await sequelize.sync({ force: true }); // WARNING: `force: true` will drop and recreate tables
    console.log("Database & tables created!");

    // Seed Users
    const user1 = await User.create({
      username: "eFichePatient",
      password: "eFiche123", // This will be hashed automatically
      role: "patient",
    });

    const user2 = await User.create({
      username: "eFichePractitioner",
      password: "eFiche123",
      role: "practitioner",
    });

    // Seed Patients
    const patient1 = await Patient.create({
      fullName: "eFiche Patient",
      age: 30,
      gender: "Male",
      contactInfo: "eFichePatient@example.com",
      userId: user1.id,
    });

    // Seed Allergies
    await Allergy.create({
      patientId: patient1.id,
      allergy: "Peanuts",
      severity: "Severe",
    });

    // Seed Lab Orders
    await LabOrder.create({
      patientId: patient1.id,
      testName: "Blood Test",
    });

    // Seed Lab Results
    await LabResult.create({
      patientId: patient1.id,
      testName: "Blood Test",
      result: "Normal",
    });

    // Seed Prescriptions
    await Prescription.create({
      patientId: patient1.id,
      medication: "Ibuprofen",
      dosage: "200mg",
      instructions: "Take one tablet every 8 hours",
    });

    console.log("Data seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("Error syncing database:", err);
    process.exit(1);
  }
})();