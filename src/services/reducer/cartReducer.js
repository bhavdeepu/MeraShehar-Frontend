import {
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
  CART_LIST_FAIL,
} from "../types";

function cartReducer(state = {cart: [] }, action) {
  switch (action.type) {
    case CART_LIST_REQUEST:
      return { loading: true };
    case CART_LIST_SUCCESS:
      return { loading: false, cart: action.payload.products, total:action.payload.cart_value };
    case CART_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export { cartReducer }