"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function ListingsPage() {
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    fetchListings();
  }, []);

  async function fetchListings() {
    const { data } = await supabase.from('listings').select('*');
    setListings(data || []);
  }

  async function handleDelete(id: number) {
    if (confirm("Are you sure you want to delete this?")) {
      await supabase.from('listings').delete().eq('id', id);
      fetchListings();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">Available Services</h1>
          <Link href="/add-service" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg hover:shadow-blue-200">
            + Add Service
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h2>
              <p className="text-blue-600 text-lg font-bold mb-6">${item.price}</p>
              
              <div className="flex gap-3">
                <Link 
                  href={`/edit-service/${item.id}`} 
                  className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-2.5 rounded-xl font-semibold transition"
                >
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(item.id)} 
                  className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2.5 rounded-xl font-semibold transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}