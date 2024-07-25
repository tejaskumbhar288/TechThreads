import React from "react";
import Link from "next/link";
import mongoose from "mongoose";
import Product from "@/models/Product";
import Head from "next/head";

const Mugs = ({ products }) => {
  return (
    <div>
      <Head>
        <title>TechThreads.com - Mugs for Coders and Tech Enthusiasts</title>
        <meta name="description" content="Discover TechThreads.com's exclusive collection of mugs designed for coders and tech enthusiasts. Perfect for your coffee breaks." />
        <meta name="keywords" content="TechThreads, mugs for coders, tech mugs, coder mugs, tech enthusiasts, coffee mugs, stylish mugs" />
      </Head>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(products).length === 0 && <p>Sorry, all the Mugs are currently out of stock. New stock coming soon. Stay tuned!</p>}
            {Object.keys(products).map((item) => {
              return (
                <Link
                  passHref={true}
                  key={products[item]._id}
                  href={`/product/${products[item].slug}`}
                >
                  <div className="lg:w-9/10 md:w-8/10 p-4 w-full shadow-lg m-5">
                    <img
                      alt={`Mug - ${products[item].title}`}
                      className="m-auto h-[36vh] block"
                      src={products[item].img}
                    />
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        Mugs
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
                        {products[item].color.includes('pink') && <button className="border-2 border-gray-300 ml-1 bg-pink-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-400 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-400 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('white') && <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>}
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

  let products = await Product.find({ category: 'mugs' });
  let mug = {};
  for (let item of products) {
    if (item.title in mug) {
      if (!mug[item.title].color.includes(item.color) && item.availableQty > 0) {
        mug[item.title].color.push(item.color);
      }
      if (!mug[item.title].size.includes(item.size) && item.availableQty > 0) {
        mug[item.title].size.push(item.size);
      }
    } else {
      mug[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        mug[item.title].color = [item.color];
        mug[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(mug)) },
  };
}

export default Mugs;
