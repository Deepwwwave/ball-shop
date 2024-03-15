import Order from "../models/order.model.js";


export const addOrder = async (req, res, next) => {
  console.log('addOrder controller', req.body);
  const datas = {
      userEmail : req.body.email,
      totalPrice: 0,
    }
    const query1 = "INSERT INTO orders (`user_email`,`status`,`price`,`date`) VALUES (?,'not payed',?,NOW())";
    const query2 = 'INSERT INTO orders_detail (order_id, product_id, quantity, price) VALUES (?, ?, ? ,?)';
    const query3 = 'UPDATE orders SET price = ? WHERE id = ?';
    try {
        const resSaved = await Order.save(query1, datas);
        const id = resSaved.insertId;
        const datasUpdate = {
            totalPrice: 0,
            id : id,
        }
        req.body.cartItems.forEach(async(product)=>{
            const totalPricePerProduct = parseInt(product.quantity) * parseFloat(product.price);
            const datasDetail = {
                order_id: id,
                product_id: product.productId,
                quantity: product.quantity,
                price: totalPricePerProduct,
            }
            await Order.save(query2, datasDetail);
  
            datasUpdate.totalPrice += totalPricePerProduct;
            await Order.save(query3, datasUpdate);
  
            // Création du paiement Stripe
            const paymentIntent = await stripe.paymentIntents.create({
              amount: totalPricePerProduct * 100, // Convertir en cents
              currency: "eur",
              automatic_payment_methods: {
                enabled: true,
              },
            });
            // Envoi de la réponse avec le clientSecret du paiement
            res.status(200).json({
                status:200,
                msg: "Order committed successfully",
                clientSecret: paymentIntent.client_secret,
            });
        })
    } catch (error) {
        return next(error);
    }  
};


export const getAllOrders =  async (req, res, next) => {
  const newToken = req.newToken // nouveau token qui vient du middleware refreshToken situé sur la même route que ce contrôller
  const query = `SELECT * FROM order`;
     try {
        const orders = await orders.getAll(query);
        res.status(200).json({
           status: 200,
           msg: "orders retrieved !",
           orders: orders,
           newToken: newToken
        });
     } catch (error) {
        return next(error);
     }
}




