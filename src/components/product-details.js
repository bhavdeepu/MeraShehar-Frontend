import React, {useEffect, useState} from 'react';
import { Button, Card, Container, Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail } from "../services/actions/productsAction"
import NavBar from './nav-bar';
import {APIALL} from '../api-service';
import { useCookies} from 'react-cookie';


function ProductDetails(props){

  const [token] = useCookies(['ms-token']);
  const [inCart , setInCart] = useState('');

  const productId = props.match.params.id;

  const productsDetails = useSelector(store => store.productsDetails);
  const {product, loading, error} = productsDetails; 


  const dispatch = useDispatch();
  useEffect (() =>{
    dispatch(fetchProductDetail(productId,'all=1'));
    if (token['ms-token']){
          APIALL.inCart(token['ms-token'],productId)
          .then(resp => setInCart(resp.data.in_cart))
          .catch(error => console.log(error))
      }
    else{
      setInCart(true);
    }
  },[dispatch, productId, token])


  const addToCart = () =>{
    APIALL.addToCart(token['ms-token'], {'product_id':productId})
    .then(resp => setInCart(true))
    .catch(error => console.log(error))
  }

  const removeFromCart = () =>{
    APIALL.removeFromCart(token['ms-token'], {'product_id':productId})
    .then(resp => setInCart(false))
    .catch(error => console.log(error))
  }
  console.log("inCart==",inCart);
  return (
          loading? <div>loading..</div> :
          error ? <div>error..{error}</div> :
          String(inCart)?
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
              <h4>₹ {product.price}</h4><br/>
              PRODUCT DESCRIPTION
              <h4>{product.description} </h4><br/>
              <Button variant="primary" type="button" disabled={inCart} onClick = {addToCart}>
                ADD TO CART
              </Button>
              {inCart && token['ms-token']&&
                <Button variant="danger" type="button" disabled={! inCart} onClick = {removeFromCart}>
                        Remove From Cart
                </Button>      
              } 
              {! token['ms-token'] &&
                <h5>Required login to add to cart</h5>       
              }
              </Col>
             </Row>
          </Container>
            </div>
            : <div>loading..</div>
        )
  
}


export default ProductDetails;

