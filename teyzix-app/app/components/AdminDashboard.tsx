"use client";

export default function AdminDashboard({ listings }: { listings: any[] }) {
  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/listings/approve', {
      method: 'PATCH',
      body: JSON.stringify({ listingId: id, status }),
    });
    window.location.reload(); // Refresh to see changes
  };

  return (
    <div>
      {listings.map(l => (
        <div key={l.id} className="p-2 border flex justify-between">
          {l.title} - {l.status}
          <div>
            <button onClick={() => updateStatus(l.id, 'approved')} className="bg-green-500 text-white p-1">Approve</button>
            <button onClick={() => updateStatus(l.id, 'rejected')} className="bg-red-500 text-white p-1 ml-2">Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}