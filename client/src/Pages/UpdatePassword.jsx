import React, { useState } from "react";
import styles from "../styles/UpdatePassword.module.css";
import { updatePassword } from "../api/request/customer";
import { useParams } from "react-router-dom";

export default function UpdatePassword() {
   const uuid = useParams();
   const token = localStorage.getItem("token");
   const [message, setMessage] = useState("");
   const [isUpdated, setIsUpdated] = useState(false);

   const [password1, setPassword1] = useState({
      password: "1",
   });

   const [password2, setPassword2] = useState({
      password: "2",
   });

   const changePassword = async (e) => {
      e.preventDefault();
      try {
         if (password1.password === password2.password) {
            const res = await updatePassword(password1, uuid, token);
            if (res.response) {
               const { status, msg } = res.response.data;
               setMessage("Mot de passe incorrect");
               console.error(`Error updatePassword: status => `, status, msg);
            } else {
               setIsUpdated(true);
               setMessage(res.msg);
               setPassword1({
                  password: "",
               });
               setPassword2({
                  password: "",
               });
               console.log(res);
               console.log(`%c Success!! updatePassword => status:${res.status} ~ ${res.msg}`, "color: green; font-weight: bold;");
            }
         } else {
            setMessage("Les deux champs doivent être identiques.");
         }
      } catch (error) {
         console.error("Error", error);
      }
   };
   console.log(password1.password);
   return (
      <div className={styles.formContainer}>
         {isUpdated ? (<p> {message} </p>)
         
                    : (<div>
                        {message === "" ? <p> Inserez votre nouveau mot de passe dans les deux champs:</p> : <p> {message} </p>}
                       <form onSubmit={(e) => changePassword(e)}>
                          <input type="password" placeholder="Nouveau mot de passe" onChange={(e) => setPassword1({ ...password1, password: e.target.value })} />
                          <input type="password" placeholder="Nouveau mot de passe" onChange={(e) => setPassword2({ ...password2, password: e.target.value })} />
                          <input type="submit" />
                          <p>
                            Au moins 8 caractères,
                            <br /> 1 lettre minuscule,
                            <br /> 1 lettre majuscule,
                            <br /> 1 chiffre ou 1 caractère spécial
                          </p>
                        </form>
                      </div>)}
        </div>
   );
}
