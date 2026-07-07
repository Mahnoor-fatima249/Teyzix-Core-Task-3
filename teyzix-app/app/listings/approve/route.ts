import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PATCH(req: Request) {
  const { listingId, status } = await req.json();
  const { data, error } = await supabase
    .from('listings')
    .update({ status: status }) // status 'approved' ya 'rejected' dynamic hoga
    .eq('id', listingId);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ message: "Success" });
}