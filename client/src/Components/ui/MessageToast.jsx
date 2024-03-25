import React, { useState, useEffect } from "react";
import styles from "../../styles/MessageToast.module.css"

export default function MessageToast({ content }) {

      
   return (

      <div className={styles.messageToastContainer}>{content}</div>

   );
}

