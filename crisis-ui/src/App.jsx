import { useState, useEffect } from "react";
import { analyzeMessage as analyzeLogic } from "./logic/analyze";

function App() {
  const [message, setMessage] = useState("");
  const [source, setSource] = useState("verified");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(savedHistory);
  }, []);

  
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  
  const getAdvice = (risk) => {
    if (risk === "High") return "Do NOT share ❌";
    if (risk === "Medium") return "Verify before sharing ⚠️";
    return "Safe to consider ✅";
  };

  
  const getConfidence = (message, source) => {
    if (message.length > 100 && source === "verified") return "High";
    if (message.length < 30) return "Low";
    return "Medium";
  };

  
  const analyzeMessage = () => {
    if (!message.trim()) {
      alert("Please enter a message");
      return;
    }

    const resultData = analyzeLogic(message, source);

    const analysisResult = {
      message,
      score: resultData.score,
      risk: resultData.risk,
      reasons: resultData.reasons,
      confidence: getConfidence(message, source),
      date: new Date().toLocaleTimeString(),
    };

    setResult(analysisResult);
    setHistory((prev) => [analysisResult, ...prev]);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">
        Crisis Information Verifier
      </h1>

      
      <textarea
        className="w-full p-3 text-black rounded mb-3"
        placeholder="Paste your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <select
        className="p-2 text-black rounded mb-3"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      >
        <option value="verified">Verified</option>
        <option value="unverified">Unverified</option>
        <option value="social">Social Media</option>
      </select>

      <button
        onClick={analyzeMessage}
        disabled={!message.trim()}
        className="bg-blue-600 px-4 py-2 rounded disabled:opacity-50"
      >
        Analyze
      </button>

      {!result && (
  <p className="text-gray-400 mt-4">
    No analysis yet. Enter a message above.
  </p>
)}


{result && (
  <div className="mt-6 p-5 bg-gray-800 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-3">Result</h2>

    
    <p className="text-2xl font-bold mb-2">
      Score: {result.score}
    </p>

    
    <p
      className={
        result.risk === "High"
          ? "text-red-500 font-semibold"
          : result.risk === "Medium"
          ? "text-yellow-400 font-semibold"
          : "text-green-400 font-semibold"
      }
    >
      Risk Level: {result.risk}
    </p>

    
    <p className="mt-2 text-sm">
      Confidence:{" "}
      <span className="font-semibold">{result.confidence}</span>
    </p>

    
    <p className="mt-2 font-semibold text-blue-300">
      Advice: {getAdvice(result.risk)}
    </p>

    
    {result.reasons && result.reasons.length > 0 && (
      <div className="mt-4 text-sm text-gray-300">
        <p className="font-semibold mb-1">Why this result:</p>
        <ul className="list-disc ml-5 space-y-1">
          {result.reasons.map((reason, i) => (
            <li key={i}>{reason}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
)}

      
      {history.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">History</h2>

          {history.map((item, index) => (
            <div key={index} className="bg-gray-700 p-3 mb-2 rounded">
              <p className="text-sm">{item.message}</p>
              <p className="text-xs">
                Score: {item.score} | Risk: {item.risk}
              </p>
              <p className="text-xs text-gray-400">
                {item.date}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;