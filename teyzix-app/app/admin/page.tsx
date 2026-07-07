"use client";
import { useState } from 'react';

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="p-4 border rounded shadow">Total Users: 150</div>
        <div className="p-4 border rounded shadow">Pending Bookings: 5</div>
        <div className="p-4 border rounded shadow">Active Listings: 40</div>
      </div>
      {/* Yahan listing approval/disapproval buttons aayenge */}
    </div>
  );
}