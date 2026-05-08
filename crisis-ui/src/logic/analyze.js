export function analyzeMessage(message, source) {
  let score = 0;
  let reasons = [];

  if (!message || message.trim().length === 0) {
    return {
      score: 0,
      risk: "High",
      reasons: ["Empty message"],
    };
  }

  
  if (source === "verified") score += 40;
  else if (source === "unverified") {
    score += 15;
    reasons.push("Unverified source");
  } else {
    score += 5;
    reasons.push("Social media source");
  }

  
  const keywords = ["urgent", "breaking", "forward", "100% cure", "share now"];
  let hits = 0;

  keywords.forEach((word) => {
    if (message.toLowerCase().includes(word)) {
      hits++;
      reasons.push(`Suspicious keyword: "${word}"`);
    }
  });

  score -= Math.min(hits * 10, 20);

  
  const upperRatio =
    message.replace(/[^A-Z]/g, "").length / message.length;

  if (upperRatio > 0.6) {
    score -= 10;
    reasons.push("Excessive CAPITAL letters");
  }

  
  if (message.length < 20) {
    score -= 10;
    reasons.push("Message too short");
  } else if (message.length > 100) {
    score += 5;
  }

  
  if (/[.?!]/.test(message)) score += 10;
  else reasons.push("Poor sentence structure");

  
  score = Math.max(0, Math.min(100, score));

  
  let risk = "Low";
  if (score < 30) risk = "High";
  else if (score < 70) risk = "Medium";

  if (reasons.length === 0) {
    reasons.push("No major issues detected");
  }

  return { score, risk, reasons };
}