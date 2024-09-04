"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext(null);
import upSepetProduct from "@/app/actions/Products/upSepetProduct";
export const CartContextProvider = (props) => {
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    const fetchAndUpdateCart = async () => {
      let getItem = localStorage.getItem("cart");
      let getItemParse = JSON.parse(getItem) || [];
      if (getItemParse.length > 0) {
        const res = await upSepetProduct(getItemParse);
        localStorage.setItem("cart", JSON.stringify(res));
        setBasket(res);
      }
    };

    fetchAndUpdateCart();
  }, []);

  const addToBasket = useCallback(
    (newItem) => {
      let upBasket = [...basket];

      const Index = upBasket.findIndex(
        (item) => item.id === newItem.id && item.category === newItem.category
      );
      if (Index !== -1) {
        upBasket[Index].quantity += newItem.quantity || 1;
      } else {
        upBasket = [...upBasket, newItem];
      }

      setBasket(upBasket);
      localStorage.setItem("cart", JSON.stringify(upBasket));
    },
    [basket]
  );

  const removeBasket = useCallback(
    (newItem) => {
      let upBasket = [...basket];
      const Index = upBasket.findIndex(
        (item) => item.id === newItem.id && item.category === newItem.category
      );
      if (Index !== -1) {
        upBasket.splice(Index, 1);
        setBasket(upBasket);
        localStorage.setItem("cart", JSON.stringify(upBasket));
      }
    },
    [basket]
  );
  const incBasket = useCallback(
    (newItem) => {
      let upBasket = [...basket];

      const Index = upBasket.findIndex(
        (item) => item.id === newItem.id && item.category === newItem.category
      );
      if (Index !== -1) {
        upBasket[Index].quantity += 1;
      }

      setBasket(upBasket);
      localStorage.setItem("cart", JSON.stringify(upBasket));
    },
    [basket]
  );

  const decBasket = useCallback(
    (newItem) => {
      let upBasket = [...basket];

      const Index = upBasket.findIndex(
        (item) => item.id === newItem.id && item.category === newItem.category
      );
      if (Index !== -1) {
        // If quantity is greater than 1, decrease it
        if (upBasket[Index].quantity > 1) {
          upBasket[Index].quantity -= 1;
        }
      }

      setBasket(upBasket);
      localStorage.setItem("cart", JSON.stringify(upBasket));
    },
    [basket]
  );
  const emptyBasket = useCallback(() => {
    setBasket([]);
    localStorage.setItem("cart", JSON.stringify([]));
  }, []);

  let value = {
    basket,
    addToBasket,
    removeBasket,
    emptyBasket,
    incBasket,
    decBasket,
  };
  return <CartContext.Provider value={value} {...props} />;
};

const useCart = () => {
  const context = useContext(CartContext);
  if (context == null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};

export default useCart;
