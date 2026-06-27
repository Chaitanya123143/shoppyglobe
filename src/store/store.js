import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import searchReducer from './searchSlice';
import userReducer from './userSlice'; // Make sure this line exists!

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    user: userReducer, // Make sure this is added!
  }
});