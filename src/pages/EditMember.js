import {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Col
  } from 'reactstrap';
import CustomSpinner from '../component/CustomSpinner';
import authHeader from '../services/auth-header';
import AuthService from "../services/auth.service";
const axios = require('axios').default;

const EditMember = () => {

    const [data, setData] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [gender, setGender] = useState(null);
    const [role, setRole] = useState(null);
    const [status, setStatus] = useState(null);

    const {id} = useParams();

    useEffect(()=>{
        const a = id.split("/");


        const fetchData = async()=>{
           try {
            const res = await axios.get(`http://localhost:8080/api/employees/${a[0]}`, {headers: authHeader()});

            const resData = await res.data;
            setData(resData);
                       
           } catch (error) {
            console.log(error);
            
           }

        }
        fetchData();

    },[]);

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value);
      };

      const onChangeLastName = (e) => {
        setLastName(e.target.value);
      };

      const onChangeEmail = (e) => {
        setEmail(e.target.value);
        
      };

      const onChangeGender = (e) => {
        setGender(e.target.value);
      };
      const onChangeRole = (e) => {
        setRole(e.target.value);
      };

      const onChangeStatus = (e) => {
        setStatus(e.target.value);
      };

      const handleSubmit = async(e)=>{
        e.preventDefault();
        const a = id.split("/");
        const body ={
            "employeeId" : a[0],
            "firstName": firstName || data.firstName,
            "lastName":  lastName || data.lastName,
            "gender" : gender || data.gender,
            "email" :  data.email,
            "role" : role || data.role,
            "status" : status || data.status

        }

        const addEmployee = ()=>{

            try {
                const res = axios.put(`http://localhost:8080/api/employees/${a[0]}`, body, {headers: authHeader()});

                
                
            } catch (error) {
                console.log(error);
                
            }

        }
        addEmployee();

      }


    const user = AuthService.getCurrentUser();

    const navigate = useNavigate();


    
    return (
        <div className='container-class'>
{ data ? 

<Form onSubmit={handleSubmit}>
<Row>
  <Col md={6}>
    <FormGroup>
      <Label for="exampleFirstName">
        First Name
      </Label>
      <Input
        id="exampleFirstName"
        name="firstName"
        placeholder="John"
        type="text"
        value={firstName || data.firstName}
        onChange={onChangeFirstName}
      />
    </FormGroup>
  </Col>
  <Col md={6}>
    <FormGroup>
      <Label for="exampleLastName">
        Last Name
      </Label>
      <Input
        id="exampleLastName"
        name="lastName"
        placeholder="Doe"
        type="text"
        value={lastName || data.lastName}
        onChange={onChangeLastName}
      />
    </FormGroup>
  </Col>
</Row>

<Row>
  <Col md={6}>
    <FormGroup>
      <Label for="exampleEmail">
        Email
      </Label>
      <Input
        id="exampleEmail"
        name="email"
        type='email'
        value={data.email}
        readOnly
      />
    </FormGroup>
  </Col>
  <Col md={6}>
    <FormGroup>
      <Label for="exampleState">
        Gender
      </Label>
      <Input
        id="exampleGender"
        name="select"
        type='select'
        value={gender || data.gender}
        onChange={onChangeGender}
        
      >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>

       </Input>
    </FormGroup>
  </Col>

</Row>
<Row>
  <Col md={6}>
  <FormGroup>
      <Label for="exampleRole">
        Role
      </Label>
      <Input
        id="exampleRole"
        name="select"
        type='select'
        value={role || data.role}
        onChange={onChangeRole}
        
      >
          <option>Member</option>
          <option>Admin</option>
  

       </Input>
    </FormGroup>
  </Col>
  <Col md={6}>
    <FormGroup>
      <Label for="exampleStatus">
        Status
      </Label>
      <Input
        id="exampleStatus"
        name="select"
        type='select'
        value={status || data.status}
        onChange={onChangeStatus}
        
      >
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Intern</option>
  

       </Input>
    </FormGroup>
  </Col>

</Row>
<Button color='success' outline>
  Save Changes
</Button>
</Form>

:

<div> <CustomSpinner /> </div>



}
</div>
);
}
 
export default EditMember;