"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, useParams } from 'next/navigation';

export default function EditServicePage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const serviceId = params.id;

  useEffect(() => {
    if (!serviceId) return;

    async function fetchService() {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', serviceId)
        .single();

      if (error) {
        console.error("Error fetching service:", error);
        alert("Could not find this service.");
        router.push('/listings');
      } else if (data) {
        setTitle(data.title);
        setPrice(data.price.toString());
      }
      setLoading(false);
    }
    fetchService();
  }, [serviceId, router]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase
      .from('listings')
      .update({ 
        title: title, 
        price: parseFloat(price) 
      })
      .eq('id', serviceId);

    if (error) {
      alert("Error updating service: " + error.message);
    } else {
      alert("Service updated successfully!");
      router.push('/listings'); // Listings page par wapas bhej dein
    }
    setSubmitting(false);
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      {/* Yeh hai woh "Akj Box" (white card) */}
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Edit Service</h1>
        
        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Title Input Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Service Title</label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-2xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-gray-900"
              required
            />
          </div>

          {/* Price Input Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($)</label>
            <input 
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-2xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition text-gray-900"
              required
            />
          </div>

          {/* Submit Button */}
          <button 
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all transform hover:scale-[1.02] disabled:opacity-50 shadow-md hover:shadow-lg"
          >
            {submitting ? "Updating..." : "Update Service"}
          </button>
          
          {/* Cancel Button */}
          <button 
            type="button"
            onClick={() => router.push('/listings')}
            className="w-full text-center text-gray-600 hover:text-gray-800 py-3 rounded-xl font-medium transition"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}