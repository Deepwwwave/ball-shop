import React, { useEffect } from "react";
import styles from "../styles/Cart.module.css";
import useCart from "../hooks/useCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import useProducts from "../hooks/useProducts";
import io from "socket.io-client";

export default function Cart() {
   const { cartItems, totalItems, totalCartPrice, addToCart, removeFromCart, substractItemFromCart } = useCart();
   const { urlServer, getServerProducts } = useProducts();
   
   const socket = io(urlServer); 


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
                        <div className={styles.cartItemInfos}>
                           <img src={`${urlServer}${cartItem.imageUrl}`} alt={cartItem.category} />
                           <p>{cartItem.category}</p>
                           <p>{cartItem.totalPrice} €</p>
                        </div>

                        <div className={styles.cartQuantityButtons}>
                           <button onClick={() => substractItemFromCart(cartItem.id)}>-</button>
                           <p className={styles.cartItemQuantity}> {cartItem.itemQuantity} </p>
                           <button onClick={() => addToCart(cartItem)}>+</button>
                        </div>

                        <div>
                           <FontAwesomeIcon className={styles.cartDelete} icon={faTrash} onClick={() => removeFromCart(cartItem.id)} />
                        </div>
                     </section>
                  ))}
                  <section className={styles.cartTotalContainer}>
                     <div className={styles.cartTotalPrice}>Prix Total: {totalCartPrice} €</div>
                  </section>
               </div>
            </>
         ) : (
            <p className={styles.voidCart}> Votre pannier est vide </p>
         )}

         {totalItems !== 0 && <button className={styles.cartButtonPurchase}> Valider ma commande </button>}
      </div>
   );
}
