import React, {useEffect} from 'react';
import { Button, Card} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../services/actions/categoriesAction"
import { Link } from "react-router-dom";
import {APIALL} from '../../api-service';
import { useCookies} from 'react-cookie';


function CategoryTab(props){

    const [token] = useCookies(['ms-token']);
    const categoriesList = useSelector(store => store.categoriesList);
    const {categories, loading, error} = categoriesList; 

    const dispatch = useDispatch();
    useEffect (() =>{
      dispatch(fetchCategories('all=1'));
    },[dispatch])

    const deleteHandler=(cardnew)=>{
        APIALL.deleteCategory(token['ms-token'],cardnew.card.id)
        .then(resp => dispatch(fetchCategories('all=1')))
        .catch(error => console.log("error==",error))
      }

    const liveHandler=(cardnew)=>{
        APIALL.updateCategoryStatus(token['ms-token'],cardnew.card.id,{is_live: !cardnew.card.is_live})
        .then(resp => dispatch(fetchCategories('all=1')))
        .catch(error => console.log("error==",error))
      }
      

	  const renderCard = (card, index) => {
      return (
        <Card style={{ width: '13rem' }} key={index}>
          <Card.Img variant="top" src={card.image}  style={{height: "177px"}} />
          <Card.Body>
            <Card.Title>{card.name}</Card.Title>
            <Card.Text>
            {card.description}
            </Card.Text>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" defaultChecked={card.is_live}
                onClick={() => {if(window.confirm('Are you sure want to change?')){ liveHandler({card})}}}/>
              <label>Is Live</label>
            </div>

            <br/>
            <Button variant="primary">
                <Link to={"/admin/category-edit/" + card.id+"/"} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    Edit
                </Link>
            </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="danger" onClick={() => {if(window.confirm('Are you sure to delete this record?')){ deleteHandler({card})}}}>
            Delete
            </Button>
          </Card.Body>
        </Card>
        )
	  }
 
	return loading ? <div>loading..</div> :
      error ? <div>error..{error}</div> :
      categories ?
      <React.Fragment>
        <h1><center>All Categories</center></h1>
        <br/>
    		<div className="card-columns">
              {categories.map(renderCard)}
        </div> 
       </React.Fragment>
          : <div>loading..</div>
  
}

export default CategoryTab;