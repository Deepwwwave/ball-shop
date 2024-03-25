import React, { useEffect } from "react";
import styles from "../styles/Cart.module.css";
import { Link, useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import { reqAddOrder } from "../api/request/customer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import useProducts from "../hooks/useProducts";
import io from "socket.io-client";

export default function Cart() {
   const { cartItems, totalItems, totalCartPrice, addToCart, removeFromCart, substractItemFromCart } = useCart();
   const { urlServer, getServerProducts } = useProducts();

   const navigate = useNavigate();
   const socket = io(urlServer);

   const datas = {
      totalCartPrice,
      cartItems,
   };

   const redirectToPayment = async () => {
      try {
         const res = await reqAddOrder(datas);
         if (res.response) {
            const { status, msg } = res.response.data;
            console.error(`Error order request => `, status, msg);
         } else if (res.clientSecret) {
            console.log(res.clientSecret);
            navigate("/payment", { state: { clientSecret: res.clientSecret, totalPrice: res.totalPrice } });
         } else {
            console.error("Client secret not found in response:", res);
         }
      } catch (error) {
         console.error("Error:", error);
      }
   };

   useEffect(() => {
      const handleProductsUpdated = (data) => {
         console.log("Products updated:", data);
         getServerProducts();
      };
      // Signaler à l'utilisateur que le panier est ouvert
      socket.emit("cartOpened");

      socket.on("cartUpdated", handleProductsUpdated);

      // Fonction de nettoyage pour retirer l'écouteur d'événement lorsque le composant est démonté
      return () => {
         socket.off("productsUpdated", handleProductsUpdated);
      };
   }, []);

   return (
      <div className={styles.cartMainContainer}>
         {totalItems !== 0 ? (
            <>
               <h3 className={styles.cartTitle}>Votre panier</h3>
               <div className={styles.cartFlexContainer}>
                  <section className={styles.cartTitles}>
                     <div className={styles.cartTitleQuantity}>Quantité:</div>
                  </section>
                  {cartItems.map((cartItem) => (
                     <section className={styles.cartItemsContainer} key={cartItem.id}>
                        <Link to={`/boutique/${cartItem.id}`} state={{ cartItem }} onClick={() => console.log("Produit envoyé :", cartItem)} className={styles.cartItemInfos}>
                           <img src={`${urlServer}${cartItem.imageUrl}`} alt={cartItem.category} />
                           <p>{cartItem.category}</p>
                           <p>{cartItem.totalPrice} €</p>
                        </Link>

                        <div className={styles.cartQuantityButtons}>
                           <button onClick={() => substractItemFromCart(cartItem.id)}>-</button>
                           <p className={styles.cartItemQuantity}> {cartItem.itemQuantity} </p>
                           <button onClick={() => addToCart(cartItem)}>+</button>
                        </div>

                        <div>
                           <FontAwesomeIcon className={styles.cartDelete} icon={faTrash} onClick={() => removeFromCart(cartItem.id)} title="Supprimer" />
                        </div>
                     </section>
                  ))}
                  <p className={styles.cartLivraison}>Livraison: 4.95€</p>
                  <section className={styles.cartTotalContainer}>
                     <div className={styles.cartTotalPrice}>Prix Total: {totalCartPrice.toFixed(2)} €</div>
                  </section>
               </div>
               <button className={styles.cartButtonPurchase} onClick={redirectToPayment}>
                  Valider ma commande
               </button>
            </>
         ) : (
            <p className={styles.voidCart}> Votre pannier est vide</p>
         )}
      </div>
   );
}
