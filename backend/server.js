const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
require("dotenv").config();

const publicRoutes = require("./routes/publicRoutes");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use('/patients', patientRoutes);
app.use("/", publicRoutes);

const PORT = process.env.PORT || 5001;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
