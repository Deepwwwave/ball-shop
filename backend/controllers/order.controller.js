import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import stripe from "stripe";

// Ne pas oublier de switch avec la live secret key en production.
const stripeAPI = stripe('sk_test_51KZErmEc4VeEZWJYywEQn54NqY0M4xxEU2HGfQ5IHtC631ipHQxEuA3UiY3emX1x6qijo1cB4RagE728JGqUIu5E00rRwoeJ8V');
// const stripeAPI = stripe(process.env.SECRET_STRIPE_KEY);

export const addOrder = async (req, res, next) => {
   console.log("addOrder controller", req.body);
   const { totalCartPrice, cartItems } = req.body;
   console.log(totalCartPrice)
   const queryInsertOrder = "INSERT INTO orders (`user_email`,`status`,`total_price`,`date`) VALUES ('visiteur','not payed',?,NOW())";
   const queryInsertOrderDetail = "INSERT INTO orders_detail (order_id, product_id, quantity, price) VALUES (?, ?, ? ,?)";
   const queryUpdateOrder = "UPDATE orders SET total_price = ? WHERE id = ?";
   
   try {
      // Enregistrement de  la commande dans la base de données
      const resSaved = await Order.save(queryInsertOrder, {totalCartPrice});
      const orderId = resSaved.insertId; //  ID de la commande nouvellement créée
      const shippingCost = 4.95
      const datasUpdate = {
         totalPrice: shippingCost,
         id: orderId,
      };

      // Ajout des produits à la commande et calcul du total
      for (const product of cartItems) {
         // Récupération du détail des produits 
         const queryPriceProduct = `SELECT price FROM product WHERE id = ?`;
         const price = await Product.getOne(queryPriceProduct, product.id);
         console.log(price[0].price)

         // Comparaison des produits avec la base de donnée, vérification existence et prix.
         if (price && parseFloat(product.price) === parseFloat(price[0].price)) {
            const totalPricePerProduct = parseInt(product.itemQuantity) * parseFloat(product.price);
            const datasDetail = {
               order_id: orderId,
               product_id: product.id,
               quantity: product.itemQuantity,
               price: totalPricePerProduct,
            };

            await Order.save(queryInsertOrderDetail, datasDetail);
            datasUpdate.totalPrice += totalPricePerProduct;
         } else {
            // Si le produit n'existe pas ou si le prix ne correspond pas
            return res.status(400).json({ msg: "Le produit sélectionné n'existe pas ou le prix ne correspond pas à celui enregistré dans la base de données." });
         }
      }

      // Maj du montant total de la commande dans la base de données
      await Order.save(queryUpdateOrder, datasUpdate);

      // Paiement Stripe
      const paymentIntent = await stripeAPI.paymentIntents.create({
         amount: datasUpdate.totalPrice * 100, // Convertions en cents
         currency: "eur",
         automatic_payment_methods: {
            enabled: true,
         },
      });
      console.log(paymentIntent.client_secret)
      // Réponse avec l'ID de la commande et le clientSecret du paiement
      res.status(200).json({
         status: 200,
         msg: "Commande enregistrée avec succès",
         orderId: orderId, 
         clientSecret: paymentIntent.client_secret,
         totalPrice: datasUpdate.totalPrice
      });
   } catch (error) {
      return next(error);
   }
};

export const confirmPayment = async (req, res, next) => {
   const { orderId } = req.body;

   try {
      // Statut "payed" de la commande dans la base de données
      const queryUpdateStatus = 'UPDATE orders SET status = "payed" WHERE id = ?';
      await Order.save(queryUpdateStatus, [orderId]);

      // Mise à jour avec succès
      res.status(200).json({ message: "Payment confirmed and order status updated successfully" });
   } catch (error) {
      // Gestion des erreurs
      console.error("Error confirming payment and updating order status:", error);
      return next(error);
   }
};

export const getAllOrders = async (req, res, next) => {
   const newToken = req.newToken; // nouveau token qui vient du middleware refreshToken situé sur la même route que ce contrôller
   const query = `SELECT * FROM order`;
   try {
      const orders = await orders.getAll(query);
      res.status(200).json({
         status: 200,
         msg: "orders retrieved !",
         orders: orders,
         token: newToken,
      });
   } catch (error) {
      return next(error);
   }
};
