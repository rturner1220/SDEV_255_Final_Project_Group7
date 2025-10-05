import { configureStore } from '@reduxjs/toolkit';
import courses from "./courseSlice"

const store = configureStore({
  reducer: { courses },
});

export default store;
