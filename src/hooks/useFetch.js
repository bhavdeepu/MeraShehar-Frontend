import {useState, useEffect} from 'react';
import {APIALL} from '../api-service';
import { useCookies} from 'react-cookie';


function useFetch(){

	const [data, setData] = useState({'is_login':false});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();

	const [token] = useCookies(['ms-token']);

	useEffect( ()=> {		
		if (token['ms-token']){
			async function fetchData(){
				setLoading(true);
				setError();
				const data = await APIALL.currentUser(token['ms-token'])
							.catch(error => setError(error))
				setLoading(false);
				setData({...data,is_login:true});	
			}
			fetchData();
			}
		}
		,[token])

	return [data, loading, error]
}

export {useFetch};