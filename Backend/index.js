import dotenv from 'dotenv';
import express from 'express'
import cors from 'cors'
import path from 'path'
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';



const app = express();

// Middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

dotenv.config();

//connect Db
connectDB();

//Middleware
app.use(express.json());



// Routes
   app.use("/api/auth", authRoutes);
   app.use("/api/employees", employeeRoutes);
//    app.use("/api/tasks", taskRoutes);
//    app.use("/api/reports", reportRoutes);


   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => console.log(`server running on port ${PORT}`));