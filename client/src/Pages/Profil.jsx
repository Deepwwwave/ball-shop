import React, { useState, useEffect } from "react"; 
import styles from "../styles/Profil.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { reqGetOneUser } from "../api/request/customer";

export default function Profil() {
   const { isLogged, userUuid } = useSelector((state) => state.user);
   const [email, setEmail] = useState("");
   const navigate = useNavigate();

   useEffect(() => { 
      const getOneUser = async () => { 
         try {
            const res = await reqGetOneUser(userUuid); 
            if (res.response) {
               console.log(res.response.msg);
               navigate("/")
               ;
            } else {
               setEmail(res.user.email);
            }
         } catch (error) {
            console.log("Error", error);
         }
      };

      getOneUser(); 
   }, [userUuid]); 

   return (
      <section className={styles.profilContainer}>
         <p><u>Profil:</u> {email}</p>
         <br />
         <br />
         <br />
         <u> Mes commandes:</u>
         <img src="/images/maintenance_en_cours.png" alt="maintenance" />
         <i>Coming soon</i>
      </section>
   );
}
