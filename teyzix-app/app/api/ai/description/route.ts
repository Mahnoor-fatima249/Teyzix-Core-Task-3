import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { title } = await req.json();
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `Write a professional, attractive product description for: ${title}`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return NextResponse.json({ description: response.text() });
}