import React from 'react';
import AdminNavBar from './admin-nav';
import ContentNavBar from './content-nav';

import { useSelector } from "react-redux";

function Admincp(props){

    const userDetails = useSelector(store => store.userDetails);
    const {user, loading, error, is_login} = userDetails;
    
    if(typeof (loading) != "undefined" && loading === false){
        if (!is_login) window.location.href='/login';
    }

    if(typeof (loading) != "undefined" && loading === false){
        if (!user['is_superuser']) window.location.href='/';
    }

    return loading ? <div>loading..</div> :
      error ? <div>erroads sdsdr..{error}</div> :
      user ?
            <div>
                <AdminNavBar />
                <br/>                               
                <ContentNavBar/>
                <br/>
            </div>:
      <h1>Loading Page</h1>

}

export default Admincp;
