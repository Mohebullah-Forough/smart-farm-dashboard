const express = require("express");
const cors = require("cors");
const sensorRoutes = require("./routes/sensorRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/sensors", sensorRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});