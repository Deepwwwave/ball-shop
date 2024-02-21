import React from "react";
import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";
import Article from "./Article";

export default function Cart() {
   const { cartItems, addToCart, removeFromCart, clearCartItems, updateCartItemQuantity } = useCart();
   const { urlServer } = useProducts();
   return (
      <div>
         <h3>Votre Panier</h3>
         <section>
            {cartItems.map((cartItem) => (
               <article>
                  <Article key={cartItem.id} product={cartItem} urlServer={urlServer} />
               </article>
            ))}
         </section>
      </div>
   );
}
