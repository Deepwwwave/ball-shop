import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../Components/CheckoutForm";
import { useLocation } from "react-router-dom";

const { VITE_PUBLIC_STRIPE_KEY } = import.meta.env;
const stripePromise = loadStripe(VITE_PUBLIC_STRIPE_KEY);

export default function Payment() {
   const [clientSecret, setClientSecret] = useState("");
   const location = useLocation();

   useEffect(() => {
      // Récupérer le clientSecret depuis l'emplacement actuel
      const clientSecretFromState = location.state ? location.state.clientSecret : "";
      setClientSecret(clientSecretFromState);
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
         <CheckoutForm clientSecret={clientSecret} />
      </Elements>
   );
}
