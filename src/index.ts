import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/UserRoutes";

mongoose
  .connect(process.env.MONGO_STRING_CON as string)
  .then(() => console.log("Connected to DB"));

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Health OK!" });
});

app.use("/api/my/user", userRoutes);

app.listen(7000, () => {
  console.log("Server Started");
});
