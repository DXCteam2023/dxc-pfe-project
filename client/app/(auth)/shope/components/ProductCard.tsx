
//import Image from "next/image";
import React from "react";
import AddToCartBtn from "./AddToCartBtn";


const ProductCard = (props: any) => {
  return (
    <div className="border rounded-md shadow hover:shadow-lg transition overflow-hidden ">
      <img
        src={props.product.image}
        width={400}
        height={300}
        alt={props.product.name}
      />
      <div className="p-2">
        <h6 className="text-center text-slate-600">
          {props.product.name}
        </h6>
        <p className="text-center text-slate-600">
          {props.product.productOfferingPrice[0].price.taxIncludedAmount.value}  {props.product.productOfferingPrice[0].price.taxIncludedAmount.unit}
        </p>
        <AddToCartBtn product={props.product} />
      </div>
    </div>
  );
};

export default ProductCard;
