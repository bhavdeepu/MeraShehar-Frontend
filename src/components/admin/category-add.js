import React, {useState} from 'react';
import { Form, Button} from 'react-bootstrap';

import {APIALL} from '../../api-service';
import { useCookies} from 'react-cookie';


function CategoryAddTab(props){

  const [token] = useCookies(['ms-token']);

  const [nameCat , setNameCat] = useState('');
  const [descriptionCat , setDescriptionCat] = useState('');
  
  const [imageCat , setImageCat] = useState(null);

  const saveNewCategory = () =>{

    const uploadData = new FormData();
    uploadData.append('name', nameCat);
    uploadData.append('description', descriptionCat);

    if (imageCat) uploadData.append('image', imageCat);

    APIALL.addCategory(token['ms-token'], uploadData)
      .then(resp => props.history.push(`/admin/category-edit/${resp.data.id}`))
      .catch(error => console.log("error==",error))
  }

  return (
          <div>
          <h2><center>Add Category</center></h2>
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

              <Button variant="primary" type="button" onClick={() => saveNewCategory()}>
                Submit
              </Button>
            </Form>
            </div>
            
        )
  
}


export default CategoryAddTab;

