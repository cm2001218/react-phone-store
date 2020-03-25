import React from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import { ProductConsumer } from "../../context";
import CartList from "./CartList";
import CartTotals from "./CartTotals";

function Cart(props) {
  console.log(props);

  return (
    <section>
      {
        <ProductConsumer>
          {value => {
            const { cart } = value;
            if (cart.length > 0) {
              return (
                <>
                  <Title name="your" title="cart"></Title>
                  <CartColumns></CartColumns>
                  <CartList value={value}></CartList>
                  <CartTotals value={value} history={props.history}></CartTotals>
                </>
              );
            } else {
              return <EmptyCart></EmptyCart>;
            }
          }}
        </ProductConsumer>
      }
    </section>
  );
}

export default Cart;
