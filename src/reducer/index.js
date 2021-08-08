import cookie from "react-cookies";
import {
  ADD_USER_DETAILS,
  ADD_FOOD_LIST,
  ADD_ITEM_TO_CART,
  CHANGE_NO_OF_ITEMS,
  ORDER_PLACED,
} from "../action";

var orderPlaced;

if (cookie.load("orderPlaced") === undefined) {
  orderPlaced = false;
} else {
  orderPlaced = cookie.load("orderPlaced");
}

const initialState = {
  userDetails: {},
  foodList: [],
  cart: [],
  noOfCartItems: 0,
  orderPlaced: orderPlaced,
};

export default function (state = initialState, action) {
  //   if (action.type === "TEST") {
  //     return action.data;
  //   }

  switch (action.type) {
    case ADD_USER_DETAILS:
      return { ...state, userDetails: action.userDetails };
    case ADD_FOOD_LIST:
      return { ...state, foodList: action.foodList };
    case ADD_ITEM_TO_CART:
      const updatedFoodList = state.foodList;
      state.foodList.forEach((element, index) => {
        if (element.name == action.data.name) {
          updatedFoodList[index] = action.data;
        }
      });
      return { ...state, foodList: updatedFoodList };
    case CHANGE_NO_OF_ITEMS:
      return { ...state, noOfCartItems: action.noOfItems };
    case ORDER_PLACED:
      cookie.save("orderPlaced", action.status, { maxAge: 3600, path: "/" });
      return { ...state, orderPlaced: action.status };
    default:
      return state;
  }
}
