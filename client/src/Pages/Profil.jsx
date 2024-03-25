import React, { useState, useEffect } from "react"; // Importez useEffect de React
import styles from "../styles/Profil.module.css";
import { useSelector } from "react-redux";
import { reqGetOneUser } from "../api/request/customer";

export default function Profil() {
   const { isLogged, userUuid } = useSelector((state) => state.user);
   const [email, setEmail] = useState("");

   useEffect(() => { // Utilisez useEffect directement à l'intérieur du composant
      const getOneUser = async () => { // Définissez getOneUser à l'intérieur de useEffect
         try {
            const res = await reqGetOneUser(userUuid); // Utilisez userUuid directement depuis le scope
            if (res.response) {
               console.log(res.response.msg);
            } else {
               setEmail(res.user.email);
            }
         } catch (error) {
            console.log("Error", error);
         }
      };

      getOneUser(); // Appelez getOneUser ici
   }, [userUuid]); // Assurez-vous de passer userUuid dans le tableau de dépendances pour que useEffect soit rappelé lorsque userUuid change

   return (
      <section className={styles.profilContainer}>
         <p><u>Profil:</u> {email}</p>
         <br />
         <br />
         <br />
         <u> Mes commandes:</u>
         <img src="/images/maintenance.png" alt="maintenance" />
         <i>Coming soon</i>
      </section>
   );
}
