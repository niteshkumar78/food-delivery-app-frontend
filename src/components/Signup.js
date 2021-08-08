import React, { useState } from "react";
import "../loginSignup.css";
import { Link, Redirect } from "react-router-dom";
import cookie from "react-cookies";
import EatHealthyIcon from "../EatHealthyIcon.png";

import { NavbarLoginSignup } from "./index";

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  return {
    value: value,
    setValue,
  };
}

function Signup(props) {
  const email = useInput("");
  const password = useInput("");
  const name = useInput("");
  const login = useInput(false);
  const errorMessage = useInput(undefined);
  const submitLoader = useInput(false);

  console.log(email.value, login.value);
  function handleSignup(e) {
    submitLoader.setValue(true);
    fetch("http://localhost:8000/signup/", {
      method: "POST",

      headers: {
        authorization: "Auth token 1234",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        name: name.value,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.message === "success") {
          login.setValue(true);
        } else {
          errorMessage.setValue(result.message);
        }
        submitLoader.setValue(false);
      })
      .catch((err) => {
        console.log(err);
        errorMessage.setValue("Something went wrong");
        submitLoader.setValue(false);
      });
    e.preventDefault();
  }
  return login.value || cookie.load("token") !== undefined ? (
    <Redirect to="/login" />
  ) : (
    <React.Fragment>
      <NavbarLoginSignup />
      <div className="text-center">
        <main className="form-signin">
          <form onSubmit={handleSignup}>
            <img
              className="mb-4"
              src={EatHealthyIcon}
              alt=""
              width="72"
              height="57"
            />
            <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
            {errorMessage.value !== undefined && (
              <div className="alert alert-danger" role="alert">
                {errorMessage.value}
              </div>
            )}
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                required
                onChange={(e) => {
                  email.setValue(e.target.value);
                }}
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingPassword"
                placeholder="name"
                required
                onChange={(e) => {
                  name.setValue(e.target.value);
                }}
              />
              <label for="floatingPassword">Name</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                required
                onChange={(e) => {
                  password.setValue(e.target.value);
                }}
              />
              <label for="floatingPassword">Password</label>
            </div>

            {/* <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div> */}
            {submitLoader.value ? (
              <button
                className="w-100 btn btn-lg btn-primary"
                type="submit"
                disabled
              >
                Sign up ....
                <div className="spinner-border text-secondary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </button>
            ) : (
              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Sign up
              </button>
            )}
            <p className="redirectLoginSignup">
              Already have an account <Link to="/login">login here</Link>
            </p>
            <p className="mt-5 mb-3 text-muted">&copy; Eat Healthy 2021</p>
          </form>
        </main>
      </div>
    </React.Fragment>
  );
}

export default Signup;
