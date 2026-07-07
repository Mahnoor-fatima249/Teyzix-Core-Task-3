import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Groq API call with the active model
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // Updated to the current active model
        messages: messages,
      }),
    });

    const data = await response.json();
    
    // Check if the response is successful
    if (!response.ok) {
        return NextResponse.json({ content: "Groq Error: " + (data.error?.message || "Unknown error") });
    }

    // Return the assistant's message
    return NextResponse.json({ content: data.choices[0].message.content });
    
  } catch (error) {
    return NextResponse.json({ content: "Server Error: Connection failed." });
  }
}