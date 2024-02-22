import React from "react";
import styles from "../styles/Cart.module.css";
import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";

export default function Cart() {
   const { cartItems, totalItems, totalPrice, addToCart, removeFromCart, clearCartItems, substractItemFromCart } = useCart();
   const { urlServer } = useProducts();

   return (
      <div className={styles.cartMainContainer}>
    <h3>Votre Panier</h3>
    <div className={styles.cartItemsContainer}>
        {cartItems.map((cartItem) => (
            <div className={styles.cartItemContainer} key={cartItem.id}>
                <div className={styles.cartItemInfo}>
                    <img src={`${urlServer}${cartItem.imageUrl}`} alt={cartItem.category} />
                    <div className={styles.cartInfos}>
                        <p>{cartItem.category}</p>
                        <p>{cartItem.price} €</p>
                    </div>
                </div>
                <div className={styles.quantityContainer}>
                    <p>Quantité:</p>
                    <div className={styles.quantityButtons}>
                        <button onClick={() => addToCart(cartItem)}>+</button>
                        <p>{cartItem.itemQuantity}</p>
                        <button onClick={() => substractItemFromCart(cartItem.id)}>-</button>
                    </div>
                </div>
            </div>
        ))}
    </div>
    <div className={styles.totalContainer}>
        <p>Total articles: {totalItems}</p>
        <p>Total: {totalPrice} €</p>
    </div>
</div>

  
  
   );
}
