"use client";
import { useState } from 'react';

export default function ChatBox() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    { role: 'assistant', content: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessages([...updatedMessages, { role: 'assistant', content: data.content }]);
      } else {
        setMessages([...updatedMessages, { role: 'assistant', content: "Error: AI response failed." }]);
      }
    } catch (e) {
      setMessages([...updatedMessages, { role: 'assistant', content: "Error: Connection failed." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-900">AI Support Chat</h2>
      
      <div className="h-60 overflow-y-auto border-b mb-4 p-2 bg-gray-50 rounded space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`p-2 rounded w-fit text-sm ${m.role === 'user' ? 'bg-blue-600 text-white ml-auto' : 'bg-gray-200 text-gray-900'}`}>
            {m.content}
          </div>
        ))}
        {loading && <p className="text-xs text-gray-500 italic">AI is typing...</p>}
      </div>

      <div className="flex gap-2">
        <input 
          className="border p-2 rounded-lg w-full outline-none text-gray-900" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Ask something..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend} 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
}