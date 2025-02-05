module.exports = (sequelize, DataTypes) => {
    const LabResult = sequelize.define("LabResult", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      testName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      result: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    });
  
    // LabResult.associate = (models) => {
    //   LabResult.belongsTo(models.Patient, { foreignKey: "patientId" });
    // };
  
    return LabResult;
  };
  