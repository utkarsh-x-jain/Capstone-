import { analyzeMessage } from "./analyze";
import { getAIExplanation } from "./ai";

export async function finalAnalyze(message, source) {
  const basic = analyzeMessage(message, source);

  let aiText = "";

  try {
    aiText = await getAIExplanation(message, basic.score);
  } catch {
    aiText = "AI unavailable.";
  }

  
  let confidence = "Medium";
  if (message.length > 100 && source === "verified") confidence = "High";
  else if (message.length < 30) confidence = "Low";

  return {
    score: basic.score,
    risk: basic.risk,
    reasons: basic.reasons,
    confidence,
    ai_explanation: aiText || "No explanation",
    timestamp: new Date().toISOString(),
  };
}