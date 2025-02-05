module.exports = (sequelize, DataTypes) => {
    const Allergy = sequelize.define("Allergy", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      allergy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      severity: {
        type: DataTypes.ENUM("Mild", "Moderate", "Severe"),
        allowNull: false,
      },
    });
  
    return Allergy;
  };
  