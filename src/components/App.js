import React, { useEffect, useState, useReducer } from "react";
import cookie from "react-cookies";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Login, Signup, Page404, MainMenu, Cart } from "../components/index";

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  return {
    value: value,
    setValue,
  };
}

function App(props) {
  const { store } = props;
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  if (localStorage.getItem("cart") == undefined) {
    var cartArray1 = [];
  } else {
    var cartArray1 = JSON.parse(localStorage.getItem("cart"));
  }

  useEffect(() => {
    store.subscribe(() => {
      forceUpdate();
    });
  }, []);

  const cartArray = useInput(cartArray1);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartArray.value));
    console.log(JSON.parse(localStorage.getItem("cart")));
  }, [cartArray.value]);

  var noOfItems;
  if (localStorage.getItem("ItemsInCart") == undefined) {
    noOfItems = 0;
  } else {
    noOfItems = parseInt(localStorage.getItem("ItemsInCart"));
  }

  const noOfItemsInCart = useInput(noOfItems);

  useEffect(() => {
    localStorage.setItem("ItemsInCart", noOfItemsInCart.value);
    console.log(parseInt(localStorage.getItem("ItemsInCart")));
  }, [noOfItemsInCart.value]);

  const loginStatus = useInput(false);

  console.log(loginStatus.value);

  // function handleCartUpdate(cart, type) {
  //   let update = false;
  //   if (type === "add") {
  //     noOfItemsInCart.setValue(noOfItemsInCart.value + 1);
  //   } else if (type === "delete" && noOfItemsInCart.value > 0) {
  //     noOfItemsInCart.setValue(noOfItemsInCart.value - 1);
  //   }
  //   cartArray.value.forEach((element, index) => {
  //     console.log(element, index);
  //     if (cart.name === element.name && !update) {
  //       let cart_state = [...cartArray.value];
  //       cart_state[index] = cart;
  //       cartArray.setValue(cart_state);
  //       console.log(cartArray.value);
  //       update = true;
  //     }
  //   });
  //   if (!update) {
  //     let cart_state = [...cartArray.value, cart];
  //     cartArray.setValue(cart_state);
  //     console.log(cartArray.value);
  //   }
  // }

  return (
    <div className="App" style={{ height: "100vh" }}>
      <Router>
        <Switch>
          <Route
            exact
            path="/login"
            render={(props) => {
              return <Login loginStatus={loginStatus} />;
            }}
          />
          <Route
            exact
            path="/signup"
            render={(props) => {
              return <Signup />;
            }}
          />
          <Route
            path="/user"
            render={(props) => {
              return (
                <MainMenu
                  // handleCartUpdate={handleCartUpdate}
                  cartArray={cartArray.value}
                  noOfItemsInCart={noOfItemsInCart.value}
                  store={store}
                />
              );
            }}
          />
          {/* <Route
            exact
            path="/cart"
            render={(props) => {
              return (
                <Cart
                  cartArray={cartArray.value}
                  // cartUpdate={handleCartUpdate}
                  noOfItemsInCart={noOfItemsInCart.value}
                  store={store}
                />
              );
            }}
          /> */}
          <Route
            render={(props) => {
              return <Page404 />;
            }}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
