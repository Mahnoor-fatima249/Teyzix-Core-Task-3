import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { userSkills } = await req.json(); // User ke skills se recommendation
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `Recommend 3 services for a user with these skills: ${userSkills}`;
  const result = await model.generateContent(prompt);
  return NextResponse.json({ recommendations: result.response.text() });
}