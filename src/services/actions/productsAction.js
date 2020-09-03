import API from '../../api';
import {APIALL} from '../../api-service';

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,

  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,

  PRODUCT_OPTION_REQUEST,
  PRODUCT_OPTION_SUCCESS,
  PRODUCT_OPTION_FAIL

} from "../types";


export const fetchProducts = (filter='all=0') => async (dispatch) => {
  try{
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const data = await API.get(`/products/?${filter}`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.data });
      
  }
 catch(error){
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
 }
};


export const fetchProductDetail = (id, filter='all=0') => async (dispatch) => {
  try{
    dispatch({ type: PRODUCT_DETAIL_REQUEST });
    const data = await API.get(`/products/${id}?${filter}`);
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data.data });
      
  }
 catch(error){
      dispatch({ type: PRODUCT_DETAIL_FAIL, payload: error.message });
 }

};


export const fetchProductOptions = (filter='all=0') => async (dispatch) => {
  try{
    dispatch({ type: PRODUCT_OPTION_REQUEST });
    const data = await API.get(`/categories/option/?${filter}`);
    dispatch({ type: PRODUCT_OPTION_SUCCESS, payload: data.data });      
  }
 catch(error){
      dispatch({ type: PRODUCT_OPTION_FAIL, payload: error.message });
 }

};


export const editProductDetail = (token, id, data) => async (dispatch) => {
  try{
    APIALL.updateCategory(token, id, data)
      .then(resp => console.log("resp==",resp.data))
      .catch(error => console.log("ERORO NEW==",error))
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data.data });
      
  }
 catch(error){
      dispatch({ type: PRODUCT_DETAIL_FAIL, payload: error.message });
 }

};
