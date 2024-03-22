import React, { useEffect, useState } from "react";
import styles from "../styles/CheckoutForm.module.css";
import config from "../../config/config";
import { PaymentElement, AddressElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm({ clientSecret, totalPrice }) {
   let clientUrl = config();
   const stripe = useStripe();
   const elements = useElements();
   console.log(clientSecret);

   const [message, setMessage] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const [adress, setAdress] = useState(null);
   const [name, setName] = useState('');

   const handlePayment = () => {
      console.log(adress);
      console.log(name);
   };

   useEffect(() => {
      if (!stripe) {
         return;
      }

      const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

      if (!clientSecret) {
         return;
      }

      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
         switch (paymentIntent.status) {
            case "succeeded":
               setMessage("Payment succeeded!");
               break;
            case "processing":
               setMessage("Your payment is processing.");
               break;
            case "requires_payment_method":
               setMessage("Your payment was not successful, please try again.");
               break;
            default:
               setMessage("Something went wrong.");
               break;
         }
      });
   }, [stripe]);

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!stripe || !elements || !clientSecret) {
         return;
      }

      setIsLoading(true);

      const { error } = await stripe.confirmPayment({
         elements,
         confirmParams: {
            return_url: `${clientUrl}`,
         },
         billing_details: {
            email: 'test@example.com',
          }
      });

      if (error.type === "card_error" || error.type === "validation_error") {
         setMessage(error.message);
      } else {
         setMessage("An unexpected error occurred.");
      }

      setIsLoading(false);
   };

   const paymentElementOptions = {
      layout: "tabs",
   };

   return (
      <div className={styles.checkoutFormContainer}>
         <form className={styles.form} id="payment-form" onSubmit={handleSubmit}>
            <AddressElement
               options={{ mode: "shipping" }}
               onChange={(event) => {
                  if (event.complete) {
                     // Extract potentially complete address
                     console.log(adress);
                     setAdress(event.value.address);
                  }
               }}
            />
            <PaymentElement
               id="payment-element"
               options={paymentElementOptions}
               onChange={(event) => {
                  if (event.complete) {
                     // Assurez-vous que l'événement provient du champ de nom
                     setName(document.getElementById("Field-nameInput").value);
                     console.log(name);
                  }
               }}
            />
            <p>Règlement: {totalPrice}€</p>
            <button onClick={handlePayment} className={styles.checkoutFormButton} disabled={isLoading || !stripe || !elements} id="submit">
               <span id="button-text">{isLoading ? <div className={styles.spinner} id="spinner"></div> : "Valider le paiement"}</span>
            </button>
            {message && <div id="payment-message">{message}</div>}
         </form>
      </div>
   );
}
