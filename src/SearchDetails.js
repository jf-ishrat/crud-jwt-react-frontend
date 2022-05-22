import { useLocation } from 'react-router-dom'

const SearchDetails = () => {
    const location = useLocation()
    const data = location.state;

    console.log("data: ", data);


    return (
        <div className="search-details">
    
    { data && (
          <article>
            <h2>{ data.item.login || data.item.name }</h2>
            <img
            src={data.item.avatar_url || data.item.owner?.avatar_url }
            height="100px"
            width="100px"
            />


            <div>Type: { data.item.type || data.item.owner?.type}</div>
            <div>ID: { data.item.id }</div>
        
          </article>
        )} 
      </div>
      );
}
 
export default SearchDetails;