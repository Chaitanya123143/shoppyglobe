import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview } from '../store/reviewSlice'; // Uses your exact filename 'reviewSlice'

const ReviewSection = ({ productId }) => {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews?.productReviews?.[productId] || []);
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addReview({ productId, review: { id: Date.now(), text, user: "Chaitanya" } }));
    setText('');
  };

  return (
    <div style={{ marginTop: '20px', background: 'white', padding: '15px', border: '1px solid #e0e0e0' }}>
      <h4>Customer Reviews & Feedback</h4>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
        <input type="text" placeholder="Write a public review..." value={text} onChange={e => setText(e.target.value)} style={{ flex: 1, padding: '8px' }} />
        <button type="submit" style={{ background: '#ff9f00', border: 'none', padding: '8px 15px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Submit</button>
      </form>
      {reviews.map(r => <p key={r.id} style={{ fontSize: '0.9rem', background: '#f9f9f9', padding: '6px', margin: '4px 0' }}>💬 <strong>{r.user}:</strong> {r.text}</p>)}
    </div>
  );
};

export default ReviewSection;