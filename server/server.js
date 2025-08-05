import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import { connectDB } from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
connectDB();
const mongoURI = process.env.MONGO_URI;

mongoose.connect("mongodb+srv://anamtasajidali:tntoXYTekmOOOfv2@cluster2.ssxjxkc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2")
.then(() => {
    console.log("MongoDB connected");
  })

const app = express();
app.use(cors({
    origin: process.env.FRONT_END_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// For image uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

app.get('/', (req,res) =>{
    res.send('server is working')
})

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
