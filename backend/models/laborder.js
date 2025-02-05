module.exports = (sequelize, DataTypes) => {
    const LabOrder = sequelize.define("LabOrder", {
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
      status: {
        type: DataTypes.ENUM("Pending", "Completed", "Cancelled"),
        defaultValue: "Pending",
      },
    });
  
    // LabOrder.associate = (models) => {
    //   LabOrder.belongsTo(models.Patient, { foreignKey: "patientId" });
    // };
  
    return LabOrder;
  };
  