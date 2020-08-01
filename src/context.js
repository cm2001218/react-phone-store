import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  //Provider
  //Consumer

  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  };
  componentDidMount() {
    storeProducts();
  }
  componentDidMount = () => {
    this.storeProducts();
  };

  storeProducts = () => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(() => {
      return { products: tempProducts };
    });
  };

  getItem = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };

  handleDetail = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
      // return { detailProduct: product, modalOpen: true };
    });
  };
  addToCart = (id) => {
    // console.log(`add to cart id is ${id}`)
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(
      () => {
        return { products: tempProducts, cart: [...this.state.cart, product] };
      },
      this.addTotals
      // console.log(this.state)  //incorrect.
    );
  };

  openModal = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  increment = (id) => {
    let tempCart = [...this.state.cart];
    const selectedItem = tempCart.find((item) => {
      return item.id == id;
    });
    selectedItem.count += 1;
    selectedItem.total = selectedItem.count * selectedItem.price;
    this.setState(
      {
        cart: [...tempCart],
      },
      this.addTotals
    );
  };
  decrement = (id) => {
    let tempCart = [...this.state.cart];
    const selectedItem = tempCart.find((item) => {
      return item.id == id;
    });
    selectedItem.count -= 1;
    if (selectedItem.count == 0) {
      console.log(selectedItem.count);
      this.removeItem(id);
    } else {
      selectedItem.total = selectedItem.count * selectedItem.price;
      this.setState(
        {
          cart: [...tempCart],
        },
        this.addTotals
      );
    }
  };

  removeItem = (id) => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter((item) => {
      return item.id != id;
    });
    const removedItem = tempProducts.find((item) => {
      return item.id == id;
    });
    removedItem.inCart = false;
    removedItem.count = 0;
    removedItem.total = 0;
    this.setState(
      () => {
        return {
          cart: [...tempCart],
          products: [...tempProducts],
        };
      },
      () => {
        this.addTotals();
      }
    );
  };

  clearCart = (id) => {
    this.setState(
      () => {
        return {
          cart: [],
        };
      },
      () => {
        this.storeProducts();
        this.addTotals();
      }
    );
  };

  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total,
      };
    });
  };

  render() {
    return (
      <ProductContext.Provider
        // value={{...state}}  ok
        value={{
          // products: storeProducts,
          // detailProduct: detailProduct,
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
        }}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };

//Provider
//Consumer

// function ProductProvider(props) {
//   const state = {
//     products: [],
//     detailProduct: detailProduct
//   }
//   // function componentDidMount() {
//   //   storeProducts()
//   // }
//   const componentDidMount = () => {
//     storeProducts()
//   }
//   const storeProducts = () => {
//     let tempProducts = []
//     storeProducts.forEach(item => {
//       const singleItem = { ...item }
//       tempProducts = [...state.products, singleItem]
//     })
//     this.setState(() => {
//       return { products: tempProducts }
//     })
//   }
//   const handleDetail = () => {
//     console.log("detail")
//   }
//   const addToCart = () => {
//     console.log("add to cart")
//   }
//   return (
//     <ProductContext.Provider
//       // value={{...state}}  ok
//       value={{
//         // products: storeProducts,
//         // detailProduct: detailProduct,
//         ...state,
//         handleDetail,
//         addToCart
//       }}>
//       {props.children}
//     </ProductContext.Provider>
//   )
// }
