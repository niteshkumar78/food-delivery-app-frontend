import React from "react";
import { Link } from "react-router-dom";

import { CartBill } from "./index";
import "../cart.css";
import { addFoodList, add_deleteCartItem, changeCartQty } from "../action";

import { MainMenuNavbar } from "./index";

function Cart(props) {
  const { store } = props;
  return (
    <div>
      <MainMenuNavbar
        cartArray={props.cartArray}
        noOfItemsInCart={props.noOfItemsInCart}
        store={store}
      />
      <h1>Cart</h1>

      <div className="cartMain">
        <div class="list cartItems">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <h5>
                  <i class="fa fa-cutlery" aria-hidden="true"></i> All Recipes
                </h5>
              </div>
              {store.getState().foodList.map(
                (data) =>
                  data.qty > 0 && (
                    <div class="col-lg-4 col-sm-6">
                      <div class="box grid recipes">
                        <div class="by">
                          <i class="fa fa-user" aria-hidden="true"></i>{" "}
                          {data.name}
                        </div>
                        <a href="#">
                          <img src={data.image} alt="" height="300px" />
                        </a>
                        <h2>
                          {/* <a href="#">Milk fruit fresh with vegetables </a> */}
                          Price:{" "}
                          <h2
                            style={{
                              color: "blue",
                              display: "inline-block",
                              fontSize: "30px",
                            }}
                          >
                            {data.price}
                          </h2>
                        </h2>
                        <p>{data.description}</p>
                        <div class="tag">
                          <button
                            onClick={() => {
                              data.qty++;
                              store.dispatch(add_deleteCartItem(data));
                              store.dispatch(
                                changeCartQty(
                                  store.getState().noOfCartItems + 1
                                )
                              );
                              // props.cartUpdate(data, "add");
                              // handleBodyCartUpdate(data);
                            }}
                          >
                            +
                          </button>
                          <button>{data.qty}</button>
                          <button
                            onClick={() => {
                              if (data.qty > 0) {
                                data.qty--;
                                store.dispatch(add_deleteCartItem(data));
                                store.dispatch(
                                  changeCartQty(
                                    store.getState().noOfCartItems - 1
                                  )
                                );
                                // props.cartUpdate(data, "delete");
                                // handleBodyCartUpdate(data);
                              }
                            }}
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
        <div className="cartpaymentCalculator">
          <CartBill cartArray={props.cartArray} store={store} />
        </div>
      </div>
    </div>
    // <div>Cart</div>
  );
}

export default Cart;
