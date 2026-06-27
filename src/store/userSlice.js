import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    profile: null,
  },
  reducers: {
    mockLogin: (state) => {
      state.isAuthenticated = true;
      state.profile = { name: "Gedala Chaitanya", type: "Plus Member" };
    },
    mockLogout: (state) => {
      state.isAuthenticated = false;
      state.profile = null;
    // Add inside createSlice configuration under reducers:
toggleWishlist: (state, action) => {
  if (!state.wishlist) state.wishlist = [];
  const exists = state.wishlist.includes(action.payload);
  if (exists) {
    state.wishlist = state.wishlist.filter(id => id !== action.payload);
  } else {
    state.wishlist.push(action.payload);
  }
}}
    
  }
});

export const { mockLogin, mockLogout, toggleWishlist } = userSlice.actions;
export default userSlice.reducer;