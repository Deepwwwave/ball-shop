import React from "react";
import styles from "../styles/Deconnexion.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Deconnexion() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const checkOut = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenSession");
      dispatch({ type: "ACTION_SPECIALE_REINITIALISER" });
      navigate("/");
   };

   const stay = () => {
      navigate("/");
   };

   return (
      <section className={styles.deconnexionMainContainer}>
         <div className={styles.deconnexion}>
            <p>Se déconnecter ?</p>
            <div className={styles.buttonContainer}>
               <button onClick={checkOut}>Oui</button>
               <button onClick={stay}>Non</button>
            </div>
         </div>
      </section>
   );
}
