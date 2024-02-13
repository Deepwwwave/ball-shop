// Boutique.js
import React from "react";
import styles from "../styles/Boutique.module.css";
import useProducts from "../hooks/useProducts";
import Article from "../Components/Article";

export default function Boutique() {
   const { products, loading, error, urlServer } = useProducts();

   return (
      <main className={styles.mainContainer}>
         <h2>Boutique</h2>
         {loading && <p>Loading...</p>}
         {error && <p>Error: {error}</p>}
         {!loading && !error && (
            <div className={styles.articlesContainer}>
               {products.map((product) => (
                  <Article key={product.id} product={product} urlServer={urlServer} />
               ))}
            </div>
         )}
      </main>
   );
}
