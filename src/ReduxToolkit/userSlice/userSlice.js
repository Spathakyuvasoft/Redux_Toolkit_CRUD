import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../../Pages/UserAuth/UserAuth";

const initialState = {
  loading: false,
  error: null,
  data: null,
  emptyObject: {},
};

export const counterSlice = createSlice({
  name: "data/fetchData",
  initialState,
  reducers: {
    editUserData: (initialState, action) => {
      return {
        ...initialState,
        emptyObject: { ...action.payload },
      };
    },
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
  },
});

export const { editUserData } = counterSlice.actions;
export default counterSlice.reducer;
