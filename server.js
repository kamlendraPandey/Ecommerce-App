import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRouter.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
import productRoutes from "./routes/ProductRoutes.js";
import Cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
//config env
dotenv.config();

//database config
connectDB();

//ES Module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//rest object
const app = express();

//middleware
app.use(Cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api

// USE THIS CODE BEFORE DEPLOYMENT
// app.get("/", (req, res) => {
//   res.send({
//     message: "welcome to ecommerce application",
//   });
// });

// CODE AFTER DEPLOYMENT
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`server Running on ${process.env.DEV_MODE}`.bgMagenta.black);
});
