import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";

import CustomTable from '../component/CustomTable';
import authHeader from '../services/auth-header';
const axios = require('axios').default;

const Admin = () => {

    const [data, setData] = useState(null);
    
    const [value, setValue] = useState(null);
   // const user = AuthService.getCurrentUser();

    const navigate = useNavigate();
    const onChangeValue = (val) =>{
        setValue(val);

    }

    useEffect(()=>{
        const user = AuthService.getCurrentUser();
        if(!user){
            navigate('/');

        }
        else{
            let isMounted = true;
            const controller = new AbortController();
          const getData = async()=>{
            try {
                const response = await axios.get("http://localhost:8080/api/employees",{ headers: authHeader()}, {signal: controller.signal});

                const result = await response.data;
                isMounted && setData(result)
                
            } catch (error) {

                console.log(error);
                
            }
          }

          getData();

          return ()=>{
            isMounted = false;
            controller.abort();

          }

        }

     },[value]);


    
    return (
        <div className='container-class'>
            <CustomTable  tableHeaders = {tableHeaders} tableContents = {data} onChangeValue={onChangeValue}/>

        </div>
    );
}
 
export default Admin;

const tableHeaders = [
    "Employee ID", "First Name","Email","Role", "Status"
]
