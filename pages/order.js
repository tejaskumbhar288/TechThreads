import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Order = ({ cart, subTotal, clearCart }) => {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        // Click was outside the popup content or overlay
        // Only close popup if the click wasn't on the close button
        if (!event.target.closest('.popup-close-button')) {
          return;
        }
        handleClosePopup();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePay = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleConfirmPayment = () => {
    clearCart(); // Clear the cart when confirming payment
    toast.success('Order Placed Successfully!', {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: "bounce",
    });

    // Redirect to home page after toast is displayed
    setTimeout(() => {
      router.push('/');
    }, 2000); // Same duration as autoClose for consistency

    // Close the popup after confirming payment
    handleClosePopup();
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4 text-center">Order ID: #123455</h1>
            <div className="flex mb-4">
              <span className="flex-grow text-center py-2 text-lg px-1">Item Description</span>
              <span className="flex-grow text-center border-gray-300 py-2 text-lg px-1">Item Total</span>
            </div>
            <div className="sideCart bg-pink-100 p-8 m-2">
              <ol className="list-decimal font-semibold">
                {Object.keys(cart).length === 0 && <div className="my-4 font-semibold">Your Cart is Empty</div>}
                {Object.keys(cart).map((k) => (
                  <li key={k}>
                    <div className="item flex my-5 justify-between">
                      <div className="font-semibold">{cart[k].namer}({cart[k].size}/{cart[k].variant})</div>
                      <div className="font-semibold">₹{cart[k].price}</div>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mb-2 text-center">Amount: ₹{subTotal}</p>
              <button
                onClick={handlePay}
                className="flex mt-4 ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded"
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
          <div className="absolute bg-gray-500 bg-opacity-75 inset-0" onClick={handleClosePopup}></div>
          <div ref={popupRef} className="bg-white p-8 rounded-lg max-w-sm w-full relative z-10" style={{ maxWidth: '300px', maxHeight: '80vh' }}>
            <div className="absolute top-0 right-0 m-4">
              <button className="text-gray-500 hover:text-gray-700 popup-close-button" onClick={handleClosePopup}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <h2 className="text-xl font-bold mb-4 text-center">Order Details</h2>
            <p className="mb-2 text-center">Order ID: #123455</p>
            <div className="flex justify-center">
              <img src="https://cdn.pixabay.com/photo/2021/12/12/16/10/qr-6865526_640.png" alt="QR Code" className="w-40 h-40 mb-4" />
            </div>
            <p className="mb-2 text-center">Amount: ₹{subTotal}</p>
            <button
              onClick={handleConfirmPayment}
              className="mt-4 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded w-full"
            >
              Confirm Payment
            </button>
          </div>
        </div>
      )}

    </section>
  );
};

export default Order;
