import React from "react";
import cookie from "react-cookies";
import { Redirect, Route, Switch } from "react-router-dom";
import { MainMenuBody, Cart, Page404, OrderTracker } from "./index";

function MainMenu(props) {
  const { store } = props;
  return cookie.load("token") === undefined ? (
    <Redirect to="/login" />
  ) : (
    <div>
      <Switch>
        <Route
          exact
          path="/user/mainMenu"
          render={(props) => {
            return (
              <MainMenuBody
                handleCartUpdate={props.handleCartUpdate}
                cartArray={props.cartArray}
                noOfItemsInCart={props.noOfItemsInCart}
                store={store}
              />
            );
          }}
        />
        <Route
          exact
          path="/user/cart"
          render={(props) => {
            return (
              <Cart
                // cartArray={cartArray.value}
                // cartUpdate={handleCartUpdate}
                // noOfItemsInCart={noOfItemsInCart.value}
                store={store}
              />
            );
          }}
        />
        {store.getState().orderPlaced && (
          <Route
            exact
            path="/user/orderTracker"
            render={(props) => {
              return (
                <OrderTracker
                  // cartArray={cartArray.value}
                  // cartUpdate={handleCartUpdate}
                  // noOfItemsInCart={noOfItemsInCart.value}
                  store={store}
                />
              );
            }}
          />
        )}
        <Route
          render={(props) => {
            return <Page404 />;
          }}
        />
      </Switch>
    </div>
  );
}

export default MainMenu;
