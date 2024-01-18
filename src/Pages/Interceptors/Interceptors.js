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
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTkzYWRkNGY1NDdmOTQ5MGEwZTk5MDkiLCJpYXQiOjE3MDUyOTM1MzYsImV4cCI6MTcwNTU1MjczNn0.BwkTh8b5rUDVbDdE_7THBXWuEe--aM3809vOq-urnAc
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
      localStorage.setItem("jwt_Token", response.data.token);
      window.location.href = "/Table";
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInterceptor;
