import React, { useEffect } from 'react';
import Home from './components/home';
import Login from './components/login';
import SignUp from './components/sign-up';
import Profile from './components/user-info';

import Admincp from './components/admin/admincp';

import CategoryEdit from './components/admin/category-edit';
import CategoryTab from './components/admin/category-tab';
import CategoryAddTab from './components/admin/category-add';

import ProductTab from './components/admin/product-tab';
import ProductEdit from './components/admin/product-edit';
import ProductAddTab from './components/admin/product-add';
import ProductDetails from './components/product-details';


// import {useFetch} from './hooks/useFetch';
import { useDispatch } from "react-redux";
import { fetchUserDetails } from "./services/actions/userDetailsAction"
import { useCookies} from 'react-cookie';
import {Route, BrowserRouter} from 'react-router-dom';


function App() {
  
  const [ token ] = useCookies(['ms-token']);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDetails(token['ms-token']));
  }, [token, dispatch]);


  return (
    <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route path="/profile" component={Profile} />
        
        <Route path="/admin" component={Admincp} />
        <Route path="/admin/products/" component={ProductTab} />
        <Route path="/admin/categories/" component={CategoryTab} />
        <Route path="/admin/category/add" component={CategoryAddTab} />
        <Route path="/admin/product/add/" component={ProductAddTab} />
        
        <Route path="/admin/category-edit/:id/" component={CategoryEdit} />
        <Route path="/admin/product-edit/:id/" component={ProductEdit} />
        <Route path="/product/:id/" component={ProductDetails} />

    </BrowserRouter>
     
  );

}

export default App;
