import Anthropic from "@anthropic-ai/sdk";
import type { Farm } from "../types/Farm";
import type { EnrichedEvent } from "../types/Event";
import { UtilService } from "./UtilService";

// API key is exposed in the client bundle — acceptable for a demo project only.
// In production, proxy this call through a server-side function.
const client = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
});

interface QueryContext {
  farms: Farm[];
  events: EnrichedEvent[];
}

export const QueryService = {
  async ask(question: string, context: QueryContext): Promise<string> {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      system: buildSystemPrompt(context),
      messages: [{ role: "user", content: question }],
    });
    const block = message.content[0];
    return block.type === "text" ? block.text : UtilService.he.queryFallback;
  },
};

function buildSystemPrompt(context: QueryContext): string {
  const { he } = UtilService;

  const farmsData = context.farms.map((f) => ({
    שם: f.name,
    סוג: f.type,
    חקלאי: f.farmer.name,
    מספר_אירועים: f.eventIds.length,
  }));

  const eventsData = context.events.map((e) => ({
    סוג: e.type,
    סטטוס: he.eventStatus[e.status as keyof typeof he.eventStatus] ?? e.status,
    חווה: e.farmName,
    נוצר: e.createdAt ? new Date(e.createdAt).toLocaleDateString("he-IL") : "",
  }));

  return `אתה עוזר חכם למערכת ניהול חוות חקלאיות. ענה תמיד בעברית בלבד, בצורה קצרה וברורה. הבהר שתפקידך הוא לספק מידע בלבד ולא לבצע פעולות.

נתוני החוות:
${JSON.stringify(farmsData, null, 2)}

נתוני האירועים:
${JSON.stringify(eventsData, null, 2)}`;
}
