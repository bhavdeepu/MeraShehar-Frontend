import React, {useState, useEffect} from 'react';
import { Form, Button} from 'react-bootstrap';
import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";

import {APIALL} from '../../api-service';
import { useCookies} from 'react-cookie';
import { fetchProductOptions } from "../../services/actions/productsAction"


function ProductAddTab(props){

  const [token] = useCookies(['ms-token']);

  const [nameCat , setNameCat] = useState('');
  const [descriptionCat , setDescriptionCat] = useState('')
  const [imageCat , setImageCat] = useState(null);
  const [categoryId , setcategoryId] = useState(null);

  const productsOption = useSelector(store => store.productsOption);
  const {options} = productsOption; 

  const dispatch = useDispatch();
  useEffect (() =>{
    dispatch(fetchProductOptions('all=1'));    
  },[])


  const saveNewProduct = () =>{

    const uploadData = new FormData();
    uploadData.append('name', nameCat);
    uploadData.append('description', descriptionCat);
    uploadData.append('category', categoryId);

    if (imageCat) uploadData.append('image', imageCat);

    APIALL.addProduct(token['ms-token'], uploadData)
      .then(resp => props.history.push(`/admin/product-edit/${resp.data.id}`))
      .catch(error => console.log("error==",error))
  }

  return (
          <div>
          <h2><center>Add Product</center></h2>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" placeholder="Product Name" 
                      value={nameCat} onChange={ evt => setNameCat(evt.target.value)}/>
                <Form.Text className="text">
                  
                </Form.Text>
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

              <Select options={options} onChange={ value => setcategoryId(value.value)}/>

              <Button variant="primary" type="button" onClick={() => saveNewProduct()}>
                Submit
              </Button>
            </Form>
            </div>
            
        )
  
}


export default ProductAddTab;

