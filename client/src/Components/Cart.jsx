import React, { useEffect } from "react";
import styles from "../styles/Cart.module.css";
import io from "socket.io-client"
import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";
import { reqGetAllProducts } from "../api/request/product";

export default function Cart() {
   const { cartItems, totalItems, totalPrice, addToCart, removeFromCart, updateCart, substractItemFromCart } = useCart();
   const { urlServer, dispatch } = useProducts();

   const socket = io(urlServer); // Remplacez par votre URL de serveur socket.io

   const getProductsAndTchekCart = async () => {
      try {
         const res = await reqGetAllProducts()
         dispatch(updateCart(res.products))
      } catch (error) {
         console.log('error', error)
      }
   }

   useEffect(() => {
      socket.on("productsUpdated", (data) => {
        console.log('Products updated:', data)
        getProductsAndTchekCart()
      });
   });

   return (
      <div className={styles.cartMainContainer}>
         {totalItems !== 0 ? (
            <>
               <h3 className={styles.cartTitle}>Votre Panier</h3>
               <div className={styles.cartFlexContainer}>
                  <section className={styles.cartTitles}>
                     <div className={styles.cartTitleQuantity}>Quantité</div>
                  </section>
                  {cartItems.map((cartItem) => (
                     <section className={styles.cartItemsContainer} key={cartItem.id}>
                        <div className={styles.cartItemInfos}>
                           <img src={`${urlServer}${cartItem.imageUrl}`} alt={cartItem.category} />
                           <p>{cartItem.category}</p>
                           <p>{cartItem.price} €</p>
                        </div>

                        <div className={styles.cartQuantityButtons}>
                           <button onClick={() => substractItemFromCart(cartItem.id)}>-</button>
                           <p className={styles.cartItemQuantity}> {cartItem.itemQuantity} </p>
                           <button onClick={() => addToCart(cartItem)}>+</button>
                        </div>
                     </section>
                  ))}
                  <section className={styles.cartTotalContainer}>
                     <div className={styles.cartTotalPrice}>Prix Total: {totalPrice} €</div>
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
