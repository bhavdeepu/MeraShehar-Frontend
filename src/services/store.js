import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import {categoryListReducer, categoriesDetailsReducer} from "./reducer/categoriesReducer";
import {productListReducer, productsDetailsReducer, productsOptionsReducer} from "./reducer/productsReducer";
import {userDetailsReducer} from "./reducer/userDetailsReducer"


const initialState = {};

const reducer = combineReducers({
	categoriesList: categoryListReducer,
	productsList: productListReducer,
	userDetails:  userDetailsReducer,
	categoriesDetails: categoriesDetailsReducer,
	productsDetails: productsDetailsReducer,
	productsOption: productsOptionsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
