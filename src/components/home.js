import React from 'react';
import Categories from './categories';
import NavBar from './nav-bar';


function Home(props){
   
  return (
    <div className="App">      
      <NavBar/>
      <Categories/>
    </div>
  );
        
  
}


export default Home;