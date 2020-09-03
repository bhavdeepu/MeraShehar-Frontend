import React, {useEffect} from 'react';
import { Button, Card} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../services/actions/categoriesAction"

function Categories(props){

    const categoriesList = useSelector(store => store.categoriesList);
    const {categories, loading, error} = categoriesList; 

    const dispatch = useDispatch();
    useEffect (() =>{
      dispatch(fetchCategories());
    },[dispatch])

	  const renderCard = (card, index) => {
                return (
                  <Card style={{ width: '13rem' }} key={index}>
                    <Card.Img variant="top" src={card.image}  style={{height: "177px"}} />
                    <Card.Body>
                      <Card.Title>{card.name}</Card.Title>
                      <Card.Text>
                      {card.description}
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </Card>
                  )
	  }
 
   
	return loading ? <div>loading..</div> :
      error ? <div>error..{error}</div> :
      categories ?
    		<div className="card-columns">
              {categories.map(renderCard)}
          </div> : <div>loading..</div>
    		
  
}


export default Categories;