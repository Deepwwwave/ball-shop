import express from "express";
import { getAllUsers } from "../../../controllers/user.controller.js";
import { addProduct, deleteProduct, editProduct } from "../../../controllers/product.controller.js";
import { getAllOrders } from "../../../controllers/order.controller.js"
import { refreshToken, checkTokenAdmin } from "../../../middlewares/auth.js"; // Middlewares d'authentification, vérification du token jwt.

const router = express.Router();

// Admin panel : CRUD
router.get("/getAllUsers", refreshToken, checkTokenAdmin, getAllUsers);
router.get("/getAllOrders", refreshToken, checkTokenAdmin, getAllOrders);
router.post("/addProduct", refreshToken, checkTokenAdmin, addProduct);
router.patch("/editProduct/:id", refreshToken, checkTokenAdmin, editProduct);
router.delete("/deleteProduct/:id", refreshToken, checkTokenAdmin, deleteProduct);

export default router;