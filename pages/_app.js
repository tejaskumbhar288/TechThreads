import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {
    const [cart, setCart] = useState({});
    const [subTotal, setSubTotal] = useState(0);
    const [user, setUser] = useState({ value: null });
    const [key, setKey] = useState(0);
    const [progress, setProgress] = useState(0)
    const router = useRouter();

    useEffect(() => {
      router.events.on('routeChangeStart', ()=>{
        setProgress(40)
      })
      router.events.on('routeChangeComplete', ()=>{
        setProgress(100)
      })
        try {
            if (localStorage.getItem("cart")) {
                setCart(JSON.parse(localStorage.getItem("cart")));
                saveCart(JSON.parse(localStorage.getItem("cart")));
            }
        } catch (error) {
            console.error(error);
            localStorage.clear();
        }
        const token = localStorage.getItem('token');
        if (token) {
            setUser({ value: token });
            setKey(Math.random());
        }
    }, [router.query]);

    const logout = ()=>{
      localStorage.removeItem("token")
      setUser({value: null})
      setKey(Math.random())
      router.push('/')
    }

    const saveCart = (myCart) => {
        localStorage.setItem("cart", JSON.stringify(myCart));
        let subt = 0; // Calculate the subtotal
        let keys = Object.keys(myCart);
        for (let i = 0; i < keys.length; i++) {
            subt += myCart[keys[i]].price * myCart[keys[i]].qty;
        }
        setSubTotal(subt);
    };

    const addtoCart = (itemCode, qty, price, namer, size, variant) => {
        let newCart = { ...cart };
        if (itemCode in cart) {
            newCart[itemCode].qty += qty;
        } else {
            newCart[itemCode] = { qty, price, namer, size, variant };
        }
        setCart(newCart);
        saveCart(newCart);
    };

    const buyNow = (itemCode, qty, price, namer, size, variant) => {
        let newCart = { itemCode: { qty, price, namer, size, variant } };
        setCart(newCart);
        saveCart(newCart);
        console.log(newCart);
        router.push('/checkout');
    };

    const clearCart = () => {
        setCart({});
        saveCart({});
    };

    const removeFromCart = (itemCode, qty, price, namer, size, variant) => {
        let newCart = { ...cart };
        if (itemCode in cart) {
            newCart[itemCode].qty -= qty;
        }
        if (newCart[itemCode].qty <= 0) {
            delete newCart[itemCode];
        }
        setCart(newCart);
        saveCart(newCart);
    };

    return (
        <>
            <LoadingBar
        color='#ff2d55'
        waitingTime={400}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
            <Navbar
                logout={logout}
                user={user}
                key={key}
                cart={cart}
                addtoCart={addtoCart}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                subTotal={subTotal}
            />
            <Component
                cart={cart}
                buyNow={buyNow}
                addtoCart={addtoCart}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                subTotal={subTotal}
                {...pageProps}
            />
            <Footer />
        </>
    );
}
