import React from 'react'
import mongoose from 'mongoose'
import Order from '@/models/Order'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

const Orders = ({ logout, user, cart, addtoCart, removeFromCart, clearCart, subTotal }) => {
    const router = useRouter()
  useEffect(() => {
    if(!localStorage.getItem('token')){
      router.push('/')
    }
  }, [])
  return (
    <div>
        <div className="container mx-auto ml-5">
            

            <h1 className="font-semibold text-2xl p-8 text-center">My orders</h1>
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
                                        
                                        <span className="mx-3 text-sm">{cart[k].qty}</span>
                                        
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ol>
{/* <div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Color
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Sony BRAVIA 7 Series
                </th>
                <td className="px-6 py-4">
                   Black
                </td>
                <td className="px-6 py-4">
                    TV
                </td>
                <td className="px-6 py-4">
                ₹ 173840
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                BEARDO Lion Heart Hoodie
                </th>
                <td className="px-6 py-4">
                    Gray
                </td>
                <td className="px-6 py-4">
                    Hoodie
                </td>
                <td className="px-6 py-4">
                ₹ 379
                </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Itachi Printed Ceramic Mug
                </th>
                <td className="px-6 py-4">
                    Black
                </td>
                <td className="px-6 py-4">
                    Mugs
                </td>
                <td className="px-6 py-4">
                ₹ 349
                </td>
            </tr>
        </tbody>
    </table>
</div> */}

        </div>
    </div>
  )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }
  
    let orders = await Order.find({});
  
    return {
      props: { orders: orders },
    }
  }

export default Orders