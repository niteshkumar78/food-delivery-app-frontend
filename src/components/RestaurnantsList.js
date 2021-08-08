import React, { useEffect, useState } from "react";
import cookie from "react-cookies";

import "../restaurnantsList.css";

import { addFoodList, add_deleteCartItem, changeCartQty } from "../action";

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  return {
    value: value,
    setValue,
  };
}

function RestaurnantsList(props) {
  const { store } = props;
  const restaurnantsList = useInput([]);
  const restroUpdate = useInput(false);

  console.log("restro list", restaurnantsList.value);

  useEffect(() => {
    if (store.getState().foodList.length === 0) {
      fetch("http://localhost:8000/dishesList/", {
        method: "GET",
        headers: {
          authorization: cookie.load("token"),
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("result", result);
          restaurnantsList.setValue(result);
          console.log("cart array props", props.cartArray);
          console.log("restro list test", restaurnantsList.value);
          restroUpdate.setValue(true);
          store.dispatch(addFoodList(result));
          console.log(store.getState());
          console.log("RESTRO LIST");
        });
    }
  }, []);

  // useEffect(() => {
  //   props.cartArray.forEach((element1, index1) => {
  //     console.log(element1.name);
  //     // console.log(result);
  //     console.log("restro list test 2", restaurnantsList.value);

  //     store.getState().foodList.forEach((element2, index2) => {
  //       console.log(element1.name, element2.name);
  //       if (element1.name == element2.name) {
  //         let cart_state = [...restaurnantsList.value];
  //         let cart_element = cart_state[index2];
  //         cart_element.qty = element1.qty;
  //         cart_state[index2] = cart_element;
  //         restaurnantsList.setValue(cart_state);
  //         console.log("test cart", restaurnantsList.value);
  //       }
  //     });
  //   });
  // }, [restroUpdate.value]);
  // function handleBodyCartUpdate(cart) {
  //   restaurnantsList.value.forEach((element, index) => {
  //     if (cart.name === element.name) {
  //       let cart_state = [...restaurnantsList.value];
  //       let cart_element = { ...cart_state[index] };
  //       cart_element.qty += 1;
  //       cart_state[index] = cart_element;
  //       restaurnantsList.setValue(cart_state);
  //     }
  //   });
  // }

  return (
    <div>
      <h3>Food Items List</h3>
      <div>
        <div class="list">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <h5>
                  <i class="fa fa-cutlery" aria-hidden="true"></i> All Recipes
                </h5>
              </div>
              {store.getState().foodList.map((data) => (
                <div class="col-lg-4 col-sm-6">
                  <div class="box grid recipes">
                    <div class="by">
                      <i class="fa fa-user" aria-hidden="true"></i> {data.name}
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
                          // props.cartUpdate(data, "add");
                          store.dispatch(add_deleteCartItem(data));
                          store.dispatch(
                            changeCartQty(store.getState().noOfCartItems + 1)
                          );
                          console.log("Add Item To Cart", store.getState());
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
                            // props.cartUpdate(data, "delete");
                            store.dispatch(add_deleteCartItem(data));
                            store.dispatch(
                              changeCartQty(store.getState().noOfCartItems - 1)
                            );

                            // handleBodyCartUpdate(data);
                          }
                        }}
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurnantsList;
