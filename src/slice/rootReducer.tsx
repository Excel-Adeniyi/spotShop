import { combineReducers } from "@reduxjs/toolkit";
import { AuthSlice } from "./index.tsx";

const rootreducers = combineReducers({
  authSlice: AuthSlice,
});

export default rootreducers;
