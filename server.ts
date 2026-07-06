import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Google GenAI to prevent crashes if key is missing during container builds
let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("⚠️ GEMINI_API_KEY environment variable is missing. App is running without live AI endpoints.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY_FOR_SAFETY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// REST API Health Endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Powerful Sales Consultation API using Gemini-3.5-flash with Structured Output schema
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, currentLeadState } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages history payload" });
    }

    const ai = getAiClient();
    
    // System Instruction to train the ultimate elite sales expert for Ansury AI Qatar
    const systemInstruction = `You are the Lead Executive Advisor at Ansury AI, Doha's premier real estate automation company.
Your persona is exceptionally warm, professional, culturally-fluent (expert in Qatari real estate context, GCC honorifics, and regional vocabulary like Doha, Lusail, Pearl Qatar, Msheireb), and an outstanding, high-performing sales qualifier.

Ansury AI's prime services:
1. Follow-up Nurture Sequences: Automating multi-day WhatsApp/Email followups for hot/warm leads to ensure higher conversion.
2. Database Reactivation: Crawling and launching reactivation campaigns on dormant CRM lead databases (reviving forgotten data).
3. Intelligent Document Ingestion & Processing (IDP): High-precision AI reading of landlord invoices, lease contracts, and tenant sheets.
4. Intelligent Lead Routing: Instant, smart distribution of incoming leads to the best brokers.

Your primary goal is to engage, consult, and qualify the user into scheduling a "Request 30-Minute Audit" slot.
Be friendly and professional. Support both English and Arabic. Respond in the language used by the user. If they write in Arabic, greet them with warm, respectful Qatari hospitality.

You are conversationally qualifying the user. Actively try to gather:
- Contact Person Name
- Firm / Company Name
- Email Address
- Phone Number
- Focus Area / Pain Point (e.g. follow-up delays, old leads, document entry overhead)
- Estimated Monthly Leads Volume
- Portals used (Property Finder, Qatar Living, etc.)

Extremely Important JSON Response Schema Guidance:
- Update 'leadData' with any newly extracted information from the user's latest message or context.
- Maintain existing keys from 'currentLeadState' if they are already filled. Do not erase them unless the user explicitly updates them.
- Set 'justQualified' to true ONLY in the precise turn where you have successfully collected the Core Lead Details (at least Contact Name, Email or Phone, and Firm/Company Name) AND you are ready to trigger the system sync. Otherwise, set it to false.

Keep your 'reply' highly conversational, scannable, engaging, and elegant. Offer a free 30-minute operational audit slot once details are shared.`;

    // Convert messages history to Gemini SDK chat structure
    // Since we want to use generateContent with structured output, let's compile history
    const geminiContents = messages.map(msg => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content) }]
    }));

    // Append context of currentLeadState to guide the model about what is already known
    geminiContents.unshift({
      role: "user",
      parts: [{ text: `[SYSTEM CONTEXT: Current captured lead info is: ${JSON.stringify(currentLeadState || {})}. Continue the qualifying conversation without repeating questions for already filled fields. Introduce yourself if this is the first turn.]` }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: geminiContents,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: {
              type: Type.STRING,
              description: "The next chat response to the user. Use clear, encouraging, respectful language."
            },
            leadData: {
              type: Type.OBJECT,
              description: "The updated cumulative extracted lead info.",
              properties: {
                firmName: { type: Type.STRING, description: "Name of the real estate agency or developer." },
                contactPerson: { type: Type.STRING, description: "First and last name of the user." },
                email: { type: Type.STRING, description: "Their corporate or personal email." },
                phone: { type: Type.STRING, description: "Their WhatsApp or mobile number." },
                focusArea: { type: Type.STRING, description: "Focus or pain point, e.g. Drip Sequences, Document processing, CRM sync, Reactivation." },
                volume: { type: Type.STRING, description: "Monthly lead count estimate." },
                portals: { type: Type.STRING, description: "Portals used, e.g. Property Finder, Qatarliving." }
              }
            },
            justQualified: {
              type: Type.BOOLEAN,
              description: "True only if we just met core qualifying parameters (Name, Firm, and Contact Method) on this turn."
            }
          },
          required: ["reply"]
        }
      }
    });

    const outputText = response.text || "{}";
    const result = JSON.parse(outputText);
    return res.json(result);

  } catch (error) {
    console.error("Error in server-side AI chat endpoint:", error);
    return res.status(500).json({
      reply: "I apologize, but I encountered a momentary server routing issue while processing our consultation. Please ask your question again, or let me know if you would like to connect on WhatsApp directly!",
      leadData: req.body.currentLeadState || {},
      justQualified: false
    });
  }
});

// Vite Dev Server / Static Ingress handling
async function startViteV4() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Ansury AI full-stack server running on http://localhost:${PORT}`);
  });
}

startViteV4();
