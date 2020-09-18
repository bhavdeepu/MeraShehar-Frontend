import React, {useEffect, useState} from 'react';
import { Form, Button, Card} from 'react-bootstrap';
import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail, fetchProductOptions } from "../../services/actions/productsAction"
import {APIALL} from '../../api-service';
import { useCookies} from 'react-cookie';
import {PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL} from "../../services/types";


function ProductEdit(props){

  const [token] = useCookies(['ms-token']);
  const productId = props.match.params.id;

  const productsDetails = useSelector(store => store.productsDetails);
  const {product, loading, error} = productsDetails; 

  const productsOption = useSelector(store => store.productsOption);
  const {options} = productsOption; 
  
  const [price , setPrice] = useState('');
  const [nameCat , setNameCat] = useState('');
  const [descriptionCat , setDescriptionCat] = useState('');
  const [categoryType , setcategoryType] = useState(null);
  
  const [categoryId , setcategoryId] = useState(null);
  
  const [imageCat , setImageCat] = useState(null);

  const dispatch = useDispatch();
  useEffect (() =>{
    dispatch(fetchProductOptions(productId,'all=1'));
    dispatch(fetchProductDetail(productId,'all=1'));
    
  },[dispatch, productId])

  useEffect (() =>{
    if (product){
      setPrice(product.price);
      setNameCat(product.name);
      setDescriptionCat(product.description);
    }
      setcategoryType(options);
  },[product, options])

  const saveUpdatedCategory = () =>{

    const uploadData = new FormData();
    uploadData.append('name', nameCat);
    uploadData.append('description', descriptionCat);
    uploadData.append('price', price);
    
    if (categoryId){
    uploadData.append('category', categoryId);
    }
    if (imageCat) uploadData.append('image', imageCat);

    APIALL.updateProduct(token['ms-token'], productId, uploadData)
      .then(resp => dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: resp.data }))
      .catch(error => dispatch({ type: PRODUCT_DETAIL_FAIL, payload: error.message }))
  }
  
  return (
          loading? <div>loading..</div> :
          error ? <div>errodasdasr..{error}</div> :
          categoryType && product ?
          <div>
          <br/>
          <center>
          <h2>Update Product</h2>
          <br/>
          <Card style={{ width: '12rem' }}>
            <Card.Img variant="top" src={product.image}  style={{height: "177px"}} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                {product.description}
                </Card.Text>
              </Card.Body>
          </Card>
          </center>
            <br/>

            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" placeholder="Product Name" 
                      value={nameCat} onChange={ evt => setNameCat(evt.target.value)}/>
                <Form.Text className="text">
                  
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Price</Form.Label>
                <Form.Control type="float" placeholder="Price" 
                    value={price} onChange={ evt => setPrice(evt.target.value)}/>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Description" 
                    value={descriptionCat} onChange={ evt => setDescriptionCat(evt.target.value)}/>
              </Form.Group>
              
              <Form.Group>
                <Form.File id="image" label="Example file input"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={ evt => setImageCat(evt.target.files[0])} />
              </Form.Group>

              <Select 
                  defaultValue={categoryType.filter(({value}) => value === product.category)}

                      options={categoryType} onChange={ value => setcategoryId(value.value)}/>

              <Button variant="primary" type="button" onClick={() => saveUpdatedCategory()}>
                Submit
              </Button>
            </Form>
            </div>
            : <div>loading..</div>
        )
  
}


export default ProductEdit;

