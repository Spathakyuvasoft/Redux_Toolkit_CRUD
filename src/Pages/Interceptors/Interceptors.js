import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Table from "../component/Table/Table";
import makingOfList from "../../ReduxToolkit/userSlice/userSlice";

const axiosInterceptor = axios.create({
  baseURL: `http://localhost:8000/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInterceptor.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt_Token");
    console.log(token);
    if (token) {
      config.headers[
        "Authorization"
      ] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTlmOTAyZDRmNTRmMjZmY2Q4NTkzNDgiLCJpYXQiOjE3MDQ5NzMzNDQsImV4cCI6MTcwNTIzMjU0NH0.5jHO2d_1LtKXANOWnK9vKA-WIS6U3kg9gAf7SXF1tA4`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInterceptor.interceptors.response.use(
  (response) => {
    console.log(response);
    if (response.data.token) {
      console.log(response.data.token);
      localStorage.setItem("jwt_Token", response.data.token);
      console.log("push it to the router", localStorage.getItem("jwt_Token"));
      window.location.href = "/Table";
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInterceptor;
