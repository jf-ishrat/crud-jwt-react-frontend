import axios from "axios";
import qs from "qs";

const API_URL = "http://localhost:8080/api/";

const headers = {
  'Accept' : 'application/json',
  'content-type' : 'application/x-www-form-urlencoded'
}

const login = (body) => {
  return axios
    .post(API_URL + "login", qs.stringify(body),headers)
    .then((response) => {
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
};
export default AuthService;
