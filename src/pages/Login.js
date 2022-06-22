import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import qs from "qs";

import {
    Button,
    Form,
    FormGroup,
    Input,
    Label
  } from 'reactstrap';
import AuthService from "../services/auth.service";


const axios = require('axios').default;

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const headers = {
        'Accept' : 'application/json',
        'content-type' : 'application/x-www-form-urlencoded'
    }



    useEffect(()=>{

        const user = AuthService.getCurrentUser();
        if(!user){
            navigate('/');
        }
        

    },[]);
    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
      };

      const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
      };

    const handleLogin = async (e)=>{

        e.preventDefault();
    
        const body ={
            "username": username,
            "password":  password
        }
      // const data = AuthService.login(body);

      try {
        const response = await axios.post("http://localhost:8080/api/login", qs.stringify(body), headers);
       const data = await response.data;

       if(data.access_token){
        await localStorage.setItem("user", JSON.stringify(response.data));

        if(data.role.includes("admin") || data.role.includes("Admin")){
            navigate("/admin-dashboard");
           
        }
        else{
            navigate(`/member-profile/${data.employee_id}`);
    
        }

        }
        
    } catch (error) {
        console.log(error);
      
       }



    }

    return (
        <div className="col-md-12">
         <div className="card card-container">
         <img
          src="./dsi-logo.png"
          alt="profile-img"
          className="login-img-card"
        />
         <h3>Welcome here!</h3>
          <Form className="form" onSubmit={handleLogin}>
            <FormGroup>
              <Label for="exampleEmail">Username</Label>
              <Input
                type="email"
                name="email"
                value={username}
                id="exampleEmail"
                placeholder="example@example.com"
                onChange={onChangeUsername}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                value={password}
                id="examplePassword"
                placeholder="********"
                onChange={onChangePassword}

              />
            </FormGroup>
          <Button 
            color="success"
            outline>
                LOG IN
            </Button>
        </Form>
         </div>
      </div>
    );
 

}
 
export default Login;