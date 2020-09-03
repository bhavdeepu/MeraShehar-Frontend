import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,

  CATEGORY_DETAIL_REQUEST,
  CATEGORY_DETAIL_SUCCESS,
  CATEGORY_DETAIL_FAIL

  // CATEGORY_UPDATE_REQUEST,
  // CATEGORY_UPDATE_SUCCESS,
  // CATEGORY_UPDATE_FAIL


} from "../types";

function categoryListReducer(state = {categories: [] }, action) {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true };
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}


function categoriesDetailsReducer(state = {category: {} }, action) {
  switch (action.type) {
    case CATEGORY_DETAIL_REQUEST:
      return { loading: true };
    case CATEGORY_DETAIL_SUCCESS:
      return { loading: false, category: action.payload , name:action.payload.name,
                 description:action.payload.description, is_live:action.payload.is_live};
    case CATEGORY_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}


// function categoriesUpdateReducer(state = {category: {} }, action) {
//   switch (action.type) {
//     case CATEGORY_UPDATE_REQUEST:
//       return { loading: true };
//     case CATEGORY_UPDATE_SUCCESS:
//       return { loading: false, category: action.payload , name:action.payload.name,
//                  description:action.payload.description};
//     case CATEGORY_UPDATE_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// }


export { categoryListReducer, categoriesDetailsReducer }