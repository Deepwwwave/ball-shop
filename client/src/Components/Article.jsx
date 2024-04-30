import React, { useState } from "react";
import styles from "../styles/Article.module.css";

export default function Article({ product, urlServer }) {
   const [imageLoaded, setImageLoaded] = useState(false);

   const handleImageLoad = () => {
      setImageLoaded(true);
   };

   return (
      <article className={styles.productArticle}>
         <section>
            <div className={styles.productImageContainer}>
               {!imageLoaded && (
                  
                     <div className={styles.productImageSoon}></div>
                  
               )}
               <img src={`${urlServer}${product.imageUrl}`} alt={product.category} className={imageLoaded ? styles.productImageVisible : styles.productImageHidden} onLoad={handleImageLoad} />
            </div>
            <div className={styles.productInfo}>
               <h4>{product.category}</h4>
               <div className={styles.priceContainer}>
                  <p>{product.price} €</p>
               </div>
            </div>
         </section>
      </article>
   );
}
