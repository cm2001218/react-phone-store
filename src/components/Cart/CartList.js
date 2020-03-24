import React from "react";
import CartItem from "./CartItem";

// function CartList(props) {
//   const { cart } = props.value;
function CartList({ value }) {
  const { cart } = value;
  return (
    <div className="container-fluid">
      {cart.map(item => {
        return <CartItem key={item.id} item={item} value={value}></CartItem>;
      })}
    </div>
  );
}

export default CartList;
