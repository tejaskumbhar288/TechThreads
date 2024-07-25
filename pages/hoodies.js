import React from "react";
import Link from "next/link";
import mongoose from "mongoose";
import Product from "@/models/Product";
import Head from "next/head";

const Hoodies = ({ products }) => {
  return (
    <div>
      <Head>
        <title>TechThreads.com - Hoodies for Coders and Tech Enthusiasts</title>
        <meta name="description" content="Explore TechThreads.com's exclusive collection of hoodies designed for coders and tech enthusiasts. Comfortable, stylish, and perfect for all seasons." />
        <meta name="keywords" content="TechThreads, hoodies for coders, tech hoodies, comfortable hoodies, stylish hoodies, coder apparel, tech enthusiasts" />
      </Head>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(products).length === 0 && <p>Sorry, all the Hoodies are currently out of stock. New stock coming soon. Stay tuned!</p>}
            {Object.keys(products).map((item) => {
              return (
                <Link
                  passHref={true}
                  key={products[item]._id}
                  href={`/product/${products[item].slug}`}
                >
                  <div className="lg:w-9/10 md:w-8/10 p-4 w-full shadow-lg m-5">
                    <img
                      alt={`Hoodie - ${products[item].title}`}
                      className="m-auto h-[36vh] block"
                      src={products[item].img}
                    />
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        Hoodies
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {products[item].title}
                      </h2>
                      <p className="mt-1">₹{products[item].price}</p>
                      <div className="mt-1">
                        {products[item].size.includes("S") && <span className="border border-gray-600 px-1 mx-1">S</span>}
                        {products[item].size.includes("M") && <span className="border border-gray-600 px-1 mx-1">M</span>}
                        {products[item].size.includes("L") && <span className="border border-gray-600 px-1 mx-1">L</span>}
                        {products[item].size.includes("XL") && <span className="border border-gray-600 px-1 mx-1">XL</span>}
                        {products[item].size.includes("XXL") && <span className="border border-gray-600 px-1 mx-1">XXL</span>}
                      </div>
                      <div className="mt-1">
                        {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('blue') && <button className="border-2 border-blue-300 ml-1 bg-blue-300 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('black') && <button className="border-2 border-black-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('purple') && <button className="border-2 border-purple-300 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('yellow') && <button className="border-2 border-yellow-300 ml-1 bg-yellow-600 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('gray') && <button className="border-2 border-gray-300 ml-1 bg-gray-400 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('green') && <button className="border-2 border-green-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let products = await Product.find({ category: 'hoodies' });
  let hoods = {}
  for (let item of products) {
    if (item.title in hoods) {
      if (!hoods[item.title].color.includes(item.color) && item.availableQty > 0) {
        hoods[item.title].color.push(item.color);
      }
      if (!hoods[item.title].size.includes(item.size) && item.availableQty > 0) {
        hoods[item.title].size.push(item.size);
      }
    } else {
      hoods[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        hoods[item.title].color = [item.color];
        hoods[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(hoods)) },
  }
}

export default Hoodies;
