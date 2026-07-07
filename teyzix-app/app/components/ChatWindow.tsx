"use client";
import { useEffect, useState } from 'react';
// Adjusted import path: try app/lib which is a common location in App Router projects
// Try common paths for the supabase client. This avoids a hard TypeScript import error
// if the project uses a different path mapping (like @/lib or app/lib).
let supabase: any = null;
try {
  // default relative path from app/components -> app/lib
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  supabase = require('../lib/supabaseClient').supabase;
} catch (e1) {
  try {
    // alternative path if path aliases are set up
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    supabase = require('@/lib/supabaseClient').supabase;
  } catch (e2) {
    // leave supabase as null; component will handle absence
    supabase = null;
  }
}

export default function ChatWindow({ chatId }: { chatId: string }) {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!supabase) return; // supabase client not found

    // 1. Purane messages fetch karein
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });
      if (data) setMessages(data);
    };
    fetchMessages();

    // 2. Real-time listener (Jo aapne pucha tha)
    const channel = supabase.channel('realtime:messages')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'messages',
        filter: `chat_id=eq.${chatId}` 
      }, (payload: any) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [chatId]);

  return (
    <div>
      {messages.map((m) => <div key={m.id}>{m.content}</div>)}
      {/* Input box aur send button yahan aayega */}
    </div>
  );
}