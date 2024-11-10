import express from "express";
import cors from "cors";
import "dotenv/config";
import songRouter from "./src/routes/songRoute.js";
import connectDB from "./src/config/mongodb.js";
import connectCloduinary from "./src/config/cloudinary.js";
import albumRouter from "./src/routes/albumRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;
// database connection
connectDB();
// connect to cloudinary
connectCloduinary();

// Middleware for parsing form data
// app.use(express.urlencoded({ extended: true }));

// middleware
app.use(express.json());

// to connect frontend with backend
app.use(cors());

// initializing routes
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);
app.get("/", (req, res) => res.send("API working"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
