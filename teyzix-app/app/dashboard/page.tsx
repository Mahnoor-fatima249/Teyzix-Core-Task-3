"use client";
import Link from 'next/link';
import ChatBox from '../components/ChatBox'; 

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/listings" className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-blue-600">Marketplace</h2>
          </Link>
          <Link href="/admin/bookings" className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-green-600">Bookings</h2>
          </Link>
          <Link href="/login" className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-purple-600">Account</h2>
          </Link>
        </div>

        {/* Messaging Section */}
        <ChatBox />
      </div>
    </div>
  );
}