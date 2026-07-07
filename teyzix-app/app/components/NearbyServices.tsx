"use client";

import { supabase } from "@/lib/supabase";

export default function NearbyServices({ userLocation }: { userLocation: any }) {
  // Supabase se location-based filter
  const fetchNearby = async () => {
    const { data } = await supabase
      .from('listings')
      .select('*')
      .eq('location', userLocation); // Yahan location filter use karein
  };
  return <div>Nearby services list...</div>;
}