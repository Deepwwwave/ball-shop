import React, { useState } from "react";useDispatch
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { isConnected } from "../store/slices/user";
import { signUp } from "../api/request/customer";
import { signIn } from "../api/request/customer";
import styles from "../styles/Connexion.module.css";

export default function Connexion() {
   const dispatch = useDispatch()
   const navigate = useNavigate()   
   
   const [toggle, setToggle] = useState(false);
   const [message, setMessage] = useState();
   const [formData, setFormData] = useState({
      email: "",
      password: "",
   });

   // SIGN_IN //
   const onSubmitSignIn = async (e) => {
      e.preventDefault();
      try {
         const res = await signIn(formData);
         // res.response correspond à error.response, error qui est catch avec axios (customer.js)
         if (res.response) {
            const { status, msg } = res.response.data;
            setMessage(msg);
            console.error(`Error signIn: status => `, status, msg);
         } else {
            localStorage.setItem("token", res.token);
            localStorage.setItem('tokenSession', res.tokenSession);
            console.log(`%c Success!! signIn => status:${res.status} ~ ${res.msg}`, "color: green; font-weight: bold;");
            dispatch(isConnected({userRole: res.role, userUuid: res.uuid}));
            navigate("/");
         }
      } catch (error) {
         console.error("Error :", error);
      }
   };

   // SIGN_UP //
   const onSubmitSignUp = async (e) => {
      e.preventDefault();
      try {
         const res = await signUp(formData);
         if (res.response) {
            const { status, msg } = res.response.data;
            switch (status) {
               case 400:
                  setMessage("Email ou mot de passe incorrects");
                  break;
               case 401:
               case 404:
               case 409:
                  setMessage(msg);
                  break;
               default:
                  break;
            }
            console.error(`Error signUp: status => `, status, msg);
         } else {
            setMessage(res.msg);
            setFormData({
               email: "",
               password: "",
            });
            localStorage.setItem('token', res.token);
            console.log(`%c Success!! signUp => status:${res.status} ~ ${res.msg}}`, "color: green; font-weight: bold;");
         }
      } catch (error) {
         console.error("Error :", error);
      }
   };

   const changeToggle = () => {
      setToggle(!toggle);
   };

   return (
      <main className={styles.mainConnexion}>
         <h3>{ toggle ? "Créer un compte" : " Se connecter "}</h3>
         <form onSubmit={(e) => (toggle ? onSubmitSignUp(e) : onSubmitSignIn(e))} className={styles.form}>
            {message !== null && <p>{message}</p>}
            <input type="text" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" />
            <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Mot de passe" />
            {toggle && (
               <p>
                  Le mot de passe doit avoir au moins 8 caractères,
                  <br /> 1 lettre minuscule,
                  <br /> 1 lettre majuscule,
                  <br /> 1 chiffre ou 1 caractère spécial
               </p>
            )}
            <input className={styles.button} type="submit" value={toggle ? "Créer" : "Connexion"} />
         </form>
         { !toggle && ( <NavLink to='/forgotten-password' > Mot de passe oublié </NavLink> )}
         <br/>
         <br/>
         <br/>
         <a onClick={changeToggle}> {toggle ? "J'ai déjà un compte" : "Créer un compte"} </a>
      </main>
   );
}
