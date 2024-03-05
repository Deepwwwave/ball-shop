import Product from "../models/product.model.js";
import path from "path";
import { io } from "../server.js";

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

// export const addProduct = async (req, res, next) => {
//    try {
//       let datas = { ...req.body };

//       // Vérifier si une image a été téléchargée
//       if (req.files && req.files.image) {
//          const image = req.files.image;
//          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//          const imageName = `image-${uniqueSuffix}${path.extname(image.name)}`;

//          // Déplacer l'image téléchargée vers le répertoire public
//          image.mv("public/images/" + imageName, (error) => {
//             if (error) {
//                return res.status(500).json({ message: "Erreur lors de l'enregistrement de l'image." });
//             }
//             // Mettre à jour l'URL de l'image dans datas
//             datas.imageUrl = "/images/" + imageName;

//             // Ajouter le produit à la base de données avec l'image
//             Product.create(datas, (err, result) => {
//                if (err) {
//                   return res.status(500).json({ message: "Erreur lors de l'ajout du produit." });
//                }
//                res.status(201).json({
//                   status: 201,
//                   msg: "product added!",
//                   newProduct: result,
//                });
//             });
//          });
//       } else {
//          // Ajouter le produit à la base de données sans image
//          Product.create(datas, (err, result) => {
//             if (err) {
//                return res.status(500).json({ message: "Erreur lors de l'ajout du produit." });
//             }
//             res.status(201).json({
//                status: 201,
//                msg: "product added!",
//                newProduct: result,
//             });
//          });
//       }
//    } catch (error) {
//       return next(error);
//    }
// };

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
      // Mettre à jour l'URL de l'image dans datas
      datas.imageUrl = "/images/" + imageName;

      const newToken = req.newToken; // nouveau token qui vient du middleware refreshToken situé sur la même route que ce contrôller
      await Product.save(query, datas);
      res.status(201).json({
         status: 201,
         msg: "product added !",
         newToken: newToken,
      });
      io.emit("cartOpened", { msg: "Added !" });
   } catch (error) {
      return next(error);
   }
};

export const deleteProduct = async (req, res, next) => {
   const query = `DELETE FROM product WHERE id = ?`;
   try {
      const newToken = req.newToken; // nouveau token qui vient du middleware refreshToken situé sur la même route que ce contrôller
      await Product.deleteOne(query, req.params.id);
      res.status(200).json({
         status: 200,
         msg: "product deleted",
         newToken: newToken,
      });
      io.emit("cartOpened", { msg: "Deleted !" });
   } catch (error) {
      return next(error);
   }
};

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
      // Vérifier si imageUrl est défini
      if (datas.imageUrl) {
         // Exécuter le code pour le téléchargement d'image ici
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
            // Mettre à jour l'URL de l'image dans datas
            datas.imageUrl = "/images/" + imageName;

            // Exécuter la requête SQL mise à jour
            Product.save(query, datas);

            // Répondre avec la réussite
            res.status(200).json({
               status: 200,
               msg: "product updated!",
               newToken: newToken,
            });
         });
      } else {
         // Si imageUrl n'est pas défini
         await Product.save(query, datas);
         res.status(200).json({
            status: 200,
            msg: "product updated!",
            newToken: newToken,
         });
         io.emit("cartOpened", { msg: "Edited !" });
      }
   } catch (error) {
      return next(error);
   }
};
