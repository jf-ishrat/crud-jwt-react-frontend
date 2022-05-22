import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from "./services/auth.service";

const axios = require('axios').default;

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const headers = {
        'Accept' : 'application/json'
    }



    useEffect(()=>{

        const user = AuthService.getUser();
        if(!user){
            navigate('/');
        }
        

    },[]);

    const handleLogin = async (e)=>{

        e.preventDefault();

        const body = {email,password};

        if(email === 'gigatech@gmail.com' && password === 'gigatech'){
            await localStorage.setItem("user", JSON.stringify(body));
            await navigate('/home');
            navigate(0);

        }

     /*    try {
            const response = await axios.post("https://reqres.in/api/login", body, headers);
            console.log(response.data);
            const data = await response.data;

            if(data){
                await localStorage.setItem("user", JSON.stringify(data));
                navigate('/home');

            }

            
        } catch (error) {
            console.log(error);
            
        } */


        console.log(body);


    }
    return ( 
       <div className="create">
           <h2>Login Form</h2>
           <form onSubmit={handleLogin}>
               <label>
                   Email: 
               </label>
               <input
               type="text"
               required
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               />
                   <label>
                   Password: 
               </label>
               <input
               type="password"
               required
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               />

               <button>Login</button>

           </form>
       </div>
     );
}
 
export default Login;