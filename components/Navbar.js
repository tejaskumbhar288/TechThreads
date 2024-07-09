import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaOpencart } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { MdShoppingCart } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useState } from "react";

const Navbar = ({ logout, user, cart, addtoCart, removeFromCart, clearCart, subTotal }) => {
    const [dropdown, setDropdown] = useState(false)
    // const toggleDropdown = () =>{
    //   setDropdown(!dropdown)
    // }
    const ref = useRef();

    const toggleCart = () => {
        if (ref.current.classList.contains("translate-x-full")) {
            ref.current.classList.remove("translate-x-full");
            ref.current.classList.add("translate-x-0");
        } else if (!ref.current.classList.contains("translate-x-full")) {
            ref.current.classList.remove("translate-x-0");
            ref.current.classList.add("translate-x-full");
        }
    };

    return (
        <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-1 shadow-md sticky top-0 bg-white z-10">
            <div className="logo mr-auto md:mx-5">
                <Link href={"/"}>
                    <Image src="/logo.jpg" alt="Logo of website" width={130} height={40} />
                </Link>
            </div>
            <div className="nav">
                <ul className="flex items-center space-x-2 font-bold md:text-xl">
                    <Link href={"/tshirts"}>
                        <li className='hover:text-pink-500'>Tshirts</li>
                    </Link>
                    <Link href={"/hoodies"}>
                        <li className='hover:text-pink-500'>Hoodies</li>
                    </Link>
                    <Link href={"/tvs"}>
                        <li className='hover:text-pink-500'>TVs</li>
                    </Link>
                    <Link href={"/mugs"}>
                        <li className='hover:text-pink-500'>Mugs</li>
                    </Link>
                </ul>
            </div>

            <div className="cursor-pointer items-center cart absolute right-0 mx-5 top-4 flex">
            {dropdown && <div onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} className="absolute right-12 bg-white shadow-lg border top-8 rounded-md px-5 py-4 w-36">
                  <ul>
                    <Link href = {'/myaccount'}><li className="py-1 hover:text-pink-600 text-sm font-bold">My Account</li></Link>
                    <Link href = {'/orders'}><li className="py-1 hover:text-pink-600 text-sm font-bold">Orders</li></Link>
                    <li onClick={logout} className="py-1 hover:text-pink-600 text-sm font-bold">Logout</li>

                  </ul>
                </div>}
                {user && user.value && <MdOutlineAccountCircle onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}}className="text-xl md:text-4xl mx-2" />}
                {!user.value && (
                  <Link href={'/login'}>
                        <button className="bg-pink-600 px-3 py-2 rounded-md text-sm text-white mx-2">Login</button>
                    </Link>
                )}

                <MdShoppingCart onClick={toggleCart} className="text-xl md:text-4xl" />
            </div>
                

            <div
                ref={ref}
                className="w-72 h-[100vh] sideCart absolute top-0 right-0 bg-pink-100 px-8 py-10 transform transition-transform translate-x-full"
            >
                <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
                <span
                    onClick={toggleCart}
                    className="cursor-pointer absolute top-2 right-2 text-2xl text-pink-500"
                >
                    <IoIosCloseCircle />
                </span>
                <ol className="list-decimal font-semibold">
                    {Object.keys(cart).length === 0 && (
                        <div className="my-4 font-semibold">Your Cart is Empty</div>
                    )}

                    {Object.keys(cart).map((k) => {
                        return (
                            <li key={k}>
                                <div className="item flex my-5">
                                    <div className="w-2/3 font-semibold">
                                        {cart[k].namer}({cart[k].size}/{cart[k].variant})
                                    </div>
                                    <div className="font-semibold flex items-center justify-center w-1/3 text-lg">
                                        <AiFillMinusCircle
                                            onClick={() => {
                                                removeFromCart(
                                                    k,
                                                    1,
                                                    cart[k].price,
                                                    cart[k].namer,
                                                    cart[k].size,
                                                    cart[k].variant
                                                );
                                            }}
                                            className="cursor-pointer text-pink-500"
                                        />
                                        <span className="mx-3 text-sm">{cart[k].qty}</span>
                                        <AiFillPlusCircle
                                            onClick={() => {
                                                addtoCart(
                                                    k,
                                                    1,
                                                    cart[k].price,
                                                    cart[k].namer,
                                                    cart[k].size,
                                                    cart[k].variant
                                                );
                                            }}
                                            className="cursor-pointer text-pink-500"
                                        />
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ol>
                <div className="font-bold my-2">Subtotal: ₹{subTotal}</div>
                <div className="flex">
                    <Link href={"/checkout"}>
                        <button className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
                            <IoBagCheckOutline className="m-1" />
                            Checkout
                        </button>
                    </Link>
                    <button
                        onClick={clearCart}
                        className="flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
                    >
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
