import { useState, useEffect } from "react";
import { ShieldCheck, Clock, Trash2 } from "lucide-react";

export default function App() {

  // ================= STATE =================
  const [message, setMessage] = useState("");
  const [source, setSource] = useState("verified");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  // ================= LOAD HISTORY =================
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(savedHistory);
  }, []);

  // ================= SAVE HISTORY =================
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  // ================= ANALYZE FUNCTION =================
  const analyzeMessage = () => {

    // 🔥 NEW: empty input validation
    if (!message.trim()) {
      alert("Please enter a message");
      return;
    }

    let score = 30;

    // Keyword detection
    if (message.toLowerCase().includes("breaking")) {
      score += 20;
    }

    if (message.toLowerCase().includes("forward")) {
      score += 20;
    }

    if (message.toLowerCase().includes("urgent")) {
      score += 15;
    }

    // Source weight
    if (source === "unverified") {
      score += 20;
    }

    if (source === "social") {
      score += 10;
    }

    // Risk calculation
    let riskLevel = "Low";

    if (score > 70) {
      riskLevel = "High";
    } else if (score > 40) {
      riskLevel = "Medium";
    }

    const analysisResult = {
      message: message,
      score: score,
      risk: riskLevel,
      date: new Date().toLocaleTimeString()
    };

    setResult(analysisResult);

    // Update history
    setHistory((prev) => [analysisResult, ...prev]);

    // 🔥 NEW: clear input after analyze
    setMessage("");
  };

  // ================= CLEAR HISTORY =================
  const clearHistory = () => {
    setHistory([]);
  };

  // ================= UI =================
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#1a1f4f,_#000)] text-white flex items-center justify-center p-6">
      
      <div className="w-full max-w-6xl">

        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center mb-6 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-lg">
          
          <div className="flex items-center gap-3">
            
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-blue-500">
              <ShieldCheck size={20} />
            </div>

            <div>
              <h1 className="text-lg font-semibold">
                Crisis Verifier
              </h1>
              <p className="text-xs text-gray-400">
                Credibility Analysis Tool
              </p>
            </div>

          </div>

          <div className="text-sm bg-green-500/10 text-green-400 px-3 py-1 rounded-full flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Rule-Based Engine
          </div>

        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* ================= LEFT PANEL ================= */}
          <div className="md:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

            {/* TITLE */}
            <h2 className="text-lg font-semibold mb-2">
              Analyze Message
            </h2>

            <p className="text-sm text-gray-400 mb-4">
              Paste a message to verify credibility
            </p>

            {/* TEXTAREA */}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Paste suspicious message..."
              className="w-full h-32 p-4 rounded-xl bg-black/40 border border-white/10 text-sm outline-none focus:ring-2 focus:ring-purple-500"
            />

            {/* 🔥 NEW: Character Counter */}
            <p className="text-xs text-gray-400 mt-1 text-right">
              {message.length} characters
            </p>

            {/* SOURCE SELECT */}
            <div className="mt-5">

              <p className="text-sm text-gray-400 mb-2">
                Select source
              </p>

              <div className="grid grid-cols-3 gap-3">

                {["verified", "unverified", "social"].map((item) => (
                  
                  <div
                    key={item}
                    onClick={() => setSource(item)}
                    className={`p-4 rounded-xl cursor-pointer border transition-all duration-300 ${
                      source === item
                        ? "border-blue-500 bg-blue-500/10 scale-105"
                        : "border-white/10 bg-black/30 hover:scale-105"
                    }`}
                  >
                    <p className="capitalize font-medium">
                      {item}
                    </p>
                  </div>

                ))}

              </div>

            </div>

            {/* ANALYZE BUTTON */}
            <button
              onClick={analyzeMessage}
              disabled={!message.trim()}  // 🔥 NEW
              className={`mt-6 w-full py-3 rounded-xl transition ${
                message.trim()
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg hover:shadow-purple-500/40"
                  : "bg-gray-700 cursor-not-allowed"
              }`}
            >
              Analyze Credibility
            </button>

            {/* ================= RESULT ================= */}
            {result && (
              
              <div className="mt-6 p-5 bg-black/40 rounded-xl border border-white/10">

                {/* 🔥 NEW: Color-based risk */}
                <h2 className={`text-xl font-semibold ${
                  result.risk === "High"
                    ? "text-red-500"
                    : result.risk === "Medium"
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}>
                  Risk: {result.risk}
                </h2>

                {/* PROGRESS BAR */}
                <div className="w-full bg-gray-700 h-3 rounded mt-3">

                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded"
                    style={{ width: `${result.score}%` }}
                  />

                </div>

                <p className="mt-2 text-gray-300">
                  Score: {result.score}
                </p>

              </div>
            )}

          </div>

          {/* ================= RIGHT PANEL ================= */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">

              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Clock size={18} />
                History
              </h2>

              {history.length > 0 && (
                <button onClick={clearHistory}>
                  <Trash2 size={18} className="text-red-400 hover:scale-110 transition" />
                </button>
              )}

            </div>

            {/* HISTORY LIST */}
            {history.length === 0 ? (

              <p className="text-sm text-gray-400">
                No history yet
              </p>

            ) : (

              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">

                {history.map((item, index) => (

                  <div
                    key={index}
                    className="p-3 bg-black/30 rounded-lg border border-white/10"
                  >

                    <p className="text-xs text-gray-400">
                      {item.date}
                    </p>

                    <p className="text-sm truncate">
                      {item.message}
                    </p>

                    <p className="text-xs mt-1">
                      Risk: {item.risk}
                    </p>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>
    </div>
  );
}
