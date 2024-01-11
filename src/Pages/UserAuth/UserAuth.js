import axios from "axios";
import axiosInterceptor from "../Interceptors/Interceptors";
import makingOfList from "../../ReduxToolkit/userSlice/userSlice";

export const postUser = (userCredentials) => {
  console.log(userCredentials);
  return async (dispatch) => {
    try {
      const response = await axiosInterceptor.post(
        `/user/loginUser`,
        userCredentials
      );
      // dispatch(addUserToTable(userCredentials));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axiosInterceptor.get(`/userData/getAllUsers`);
      console.log(response, "aswer");
    } catch (error) {
      console.log("fecing", error);
    }
  };
};
