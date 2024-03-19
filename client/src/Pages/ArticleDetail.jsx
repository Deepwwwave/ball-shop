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
   let { cartItem } = useLocation().state;

   let  article  = product || cartItem
   const { addToCart, cartItems } = useCart();

   const [message, setMesage] = useMessageToast();

   const handleAddToCart = (product) => {
      addToCart(product);
      setMesage("Article ajouté au panier");
   };
   // Vérifie si product est défini
   if (!product && !cartItem) {
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
               <img src={`${urlServer}${article.imageUrl}`} alt={article.category} />
               <div>
                  <h3>{article.category}</h3>
                  <p>{article.price} €</p>
                  <button onClick={() => !isProductInCart(article.id, cartItems) && handleAddToCart(article)}>Ajouter au Panier</button>
               </div>
            </article>
            <div className={styles.articleDetailDescription}>
               <p>Description : </p>
               <p> {article.description}</p>
            </div>
            {message && <MessageToast content={message} />}
         </section>
      </div>
   );
}
