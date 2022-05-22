import {useEffect, useState} from 'react';
import ResultList from './component/ResultList';
import { useNavigate } from 'react-router-dom';
import AuthService from "./services/auth.service";
const axios = require('axios').default;

const Home = () => {

    const [searchKey, setSearchKey] = useState('');
    const [data, setData] = useState(null);
    const user = AuthService.getUser();
    const [tab, setTab] = useState('users');
    const navigate = useNavigate();


    const handleSearch = async() =>{
       // e.preventDefault();

        try {
       
            const response = await axios.get(`https://api.github.com/search/${tab}?q=${searchKey}`);
            const data = await response.data;
          
            setData(data);


            
        } catch (error) {
      
            console.log(error);
            
        }

    }

    useEffect(()=>{
       if(searchKey.length) handleSearch();


    },[tab]);

    useEffect(()=>{
        if(!user){
            navigate('/');

        }
 
 
     },[user]);

    
    return ( 
     <div>
      <div className="search">
      <input
type="text"
value={searchKey}
onChange={(e) => setSearchKey(e.target.value)}
/>
<button onClick={handleSearch}>Search</button>

</div>

<div className="tab">
  <button 
  className="tablinks" 

  autoFocus={tab == 'users' ? true : false}
  onClick={()=> setTab('users')}>Users</button>
  <button 
  className="tablinks"

 
  onClick={()=> setTab('repositories')}>Repositories</button>
  
</div>
<div  className="tabcontent">
<ResultList searchResults={data} />
</div>

 
      </div>
     );
}
 
export default Home;