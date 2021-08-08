export const ADD_FOOD_LIST = "ADD_FOOD_LIST";
export const ADD_USER_DETAILS = "ADD_USER_DETAILS";
export const ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART";
export const CHANGE_NO_OF_ITEMS = "CHANGE_NO_OF_ITEMS";
export const ORDER_PLACED = "ORDER_PLACED";

export function addFoodList(foodList) {
  return {
    type: ADD_FOOD_LIST,
    foodList,
  };
}

export function addUserDetails(userDetails) {
  return {
    type: ADD_USER_DETAILS,
    userDetails,
  };
}

export function add_deleteCartItem(data) {
  return {
    type: ADD_ITEM_TO_CART,
    data,
  };
}

export function changeCartQty(noOfItems) {
  return {
    type: CHANGE_NO_OF_ITEMS,
    noOfItems,
  };
}

export function orderPlaced(status) {
  return {
    type: ORDER_PLACED,
    status,
  };
}
