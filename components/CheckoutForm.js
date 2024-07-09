// components/CheckoutForm.js
import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const CheckoutForm = ({ subTotal }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    // Create payment intent on server
    const { clientSecret } = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: subTotal * 100 }), // Amount in cents
    }).then((res) => res.json());

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    setLoading(false);

    if (error) {
      console.error(error);
    } else {
      console.log("Payment successful:", paymentIntent);
      // Handle successful payment here (e.g., show a success message, update order status)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading} className="mt-4 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
        {loading ? "Processing..." : `Pay ₹${subTotal}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
