import express from "express";
import { signUp, validateAccount, signIn,forgottenPassword, updatePassword, getOneUser, editUser } from "../../../controllers/user.controller.js";
import { addOrder, confirmPayment } from "../../../controllers/order.controller.js"
import { checkTokenCustomer, refreshToken, renderToken } from "../../../middlewares/auth.js"; // Middlewares d'authentification, vérification du token jwt.
import { mediumLimiter, hardLimiter } from "../../../middlewares/ratelimit.js"; // Middleware de limitation de requêtes.
import { validateEmailAndPassword } from "../../../middlewares/validateEmailAndPassword.js";// Middleware de vérification du format de mot de passe.

const router = express.Router();

// Auth : connexion, validation e-mail, changement du mot de passe
router.post("/signUp", mediumLimiter, validateEmailAndPassword, signUp);
router.post("/signIn", mediumLimiter, signIn);
router.post("/forgottenPassword", mediumLimiter, forgottenPassword);
router.patch("/validateAccount/:uuid", checkTokenCustomer, validateAccount);
router.patch("/updatePassword/:uuid", hardLimiter, checkTokenCustomer, validateEmailAndPassword, updatePassword);
router.get("/refreshToken", refreshToken, renderToken);

// Infos customer
router.get("/profil/:uuid", refreshToken, checkTokenCustomer, getOneUser);
router.patch("/editUser/:uuid", refreshToken, checkTokenCustomer, editUser);

// Customer order
router.post("/addOrder", mediumLimiter, addOrder);
router.post("/confirmPayment", confirmPayment);



export default router;