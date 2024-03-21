import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import stripe from "stripe";

// Remember to switch to your live secret key in production.
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
      // Enregistrer la commande de base dans la base de données
      const resSaved = await Order.save(queryInsertOrder, {totalCartPrice});
      const orderId = resSaved.insertId; // Récupérer l'ID de la commande nouvellement créée
      const shippingCost = 4.95
      const datasUpdate = {
         totalPrice: shippingCost,
         id: orderId,
      };

      // Ajouter les produits à la commande et calculer le total
      for (const product of cartItems) {
         // Récupérer les détails du produit depuis la base de données
         const queryPriceProduct = `SELECT price FROM product WHERE id = ?`;
         const price = await Product.getOne(queryPriceProduct, product.id);
         console.log(price[0].price)

         // Vérifier si le produit existe et si son prix correspond au prix enregistré dans la base de données
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
            // Si le produit n'existe pas ou si le prix ne correspond pas, retourner une erreur
            return res.status(400).json({ msg: "Le produit sélectionné n'existe pas ou le prix ne correspond pas à celui enregistré dans la base de données." });
         }
      }

      // Mettre à jour le montant total de la commande dans la base de données
      await Order.save(queryUpdateOrder, datasUpdate);

      // Créer le paiement Stripe
      const paymentIntent = await stripeAPI.paymentIntents.create({
         amount: datasUpdate.totalPrice * 100, // Convertir en cents
         currency: "eur",
         automatic_payment_methods: {
            enabled: true,
         },
      });

      // Envoyer la réponse avec l'ID de la commande et le clientSecret du paiement
      res.status(200).json({
         status: 200,
         msg: "Commande enregistrée avec succès",
         orderId: orderId, // Retourner l'ID de la commande dans la réponse
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
      // Mettre à jour le statut de la commande dans la base de données
      const queryUpdateStatus = 'UPDATE orders SET status = "payed" WHERE id = ?';
      await Order.save(queryUpdateStatus, [orderId]);

      // Envoyer une réponse indiquant que la mise à jour a été effectuée avec succès
      res.status(200).json({ message: "Payment confirmed and order status updated successfully" });
   } catch (error) {
      // Gérer les erreurs
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
         newToken: newToken,
      });
   } catch (error) {
      return next(error);
   }
};
