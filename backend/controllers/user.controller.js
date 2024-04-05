import User from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { saltRounds } from "../config/index.js";
import jwt from "jsonwebtoken";
import { mailValidateAccount, mailForgottenPassword } from "../mail/mailing.js";

const { TOKEN_SECRET, TOKEN_SECRET_SESSION, DOMAINE_SERVER, DOMAINE_CLIENT } = process.env;

export const signUp = async (req, res, next) => {
   const query1 = "SELECT * from user WHERE email = ?";
   try {
      const result = await User.getOne(query1, req.body.email);
      if (result.length && result[0].validated !== "yes") {
         return res.status(401).json({ status: 401, msg: "Ce compte à déjà été créé mais l'e-mail de confirmation n'a pas été validé, veuiller vérifier dans votre adresse e-mail" });
      }
      if (result.length) {
         return res.status(409).json({ status: 409, msg: "Cet e-mail est déjà utilisé." });
      } else {
         const hash = await bcrypt.hash(req.body.password, saltRounds);
         const datas = {
            uuid: uuidv4(),
            email: req.body.email,
            password: hash,
         };
         const query2 = "INSERT INTO user (uuid, role, email, password, validated, firstname, lastname, address, code_zip, city, date) VALUES (?,'3',?,?,'no','nc','nc','nc','nc','nc',NOW())";
         await User.save(query2, datas);
         const user = await User.getOne(query1, datas.email);
         console.log(user);
         const PAYLOAD = { uuid: user[0].uuid, role: user[0].role, exp: Math.floor(Date.now() / 1000) + 60 * 60 };
         const TOKEN = jwt.sign(PAYLOAD, TOKEN_SECRET);
         console.log("Token JWT generated :", TOKEN);
         mailValidateAccount(req.body.email, "Validation du compte", "Bienvenue", "Encore une petite étape, cliquer sur le lien pour confirmer la validation du compte", user[0].uuid);
         return res.status(200).json({ status: 200, msg: "Bienvenue, un e-mail de confirmation vous a été envoyé pour finaliser votre compte !", token: TOKEN });
      }
   } catch (error) {
      next(error);
   }
};

export const validateAccount = async (req, res, next) => {
   const datas = {
      uuid: req.params.uuid,
   };
   console.log("UUID:", datas); // Ajoutez cette ligne

   const query = "UPDATE user SET validated = 'yes' WHERE uuid = ?";
   try {
      await User.save(query, datas);
      res.status(200).json({ status: 200, msg: "Compte validé !" });
   } catch (error) {
      console.log("error in conroller");
      next(error);
   }
};

export const signIn = async (req, res, next) => {
   const { email, password } = req.body;
   const query = "SELECT * from user WHERE email = ?";
   try {
      const user = await User.getOne(query, email);
      console.log(user);
      if (!user.length) {
         return res.status(404).json({ status: 404, msg: "Email ou mot de passe incorrects." });
      }
      if (user[0].validated !== "yes") {
         return res.status(401).json({ status: 401, msg: "Votre compte a été créé, vous devez confirmé l'e-mail envoyé à votre adresse électronique" });
      }
      const match = await bcrypt.compare(password, user[0].password);
      if (match) {
         const PAYLOAD = { uuid: user[0].uuid, role: user[0].role, exp: Math.floor(Date.now() / 1000) + 60 * 60 };
         const TOKEN = jwt.sign(PAYLOAD, TOKEN_SECRET);
         const PAYLOAD_SESSION = { uuid: user[0].uuid, role: user[0].role, exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 };
         console.log(new Date(PAYLOAD_SESSION.exp * 1000));
         const TOKEN_SESSION = jwt.sign(PAYLOAD_SESSION, TOKEN_SECRET_SESSION);
         console.log(TOKEN_SESSION);
         return res.status(200).json({ status: 200, uuid: user[0].uuid, token: TOKEN, msg: "Bienvenue !", role: user[0].role, tokenSession: TOKEN_SESSION });
      } else {
         res.status(401).json({ status: 401, msg: "Email ou mot de passe incorrects." });
      }
   } catch (error) {
      next(error);
   }
};

export const forgottenPassword = async (req, res, next) => {
   console.log(req.body.email);
   const query = "SELECT * from user WHERE email = ?";
   try {
      const user = await User.getOne(query, req.body.email);
      if (!user.length) {
         return res.status(409).json({ status: 409, msg: "Auncun compte ne correspond à cet e-mail" });
      } else {
         mailForgottenPassword(req.body.email, "Réinitialisation du mot de passe", "cliquer sur le lien pour modifier votre mot de passe", "=D", user[0].uuid);
         const PAYLOAD = { uuid: user[0].uuid, role: user[0].role, exp: Math.floor(Date.now() / 1000) + 60 * 60 };
         const TOKEN = jwt.sign(PAYLOAD, TOKEN_SECRET);
         console.log("Token JWT generated :", TOKEN);
         res.status(201).json({ status: 201, msg: "Un e-mail vous a été envoyé afin de modifier votre mot de passe.", token: TOKEN });
      }
   } catch (error) {
      next(error);
   }
};

