import React from "react";
import Link from "next/link";
import mongoose from "mongoose";
import Product from "@/models/Product";
import Head from "next/head";

const TVs = ({ products }) => {
  return (
    <div>
      <Head>
        <title>TechThreads.com - TVs for the Ultimate Viewing Experience</title>
        <meta name="description" content="Discover the latest collection of TVs on TechThreads.com. Experience top-notch visuals and sound quality with our range of high-definition TVs." />
        <meta name="keywords" content="TechThreads, TVs, high-definition TVs, smart TVs, best TVs, affordable TVs, top-quality TVs, 4K TVs" />
      </Head>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(products).length === 0 && <p>Sorry, all the TVs are currently out of stock. New stock coming soon. Stay tuned!</p>}
            {Object.keys(products).map((item) => {
              return (
                <Link
                  passHref={true}
                  key={products[item]._id}
                  href={`/product/${products[item].slug}`}
                >
                  <div className="lg:w-9/10 md:w-8/10 p-4 w-full shadow-lg m-5">
                    <img
                      alt={`TV - ${products[item].title}`}
                      className="m-auto h-[36vh] block"
                      src={products[item].img}
                    />
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        TVs
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
                        {products[item].color.includes("red") && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes("blue") && <button className="border-2 border-blue-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes("black") && <button className="border-2 border-black-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes("purple") && <button className="border-2 border-purple-300 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none"></button>}
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

  let products = await Product.find({ category: 'tvs' });
  let tv = {}
  for (let item of products) {
    if (item.title in tv) {
      if (!tv[item.title].color.includes(item.color) && item.availableQty > 0) {
        tv[item.title].color.push(item.color);
      }
      if (!tv[item.title].size.includes(item.size) && item.availableQty > 0) {
        tv[item.title].size.push(item.size);
      }
    } else {
      tv[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tv[item.title].color = [item.color];
        tv[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(tv)) },
  }
}

export default TVs;
