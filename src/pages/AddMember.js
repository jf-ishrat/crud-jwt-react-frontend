import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Col
  } from 'reactstrap';
import authHeader from '../services/auth-header';
import AuthService from "../services/auth.service";
const axios = require('axios').default;

const AddMember = () => {

    const [data, setData] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Male");
    const [role, setRole] = useState("Member");
    const [status, setStatus] = useState("Full-time");

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
    
        const body ={
            "firstName": firstName,
            "lastName":  lastName,
            "gender" : gender,
            "email" : email,
            "role" : role,
            "status" : status

        }

        const addEmployee = ()=>{

            try {
                const res = axios.post("http://localhost:8080/api/employees", body, {headers: authHeader()});

                
            } catch (error) {
                console.log(error);
                
            }

        }
        addEmployee();

      }


    const user = AuthService.getCurrentUser();

    const navigate = useNavigate();




    // useEffect(()=>{
    //     if(!user){
    //         navigate('/');

    //     }
 
 
    //  },[user]);

    
    return (
        <div className='container-class'>
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
          value={firstName}
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
          value={lastName}
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
          required
          value={email}
          onChange={onChangeEmail}
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
          value={gender}
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
          value={role}
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
          value={status}
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
    Add New Employee
  </Button>
</Form>
</div>
);
}
 
export default AddMember;