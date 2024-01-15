import axios from "axios";
import axiosInterceptor from "../Interceptors/Interceptors";
import {
  editUserData,
  editUserLoading,
  editUserError,
} from "../../ReduxToolkit/userSlice/userSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

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

export const fetchUsers = createAsyncThunk("data/fetchData", async () => {
  const response = await axiosInterceptor.get(`/userData/getAllUsers`);
  return response.data;
});

export const deleteUser = (Id) => {
  return async (dispatch) => {
    try {
      const response = await axiosInterceptor.delete(
        `/userData/deleteUser/${Id}`
      );

      // console.log(response, "aswer");
      dispatch(fetchUsers());
    } catch (error) {
      console.log("fecing", error);
    }
  };
};

export const postUserCred = (userCredentials) => {
  console.log(userCredentials);
  return async (dispatch) => {
    try {
      const response = await axiosInterceptor.post(
        `/userData/addUser`,
        userCredentials
      );

      console.log("done it");
      console.log(response);
      // dispatch(addUserToTable(userCredentials));
      dispatch(fetchUsers());
    } catch (error) {
      console.log("felchcing", error);
    }
  };
};

export const updateUser = (userCredentials) => {
  const { userId, userUpdatedRow } = userCredentials;

  return async (dispatch) => {
    try {
      const response = await axiosInterceptor.put(
        `/userData/editUser/${userId}`,
        userUpdatedRow
      );
      dispatch(fetchUsers());
    } catch (error) {}
  };
};

export const fetchUser = (userId) => {
  return async (dispatch) => {
    dispatch(editUserLoading());
    try {
      const response = await axiosInterceptor.get(
        `/userData/getUser/${userId}`
      );
      console.log(response.data.data);
      dispatch(editUserData(response.data.data));
    } catch (error) {
      console.log(error);
      dispatch(editUserError(error));
    }
  };
};

// export const fetchUser = createAsyncThunk("data/fetchData", async () => {
//   const response = await axiosInterceptor.get(`/userData/getUser/${userId}`);
//   return response.data;
// });
