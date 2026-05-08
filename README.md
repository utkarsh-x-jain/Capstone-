# 🚨 Crisis Information Verifier & Prioritizer

## 📌 Project Overview
The **Crisis Information Verifier & Prioritizer** is a web application built using **React and JavaScript** that helps users evaluate the credibility of news or messages, especially during crisis situations.

It analyzes user input based on predefined rules (keywords, source reliability, and message structure) and provides:
- A **credibility score (0–100)**
- A **risk level (Low / Medium / High)**
- A **recommended action**

---

## 🎯 Objective
To reduce the spread of misinformation by helping users quickly assess whether a message is reliable or potentially fake.

---

## 🚀 Features

### 1. 📝 Input Message
- Users can paste any news or message for verification

### 2. 🌐 Source Selection
- Choose the source of the message:
  - Verified (official sources)
  - Unverified (unknown websites)
  - Social Media (WhatsApp, etc.)

### 3. 📊 Credibility Score
- Score range: **0 to 100**
- Based on:
  - Source reliability
  - Keyword detection
  - Message structure

### 4. 🚨 Risk Level
- **Low (70–100)** → Reliable  
- **Medium (30–70)** → Needs verification  
- **High (0–30)** → Likely fake  

### 5. 💡 Action Suggestion
- Low Risk → “Safe, but cross-check”
- Medium Risk → “Verify before sharing”
- High Risk → “Do NOT forward”

### 6. 📜 History Tracking
- Stores past verifications using **localStorage**
- Allows users to review previous results

---

## 🧠 Core Logic

### 🔍 Keyword Detection
Certain words reduce credibility:
- “urgent”
- “breaking”
- “forward this”
- “share now”

### 🌐 Source Weighting
| Source Type   | Score |
|--------------|------|
| Verified     | +40  |
| Unverified   | +10  |
| Social Media | +5   |

### 🧾 Message Structure Analysis
- Proper sentence → +10  
- Excessive CAPS → -10  
- Very short/random → -10  

---

## 🧮 Scoring Formula

```js
score = sourceScore + structureScore - keywordPenalty
score = Math.max(0, Math.min(100, score))

## ⚙️ Tech Stack
  Frontend: React (Vite)
  Styling: Tailwind CSS
  Language: JavaScript (ES6+)
  Storage: LocalStorage (for history persistence)

## 👨‍💻 My Contribution (Person 1 - Frontend)
  Designed and implemented the complete UI using React + Tailwind
  Managed state (message, result, history)
  Built rule-based scoring logic
  Implemented history tracking using localStorage
  Added UX improvements:
    Input validation
    Disabled buttons
    Dynamic feedback
    Smooth UI interactions

## ▶️ How to Run
  npm install
  npm run dev

## 🔮 Future Improvements
  AI-based credibility analysis (OpenAI / Gemini)
  Backend integration for real-time verification
  Fact-check API integration
  Multi-language support

## 📌 Conclusion
  This project demonstrates how a simple rule-based system can help reduce misinformation by providing users with quick credibility insights and encouraging responsible information sharing.
