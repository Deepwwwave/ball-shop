// Boutique.js
import React from "react";
import styles from "../styles/Boutique.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import useProducts from "../hooks/useProducts";
import useCart from "../hooks/useCart";
import Article from "../Components/Article";

export default function Boutique() {
   const { products, loading, error, urlServer } = useProducts(); 
   const { addToCart, removeFromCart } = useCart();

   return (
      <main className={styles.boutiqueMainContainer}>
         <h2>Boutique</h2>
         {loading && <p>Loading...</p>}
         {error && <p>Error: {error}</p>}
         {!loading && !error && (
            <section className={styles.boutiqueArticlesContainer}>
               {products.map((product) => (
                  <article className = {styles.boutiqueArticleAndheartContainer}>
                     <FontAwesomeIcon title="Ajouter au pannier" className={styles.heartCart} icon={faSquarePlus} />
                     <Article key={product.id} product={product} urlServer={urlServer} />
                  </article>
               ))}
            </section>
         )}
      </main>
   );
}