export const updatePassword = async (req, res, next) => {
   const hash = await bcrypt.hash(req.body.password, saltRounds);

   try {
      const datas = {
         password: hash,
         uuid: req.params.uuid,
      };
      const query1 = `UPDATE user SET password = ? WHERE uuid = ?`;
      const query2 = `SELECT validated from user WHERE uuid = ?`;
      const query3 = `UPDATE user SET validated = 'yes' WHERE email = ?`;
      await User.save(query1, datas);
      res.status(200).json({ status: 200, msg: "Votre mot de passe a été changé." });
      const user = await User.getOne(query2, datas.uuid);
      if (user[0].validated !== "yes") {
         await User.save(query3, datas.uuid);
         console.log("Compte validé");
      }
   } catch (error) {
      next(error);
   }
};

export const getAllUsers = async (req, res, next) => {
   const query = "SELECT * FROM user";
   try {
      const newToken = req.newToken; // nouveau token qui vient du middleware refreshToken situé sur la même route que ce contrôller
      const users = await User.getAll(query);
      res.status(200).json({ status: 200, msg: "Utilisateurs retrouvés", users: users, token: newToken });
   } catch (error) {
      next(error);
   }
};

export const getOneUser = async (req, res, next) => {
   const query = "SELECT * FROM user WHERE uuid = ?";
   try {
      const newToken = req.newToken; // nouveau token qui vient du middleware refreshToken situé sur la même route que ce contrôller
      const user = await User.getOne(query, req.params.uuid);
      res.status(200).json({ status: 200, msg: "user retrieved", user: user[0], token: newToken });
   } catch (error) {
      next(error);
   }
};

export const editUser = async (req, res, next) => {
   let datas = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      address: req.body.address,
      code_zip: req.body.code_zip,
      city: req.body.city,
   };
   const query = `UPDATE user SET firstname = ?, lastname = ?, address = ?, code_zip = ?, city = ? WHERE uuid = '${req.params.uuid}'`;
   try {
      const newToken = req.newToken; // nouveau token qui vient du middleware refreshToken situé sur la même route que ce contrôller
      await User.save(query, datas);
      res.status(200).json({ status: 200, msg: "Information mises à jour", token: newToken });
   } catch (error) {
      console.error("Erreur", error);
      next(error);
   }
};

//******** VERSION DU SIGN_IN UTILISANT UN TOKEN DE SESSION AVEC UN COOKIE HTTP_ONLY ******************/

// export const signIn = async (req, res, next) => {
//    const { email, password } = req.body;
//    const query = "SELECT * from user WHERE email = ?";
//    try {
//       const user = await User.getOne(query, email);
//       console.log(user);
//       if (!user.length) {
//          return res.status(404).json({ status: 404, msg: "Email ou mot de passe incorrects." });
//       }
//       if (user[0].validated !== "yes") {
//          return res.status(401).json({ status: 401, msg: "Votre compte a été créé, vous devez confirmé l'e-mail envoyé à votre adresse électronique" });
//       }
//       const match = await bcrypt.compare(password, user[0].password);
//       if (match) {
//          const PAYLOAD = { uuid: user[0].uuid, role: user[0].role, exp: Math.floor(Date.now() / 1000) + 60 * 60 };
//          const TOKEN = jwt.sign(PAYLOAD, TOKEN_SECRET);
//          const PAYLOAD_SESSION = { uuid: user[0].uuid, role: user[0].role, exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 };
//          console.log(PAYLOAD_SESSION.exp);
//          const TOKEN_SESSION = jwt.sign(PAYLOAD_SESSION, TOKEN_SECRET_SESSION);
//          if (process.env.NODE_ENV === "development") {
//             res.cookie("tokenSession", TOKEN_SESSION, {
//                // can only be accessed by server requests
//                httpOnly: true,
//                // path = where the cookie is valid
//                path: "/",
//                // domain = what domain the cookie is valid on
//                domain: "http://localhost:5173",
//                // secure = only send cookie over https
//                secure: false,
//                // sameSite = only send cookie if the request is coming from the same origin
//                sameSite: "lax", // "strict" | "lax" | "none" (secure must be true)
//                // maxAge = how long the cookie is valid for in milliseconds
//                maxAge: 7 * 24 * 60 * 60 * 1000, // Durée de validité du cookie en millisecondes
//             });
//          }
//          if (process.env.NODE_ENV === "production") {
//             res.cookie("tokenSession", TOKEN_SESSION, {
//                // can only be accessed by server requests
//                httpOnly: true,
//                // path = where the cookie is valid
//                path: "/",
//                // secure = only send cookie over https
//                secure: true,
//                // sameSite = only send cookie if the request is coming from the same origin
//                sameSite: "none", // "strict" | "lax" | "none" (secure must be true)
//                // maxAge = how long the cookie is valid for in milliseconds
//                maxAge: 7 * 24 * 60 * 60 * 1000, // Durée de validité du cookie en millisecondes
//             });
//          }
//          console.log(TOKEN_SESSION);
//          return res.status(200).json({ status: 200, uuid: user[0].uuid, token: TOKEN, msg: "Bienvenue !", email: user[0].email });
//       } else {
//          res.status(401).json({ status: 401, msg: "Email ou mot de passe incorrects." });
//       }
//    } catch (error) {
//       next(error);
//    }
// };
