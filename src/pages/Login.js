import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import useAuth from "../hooks/useAuth";

const axios = require("axios").default;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = useAuth();
  const headers = {
    Accept: "application/json",
    "content-type": "application/x-www-form-urlencoded",
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const body = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        qs.stringify(body),
        headers
      );
      const data = await response.data;

      if (data.access_token) {
        await auth.login(response.data);

        navigate(`/profile`, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <Button color="success" outline>
            LOG IN
          </Button>
        </Form>
        <a href="/@{/oauth2/authorization/google}">Login with Google</a>
      </div>
    </div>
  );
};

export default Login;
