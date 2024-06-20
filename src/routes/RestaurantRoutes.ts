import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import multer from "multer";
import RestaurantController from "../controller/RestaurantController";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});

router.get("/", jwtCheck, jwtParse, RestaurantController.getMyRestaurant);

router.post(
  "/",
  upload.single("imageFile"),
  jwtCheck,
  jwtParse,
  RestaurantController.createRestaurant
);

export default router;
