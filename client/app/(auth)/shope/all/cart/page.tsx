"use client";
import React from "react";
import CartItemCard from "../../components/CartItemCard";
import { TotalPriceSelector } from "../../store/features/cartSlice";
import { useAppSelector } from "../../store/store";
import Header from "../../components/Header";

const CartPage = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const totalPrice = useAppSelector(TotalPriceSelector);
  return (
    <div className="p-2">
      <div>
        <Header />
      </div>
      {cartItems.map((item) => (
        <CartItemCard cartItem={item} />
      ))}

      <p className="text-slate-600">
        Total Price:{" "}
        <span className="text-slate-900 font-bold">{totalPrice} $</span>
      </p>
    </div>
  );
};

export default CartPage;
