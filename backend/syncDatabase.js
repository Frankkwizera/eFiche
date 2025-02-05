const { sequelize } = require("./models");

(async () => {
  try {
    await sequelize.sync({ force: true }); // WARNING: `force: true` will drop and recreate tables
    console.log("Database & tables created!");
    process.exit();
  } catch (err) {
    console.error("Error syncing database:", err);
    process.exit(1);
  }
})();