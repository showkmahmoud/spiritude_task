import React, { useContext } from "react";
import { Store } from "../../Context/Provider";
import { Table } from "reactstrap";
const CartPage = () => {
  const store = useContext(Store);
  const increaseCart = (productId) => {
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
  };

  const decreaseCart = (productID, quant) => {
    if (quant > 1) {
      const data = store.cart.cartItems.map((item) => {
        return item.id === productID
          ? { ...item, quantity: item.quantity - 1 }
          : item;
      });
      store.setCart({
        ...store.cart,
        cartCounter: store.cart.cartCounter - 1,
        cartItems: [...data],
      });
    } else if (quant === 1) {
      const data = store.cart.cartItems.filter((item) => item.id !== productID);
      store.setCart({
        ...store.cart,
        cartCounter: store.cart.cartCounter - 1,
        cartItems: [...data],
      });
    }
  };

  const deleteCartItem = (productID, quant) => {
    const data = store.cart.cartItems.filter((item) => item.id !== productID);
    store.setCart({
      ...store.cart,
      cartCounter: store.cart.cartCounter - quant,
      cartItems: [...data],
    });
  };

  const clearCart = () => {
    store.setCart({
      ...store.cart,
      cartCounter: 0,
      cartItems: [],
    });
  };
  const renderTableData = () => {
    return store.cart.cartItems.map((product) => {
      return (
        <tr className="border-bottom" key={product.id}>
          <td className="pt-4 ">{product.name}</td>
          <td className="pt-4 "> {product.price} </td>
          <td className="d-flex pt-4 justify-content-center align-items-center">
            <button
              onClick={() => decreaseCart(product.id, product.quantity)}
              className="btn btn-danger mb-1"
            >
              -
            </button>
            <p className="col-4 text-center"> {product.quantity} </p>
            <button
              onClick={() => increaseCart(product.id)}
              className="btn btn-primary mb-1"
            >
              +
            </button>
          </td>
          <td>
            <button
              onClick={() => deleteCartItem(product.id, product.quantity)}
              className="btn btn-dark mt-2"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };
  return (
    <div className="mt-5 py-4  col-md-12">
      {store.cart.cartCounter ? (
        <div className="container ">
          <div className="d-md-flex justify-content-between  my-5">
            <h3 className="section_title col-9 col-md-3 col-sm-9">
              Your cart :
            </h3>
          </div>
          <div className="table-responsive">
            <Table className="text-center ">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>product Price</th>
                  <th className="text-center">quantity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{renderTableData()}</tbody>
            </Table>
          </div>
          <div className="d-md-flex  justify-content-between align-items-center px-5 pt-3 mt-5">
            <button
              onClick={clearCart}
              className="btn btn-dark my-4 my-md-0 col-12 col-md-2 col-sm-4"
            >
              clear cart
            </button>
            <h4 className=" text-right col-12 col-md-4 col-sm-4">
              Total amount ={" "}
              <span style={{ color: "var(--price-color)" }}>
                {store.cart.cartItems.reduce((prev, item) => {
                  return prev + item.quantity * item.price;
                }, 0)}{" "}
                LE
              </span>
            </h4>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="section_title py-5">Your card is empty</h3>
        </div>
      )}
    </div>
  );
};

export default CartPage;
