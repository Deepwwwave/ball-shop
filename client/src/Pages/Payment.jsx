import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../Components/CheckoutForm";
import { useLocation } from "react-router-dom";

// const { VITE_PUBLIC_STRIPE_KEY } = import.meta.env;
const stripePromise = loadStripe("pk_test_51KZErmEc4VeEZWJY9oExGncR4pdk7wYY7IbAuNPEJ0QNDe5DvrZRFWkj3Kc6nBavtfY7XWZeuYJrVJYLQMzes8SE00BNj4tZLI");
// const stripePromise = loadStripe(VITE_PUBLIC_STRIPE_KEY);

export default function Payment() {
   const [clientSecret, setClientSecret] = useState("");
   const [totalPrice, setTotalPrice] = useState("");
   const location = useLocation();

   useEffect(() => {
      // Récupérer le clientSecret depuis l'emplacement actuel
      const clientSecretFromState = location.state ? location.state.clientSecret : "";
      const totalPriceFromState = location.state ? location.state.totalPrice : "";
      setClientSecret(clientSecretFromState);
      setTotalPrice(totalPriceFromState);
   }, [location.state]);

   const appearance = {
      theme: "stripe",
   };

   const options = {
      clientSecret,
      appearance,
   };

   return (
      <Elements options={options} stripe={stripePromise}>
         <CheckoutForm clientSecret={clientSecret} totalPrice={totalPrice} />
      </Elements>
   );
}
