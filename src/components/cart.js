import React, {useEffect} from 'react';
import { Card, Container, Row, Col} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../services/actions/cartAction"
import { Link } from "react-router-dom";
import { useCookies} from 'react-cookie';
import NavBar from './nav-bar';


function Cart(props){
    
    const [token] = useCookies(['ms-token']);

    const cartList = useSelector(store => store.cartList);
    const {cart, loading, error, total} = cartList;

    const dispatch = useDispatch();

    useEffect (() =>{
      dispatch(fetchCart(token['ms-token']));
    },[dispatch, token])

	  const renderCard = (card, index) => {
                return (
                    <React.Fragment>
                        <Row>
                          <Col>
                        <Link to={"/product/" + card.id+"/"} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        <Card.Img src={card.image}  style={{height: "100px",width:"200px"}} />
                          </Link>
                          </Col>
                          <Col>
                            <h4>{card.name}</h4>
                            <h4>₹ {card.price}</h4>
                          </Col>
                        </Row>
                        <Row>
                          <Col>&nbsp;
                          </Col>
                        </Row>
                    </React.Fragment>
              )
	  }
 
   
	return loading ? <div>loading..</div> :
      error ? <div>error..{error}</div> :
      cart ?
      <React.Fragment>
        <NavBar/><br/>
        <center><h2>Cart Products</h2><br/><br/></center>
        {cart.length !== 0 ? (
          <div>
          <Container>
              {cart.map(renderCard)}
            <Row>
            <Col>&nbsp;</Col>
            <Col><h3>Cart Value: {total}</h3></Col>
            </Row>
          </Container>
        </div>
        ) : (
          <h3><center>Cart is empty</center></h3>
        )}

    		 
      </React.Fragment>: <div>loading..</div>
}


export default Cart;

