"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function BookingManagement() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    const { data } = await supabase
      .from('bookings')
      .select('*, listings(title, price)');
    setBookings(data || []);
  }

  async function updateStatus(id: number, status: string) {
    await supabase.from('bookings').update({ status }).eq('id', id);
    fetchBookings();
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Title section ka contrast badhaya */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Booking Management</h1>

      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 uppercase text-xs tracking-widest border-b border-gray-100">
              <th className="pb-6">Service Name</th>
              <th className="pb-6">Status</th>
              <th className="pb-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {bookings.length > 0 ? (
              bookings.map((b: any) => (
                <tr key={b.id} className="group hover:bg-gray-50 transition-colors">
                  <td className="py-6 font-semibold text-gray-800">{b.listings?.title || "Unknown"}</td>
                  <td className="py-6">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      b.status === 'Approved' ? 'bg-green-50 text-green-700' : 
                      b.status === 'Rejected' ? 'bg-red-50 text-red-700' : 
                      'bg-yellow-50 text-yellow-700'
                    }`}>
                      {b.status || 'Pending'}
                    </span>
                  </td>
                  <td className="py-6 flex gap-3">
                    <button 
                      onClick={() => updateStatus(b.id, 'Approved')} 
                      className="bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 shadow-md transition-all hover:scale-105"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => updateStatus(b.id, 'Rejected')} 
                      className="bg-white text-red-600 px-5 py-2 rounded-xl text-sm font-semibold border border-red-200 hover:bg-red-50 transition-all hover:scale-105"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-12 text-center text-gray-400 font-medium">No booking requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}