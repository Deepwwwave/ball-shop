import express from "express";
import customerRoutes from "./api/v1/customer.routes.js";
import productRoutes from "./api/v1/product.routes.js";
import adminRoutes from "./api/v1/admin.routes.js";

const router = express.Router();

router.use("/api/v1/product", productRoutes);
router.use("/api/v1/customer", customerRoutes);
router.use("/api/v1/admin", adminRoutes);


export default router;
