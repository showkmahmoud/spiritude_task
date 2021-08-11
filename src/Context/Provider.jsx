import React, { useEffect, useState } from "react";

export const Store = React.createContext();
export var storage = JSON.parse(localStorage.getItem("cart"));
const Provider = ({ children }) => {
  const [cart, setCart] = useState({
    cartCounter: 0,
    cartItems: [],
  });
  useEffect(() => {
    if (storage) {
      setCart(storage);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return <Store.Provider value={{ cart, setCart }}>{children}</Store.Provider>;
};

export default Provider;
