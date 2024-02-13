// Header.js
import React from "react";
import Navbar from "../Components/Navbar";
import Cart from "./Cart";
import styles from "../styles/Header.module.css";

export default function Header() {
   return (
      <div className={styles.mainContainer}>
         <div className={styles.titleContainer}>
            <h1 style={{ fontWeight: "lighter" }}>La douce chaussette</h1>
         </div>
         <div className={styles.bottomContainer}>
            <Navbar className={styles.nav}/>
            <Cart className={styles.cart} />
         </div>
      </div>
   );
}
