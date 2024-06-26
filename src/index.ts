import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/UserRoutes";
import restaurantRoutes from "./routes/RestaurantRoutes";
import foodResRoutes from "./routes/FoodRestaurantRoutes";
import orderRoutes from "./routes/OrderRoute";

import { v2 as cloudinary } from "cloudinary";

mongoose
  .connect(process.env.MONGO_STRING_CON as string)
  .then(() => console.log("Connected to DB"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json({ limit: "50mb" }));

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Health OK!" });
});

app.use("/api/my/user", userRoutes);
app.use("/api/my/restaurant", restaurantRoutes);
app.use("/api/restaurant", foodResRoutes);
app.use("/api/order", orderRoutes);

app.listen(7000, () => {
  console.log("Server Started");
});
