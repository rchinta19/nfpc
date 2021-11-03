import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filter/filterSlice";
import DatesettingSlice from "../features/DatesettingSlice";
import loggingSlice from '../features/loggingHandler'
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    dataset: DatesettingSlice,
    userLog:loggingSlice
  },
});
