import { API_KEY } from '../config';
import { ProductData } from '../types';

export class GeminiService {
  static async analyzeProduct(productContext: string, userGoal: string): Promise<ProductData> {
    const prompt = `
      You are GoodCall, an AI-native food decision copilot.
      Analyze the following product scenario against the user's health goal.
      
      Product Context: "${productContext}"
      User Goal: "${userGoal}"

      Return a JSON object with this EXACT schema:
      {
        "name": "Product Name",
        "brand": "Brand Name",
        "verdict": "Short Punchy Verdict (Max 3 words)",
        "reason": "One sentence reasoning explaining why it fits or fails the '${userGoal}' goal.",
        "pros": ["Short Pro 1", "Short Pro 2"],
        "cons": ["Short Con 1", "Short Con 2"],
        "sentiment": "positive" | "negative" | "uncertain",
        "matchScore": number (0-100),
        "calories": number (estimate per serving),
        "price": "Estimated Price in ₹"
      }

      CRITICAL RULES:
      1. If the Product Context mentions "unclear", "blur", "unknown", or "spices", you MUST return sentiment: "uncertain", verdict: "Label Unclear", and set matchScore to 0. Explain that you cannot verify ingredients (like paprika) safely.
      2. If the product is high in sugar/additives and the goal is 'Gut Health' or 'Insulin', sentiment must be "negative".
      3. If the product is clean/healthy for the goal, sentiment must be "positive".
      4. Do NOT use markdown. Return ONLY raw JSON.
    `;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!text) throw new Error("No AI response");
      
      // Clean up markdown if present
      const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(jsonStr);

    } catch (error) {
      console.error("AI Analysis Failed", error);
      // Fallback for safety
      return {
        name: "Analysis Failed",
        brand: "System",
        image: "",
        verdict: "Network Error",
        reason: "Could not reach the AI reasoning engine. Please try again.",
        pros: [],
        cons: [],
        sentiment: "uncertain",
        confidence: 0,
        matchScore: 0,
        calories: 0,
        price: "0"
      };
    }
  }
}
