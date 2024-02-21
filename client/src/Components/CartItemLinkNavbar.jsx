// Cart.js

import React from "react";
import styles from "../styles/CartItemLinkNavbar.module.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default function CartItemLinkNavbar({ quantity }) {
   return (
      <div className={styles.cartItem}>
         <NavLink to="cart">
            <FontAwesomeIcon className={styles.cartIcon} icon={faShoppingCart}/>
            {quantity > 0 && <span className={styles.quantity}>{quantity}</span>}
         </NavLink>
      </div>
   );
}
