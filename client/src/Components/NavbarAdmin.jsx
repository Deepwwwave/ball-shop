import React, { useState } from "react";
import styles from "../styles/NavbarAdmin.module.css";
import { NavLink } from "react-router-dom";

export default function NavbarAdmin() {
   const [toggle1, setToggle1] = useState(false);
   const [toggle2, setToggle2] = useState(false);

   const changeToggle1 = () => {
      setToggle1(true);
      setToggle2(false);
   };

   const changeToggle2 = () => {
      setToggle2(true);
      setToggle1(false);
   };

   return (

      <div className={styles.container}>
         <ul className={styles.liste}>
            <NavLink to="products" onClick={changeToggle1} className={toggle1 && styles.toggle}>
               <li className={styles.item}>Articles</li>
            </NavLink>
            <NavLink to="orders" onClick={changeToggle2} className={toggle2 && styles.toggle}>
               <li className={styles.item}>Commandes</li>
            </NavLink>
         </ul>
         {/* <hr style={{ width: '20%' }} /> */}
      </div>
   );
}
