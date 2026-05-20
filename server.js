require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const adminRoutes = require("./routes/admin");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("API Working");
});

app.use("/api/admin", adminRoutes);

app.use("/api/pilgrims", require("./routes/pilgrimRoutes"));
app.use("/api/darshan", require("./routes/darshanRoutes"));
app.use("/api/facilities", require("./routes/facilityRoutes"));
app.use("/api/sos", require("./routes/SOSRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});