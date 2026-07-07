"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AddService() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('listings')
      .insert([{ title: title, price: parseFloat(price) }]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      router.push('/listings');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white-50 p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Add New Service</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Service Title</label>
            <input 
              type="text" 
              required 
              placeholder="e.g., Web Development"
              onChange={(e) => setTitle(e.target.value)}
              // Text color ko dark aur placeholder ko light gray kiya gaya hai
              className="w-full p-4 border border-gray-200 rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($)</label>
            <input 
              type="number" 
              required 
              placeholder="120"
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition" 
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all transform hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Service"}
          </button>
        </form>
      </div>
    </div>
  );
}