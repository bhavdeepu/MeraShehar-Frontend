import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  IS_USER_LOGIN

} from "../types";

function userDetailsReducer(state = {}, action) {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true, is_login: false };
    case USER_LIST_SUCCESS:
      return { loading: false, is_login: true, user: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, is_login: false, error: action.payload };
    case IS_USER_LOGIN:
      return { loading: false, is_login: false };
    default:
      return state;
  }
}

export { userDetailsReducer }