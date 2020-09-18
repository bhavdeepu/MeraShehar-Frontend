import React, {useEffect} from 'react';
import { Button, Card} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../services/actions/productsAction"
import { Link } from "react-router-dom";


function Products(props){

    const productsList = useSelector(store => store.productsList);
    const {products, loading, error} = productsList;

    const dispatch = useDispatch();

    useEffect (() =>{
      dispatch(fetchProducts(`cat=${props.catid}&futr=1`));
    },[dispatch,props.catid])

	  const renderCard = (card, index) => {
                return (
                  <Card style={{ width: '13rem' }} key={index}>
                    <Card.Img variant="top" src={card.image}  style={{height: "177px"}} />
                    <Card.Body>
                      <Card.Title>{card.name}</Card.Title>
                      <Card.Text>
                      {card.description}
                      </Card.Text>
                      <Button variant="primary">
                        <Link to={"/product/" + card.id+"/"} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        Open
                          </Link>
                      </Button>
                    </Card.Body>
                  </Card>
                  )
	  }
 
   
	return loading ? <div>loading..</div> :
      error ? <div>error..{error}</div> :
      products ?
      <React.Fragment>
        <h2>{props.catname}</h2>
    		<div className="card-columns">
              {products.map(renderCard)}
          </div> 
      </React.Fragment>: <div>loading..</div>
    		
  
}


export default Products;