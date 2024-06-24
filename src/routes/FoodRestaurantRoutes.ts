import express from "express";
import { param } from "express-validator";
import FoodRestaurantController from "../controller/FoodRestaurantController";

const router = express.Router();

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .withMessage("City parameter must be valid string"),
    FoodRestaurantController.searchRestaurants
);

export default router;


