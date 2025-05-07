const express = require("express");
const cors = require("cors");
const path = require("path");

const fileRoutes = require("./routes/fileRoutes");
const queryRoutes = require("./routes/queryRoutes");

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/getUploads", express.static(path.join(__dirname, "uploads")));

app.use("/upload", fileRoutes);
app.use("/ask", queryRoutes);

app.listen(PORT, () => {
  console.log(`Server started on Port: ${PORT}`);
});
