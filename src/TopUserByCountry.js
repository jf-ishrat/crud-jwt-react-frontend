
import { useState, useEffect } from 'react';
import countryList from 'react-select-country-list';
import ResultList from './component/ResultList';
import AuthService from "./services/auth.service";
import { useNavigate } from 'react-router-dom';
const axios = require('axios').default;
const TopUserByCountry = () => {
    const list= countryList().getData();

    const [country, setCountry] = useState('Bangladesh');
    const [data, setData] = useState(null);
    const [followers, setFollowers] = useState(0);
    const user = AuthService.getUser();
    const navigate = useNavigate();

    const handleSearch = async() =>{
        // e.preventDefault();
 
         try {
        
             const response = await axios.get(`https://api.github.com/search/users?q=location:${country}+followers:>${followers}`);
             const data = await response.data;
           
             setData(data);
 
 
             
         } catch (error) {
       
             console.log(error);
             
         }
 
     }

     useEffect(()=>{
        if(!user){
            navigate('/');

        }
 
 
     },[user]);
    return ( 
   <div>
            <div className='search'>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
        {list && 
          list.map((item)=>(
            <option key={item.value} value={item.label}>{item.label}</option>
          ))
        }
          
        </select> 
        <input
         placeholder='followers > 1000'
         type="number"
         value={followers}
         onChange={(e)=> setFollowers(e.target.value)}
        />

        <button onClick={handleSearch}>search</button>
        </div>
        <div id="Paris" className="tabcontent">
        <ResultList searchResults={data} />
        </div>
   </div>
     );
}
 
export default TopUserByCountry;