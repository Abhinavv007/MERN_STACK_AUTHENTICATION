import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import authController from "../controllers/authController.js"
const router  = express.Router()

router.post("/users/register",authController.userRegistration)
router.post("/users/login",authController.userLogin)
router.post("/change-password/:id",verifyToken,authController.changePassword)
export default router