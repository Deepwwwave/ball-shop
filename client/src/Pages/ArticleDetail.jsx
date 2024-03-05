import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import styles from "../styles/ArticleDetail.module.css";
import useCart from "../hooks/useCart";
import { isProductInCart } from "../helpers/cartHelpers";
import MessageToast from "../Components/ui/MessageToast";
import useMessageToast from "../hooks/useMessageToast";

export default function ArticleDetail() {
   const urlServer = import.meta.env.VITE_APP_LOCAL_URL_BACK;
   let { product } = useLocation().state;
   const { addToCart, cartItems } = useCart();

   const [message, setMesage] = useMessageToast();

   const handleAddToCart = (product) => {
      addToCart(product);
      setMesage("Article ajouté au panier");
   };
   // Vérifie si product est défini
   if (!product) {
      return <p>Produit non trouvé</p>;
   }

   // Utilise product pour afficher les détails du produit
   return (
      <div className={styles.articleDetailMainContainer}>
         <NavLink to="/cart" className={styles.articleDetailCartLink}>
            Voir le panier
         </NavLink>
         <section className={styles.articleDetailProduct}>
            <article className={styles.articleDetailInfos}>
               <img src={`${urlServer}${product.imageUrl}`} alt={product.category} />
               <div>
                  <h3>{product.category}</h3>
                  <p>{product.price} €</p>
                  <button onClick={() => !isProductInCart(product.id, cartItems) && handleAddToCart(product)}>Ajouter au Panier</button>
               </div>
            </article>
            <div className={styles.articleDetailDescription}>
               <p>Description : </p>
               <p> {product.description}</p>
            </div>
            {message && <MessageToast content={message} />}
         </section>
      </div>
   );
}
