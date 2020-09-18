import API from './api';


export class APIALL{
	
	static getItems(type, token, filter='all=0'){
			return API.get(`${type}?${filter}`)
			       .then(res => res.json())
	  	}
		// return fetch(`http://localhost:8000/${type}/`,{
		// 		      method: "GET",
		// 		      headers: {
		// 		        'Content-Type':'application/json'				        
		// 		      }
		// 		    }).then(resp => resp.json())
		// 		}

	static loginUser(body){
		return API.post(`auth/`,body)
		}

	static signupUser(body){
		return API.post(`users/`,body)
		}
	
	static updateUser(token, id ,body){
		return API.patch(`users/${id}/`,body,
			{ 
				headers: {
					        'Content-Type':'multipart/form-data',
					        'Authorization':`Token ${token}`
					      }
			}
			)
		}

		// return fetch(`http://52.66.199.133/auth/`,{
		// 		      method: "POST",
		// 		      headers: {
		// 		        'Content-Type':'application/json'
		// 		      },
		// 		      body : JSON.stringify(body)
		// 		    }).then(resp => resp.json())
		// 		}

	static currentUser(token){

		return API.get(`users/currentuser/`,{
				      headers: {
				        'Content-Type':'application/json',
				        'Authorization':`Token ${token}`
				      }
				    })
				}

	static updateCategory(token, id, body){
		return API.patch(`categories/${id}/?all=1`,body,
			{ 
				headers: {
					        'Content-Type':'multipart/form-data',
					        'Authorization':`Token ${token}`
					      }
			}
			)
	}

	static updateCategoryStatus(token, id, body){
		return API.patch(`categories/${id}/change-status/?all=1`,body,
			{ 
				headers: {
					        'Content-Type':'application/json',
					        'Authorization':`Token ${token}`
					      }
			}
			)
	}

	static addCategory(token, body){
		return API.post(`categories/`,body,
			{ 
				headers: {
					        'Content-Type':'multipart/form-data',
					        'Authorization':`Token ${token}`
					      }
			}
			)
	}

	static deleteCategory(token, id){
		return API.delete(`categories/${id}/?all=1`,
			{ 
				headers: {
					        'Content-Type':'application/json',
					        'Authorization':`Token ${token}`
					      }
			}
			)
	}



	static updateProduct(token, id, body){
		return API.patch(`products/${id}/?all=1`,body,
			{ 
				headers: {
					        'Content-Type':'multipart/form-data',
					        'Authorization':`Token ${token}`
					      }
			}
			)
	}

	static updateProductStatus(token, id, body){
		return API.patch(`products/${id}/change-status/?all=1`,body,
			{ 
				headers: {
					        'Content-Type':'application/json',
					        'Authorization':`Token ${token}`
					      }
			}
			)
	}
	
	static updateProductFeature(token, id, body){
		return API.patch(`products/${id}/change-featured/?all=1`,body,
			{ 
				headers: {
					        'Content-Type':'application/json',
					        'Authorization':`Token ${token}`
					      }
			}
			)
	}

	static deleteProduct(token, id){
		return API.delete(`products/${id}/?all=1`,
			{ 
				headers: {
					        'Content-Type':'application/json',
					        'Authorization':`Token ${token}`
					      }
			}
			)
	}

	static addProduct(token, body){
		return API.post(`products/`,body,
			{ 
				headers: {
					        'Content-Type':'multipart/form-data',
					        'Authorization':`Token ${token}`
					      }
			}
			)
	}

} 