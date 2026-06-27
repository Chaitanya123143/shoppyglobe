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
    }
  }
});

export const { mockLogin, mockLogout } = userSlice.actions;
export default userSlice.reducer;