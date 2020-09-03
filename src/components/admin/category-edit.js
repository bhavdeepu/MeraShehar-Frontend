import React, {useEffect, useState} from 'react';
import { Form, Button, Card} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryDetail } from "../../services/actions/categoriesAction"
import {APIALL} from '../../api-service';
import { useCookies} from 'react-cookie';
import {CATEGORY_DETAIL_SUCCESS, CATEGORY_DETAIL_FAIL} from "../../services/types";


function CategoryEdit(props){

  const [token] = useCookies(['ms-token']);
  const categoryId = props.match.params.id;

  const categoriesList = useSelector(store => store.categoriesDetails);
  const {category, name, description, loading, error} = categoriesList; 
  const [nameCat , setNameCat] = useState(name);
  const [descriptionCat , setDescriptionCat] = useState(description);
  
  const [imageCat , setImageCat] = useState(null);


  const dispatch = useDispatch();
  useEffect (() =>{
    dispatch(fetchCategoryDetail(categoryId,'all=1'));

  },[dispatch, categoryId])

  useEffect (() =>{
      setNameCat(name);
      setDescriptionCat(description);
  },[name,description])

  const saveUpdatedCategory = () =>{

    const uploadData = new FormData();
    uploadData.append('name', nameCat);
    uploadData.append('description', descriptionCat);

    if (imageCat) uploadData.append('image', imageCat);

    APIALL.updateCategory(token['ms-token'], categoryId, uploadData)
      .then(resp => dispatch({ type: CATEGORY_DETAIL_SUCCESS, payload: resp.data }))
      .catch(error => dispatch({ type: CATEGORY_DETAIL_FAIL, payload: error.message }))
  }

  return (
          loading ? <div>loading..</div> :
          error ? <div>error..{error}</div> :
          category ?
          <div>
          <center>
            <h2>Update Category</h2>
            <br/>
            <Card style={{ width: '12rem' }}>
              <Card.Img variant="top" src={category.image}  style={{height: "177px"}} />
                <Card.Body>
                  <Card.Title>{category.name}</Card.Title>
                  <Card.Text>
                  {category.description}
                  </Card.Text>
                </Card.Body>
            </Card>
          </center>
            <br/>

            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Category Name</Form.Label>
                <Form.Control type="text" placeholder="Category Name" 
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

              <Button variant="primary" type="button" onClick={() => saveUpdatedCategory()}>
                Submit
              </Button>
            </Form>
            </div>
            : <div>loading..</div>
        )
  
}


export default CategoryEdit;

