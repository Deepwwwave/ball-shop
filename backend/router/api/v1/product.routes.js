import express from "express";
import { getAllProducts, getOneProduct } from "../../../controllers/product.controller.js";

const router = express.Router();

//Shop : Vitrine produit
router.get("/", getAllProducts);
router.get("/:id", getOneProduct);

export default router;

