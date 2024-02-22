// Cart.js

import React from "react";
import styles from "../styles/CartItemLinkNavbar.module.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import useCart from "../hooks/useCart";

export default function CartItemLinkNavbar() {

   const { totalItems } = useCart()
   
   return (
      <div className={styles.cartItem}>
         <NavLink to="cart">
            <FontAwesomeIcon className={styles.cartIcon} icon={faShoppingCart}/>
            <span className={styles.quantity}>{totalItems}</span>
         </NavLink>
      </div>
   );
}
