"use client";
export default function FilterBar({ onFilterChange }: { onFilterChange: (f: any) => void }) {
  return (
    <div className="flex gap-4 p-4 border-b">
      <input type="text" placeholder="Search..." onChange={(e) => onFilterChange({ keyword: e.target.value })} />
      <select onChange={(e) => onFilterChange({ category: e.target.value })}>
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="services">Services</option>
      </select>
      {/* Isi tarah Location, Price, Rating ke liye dropdowns */}
    </div>
  );
}