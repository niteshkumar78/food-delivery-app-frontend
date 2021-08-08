import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";

import "../mainMenuNavbar.css";

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  return {
    value: value,
    setValue,
  };
}

function MainMenuNavbar(props) {
  const { store } = props;
  const userDetails = useInput({ empty: true });
  const userName = useInput();

  console.log("Navbar");

  useEffect(() => {
    console.log("hello");
    if (props)
      if (userDetails.value.empty === true) {
        fetch("http://localhost:8000/profile/", {
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
          });
      }

    setTimeout(() => {
      userName.setValue(cookie.load("name"));
    }, 500);
  }, []);

  return (
    // <div>Nav</div>
    // <div className="navMain">
    //   <div className="leftNav">
    //     <h1>Eat Healthy</h1>
    //   </div>
    //   <div className="rightNav">
    //     <div className="cartIcon"></div>
    //   </div>
    // </div>
    // <div>
    <div className="nav">
      <div className="navLogo">
        <h2>Eat Healthy</h2>
      </div>

      <div className="innerNav">
        <div className="profileNav">
          <div class="dropdown">
            <Link to="/user/mainMenu">
              <img
                src="https://img-premium.flaticon.com/png/512/3966/premium/3966990.png?token=exp=1628352100~hmac=fd7d97227692acec4690c725541bfd07"
                height="50"
                style={{ backgroundColor: "white", borderRadius: "50%" }}
              />
            </Link>
            <button
              class="btn dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ color: "white" }}
            >
              <span style={{ fontSize: "20px" }}>
                {/* {cookie.load("name")} */}
                {userName.value}
                &nbsp;&nbsp;&nbsp;
              </span>
              <img
                className="userProfleNavebarIcon"
                src="https://img-premium.flaticon.com/png/512/3899/premium/3899618.png?token=exp=1628087663~hmac=3aeb89d73742bbfee8eb2c53c2b18d8f"
                alt="cart-icon"
              />
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <Link
                  to="/login"
                  class="dropdown-item"
                  onClick={() => {
                    cookie.remove("token", { path: "/" });
                    cookie.remove("name", { path: "/" });
                    cookie.remove("email", { path: "/" });
                    localStorage.removeItem("cart");
                    localStorage.removeItem("ItemsInCart");
                  }}
                >
                  Logout
                </Link>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Profile
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Link to="/user/cart" className="cartIconContainer">
          <img
            className="cartIcon"
            src="https://img-premium.flaticon.com/png/512/4647/premium/4647563.png?token=exp=1628086589~hmac=4544035c165b41650a272877a7b79aef"
            alt="cart-icon"
          />
          <span className="cartCount">{store.getState().noOfCartItems}</span>
        </Link>
      </div>
    </div>
    // </div>
  );
}

// const styles = {
//   cartIcon: {
//     height: 32,
//     marginRight: 20,
//   },
//   nav: {
//     height: 70,
//     background: "#4267b2",
//     display: "flex",
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   cartIconContainer: {
//     position: "relative",
//   },
//   cartCount: {
//     background: "yellow",
//     borderRadius: "50%",
//     padding: "4px 8px",
//     position: "absolute",
//     right: 0,
//     top: -9,
//   },
// };

export default MainMenuNavbar;
