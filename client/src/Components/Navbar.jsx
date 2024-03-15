import React, { useState, useEffect } from "react";
import styles from "../styles/Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
   const [toggleNav, setToggleNav] = useState(false);
   const [width, setWidth] = useState(window.innerWidth);
   const isLogged = useSelector((state) => state.user.isLogged);
   const userRole = useSelector((state) => state.user.userRole);
   const userUuid = useSelector((state) => state.user.userUuid);

   const changeToggleNav = () => {
      setToggleNav(!toggleNav);
   };

   useEffect(() => {
      const changeWidth = () => {
         setWidth(window.innerWidth);
      };
      window.addEventListener("resize", changeWidth);
      return () => {
         window.removeEventListener("resize", changeWidth);
      };
   }, []);

   return (
      <nav className={styles.nav}>
         {(toggleNav || innerWidth > 780) && (
            <div className={styles.containerLinks}>
               <div className={styles.containerShowcaseLinks}>
                  <ul className={styles.liste}>
                     <NavLink to="/">
                        <li className={styles.item} onClick={changeToggleNav}>
                           <p className={styles.spaceOverNav}></p>
                           La Ferme
                        </li>
                     </NavLink>
                     <NavLink to="boutique">
                        <li className={styles.item} onClick={changeToggleNav}>
                           Boutique
                        </li>
                     </NavLink>
                  </ul>
               </div>
               <div className={styles.containerSettingsLinks}>
                  <ul className={styles.liste}>
                     { isLogged && <NavLink to={`profil/${userUuid}`}>
                        <li className={styles.item} onClick={changeToggleNav}>
                           Profil
                        </li>
                     </NavLink> }
                     {userRole === "2" && (
                        <NavLink to="admin">
                           <li className={styles.item} onClick={changeToggleNav}>
                              Admin
                           </li>
                        </NavLink>
                     )}
                     <NavLink to={isLogged === false ? "connexion" : "deconnexion"}>
                        <li className={styles.item} onClick={changeToggleNav}>
                           {isLogged === false ? "Connexion " : "Déconnexion "}
                           {/*<FontAwesomeIcon  icon={faPowerOff} />*/}
                        </li>
                     </NavLink>
                  </ul>
               </div>
            </div>
         )}

         {innerWidth < 780 && (
            <div onClick={changeToggleNav} className={styles.btn}>
               <div className={toggleNav ? styles.contLigneActive : styles.contLigne}>
                  <div className={styles.ligneUnique}></div>
               </div>
            </div>
         )}
      </nav>
   );
}
