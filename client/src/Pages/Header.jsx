// Header.js
import React from "react";
import Navbar from "../Components/Navbar";
import CartItemLinkNavbar from "../Components/CartItemLinkNavbar";
import styles from "../styles/Header.module.css";

export default function Header() {
   return (
      <div className={styles.mainContainer}>
         <div className={styles.titleContainer}>
            <h1 style={{ fontWeight: "lighter" }}>Ma pelote en mohair</h1>
         </div>
         <div className={styles.bottomContainer}>
            <Navbar className={styles.nav}/>
            <CartItemLinkNavbar className={styles.cart} />
         </div>
      </div>
   );
}
