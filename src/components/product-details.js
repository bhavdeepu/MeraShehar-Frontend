import React, {useEffect} from 'react';
import { Button, Card, Container, Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail } from "../services/actions/productsAction"
import NavBar from './nav-bar';


function ProductDetails(props){


  const productId = props.match.params.id;

  const productsDetails = useSelector(store => store.productsDetails);
  const {product, loading, error} = productsDetails; 


  const dispatch = useDispatch();
  useEffect (() =>{
    dispatch(fetchProductDetail(productId,'all=1'));
    
  },[dispatch, productId])

  
  return (
          loading? <div>loading..</div> :
          error ? <div>error..{error}</div> :
          product ?
          <div>
          <NavBar/>
          <br/>
          <center>
          <h2>Product Details</h2></center>
          <br/>


          <Container>
            <Row>
              <Col>   
                  <Card.Img src={product.image}  style={{height: "400px",width:"300px"}} />
              </Col>
              <Col>
              PRODUCT NAME
              <h4>{product.name}</h4><br/>
              PRICE
              <h4>{product.price}</h4><br/>
              PRODUCT DESCRIPTION
              <h4>{product.description}</h4><br/>

              <Button variant="primary" type="button">
                ADD TO CART
              </Button>

              </Col>
             </Row>
          </Container>
          
          
            
            </div>
            : <div>loading..</div>
        )
  
}


export default ProductDetails;

