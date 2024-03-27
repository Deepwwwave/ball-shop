import React, { useState } from "react";
import styles from "../styles/ForgottenPassword.module.css";
import { forgottenPassword } from "../api/request/customer";

export default function ForgottenPassword() {
   const [formData, setFormData] = useState({
      email: "",
   });
   const [message, setMessage] = useState("");

   const forgotten = async (e) => {
      e.preventDefault();
      try {
         const res = await forgottenPassword(formData);
         console.log(formData);
         if (res.response) {
            setMessage(res.response.data.msg);
         } else {
            setMessage(res.msg);
            setFormData({
               email: "",
            });
            console.log(`%c Success!! ForgottenPassword => status:${res.status} ~ ${res.msg}}`, "color: green; font-weight: bold;");
         }
      } catch (error) {
         console.error("Error :", error);
      }
   };

   return (
      <div className={styles.forgottenPasswordContainer}>
         <div className={styles.formContainer}>
            {message === "" ? <p> Inserez votre e-mail.</p> : <p> {message} </p>}
            <form onSubmit={forgotten}>
               <input className={styles.formInput}type="text" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="E-mail" />
               <input className={styles.button} type="submit" value="Valider" />
            </form>
         </div>
      </div>
   );
}
