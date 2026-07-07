"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ListingsPage() {
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      // Supabase se data fetch kar rahe hain
      const { data, error } = await supabase.from('listings').select('*');
      
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setListings(data || []);
      }
    }
    
    fetchData();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">My Marketplace Listings</h1>
      
      {listings.length === 0 ? (
        <p>No listings found. Add some from the database!</p>
      ) : (
        <ul className="grid gap-4">
          {listings.map((item) => (
            <li key={item.id} className="border p-5 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-600 mt-2">Price: ${item.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}