import React, { useContext, useState, useEffect, useReducer } from "react";

const AppContext = React.createContext();
const getLocalStorage = () => {
  let list = localStorage.getItem("user");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("user")));
  } else {
    return [];
  }
};
const getLocalStorage1 = () => {
  let list = localStorage.getItem("cart");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("cart")));
  } else {
    return [];
  }
};
const getLocalStorage2 = () => {
  let list = localStorage.getItem("cart1");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("cart1")));
  } else {
    return [];
  }
};

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(getLocalStorage());
  const [cart, setCart] = useState(getLocalStorage1());
  const [hey, setHey] = useState(getLocalStorage2());
  const [alert, setAlert] = useState(false);
console.log(user)
  const getBill = () => {
    let bill = 0;
    cart.forEach((element) => {
      bill += element.total;
    });
    return bill;
  };
  const [bill, setBill] = useState(getBill());
  console.log(bill);
  const isFound = (item) =>
    cart.some((element) => {
      if (element.id === item.id) {
        return true;
      }
      return false;
    });

  const orderNow = (item) => {
    if (!isFound(item)) {
      item.count = 1;
      item.total = item.price;
      let newcart = [...cart, item];
      setCart(newcart);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    setAlert(true);
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setBill(getBill());
  }, [cart]);

  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 1000);
  }, [orderNow]);

  const increase = (item1) => {
    item1.count = item1.count + 1;
    item1.total = item1.count * item1.price;
    let tempCart = cart.map((cartItem) => {
      if (cartItem.id === item1.id) {
        return { ...cartItem, amount: cartItem.amount };
      }
      return cartItem;
    });
    setCart(tempCart);
  };
  const decrease = (item1) => {
    item1.count = item1.count - 1;
    item1.total = item1.count * item1.price;

    if (item1.count === 0) {
      setCart(cart.filter((item) => item !== item1));
    } else {
      let tempCart = cart.map((cartItem) => {
        if (cartItem.id === item1.id) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      });
      setCart(tempCart);
    }
  };
  const removeCart = () => {
    setCart([]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        orderNow,
        cart,
        setCart,
        increase,
        decrease,
        bill,
        alert,
        removeCart,
        hey,
        setHey,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
