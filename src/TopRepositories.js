import { useState } from 'react';
import ResultList from './component/ResultList';

 const axios=require('axios').default;
const TopRepositories = () => {

    const [stars, setStars] = useState('');
    const [data, setData] = useState(null);

    const handleSearch = async() =>{
        // e.preventDefault();
 
         try {
        
             const response = await axios.get(`https://api.github.com/search/repositories?q=stars:>${stars}`);
             const data = await response.data;
           
             setData(data);
 
 
             
         } catch (error) {
       
             console.log(error);
             
         } 
 
     }


    return ( 
        <div className="search">
                  <input
         placeholder='stars'
         type="number"
        value={stars}
         onChange={(e)=> setStars(e.target.value)} 
        />

        <button onClick={handleSearch}>search</button>
       
        <div id="Paris" className="tabcontent">
       <ResultList searchResults={data} /> 
        </div>

            
        </div>
     );
}
 
export default TopRepositories;