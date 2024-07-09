import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { IoBagCheckOutline } from "react-icons/io5";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Checkout = ({ cart, subTotal, addtoCart, removeFromCart }) => {
  const initiatePayment= async()=>{
    let oid = Math.floor(Math.random()*Date.now()); //order id
    //Get a transaction token
    const data = {cart, subTotal, oid, email: "email"};
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method:'POST', //or 'PUT'
      headers:{
          'Content-Type': 'application/json',
      },
      body:JSON.stringify(data),
    })
    let txnRes = await a.json()
    console.log(txnRes)
    let txnToken = txnRes.txnToken

    var config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
      "orderId": oid, /* update order id */
      "token": txnToken, /* update token value */
      "tokenType": "TXN_TOKEN",
      "amount": subTotal /* update amount */
      },
      "handler": {
      "notifyMerchant": function(eventName,data){
      console.log("notifyMerchant handler function called");
      console.log("eventName => ",eventName);
      console.log("data => ",data);
      }
      }
      };

      window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
      // after successfully updating configuration, invoke JS Checkout
      window.Paytm.CheckoutJS.invoke();
      }).catch(function onError(error){
      console.log("error => ",error);
      });


  }
  
  return (
    <div className="container mx-auto p-4">
      <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/></Head>
      <Script type="application/javascript" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} crossorigin="anonymous"/>

      <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
      <h2 className="font-semibold text-xl mb-4">1. Delivery Details</h2>
      
      <div className="mx-auto flex flex-wrap my-4">
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"

          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"

          />
        </div>
      </div>

      <div className="w-full px-2 mb-4">
        <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
        <textarea
          name="address"
          id="address"
          cols="2"
          rows="2"
          className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"

        ></textarea>
      </div>

      <div className="mx-auto flex flex-wrap my-4">
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"

          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label htmlFor="city" className="leading-7 text-sm text-gray-600">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <div className="mx-auto flex flex-wrap my-4">
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label htmlFor="state" className="leading-7 text-sm text-gray-600">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">
            Pin Code
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <h2 className="font-semibold text-xl mb-4">2. Review Cart Items</h2>
      <div className="sideCart bg-pink-100 p-8 m-2">
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && <div className="my-4 font-semibold">Your Cart is Empty</div>}
          {Object.keys(cart).map((k) => (
            <li key={k} className="my-5">
              <div className="item flex justify-between items-center">
                <div className="font-semibold">{cart[k].namer} ({cart[k].size}) / {cart[k].variant}</div>
                <div className="font-semibold flex items-center justify-center w-1/3 text-lg">
                  <AiFillMinusCircle
                    onClick={() => removeFromCart(k, 1, cart[k].price, cart[k].namer, cart[k].size, cart[k].variant)}
                    className="mx-2 text-pink-500"
                  />
                  {cart[k].qty}
                  <AiFillPlusCircle
                    onClick={() => addtoCart(k, 1, cart[k].price, cart[k].namer, cart[k].size, cart[k].variant)}
                    className="mx-2 text-pink-500"
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
        <span className="total font-bold">Subtotal: ₹{subTotal}</span>
      </div>


      <Link href={'/order'}><button onClick={initiatePayment} className="flex ml-2 mt-5 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-sm"><IoBagCheckOutline className="m-1" />Pay ₹{subTotal}</button></Link>
    </div>
  );
};

export default Checkout;
