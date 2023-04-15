import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
// 用来生成树
const store = configureStore({
    reducer,

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
