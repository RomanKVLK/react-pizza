import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

// type FetchPizzasArgs = {
//   search: string;
//   currentPage: string;
//   sortBy: string;
//   categoryId: string;
// };

export const fetchPizza = createAsyncThunk<Pizza[], Record<string, string>>('pizza/fetchPizzaStatus', async (params) => {
  const { search, currentPage, sortBy, categoryId } = params;
  const { data } = await axios.get<Pizza[]>(
    `https://635eb78303d2d4d47af4dab0.mockapi.io/pizzas?limit=8&page=${currentPage}&${
      categoryId ? `category=${categoryId}` : ''
    }&sortBy=${sortBy}&order=desc${search}`,
  );
  return data;
});

type Pizza = {
  id: string; 
  title: string;
  price: number; 
  imageUrl: string; 
  sizes: number[]; 
  types: number[];
}

interface PizzaSliceState {
  items: Pizza[];
  status: 'loading' | 'success' | 'error';
}

const initialState: PizzaSliceState = {
  items: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizza.pending, (state, action) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchPizza.rejected, (state, action) => {
      state.status = 'error';
      state.items = [];
    });
  },
});

export const selectCart = (state: RootState) => state.cart;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
