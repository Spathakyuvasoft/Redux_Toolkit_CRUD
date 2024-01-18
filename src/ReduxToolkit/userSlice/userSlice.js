import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, fetchUsers } from "../../Pages/UserAuth/UserAuth";

const initialState = {
  loading: false,
  error: null,
  data: null,
  userLoading: false,
  errorUser: null,
  emptyObject: {},
};

const counterSlice = createSlice({
  name: "data/fetchData",
  initialState,
  reducers: {
    // editUserLoading: (initialState, action) => {
    //   return {
    //     ...initialState,
    //     userLoading: true,
    //   };
    // },
    // editUserData: (initialState, action) => {
    //   return {
    //     ...initialState,
    //     emptyObject: { ...action.payload },
    //     userLoading: false,
    //   };
    // },
    // editUserError: (initialState, action) => {
    //   return {
    //     ...initialState,
    //     userLoading: false,
    //     errorUser: action.payload,
    //   };
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchUser.pending, (state, action) => {
      return {
        ...initialState,
        userLoading: true,
      };
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      return {
        ...initialState,
        emptyObject: { ...action.payload },
        userLoading: false,
      };
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      return {
        ...initialState,
        userLoading: false,
        errorUser: action.payload,
      };
    });
  },
});

export const { editUserData, editUserLoading, editUserError } =
  counterSlice.actions;
export default counterSlice.reducer;
