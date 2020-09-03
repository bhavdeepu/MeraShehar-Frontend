import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { CookiesProvider } from 'react-cookie';
import { Provider } from "react-redux";
import store from "./services/store";

function Router(){
	return(
		<Provider store={store}>
		  <React.StrictMode>
		  <CookiesProvider>
		  <App/>
		  </CookiesProvider>
		  </React.StrictMode>
		  </Provider>
		)
}

ReactDOM.render(<Router />,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
// <Route exact path="/login" component={Login} />