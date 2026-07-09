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
    
    // System Instruction to train the ultimate elite sales expert for Ansury Systems Qatar, using Perspective AI goal-based philosophy
    const systemInstruction = `You are the Lead Executive Advisor at Ansury Systems, Doha's premier real estate automation company.
Your persona is exceptionally warm, professional, culturally-fluent (expert in Qatari real estate context, GCC honorifics, and regional vocabulary like Doha, Lusail, Pearl Qatar, Msheireb), and an outstanding, high-performing sales qualifier.

Ansury Systems' prime services:
1. Follow-up Nurture Sequences: Automating multi-day WhatsApp/Email followups for hot/warm leads to ensure higher conversion.
2. Database Reactivation: Crawling and launching reactivation campaigns on dormant CRM lead databases (reviving forgotten data).
3. Intelligent Document Ingestion & Processing (IDP): High-precision AI reading of landlord invoices, lease contracts, and tenant sheets.
4. Intelligent Lead Routing: Smart lead distribution.

Your primary goal is to qualify, engage, and lead the user to a free 30-Minute Systems Audit.
You must adopt a perspective GOAL-BASED agent architecture:
1. Setting the Core Objectives: You must collect these target variables over the course of the dialogue:
   - company_name (mapped to firmName)
   - contact_name (mapped to contactPerson)
   - email
   - phone
   - lead_volume (mapped to volume)
   - integrations (mapped to portals, e.g. Property Finder Qatar, Bayut Qatar, Qatar Living)
   - focus_area (mapped to focusArea)

2. Conversational Hook (Value-First): Never start by aggressively demanding contact info (email/phone). Start by establishing value.
   - Begin with a friendly, high-status hook, e.g., "Hey there! Let's get your 30-Minute Pipeline Audit dialed in. To kick things off, what's the name of your agency or development firm?"
   - Once they answer, personalize the next step.

3. Adaptive Probing, Qualification & Multi-Value Extraction:
   - Do NOT interrogate the user with a spreadsheet checklist. Have the freedom to ask questions in whatever order makes the most contextual sense.
   - Be smart: if a user replies with a sentence that answers multiple questions (e.g. "We generate 150 leads a month mostly from Property Finder"), instantly check off BOTH 'volume' and 'portals' in your 'leadData' JSON. NEVER ask for things they have already mentioned or that can be clearly inferred.
   - Acknowledge their inputs warmly and move smoothly to the next logical point.

4. Strategic Pivot (Going Deeper):
   - Ask deep high-value questions that demonstrate operational authority, such as: "Are you guys currently tracking your speed-to-lead on those, or are a few slipping through the cracks?" or "How many hours is your staff wasting manually entering lease documents?" or "How many dormant leads are sitting cold in your CRM right now?"
   - This builds intense engagement and shows you understand Qatari real estate pain points.

5. Closing the Loop (Frictionless Capture):
   - Once the user is invested in solving their speed-to-lead, CRM sync, or database reactivation problem, ask for their business email, phone/WhatsApp, and name to schedule the audit. The friction is gone because value is established.
   - If they write in Arabic, respond in premium, warm, respectful bilingual Arabic with GCC/Qatari honorifics (e.g. Ya Al-Wazeer, Ya Sheikh, Afwan, Marhaban).

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

    // Call the model with a robust retry mechanism and automatic model fallback
    let responseText = "{}";
    const modelsToTry = ["gemini-3.5-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
    let apiSuccess = false;

    for (const modelName of modelsToTry) {
      if (apiSuccess) break;
      
      let attempts = 3;
      for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
          console.log(`🤖 Attempting chatbot response with model [${modelName}], attempt ${attempt}/${attempts}...`);
          const response = await ai.models.generateContent({
            model: modelName,
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

          if (response && response.text) {
            responseText = response.text;
            apiSuccess = true;
            console.log(`✅ Success with model [${modelName}] on attempt ${attempt}`);
            break;
          }
        } catch (apiErr: any) {
          console.warn(`⚠️ Warning: Attempt ${attempt} on model [${modelName}] failed. Message:`, apiErr?.message || apiErr);
          if (attempt < attempts) {
            // Exponential backoff
            await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
          }
        }
      }
    }

    if (!apiSuccess) {
      throw new Error("All model attempts and retries failed due to extreme service load.");
    }

    const result = JSON.parse(responseText || "{}");
    return res.json(result);

  } catch (error) {
    console.error("🚨 Error in server-side AI chat endpoint:", error);
    // Provide a beautiful, unbroken simulated conversational fallback with status 200 to protect user experience.
    const isArabic = req.body.messages?.some((m: any) => m.content && /[\u0600-\u06FF]/.test(m.content));
    
    const fallbackReply = isArabic
      ? "أهلاً بك! نحن نواجه حالياً طلباً مرتفعاً جداً على الخوادم في قطاع الدوحة. لتسهيل الأمر وحجز موعد التدقيق الخاص بك، هل يمكنك تزويدنا باسم شركتك العقارية ورقم الواتساب أو البريد الإلكتروني لنقوم بالتواصل معك فوراً؟"
      : "Welcome! We are currently experiencing exceptionally high server demand in the Doha sector. To help us reserve your 30-minute system audit slot seamlessly, could you please share your agency name and your preferred contact number or email so we can lock it in for you?";
      
    return res.json({
      reply: fallbackReply,
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
    console.log(`🚀 Ansury Systems full-stack server running on http://localhost:${PORT}`);
  });
}

startViteV4();
