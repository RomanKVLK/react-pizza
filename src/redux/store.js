import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Slices/filterSlice';

export const store = configureStore({
  reducer: { counter: counterReducer },
});
