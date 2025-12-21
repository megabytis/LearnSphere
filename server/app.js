const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");

const { connectDB } = require("./src/config/database");
const authRouter = require("./src/modules/auth/auth.routes");
const coursesRouter = require("./src/modules/course/course.routes");
const lessonRouter = require("./src/modules/lesson/lesson.routes");
const enrollmentRouter = require("./src/modules/enrollments/enrollment.routes");

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:5174",
        process.env.FRONTEND_URL,
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/courses", coursesRouter);
app.use("/courses", lessonRouter);
app.use("/", enrollmentRouter);

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
