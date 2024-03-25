import React from "react";
import styles from "../styles/Article.module.css";

export default function Article({ product, urlServer, loading }) {
   return (
      <article className={styles.productArticle}>
         {loading ? (
            <p>Loading...</p>
         ) : (
            <section>
               <img src={`${urlServer}${product.imageUrl}`} alt={product.category} className={styles.productImage} />
               <div className={styles.productInfo}>
                  <h4>{product.category}</h4>
                  <div className={styles.priceContainer}>
                     <p>{product.price} €</p>
                  </div>
               </div>
            </section>
         )}
      </article>
   );
}
