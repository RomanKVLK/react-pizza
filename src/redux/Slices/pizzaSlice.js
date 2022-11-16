import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizza = createAsyncThunk('pizza/fetchPizzaStatus', async (params) => {
  const { search, currentPage, sortBy, categoryId } = params;
  const { data } = await axios.get(
    `https://635eb78303d2d4d47af4dab0.mockapi.io/pizzas?limit=8&page=${currentPage}&${
      categoryId > 0 ? `category=${categoryId}` : ''
    }&sortBy=${sortBy}&order=desc${search}`,
  );
  return data;
});

const initialState = {
  items: [],
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
