import { createSlice } from '@reduxjs/toolkit';

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: { productReviews: {} },
  reducers: {
    addReview: (state, action) => {
      const { productId, review } = action.payload;
      if (!state.productReviews[productId]) {
        state.productReviews[productId] = [];
      }
      state.productReviews[productId].push(review);
    }
  }
});

export const { addReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;