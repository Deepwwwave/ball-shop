import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./styles/App.module.css";
import Header from "./Pages/Header";
import Admin from "./Pages/Admin";
import Boutique from "./Pages/Boutique";
import Home from "./Pages/Home";
import Profil from "./Pages/Profil";
import Footer from "./Pages/Footer";
import ArticleDetail from "./Pages/ArticleDetail";
import PageError from "./Pages/PageError";
import Connexion from "./Pages/Connexion";
import Deconnexion from "./Pages/Deconnexion";
import Cart from "./Pages/Cart";
import Payment from "./Pages/Payment";
import InvoicePDF from "./Pages/InvoicePDF";
import CGV from "./Pages/CGV";
import MentionsLegales from "./Pages/MentionsLegales";
import ValidateAccount from "./Pages/ValidateAccount";
import ForgottenPassword from "./Pages/ForgottenPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import AdminProducts from "./Components/AdminProducts";
import AdminOrders from "./Components/AdminOrders";
import { refreshToken } from "./api/request/customer";
import { isConnected } from "./store/slices/user";

function App() {
   const dispatch = useDispatch();
   const tokenSession = localStorage.getItem("tokenSession");

   const checkSession = async () => {
      try {
         const res = await refreshToken(tokenSession);
         if (res.response) {
            console.log(res.response.data);
         } else {
            console.log(res.msg);
            dispatch(isConnected({ userRole: res.role, userUuid: res.uuid }));
         }
      } catch (error) {
         console.log("Error :", error);
      }
   };

   useEffect(() => {
      checkSession(tokenSession);
   }, [tokenSession]);

   return (
      <div className={styles.app}>
         <Header className={styles.header} />
         <div className={styles.pageContainer}>
            <Routes>
               <Route index path="/" element={<Home />} />

               <Route path="boutique" element={<Boutique />} />
               <Route path="boutique/:id" element={<ArticleDetail />} />
               <Route path="profil" element={<Profil />} />

               <Route path="admin" element={<Admin />}>
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="orders" element={<AdminOrders />} />
               </Route>

               <Route path="connexion" element={<Connexion />} />
               <Route path="deconnexion" element={<Deconnexion />} />
               <Route path="cart" element={<Cart />} />
               <Route path="payment" element={<Payment />} />
               <Route path="validate-account/:uuid" element={<ValidateAccount />} />
               <Route path="forgotten-password" element={<ForgottenPassword />} />

               <Route path="update-password/:uuid" element={<UpdatePassword />} />
               {/* <Route path="facturation" element={<InvoicePDF />} /> */}

               <Route path="cgv" element={<CGV />} />
               <Route path="mentions-legales" element={<MentionsLegales />} />

               <Route path="not-found" element={<PageError />} />
               <Route index path="*" element={<PageError />} />
            </Routes>

            <Footer />
         </div>
      </div>
   );
}

export default App;
