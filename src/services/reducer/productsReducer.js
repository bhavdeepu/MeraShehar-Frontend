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

function productListReducer(state = {products: [] }, action) {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}


function productsDetailsReducer(state = {product: {} }, action) {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return { loading: true };
    case PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: action.payload , name:action.payload.name,
                 description:action.payload.description, is_live:action.payload.is_live};
    case PRODUCT_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}


function productsOptionsReducer(state = {options: {} }, action) {
  switch (action.type) {
    case PRODUCT_OPTION_REQUEST:
      return { loading: true };
    case PRODUCT_OPTION_SUCCESS:
      return { loading: false, options: action.payload};
    case PRODUCT_OPTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}


export { productListReducer, productsDetailsReducer, productsOptionsReducer }