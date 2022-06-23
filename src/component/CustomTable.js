import { Link, useNavigate, useParams } from 'react-router-dom';
import {
   Table,
   Button,
   ButtonGroup
  } from 'reactstrap';
import axios from 'axios';
import authHeader from '../services/auth-header';

const CustomTable = ({tableHeaders, tableContents, onChangeValue}) => {
  const navigate = useNavigate();
  const {id} = useParams();

  const handleDelete = async(id) =>{
  
    try {
      const response = await axios.delete(`http://localhost:8080/api/employees/${id}`,{ headers: authHeader()});
      onChangeValue(id);
      
  } catch (error) {

      console.log(error);
      
  }

  }
    return (  
        <div className="result-list">
         <Table>
  <thead>
    <tr>
        {tableHeaders && tableHeaders.map((item,ind)=>(
              <th key={ind}>
              {item}
              </th>

        ))}

        
    </tr>
  </thead>
  <tbody>
     {tableContents && tableContents.map((item)=>(
           <tr key={item.employeeId}>
           <th scope="row">
             {item.employeeId}
           </th>
           <td>
             {item.firstName}
           </td>
           <td>
             {item.email}
           </td>
         
           <td>
             {item.role}
           </td>
           <td>
             {item.status}
           </td>

        
           <td>
                      
<ButtonGroup>
  <Button outline onClick={(e) => navigate(`edit/${item.employeeId}`)}>
    Edit
  </Button>
  <Button color="danger" outline onClick={(e) => window.confirm('Are you sure you wish to delete this member?') ? handleDelete(item.employeeId) : null}>
    Delete
  </Button>
  <Button color="primary" outline onClick={ (e) => navigate(`profile/${item.employeeId}`)}>
    View
  </Button>
</ButtonGroup>
           </td>
        
         </tr>
     ))}
  </tbody>
</Table>
      </div>
    );
}
 
export default CustomTable;