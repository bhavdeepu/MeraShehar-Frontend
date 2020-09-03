import {APIALL} from '../../api-service';
import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  IS_USER_LOGIN
} from "../types";


const fetchUserDetails = (token) => async (dispatch) => {

    if (token)
    {
      try
      {
        dispatch({ type: USER_LIST_REQUEST });
        const data = await APIALL.currentUser(token);  
        dispatch({ type: USER_LIST_SUCCESS, payload: data.data });
      }
      catch(error)
      {
        dispatch({ type: USER_LIST_FAIL, payload: error.message });
      }
    }
    else{
      dispatch({ type: IS_USER_LOGIN});
    }
};

export { fetchUserDetails }