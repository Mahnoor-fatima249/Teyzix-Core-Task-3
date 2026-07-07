"use client";
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client using public env vars
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function ReviewForm({ listingId }: { listingId: string }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const submitReview = async () => {
    try {
      const { error } = await supabase.from('reviews').insert([{ listing_id: listingId, rating, comment }]);
      if (error) throw error;
      alert('Review Submitted!');
      setRating(5);
      setComment('');
    } catch (err) {
      console.error(err);
      alert('Failed to submit review');
    }
  };

  return (
    <div className="p-4 border">
      <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(Number(e.target.value))} />
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a review..." />
      <button onClick={submitReview}>Submit</button>
    </div>
  );
}