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

// Helper: Extractor for clean JSON from Markdown code blocks or direct strings
function parseCleanJson(text: string) {
  let cleanText = text.trim();
  if (cleanText.startsWith("```")) {
    const match = cleanText.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
    if (match) {
      cleanText = match[1].trim();
    }
  }
  return JSON.parse(cleanText);
}

// Helper: Format message history to alternate roles cleanly (prevents API validation errors)
function formatAlternativeMessages(messages: any[], systemInstruction: string, currentLeadState: any) {
  const result: { role: string; content: string }[] = [];
  
  let firstUserText = `[SYSTEM CONTEXT: Current captured lead info is: ${JSON.stringify(currentLeadState || {})}. Continue the qualifying conversation without repeating questions for already filled fields. Introduce yourself if this is the first turn.]`;
  
  const historyCopy = [...messages];
  if (historyCopy.length > 0 && historyCopy[0].role === "user") {
    const firstMsg = historyCopy.shift();
    firstUserText += `\n\nUser message: ${firstMsg.content}`;
  }
  
  result.push({ role: "user", content: firstUserText });
  
  for (const msg of historyCopy) {
    const role = msg.role === "assistant" ? "assistant" : "user";
    const lastMsg = result[result.length - 1];
    if (lastMsg && lastMsg.role === role) {
      lastMsg.content += `\n\n${msg.content}`;
    } else {
      result.push({ role, content: msg.content });
    }
  }
  
  return result;
}

// Helper: OpenRouter Fetch Call
async function callOpenRouter(messages: any[], systemInstruction: string, currentLeadState: any): Promise<any> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY is not configured.");

  const model = process.env.OPENROUTER_MODEL || "anthropic/claude-3.5-sonnet";
  console.log(`🔌 [OpenRouter] Directing request to OpenRouter model [${model}]...`);

  const formatted = formatAlternativeMessages(messages, systemInstruction, currentLeadState);

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": process.env.APP_URL || "https://ansury.ai",
      "X-Title": "Ansury Systems AI"
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemInstruction },
        ...formatted
      ],
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter API error (${response.status}): ${errorText}`);
  }

  const json = await response.json();
  const content = json.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OpenRouter response did not contain content.");
  }

  return parseCleanJson(content);
}

// Helper: Anthropic Fetch Call
async function callAnthropic(messages: any[], systemInstruction: string, currentLeadState: any): Promise<any> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not configured.");

  const model = process.env.ANTHROPIC_MODEL || "claude-3-5-sonnet-latest";
  console.log(`🔌 [Anthropic] Directing request to Anthropic model [${model}]...`);

  const formatted = formatAlternativeMessages(messages, systemInstruction, currentLeadState);

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model,
      max_tokens: 1500,
      system: systemInstruction,
      messages: formatted
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Anthropic API error (${response.status}): ${errorText}`);
  }

  const json = await response.json();
  const content = json.content?.[0]?.text;
  if (!content) {
    throw new Error("Anthropic response did not contain text.");
  }

  return parseCleanJson(content);
}

// Helper: OpenAI Fetch Call
async function callOpenAI(messages: any[], systemInstruction: string, currentLeadState: any): Promise<any> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured.");

  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  console.log(`🔌 [OpenAI] Directing request to OpenAI model [${model}]...`);

  const formatted = formatAlternativeMessages(messages, systemInstruction, currentLeadState);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemInstruction },
        ...formatted
      ],
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
  }

  const json = await response.json();
  const content = json.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OpenAI response did not contain content.");
  }

  return parseCleanJson(content);
}

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

    // Try alternative models if configured by the user in order of preference
    let finalResult: any = null;

    if (process.env.OPENROUTER_API_KEY) {
      try {
        finalResult = await callOpenRouter(messages, systemInstruction, currentLeadState);
        console.log("✅ Success response retrieved from OpenRouter!");
      } catch (err: any) {
        console.error("⚠️ OpenRouter call failed:", err?.message || err);
      }
    }

    if (!finalResult && process.env.ANTHROPIC_API_KEY) {
      try {
        finalResult = await callAnthropic(messages, systemInstruction, currentLeadState);
        console.log("✅ Success response retrieved from Anthropic!");
      } catch (err: any) {
        console.error("⚠️ Anthropic call failed:", err?.message || err);
      }
    }

    if (!finalResult && process.env.OPENAI_API_KEY) {
      try {
        finalResult = await callOpenAI(messages, systemInstruction, currentLeadState);
        console.log("✅ Success response retrieved from OpenAI!");
      } catch (err: any) {
        console.error("⚠️ OpenAI call failed:", err?.message || err);
      }
    }

    // Default Fallback to Gemini if no alternative succeeded or was configured
    if (!finalResult) {
      // Convert messages history to Gemini SDK chat structure
      const geminiContents = messages.map(msg => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content) }]
      }));

      // Append context of currentLeadState to guide the model about what is already known
      geminiContents.unshift({
        role: "user",
        parts: [{ text: `[SYSTEM CONTEXT: Current captured lead info is: ${JSON.stringify(currentLeadState || {})}. Continue the qualifying conversation without repeating questions for already filled fields. Introduce yourself if this is the first turn.]` }]
      });

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
              await new Promise((resolve) => setTimeout(resolve, 500 * attempt));
            }
          }
        }
      }

      if (!apiSuccess) {
        throw new Error("All model attempts and retries failed due to extreme service load.");
      }

      finalResult = JSON.parse(responseText || "{}");
    }

    return res.json(finalResult);

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
