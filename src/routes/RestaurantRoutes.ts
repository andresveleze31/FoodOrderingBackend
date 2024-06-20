import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import multer from "multer";
import { createRestaurant } from "../controller/RestaurantController";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  createRestaurant
);

export default router;
