
import React, { useState, useEffect } from "react";
import { serverUrl } from "../App";
import FinalResult from "../Components/FinalResult";
import NavBar from "../Components/NavBar";

const Notes = () => {
  const [topic, setTopic] = useState("");
  const [classLevel, setclassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [includeCharts, setIncludeCharts] = useState(false);
  const [includeDiagrams, setIncludeDiagrams] = useState(false);
  const [revisionMode, setRevisionMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState("");

  useEffect(() => {
    if (!loading) return;

    let value = 0;

    const interval = setInterval(() => {
      value += Math.random() * 8;

      if (value >= 95) {
        value = 95;
        setProgressText("Almost Done...");
        clearInterval(interval);
      } else if (value > 75) {
        setProgressText("Finalizing notes...");
      } else if (value > 40) {
        setProgressText("Processing content...");
      } else {
        setProgressText("Generating notes...");
      }

      setProgress(Math.floor(value));
    }, 1000);

    return () => clearInterval(interval);
  }, [loading]);

  const handleGenerateNotes = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProgress(0);
    setProgressText("Generating notes...");

    try {
      const url = `${serverUrl}/api/gemini-result/generateGeminiResult`;

      const options = {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          classLevel,
          examType,
          revisionMode,
          includeCharts,
          includeDiagrams,
        }),
      };

      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate notes");
      }

      const generatedNotes = data.result;
     

      if (generatedNotes) {
        setResults(generatedNotes);
        setTopic("");
        setclassLevel("");
        setExamType("");
        setIncludeCharts(false);
        setRevisionMode(false);
        setIncludeDiagrams(false);
        setProgress(100);
        setProgressText("Completed!");
      }
    } catch (error) {
      console.error("Error generating notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleOptions = [
    {
      title: "Exam Revision Mode",
      description: "Focus on important exam topics and quick revision.",
      checked: revisionMode,
      onChange: setRevisionMode,
      icon: "🎯",
    },
    {
      title: "Include Diagrams",
      description: "Add visual explanations and concept diagrams.",
      checked: includeDiagrams,
      onChange: setIncludeDiagrams,
      icon: "📊",
    },
    {
      title: "Include Charts",
      description: "Generate charts and graphical representations.",
      checked: includeCharts,
      onChange: setIncludeCharts,
      icon: "📈",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#080d1a] text-white overflow-x-hidden">

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">

        <NavBar />

        {/* Hero Section */}
        <div className="text-center px-5 pt-12 pb-8 max-w-3xl">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-400/20 bg-blue-500/10 text-blue-300 text-xs sm:text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            AI POWERED LEARNING ASSISTANT
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Create Your
            <span className="block mt-2 text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-300 to-purple-400">
              Smart Study Notes
            </span>
          </h1>

          <p className="text-gray-400 mt-5 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Transform any topic into structured, exam-ready notes.
            Learn smarter with AI-generated explanations, diagrams and charts.
          </p>
        </div>

        {/* Main Form */}
        <form
          onSubmit={handleGenerateNotes}
          className="w-[92%] sm:w-[85%] lg:w-175 mb-12 p-5 sm:p-8 rounded-3xl border border-white/10 bg-white/4 backdrop-blur-xl shadow-2xl shadow-black/30"
        >

          {/* Form Heading */}
          <div className="mb-7">
            <h2 className="text-xl sm:text-2xl font-bold">
              📚 Customize Your Notes
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Enter your study details to get started.
            </p>
          </div>

          {/* Topic Input */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Study Topic
            </label>

            <input
              required
              type="text"
              placeholder="e.g. Web Development, Physics, Biology"
              className="w-full px-4 py-3.5 rounded-xl bg-[#111a2e] border border-white/10 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 hover:border-white/20"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          {/* Class Level */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Class / Education Level
            </label>

            <input
              required
              type="text"
              placeholder="e.g. Class 10, B.Tech, Class 12"
              className="w-full px-4 py-3.5 rounded-xl bg-[#111a2e] border border-white/10 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 hover:border-white/20"
              value={classLevel}
              onChange={(e) => setclassLevel(e.target.value)}
            />
          </div>

          {/* Exam Type */}
          <div className="mb-7">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Exam / Board
            </label>

            <input
              required
              type="text"
              placeholder="e.g. CBSE, JEE, NEET, University"
              className="w-full px-4 py-3.5 rounded-xl bg-[#111a2e] border border-white/10 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 hover:border-white/20"
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
            />
          </div>

          {/* Options */}
          <div className="mb-7">
            <h3 className="text-sm font-semibold text-gray-300 mb-4">
              Personalize Your Notes
            </h3>

            <div className="flex flex-col gap-3">

              {toggleOptions.map((option) => (
                <label
                  key={option.title}
                  className={`flex items-center justify-between gap-3 p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    option.checked
                      ? "bg-blue-500/10 border-blue-400/40"
                      : "bg-[#111a2e] border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 shrink-0 flex items-center justify-center rounded-xl bg-white/5 text-xl">
                      {option.icon}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-200">
                        {option.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {option.description}
                      </p>
                    </div>
                  </div>

                  <div className="relative shrink-0">
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={(e) => option.onChange(e.target.checked)}
                      disabled={loading}
                      className="peer sr-only"
                    />

                    <div className="w-12 h-6 rounded-full bg-gray-700 peer-checked:bg-blue-500 transition-colors duration-300" />

                    <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 peer-checked:translate-x-6" />
                  </div>
                </label>
              ))}

            </div>
          </div>

          {/* Generate Button */}
          <button
            disabled={loading}
            type="submit"
            className="group relative w-full py-4 rounded-xl font-bold text-white bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 shadow-lg shadow-blue-600/20 hover:shadow-blue-500/40 transition-all duration-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating Your Notes...
                </>
              ) : (
                <>
                  <span>✨</span>
                  Generate Smart Notes
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </>
              )}
            </span>
          </button>

          {/* Progress Bar */}
          {loading && (
            <div className="mt-6 p-4 rounded-xl bg-[#111a2e] border border-white/10">

              <div className="flex justify-between items-center mb-3 text-sm">
                <span className="text-gray-300">{progressText}</span>
                <span className="text-blue-400 font-bold tabular-nums">
                  {progress}%
                </span>
              </div>

              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-linear-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="text-xs text-gray-500 mt-3">
                Please wait while AI prepares your personalized study material.
              </p>
            </div>
          )}

          <p className="text-center text-xs text-gray-500 mt-5">
            ✨ Powered by AI • Designed for smarter learning
          </p>

        </form>

        {/* Results Section */}
        {results && (
          <div className="w-[95%] lg:w-[85%] max-w-7xl mb-12 rounded-3xl bg-white p-4 sm:p-8 shadow-2xl shadow-black/20">

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                🎓 Your Generated Notes
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Your personalized study material is ready.
              </p>
            </div>

            <FinalResult results={results} />

          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-gray-600 text-xs py-6">
          Made for smarter learning. Keep growing! 🚀
        </footer>

      </div>
    </div>
  );
};

export default Notes;
