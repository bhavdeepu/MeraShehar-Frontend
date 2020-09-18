import React,{useState} from 'react';
import Categories from './categories';
import Products from './products';
import NavBar from './nav-bar';


function Home(props){
  const [catId , setCatId] = useState('no');
  const [catName , setCatName] = useState('Featured Products');

  const showProducts = cate =>{
  	setCatId(cate.id);
  	setCatName(cate.name);
  }

  return (
    <div className="App">      
      <NavBar/>
      <Products catid={catId} catname={catName}/>
      <Categories showProducts={showProducts}/>
    </div>
  );
        
  
}


export default Home;