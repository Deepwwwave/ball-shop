
import React from "react";
import styles from "../styles/Article.module.css";


export default function Article({ product, urlServer }) {
   return (
      <article className={styles.productArticle}>
         <section>
            <img src={`${urlServer}${product.imageUrl}`} alt={product.category} className={styles.productImage} />
            <div className={styles.productInfo}>
               <h3>{product.category}</h3>
               <div className={styles.priceContainer}>
                  <p>{product.price} €</p>
               </div>
            </div>
         </section>
      </article>
   );
}

