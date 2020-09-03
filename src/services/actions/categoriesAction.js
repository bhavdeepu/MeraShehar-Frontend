// import axios from "axios";
import API from '../../api';
import {APIALL} from '../../api-service';

import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,

  CATEGORY_DETAIL_REQUEST,
  CATEGORY_DETAIL_SUCCESS,
  CATEGORY_DETAIL_FAIL

} from "../types";


export const fetchCategories = (filter='all=0') => async (dispatch) => {
  try{
    dispatch({ type: CATEGORY_LIST_REQUEST });
    const data = await API.get(`/categories/?${filter}`);
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data.data });
      
  }
 catch(error){
      dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message });
 }
};


export const fetchCategoryDetail = (id, filter='all=0') => async (dispatch) => {
  try{
    dispatch({ type: CATEGORY_DETAIL_REQUEST });
    const data = await API.get(`/categories/${id}?${filter}`);
    dispatch({ type: CATEGORY_DETAIL_SUCCESS, payload: data.data });
      
  }
 catch(error){
      dispatch({ type: CATEGORY_DETAIL_FAIL, payload: error.message });
 }

};


export const editCategoryDetail = (token, id, data) => async (dispatch) => {
  try{
    APIALL.updateCategory(token, id, data)
      .then(resp => console.log("resp==",resp.data))
      .catch(error => console.log("ERORO NEW==",error))
    dispatch({ type: CATEGORY_DETAIL_SUCCESS, payload: data.data });
      
  }
 catch(error){
      dispatch({ type: CATEGORY_DETAIL_FAIL, payload: error.message });
 }

};
