import axios from "axios";
import paramsSerializer from "./paramsSerializer";

const StudentsAPI = axios.create({
  baseURL: `http://spring.ddeby.pl/api/v1/`,
  paramsSerializer,
});

export default StudentsAPI;
