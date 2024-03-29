import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import styles from "../styles/ArticleDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import useCart from "../hooks/useCart";
import { isProductInCart } from "../helpers/cartHelpers";
import MessageToast from "../Components/ui/MessageToast";
import useMessageToast from "../hooks/useMessageToast";

export default function ArticleDetail() {
   let urlServer;

   if (import.meta.env.VITE_APP_LOCAL_URL_BACK) {
      // Utilise les variables d'environnement de Vite en développement
      urlServer = import.meta.env.VITE_APP_LOCAL_URL_BACK;
   } else {
      // Utilise les variables d'environnement de Vercel en production
      urlServer = process.env.VITE_APP_PRODUCTION_URL_BACK;
   }
   
   let { product } = useLocation().state;
   let { cartItem } = useLocation().state;

   let article = product || cartItem;
   const { addToCart, cartItems, substractItemFromCart } = useCart();

   const [message, setMesage] = useMessageToast();

   const handleAddToCart = (product) => {
      addToCart(product);
      setMesage("Article ajouté au panier");
   };

   const HandleSubstractItemFromCart = (product) => {
      substractItemFromCart(product);
      setMesage("Supprimer du panier");
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
                  {!isProductInCart(article.id, cartItems) ? (
                     <button onClick={() => handleAddToCart(article)}>Ajouter au Panier</button>
                  ) : (
                     <button className={styles.productInCart} onClick={() => HandleSubstractItemFromCart(article.id)}>
                        <FontAwesomeIcon icon={faHeart} />
                     </button>
                  )}
               </div>
            </article>
            <div className={styles.articleDetailDescription}>
               <b>Description : </b>
               <p> {article.description}</p>
            </div>
            {message && <MessageToast content={message} />}
         </section>
      </div>
   );
}
