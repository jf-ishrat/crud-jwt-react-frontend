import { Link } from 'react-router-dom';

const ResultList = ({searchResults}) => {
    return (  
        <div className="result-list">
          {searchResults && 
          <label>Total Count: {searchResults.total_count}</label>
          }  
        {searchResults && searchResults.items.map(item => (
          <div className="result-preview" key={item.id} >
            <Link to={`/details/${item.id}`} state={{item}}>
              <h2>{ item.login || item.name }</h2>
              <p>ID: { item.id }</p>
            </Link>
          </div>
        ))}
      </div>
    );
}
 
export default ResultList;