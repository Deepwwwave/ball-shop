import Product from "../models/product.model.js";
import path from "path";
import { io } from "../server.js";

// Get Products
export const getAllProducts = async (req, res, next) => {
   const query = "SELECT * FROM product";
   try {
      const result = await Product.getAll(query);
      console.log("Query result:", result); // Ajout pour déboguer
      res.status(200).json({
         status: 200,
         msg: "Products retrieved!",
         products: result,
      });
   } catch (error) {
      console.error("Error in getAllProducts:", error); // Ajout pour déboguer
      return next(error);
   }
};

// Get one product
export const getOneProduct = async (req, res, next) => {
   const query = `SELECT * FROM product WHERE id = ?`;
   try {
      const result = await Product.getOne(query, req.params.id);
      res.status(200).json({
         status: 200,
         msg: "product retrieved !",
         product: result,
      });
   } catch (error) {
      return next(error);
   }
};

/*****  Add product *****/
export const addProduct = async (req, res, next) => {
   const datas = {
      category: req.body.category,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      color: req.body.color,
      price: req.body.price,
      quantity: req.body.quantity,
   };
   const query = "INSERT INTO product (date, category, description, imageUrl, color, price, quantity) VALUES (NOW(),?,?,?,?,?,?)";
   try {
      if (!req.files || !req.files.image) {
         return res.status(400).json({ msg: "Aucune image téléchargée" });
      }
      const image = req.files.image;
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const imageName = `image-${uniqueSuffix}${path.extname(image.name)}`;
      image.mv("public/images/" + imageName, (error) => {
         if (error) {
            return res.status(500).json({ message: "Erreur lors de l'enregistrement de l'image." });
         }
      });
      // Maj de l'URL de l'image dans datas
      datas.imageUrl = "/images/" + imageName;

      const newToken = req.newToken; // nouveau token qui vient du middleware refreshToken situé sur la même route que ce contrôller
      await Product.save(query, datas);
      res.status(201).json({
         status: 201,
         msg: "product added !",
         token : newToken,
      });
      io.emit("cartOpened", { msg: "Added !" });
   } catch (error) {
      return next(error);
   }
};

/***** Delete Product *****/
export const deleteProduct = async (req, res, next) => {
   const query = `DELETE FROM product WHERE id = ?`;
   try {
      const newToken = req.newToken; // nouveau token qui vient du middleware refreshToken situé sur la même route que ce contrôller
      await Product.deleteOne(query, req.params.id);
      res.status(200).json({
         status: 200,
         msg: "product deleted",
         token: newToken,
      });
      io.emit("cartOpened", { msg: "Deleted !" });
   } catch (error) {
      return next(error);
   }
};

/***** Edit product *****/
export const editProduct = async (req, res, next) => {
   let datas = {};

   // Permet de mettre dans l'objet datas que les req.body reçu par la requête
   for (const key in req.body) {
      // Vérifier si la valeur n'est pas une chaîne vide
      if (req.body[key] !== "") {
         // Si la valeur n'est pas une chaîne vide, ajoutez-la à l'objet datas
         datas[key] = req.body[key];
      }
   }
   datas = { ...datas };
   console.log(datas);
   console.log(datas.description);
   let query = `UPDATE product SET
   ${datas.category !== undefined ? ` category = ?,` : ""}
   ${datas.description !== undefined ? ` description = ?,` : ""}
   ${datas.imageUrl !== undefined ? ` imageUrl = ?,` : ""}
   ${datas.color !== undefined ? ` color = ?,` : ""}
   ${datas.price !== undefined ? ` price = ?,` : ""}
   ${datas.quantity !== undefined ? ` quantity = ?,` : ""}
   WHERE id = ${req.params.id}`.replace(/,(?=[^,]*$)/, "");

   console.log(query);

   try {
      const newToken = req.newToken; // nouveau token qui vient du middleware refreshToken situé sur la même route que ce contrôller
      // Est ce que imageUrl existe
      if (datas.imageUrl) {
         // Téléchargement d'image
         if (!req.files || !req.files.image) {
            return res.status(400).json({ msg: "Aucune image téléchargée" });
         }

         const image = req.files.image;
         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
         const imageName = `image-${uniqueSuffix}${path.extname(image.name)}`;
         image.mv("public/images/" + imageName, (error) => {
            if (error) {
               return res.status(500).json({ message: "Erreur lors de l'enregistrement de l'image." });
            }
            // Maj de l'URL de l'image dans datas
            datas.imageUrl = "/images/" + imageName;

            // Execution de la requête de mise à jour
            Product.save(query, datas);

            // Réponse
            res.status(200).json({
               status: 200,
               msg: "product updated!",
               token: newToken,
            });
         });
      } else {
         // Si imageUrl n'est pas défini
         await Product.save(query, datas);
         res.status(200).json({
            status: 200,
            msg: "product updated!",
            token: newToken,
         });
         io.emit("cartOpened", { msg: "Edited !" });
      }
   } catch (error) {
      return next(error);
   }
};
