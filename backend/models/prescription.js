module.exports = (sequelize, DataTypes) => {
    const Prescription = sequelize.define("Prescription", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      medication: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dosage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      instructions: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });
  
    return Prescription;
  };
  