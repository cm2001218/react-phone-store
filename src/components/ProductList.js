import React from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductConsumer } from "../context";

function ProductList() {
  /* const state = {
    products: storeProducts
  } */
  return (
    <>
      <div className="py-5">
        <div className="container">
          <Title name="ours" title="products"></Title>
          <div className="row">
            <ProductConsumer>
              {(value) => {
                return value.products.map((product) => {
                  return <Product key={product.id} product={product}></Product>;
                });
              }}
            </ProductConsumer>
          </div>
        </div>
      </div>

      {/* <Product></Product> */}
    </>
  );
}

export default ProductList;
