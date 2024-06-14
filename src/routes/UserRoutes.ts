import express from "express";
import UserController from "../controller/UserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

router.post("/", jwtCheck, UserController.createCurrentUser);
router.put("/", jwtCheck, jwtParse, validateMyUserRequest, UserController.updateUser);

export default router;