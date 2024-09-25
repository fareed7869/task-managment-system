import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectDB, sequelize } from "./db/dbConnection.js";
import taskRoutes from "./routes/taskRoute.js";


dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync({ alter: true }); // Use `alter: true` to update schema without losing data
    console.log("Database synced successfully!");

    // Start the server only after successful DB connection
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1); // Exit the process if there are errors during startup
  }
};

// Routes
app.use("/api/tasks", taskRoutes);

// Start the server
startServer();

