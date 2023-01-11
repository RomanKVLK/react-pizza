import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza } from "./types";

export const fetchPizza = createAsyncThunk<Pizza[], Record<string, string>>('pizza/fetchPizzaStatus', async (params) => {
    const { search, currentPage, sortBy, categoryId } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://635eb78303d2d4d47af4dab0.mockapi.io/pizzas?limit=8&page=${currentPage}&${
        categoryId ? `category=${categoryId}` : ''
      }&sortBy=${sortBy}&order=desc${search}`,
    );
    return data;
  });

