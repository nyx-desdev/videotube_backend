// sets up express server
// sets up cors to allow for cross origin resource sharing
// sets up body parsing for json and url encoded data
// sets up static file serving for public folder
// sets up cookie parsing for express
//
// exports the express app

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRoutes from "./routes/user.routes.js";


//routes declaration  
app.use("/api/v1/users", userRoutes);

export { app };



