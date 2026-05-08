export async function getAIExplanation(message, score) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `
You are a misinformation detection assistant.

Credibility score: ${score}/100

Explain:
- Why message may be misleading
- Warning signals
- Final advice (trust / verify / avoid)

Message:
"${message}"

Keep it short (3–4 lines).
            `,
          },
        ],
      }),
    });

    clearTimeout(timeout);

    if (!res.ok) {
      return "AI service unavailable.";
    }

    const data = await res.json();

    return (
      data?.choices?.[0]?.message?.content ||
      "AI could not generate explanation."
    );
  } catch (err) {
    return "Error analyzing message.";
  }
}