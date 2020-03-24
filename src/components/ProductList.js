import React from "react"
import Product from "./Product"
import Title from "./Title"
import { ProductConsumer } from "../context"
import styled from "styled-components"
import { Link } from "react-router-dom"

function ProductList() {
  /* const state = {
    products: storeProducts
  } */
  return (
    <>
      <div className="py-5">
        <div className="container">
          <Title name="our" title="products"></Title>
          <div className="row">
            <ProductConsumer>
              {value => {
                return value.products.map(product => {
                  return <Product key={product.id} product={product}></Product>
                })
              }}
            </ProductConsumer>
          </div>
        </div>
      </div>

      {/* <Product></Product> */}
    </>
  )
}

export default ProductList
