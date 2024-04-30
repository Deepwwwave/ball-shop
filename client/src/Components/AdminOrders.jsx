import React from "react";
import styles from "../styles/AdminOrders.module.css"

export default function AdmminOrders() {
   return (
      <div className={styles.adminOrdersContainer}>
         <img src="/images/maintenance_en_cours.png" alt="maintenance" />
         <p>Coming soon</p>
      </div>
   );
}
