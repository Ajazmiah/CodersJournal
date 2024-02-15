import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

connectDb();

app.use(express.json()); // if clinets send data to user(no form)
app.use(express.urlencoded({ extended: true })); // client sends data using HTML form or URL-encoded format

app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/blog", blogRoutes);

//app.use(express.static(path.join(__dirname, "public")));

app.use(errorHandler);
app.use(notFound);

app.listen(port, () => console.log(`Server started on ${port}`));