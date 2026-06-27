import { createSlice } from '@reduxjs/toolkit';

const couponSlice = createSlice({
  name: 'coupon',
  initialState: { code: '', discountPercentage: 0, error: '' },
  reducers: {
    applyCoupon: (state, action) => {
      const inputCode = action.payload.toUpperCase();
      if (inputCode === 'SG20') {
        state.code = 'SG20';
        state.discountPercentage = 20; // 20% Off flat discount
        state.error = '';
      } else if (inputCode === 'FREESHIP') {
        state.code = 'FREESHIP';
        state.discountPercentage = 10; // 10% Off mock delivery coupon
        state.error = '';
      } else {
        state.error = 'Invalid Coupon Code!';
      }
    },
    removeCoupon: (state) => {
      state.code = '';
      state.discountPercentage = 0;
      state.error = '';
    }
  }
});

export const { applyCoupon, removeCoupon } = couponSlice.actions;
export default couponSlice.reducer;