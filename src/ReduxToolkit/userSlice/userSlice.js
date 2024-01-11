import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  list: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    makingOfList: (state, action) => {
      console.log("makingLIST");
      //  state.list=[...action.payload]
    },
  },
});

export const { increment, decrement, incrementByAmount, makingOfList } =
  counterSlice.actions;

export default counterSlice.reducer;
