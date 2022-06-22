import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/";

const getMemberBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "employees", { headers: authHeader() });
};
const UserService = {
  getMemberBoard,
  getAdminBoard,
};
export default UserService;