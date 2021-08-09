import React, { useEffect, useState } from "react";
import cookie from "react-cookies";
import { RestaurnantsList, MainMenuNavbar } from "./index";
import "../mainMenu.css";
import { addUserDetails } from "../action";
import { baseurl } from "../API/index";

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  return {
    value: value,
    setValue,
  };
}

function MainMenuBody(props) {
  const { store } = props;
  const cartArray = useInput([]);

  const userDetails = useInput({});

  const noOfItemsInCart = useInput(0);

  console.log("cart no", noOfItemsInCart.value);

  useEffect(() => {
    fetch(`${baseurl}/profile/`, {
      method: "GET",
      headers: {
        authorization: cookie.load("token"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        userDetails.setValue(result);
        cookie.save("name", result.name, { path: "/" });
        cookie.save("email", result.email, { path: "/" });
        store.dispatch(addUserDetails(result));
        console.log(store.getState());
      });
  }, []);

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
    <div>
      <MainMenuNavbar
        cartArray={props.cartArray}
        noOfItemsInCart={props.noOfItemsInCart}
        userDetails={userDetails.value}
        store={store}
      />
      <div className="mainMenuBody">
        <div className="leftMain"></div>
        <div className="middleMain">
          <RestaurnantsList
            cartUpdate={props.handleCartUpdate}
            cartArray={props.cartArray}
            store={store}
          />
        </div>
        <div className="leftMain">
          {/* <Link
            to="/login"
            className="btn btn-secondary"
            onClick={() => {
              cookie.remove("token", { path: "/" });
            }}
          >
            Logout
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default MainMenuBody;
