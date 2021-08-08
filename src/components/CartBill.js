import React, { useEffect, useState } from "react";
import Razorpay from "razorpay";
import cookie from "react-cookies";

import { useHistory } from "react-router-dom";
import { orderPlaced } from "../action";

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  return {
    value: value,
    setValue,
  };
}

function CartBill(props) {
  const history = useHistory();

  const { store } = props;
  const cartBill = useInput(0);

  useEffect(() => {
    let cartAmount = 0;
    store.getState().foodList.forEach((element) => {
      cartAmount = cartAmount + element.price * element.qty;
      console.log(element.price * element.qty);
    });
    cartBill.setValue(cartAmount);
  });

  function handlePayButtonClick(e) {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    // script.onload = () => {
    //   resolve(true);
    // };
    // script.onerror = () => {
    //   resolve(false);
    // };
    document.body.appendChild(script);

    fetch("http://localhost:8000/cart/payment/", {
      method: "POST",
      headers: {
        authorization: cookie.load("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: cartBill.value,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        var options = {
          key: "rzp_test_vywJiYjgpsHNJF", // Enter the Key ID generated from the Dashboard
          amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: result.currency,
          name: "Eat Healthy",
          description: "Food Order Purchase",
          image: "https://www.w3schools.com/howto/img_avatar.png",
          order_id: result.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          handler: function (response) {
            const data = {
              orderCreationId: result.id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };
            console.log(data);
            fetch("http://localhost:8000/cart/paymentConfirmation/", {
              method: "POST",
              headers: {
                authorization: cookie.load("token"),
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((ress) => ress.json())
              .then((result) => {
                console.log("confirmation", result);
                history.push("/user/orderTracker");

                if (result.message === "success") {
                  // history.push("/user/orderTracker");
                  store.dispatch(orderPlaced(true));
                  history.push("/user/orderTracker");
                }
              });
          },
          prefill: {
            name: cookie.load("name"),
            email: cookie.load("email"),
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#fff",
          },
        };
        const razpay = new window.Razorpay(options);
        razpay.open();
      });
    // e.preventDefault();
  }

  return (
    <div className="InnercartpaymentCalculator">
      <h1 className="HeadercartpaymentCalculator">Your Bill</h1>
      <br />
      <h2>Items</h2>
      <div className="cartItemsListCalculator">
        {store.getState().foodList.map(
          (element) =>
            element.qty > 0 && (
              <div className="cartItemCalculator">
                {element.name} X {element.qty} = {element.price * element.qty}
              </div>
            )
        )}
      </div>
      <br />
      <h1 className="totalBillAmount">
        Total Bill amount: <b>{cartBill.value}&#8377; </b>
      </h1>
      <div className="proceedToPayButton">
        <button className="btn btn-secondary" onClick={handlePayButtonClick}>
          Proceed to pay
        </button>
      </div>
    </div>
  );
}

export default CartBill;
