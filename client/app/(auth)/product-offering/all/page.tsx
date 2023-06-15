"use client";

import Header from "@/app/components/header/header";
import Product from "./test/product";
import Footer from "@/app/components/footer/footer";

export default function AllProductOfferingsPage() {
  return (
    <div className="text-center my-5 flex flex-col gap-4">
      <Header styleElements={{
        linksColor: undefined
      }}/>
        <h1 className="text-2xl font bold">All Product Offerings</h1>
        <Product/>
        <Footer/>
    </div>
  )
}