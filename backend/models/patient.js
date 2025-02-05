module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define("Patient", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female", "Other"),
        allowNull: false,
      },
      contactInfo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {  // Foreign key to User model
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Name of the User table
          key: 'id'
        }
      }
    });

    // Patient.associate = (models) => {
    //   Patient.belongsTo(models.User, { foreignKey: "userId" });
    // };

    return Patient;
};
  
  