import { createSlice } from '@reduxjs/toolkit';

// Pull saved tracking items if browser cache exists
const initialSavedItems = JSON.parse(localStorage.getItem('sg_cart_items')) || [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: initialSavedItems },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('sg_cart_items', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('sg_cart_items', JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
      localStorage.setItem('sg_cart_items', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('sg_cart_items');
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;