import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "../styles/ValidateAccount.module.css";
import { validateAccount } from "../api/request/customer";

export default function ValidateAccount() {
   const { uuid } = useParams();

   const navigate = useNavigate();

   const token = localStorage.getItem("token");

   const emailValidation = async () => {
      console.log(token);
      try {
         const res = await validateAccount(uuid, token);
         console.log(uuid);

         if (res.response) {
            console.error(`Error de validation de mail`);
         } else {
            console.log(`%c Success!! validateAccount => status:${res.status} ~ ${res.msg}`, "color: green; font-weight: bold;");
            navigate("/");
         }
      } catch (error) {}
   };

   return (
      <div className={styles.mainContainer}>
         <div className={styles.textContainer}>
            <h4>
               La chaussette en mohair <br />
               <br />
               Bienvenue,
            </h4>
            <p>Cliquez sur le bouton. Vous pourrez ensuite vous connecter. Merci.</p>
         </div>
         <button onClick={() => emailValidation()}>Valider mon compte</button>
      </div>
   );
}
