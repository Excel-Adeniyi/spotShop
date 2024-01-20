import { configureStore } from "@reduxjs/toolkit";
import rootreducers from "../slice/rootReducer.tsx";

const store = configureStore({
  reducer: rootreducers,
//   middleware(getDefaultMiddleware) {},
})

export default store