"use client";
import { useState } from 'react';

export default function BookingForm({ listingId, userId }: { listingId: string, userId: string }) {
  const [date, setDate] = useState('');

  const submitBooking = async () => {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, listing_id: listingId, booking_date: date }),
    });
    if (res.ok) alert("Booking Requested!");
  };

  return (
    <div className="p-4 border rounded shadow">
      <input type="date" onChange={(e) => setDate(e.target.value)} className="border p-2" />
      <button onClick={submitBooking} className="bg-blue-600 text-white p-2 ml-2">Book Now</button>
    </div>
  );
}