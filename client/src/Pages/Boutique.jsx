// Boutique.js
import React from "react";
import styles from "../styles/Boutique.module.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import MessageToast from "../Components/ui/MessageToast.jsx";
import useMessageToast from "../hooks/useMessageToast.jsx";
import useProducts from "../hooks/useProducts";
import useCart from "../hooks/useCart";
import { isProductInCart } from "../helpers/cartHelpers.js";
import Article from "../Components/Article";

export default function Boutique() {

   const { products, loading, error, urlServer } = useProducts();
   const { addToCart, removeFromCart, cartItems } = useCart();

   const [message, setMessage] = useMessageToast()

   const handleAddToCart = (product) => {
      console.log("Adding product to cart:", product);
      addToCart(product);
      setMessage("Ajouté au panier")
   };

   const handleRemoveFromCart = (productId) => {
      removeFromCart(productId);
      setMessage("Supprimé du panier")
   };

   return (
      <main className={styles.boutiqueMainContainer}>
         <section className={styles.boutiqueHeaders}>
            <br />
            <br />
            <NavLink to="/cart" className={styles.boutiquePanierLink} >
               Voir le panier
            </NavLink>
         </section>
         {loading && <p>Loading...</p>}
         {error && <p>Error: {error}</p>}
         {!loading && !error && (
            <section className={styles.boutiqueArticlesContainer}>
               
               {products.map((product) => (
                  <article  key={product.id} className={styles.boutiqueArticleAndheartContainer}>
                     <FontAwesomeIcon onClick={() => (isProductInCart(product.id, cartItems) ? handleRemoveFromCart(product.id) : handleAddToCart(product))} title={isProductInCart(product.id, cartItems) ? "Retirer du pannier" : "Ajouter au pannier"} className={isProductInCart(product.id, cartItems) ? styles.addCartActived : styles.addCart} icon={faSquarePlus} /> {/* Button add cart */}
                     <Article key={product.id} product={product} urlServer={urlServer} />
                  </article>
               ))}
            </section>
         )}
         {message && <MessageToast content={message}/>}
      </main>
   );
}
