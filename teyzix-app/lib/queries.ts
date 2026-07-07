import { supabase } from './supabase';

export async function getFilteredListings(filters: any) {
  let query = supabase.from('listings').select('*');

  if (filters.keyword) query = query.ilike('title', `%${filters.keyword}%`);
  if (filters.category) query = query.eq('category', filters.category);
  if (filters.location) query = query.eq('location', filters.location);
  if (filters.minPrice) query = query.gte('price', filters.minPrice);
  if (filters.rating) query = query.gte('rating', filters.rating);
  
  query = query.order('created_at', { ascending: false }); // Latest listings
  
  return await query;
}