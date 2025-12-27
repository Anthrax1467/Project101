
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async generateListingDescription(title: string, category: string, region: string) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a compelling, professional description for a "${category}" titled "${title}" in ${region} for a Nepali diaspora audience. Under 100 words.`,
      });
      return response.text || "Description generated.";
    } catch (error) {
      return "An error occurred.";
    }
  },

  async generateBusinessTagline(name: string, description: string) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a catchy, professional 1-line tagline for a Nepali diaspora business called "${name}". 
        Context: ${description}. 
        Keep it under 10 words. Focus on trust and community.`,
      });
      return response.text?.trim() || "Quality Services for our Community.";
    } catch (error) {
      return "Professional Diaspora Services.";
    }
  },

  async polishBlogContent(title: string, content: string) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are an editor for a Nepali diaspora community blog. Please polish the following blog post titled "${title}". 
        Improve the grammar, flow, and storytelling while keeping the authentic personal voice of the author. 
        Ensure it sounds welcoming and community-focused. 
        
        Content:
        ${content}`,
      });
      return response.text || content;
    } catch (error) {
      console.error("Gemini Polish Error:", error);
      return content;
    }
  },

  async evaluateBlogAuthenticity(title: string, content: string): Promise<{ score: number, isGeneral: boolean }> {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this Nepali diaspora blog post for quality and authenticity.
        
        Rules:
        1. "General" topics are generic advice, short listicles, or surface-level info (e.g., "Top 5 things to do").
        2. "Authentic/Deep" topics include personal stories, complex diaspora challenges, unique community insights, or high-effort guides.
        
        Return a JSON object: { "score": 0-100, "isGeneral": true/false }
        
        Title: ${title}
        Content: ${content}`,
        config: {
          responseMimeType: "application/json"
        }
      });
      
      const res = JSON.parse(response.text || '{"score": 0, "isGeneral": true}');
      return res;
    } catch (error) {
      return { score: 0, isGeneral: true };
    }
  },

  async scoreListingImpact(title: string, description: string): Promise<number> {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Score the helpfulness and community impact of this marketplace listing from 0 to 100.
        Consider: Completeness of information, clarity, and trust-building details.
        Return ONLY the number.
        
        Title: ${title}
        Description: ${description}`,
      });
      const score = parseInt(response.text?.trim() || "0");
      return isNaN(score) ? 0 : score;
    } catch (error) {
      return 0;
    }
  },

  async getCityInsights(city: string) {
    try {
      const prompt = `Provide high-level neighborhood context for Nepali/South East Asian expats moving to ${city}. 
      Mention:
      1. Popular diaspora hubs/neighborhoods.
      2. General rental cost context.
      3. Proximity to local Nepali grocery stores or community centers.
      4. A brief safety summary.
      Keep it in bullet points and very concise.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          tools: [{ googleMaps: {} }],
        },
      });

      const text = response.text || "Neighborhood insights unavailable.";
      const mapsSources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      
      return { text, mapsSources };
    } catch (error) {
      console.error("Maps Grounding Error:", error);
      return { text: "Location data could not be fetched.", mapsSources: [] };
    }
  },

  async searchFlights(origin: string, destination: string, preferredCurrencyCode: string = 'USD') {
    try {
      const prompt = `Find live flight deals from ${origin} to ${destination}. 
      I need exactly:
      - 5 cheapest Economy/Budget flights
      - 5 most expensive/premium Business or First Class flights
      
      For each flight, list:
      1. Airline Name
      2. Price in ${preferredCurrencyCode}
      3. Flight Class (Economy or Business/First)
      4. A link to the official site or booking page.
      
      Divide your response into two clear sections: ### BUDGET_FLIGHTS and ### PREMIUM_FLIGHTS.
      Focus on routes frequently used by the Nepali diaspora.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { tools: [{ googleSearch: {} }] },
      });

      return { 
        text: response.text, 
        sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [] 
      };
    } catch (error) {
      console.error("Search Flights Error:", error);
      return { text: "Error fetching flight deals.", sources: [] };
    }
  },

  async searchTravelDeals(origin: string, destination: string, preferredCurrencyCode: string = 'USD') {
    try {
      const prompt = `Search for flight deals from ${origin} to ${destination}. 
      Divide response into ### VALUE_DEALS and ### PREMIUM_DEALS sections. 
      Include Airline, Price in ${preferredCurrencyCode}, and booking URL.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { tools: [{ googleSearch: {} }] },
      });

      return { text: response.text, sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [] };
    } catch (error) {
      return { text: "Error fetching deals.", sources: [] };
    }
  }
};
