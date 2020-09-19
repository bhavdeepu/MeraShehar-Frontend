import {APIALL} from '../../api-service';

import {
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
  CART_LIST_FAIL,
} from "../types";


export const fetchCart = (token) => async (dispatch) => {
  try{
    dispatch({ type: CART_LIST_REQUEST });
    const data = await APIALL.cartFetch(token);
    dispatch({ type: CART_LIST_SUCCESS, payload: data.data });
      
  }
 catch(error){
      dispatch({ type: CART_LIST_FAIL, payload: error.message });
 }
};