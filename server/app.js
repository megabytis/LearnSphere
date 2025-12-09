const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");
const express = require("express");

const { connectDB } = require("./src/config/database");
const authRouter = require("./src/modules/auth/auth.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// Global Error handler
app.use((err, req, res, next) => {
  res.status(err.ststusCode || 500).json({
    message: `ERROR: ${err.message}`,
  });
});

connectDB()
  .then(() => {
    console.log("DataBase is connected to App.");
    app.listen(8888, () => {
      console.log("Server is listening on port 8888");
    });
  })
  .catch((err) => {
    console.log("Database conenction Error:", err);
  });
