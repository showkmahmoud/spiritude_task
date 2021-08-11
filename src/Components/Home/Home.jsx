import React, { useContext } from "react";
import { products } from "../../productsList";
import { Store } from "../../Context/Provider";
// import {storge} from '../../Context/Provider';
const Home = () => {
  const store = useContext(Store);
  const addToCart = (product, productId) => {
    const itemIndex = store.cart.cartItems.findIndex(
      (item) => item.id === productId
    );
    if (itemIndex === -1) {
      store.setCart({
        ...store.cart,
        cartCounter: store.cart.cartCounter + 1,
        cartItems: [...store.cart.cartItems, { ...product, quantity: 1 }],
      });
    } else {
      const data = store.cart.cartItems.map((item) => {
        return item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      });
      store.setCart({
        ...store.cart,
        cartCounter: store.cart.cartCounter + 1,
        cartItems: [...data],
      });
    }
  };

  return (
    <div className="container pt-5">
      <div className="row pt-5 justify-content-between">
        {products &&
          products.map((product) => {
            return (
              <div
                className="card mx-auto col-9 col-sm-5 col-md-5 col-lg-3 my-2 mx-md-1"
                key={product.id}
              >
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.price}LE</p>
                  <button
                    onClick={() => addToCart(product, product.id)}
                    className="btn btn-primary col-9 mx-auto my-1 text-upper-case"
                  >
                    add to cart
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
