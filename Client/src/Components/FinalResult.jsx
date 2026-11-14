
import Markdown from "react-markdown";
import MermaidSetup from "./MermaidSetup";
import { serverUrl } from "../App";
import ReChartSetUp from "./ReChartSetUp";

const markDownComponent = {
  h1: ({ children }) => (
    <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-700 mt-8 mb-5 pb-3 border-b-2 border-indigo-100">
      {children}
    </h1>
  ),

  h2: ({ children }) => (
    <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mt-7 mb-4">
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3 className="text-lg font-bold text-gray-800 mt-5 mb-3">
      {children}
    </h3>
  ),

  p: ({ children }) => (
    <p className="text-gray-600 leading-8 mb-4 text-[15px]">
      {children}
    </p>
  ),

  ul: ({ children }) => (
    <ul className="list-disc pl-6 text-gray-700 leading-8 mb-5 space-y-2 marker:text-indigo-500">
      {children}
    </ul>
  ),

  ol: ({ children }) => (
    <ol className="list-decimal pl-6 text-gray-700 leading-8 mb-5 space-y-2 marker:text-indigo-600">
      {children}
    </ol>
  ),

  li: ({ children }) => (
    <li className="pl-1">{children}</li>
  ),

  strong: ({ children }) => (
    <strong className="font-bold text-gray-900">{children}</strong>
  ),

  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-indigo-500 bg-indigo-50 px-5 py-3 my-5 rounded-r-xl text-gray-700">
      {children}
    </blockquote>
  ),

  table: ({ children }) => (
    <div className="w-full overflow-x-auto my-6 rounded-xl border border-gray-200">
      <table className="w-full border-collapse text-sm">
        {children}
      </table>
    </div>
  ),

  th: ({ children }) => (
    <th className="bg-indigo-50 border border-gray-200 p-3 text-left font-bold text-indigo-800">
      {children}
    </th>
  ),

  td: ({ children }) => (
    <td className="border border-gray-200 p-3 text-gray-700">
      {children}
    </td>
  ),

  code: ({ children }) => (
    <code className="bg-gray-100 text-indigo-700 px-1.5 py-1 rounded-md text-sm">
      {children}
    </code>
  ),
};

const FinalResult = ({ results }) => {
  console.log("results are", results)


  const handleDownloadPDF = async () => {
    try {
      const fetchUrl = `${serverUrl}/api/pdf/downloadPdf`;

      const response = await fetch(fetchUrl, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ result: results }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "study-notes.pdf";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("PDF Download Error:", error);
    }
  };

  if (!results) return null;

  const priorityColors = {
    High: "bg-red-50 text-red-700 border-red-200",
    Medium: "bg-amber-50 text-amber-700 border-amber-200",
    Low: "bg-green-50 text-green-700 border-green-200",
  };

  const QuestionCard = ({ item, index, type }) => (
    <div className="group bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300">

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg">
          {type} Question {index + 1}
        </span>

        <span className="text-sm font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
          {item.marks} Marks
        </span>
      </div>

      <h4 className="text-base sm:text-lg font-bold text-gray-800 leading-7 mb-4">
        {item.question}
      </h4>

      <div className="bg-green-50/70 border border-green-100 rounded-xl p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-green-700 mb-2">
          Answer
        </p>

        <p className="text-gray-700 leading-7 whitespace-pre-wrap">
          {item.answer}
        </p>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">

      {/* Header */}
      <div className="relative overflow-hidden bg-linear-to-br from-indigo-700 via-indigo-600 to-violet-600 rounded-3xl p-6 sm:p-9 shadow-xl">

        <div className="absolute -right-10 -top-16 w-64 h-64 bg-white/10 rounded-full blur-2xl" />

        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">

          <div>
            <span className="inline-block text-indigo-100 text-xs font-bold uppercase tracking-widest mb-3">
              Your Learning Workspace
            </span>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Generated Notes
            </h1>

            <p className="text-indigo-100 text-sm sm:text-base">
              Your study material, important topics and exam preparation guide.
            </p>
          </div>

          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-white text-indigo-700 hover:bg-indigo-50 font-bold px-5 py-3 rounded-xl shadow-lg transition-all duration-200 hover:-translate-y-1 whitespace-nowrap"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 16V4m0 12l-4-4m4 4l4-4M4 20h16"
              />
            </svg>
            Download PDF
          </button>

        </div>
      </div>

      {/* Notes */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-8">

        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 text-xl">
            📚
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Study Notes
            </h2>
            <p className="text-sm text-gray-500">
              Detailed explanations and learning material
            </p>
          </div>
        </div>

        <div className="prose max-w-none">
          <Markdown components={markDownComponent}>
            {results.notes || ""}
          </Markdown>
        </div>

      </section>

      {/* Diagram */}
      {results.diagram && (
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-8">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 text-xl">
              🧠
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Concept Diagram
              </h2>
              <p className="text-sm text-gray-500">
                Visual representation of the topic
              </p>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 overflow-x-auto">
            <MermaidSetup diagram={results.diagram} />
          </div>

        </section>
      )}

       <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 overflow-x-auto">
        <ReChartSetUp charts={results.charts}/>
      </div>

      {/* Subtopics */}
      {results.subtopics && (
        <section>

          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-gray-900">
              Important Subtopics
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Focus on these topics during your preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {Object.entries(results.subtopics).map(([starLevel, value]) => {

              const color =
                priorityColors[starLevel] ||
                "bg-indigo-50 text-indigo-700 border-indigo-200";

              return (
                <div
                  key={starLevel}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow"
                >

                  <div className="flex justify-between items-center mb-5">
                    <h3 className="font-bold text-gray-900 text-lg">
                      {starLevel} Priority
                    </h3>

                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${color}`}>
                      {starLevel}
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {value.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-gray-700 text-sm leading-6"
                      >
                        <span className="w-6 h-6 shrink-0 flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold">
                          {index + 1}
                        </span>

                        {item}
                      </li>
                    ))}
                  </ul>

                </div>
              );
            })}

          </div>
        </section>
      )}

      {/* Short Questions */}
      {results.questions?.short?.length > 0 && (
        <section>

          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-gray-900">
              Short Questions
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Practice concise answers for quick exam questions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {results.questions.short.map((item, index) => (
              <QuestionCard
                key={index}
                item={item}
                index={index}
                type="Short"
              />
            ))}
          </div>

        </section>
      )}

      {/* Long Questions */}
      {results.questions?.long?.length > 0 && (
        <section>

          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-gray-900">
              Long Questions
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Detailed questions for deeper exam preparation.
            </p>
          </div>

          <div className="space-y-5">
            {results.questions.long.map((item, index) => (
              <QuestionCard
                key={index}
                item={item}
                index={index}
                type="Long"
              />
            ))}
          </div>

        </section>
      )}

      {/* Diagram Questions */}
      {results.questions?.diagram && (
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center text-xl">
              ✏️
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              Diagram-Based Questions
            </h2>
          </div>

          <div className="text-gray-700 leading-8 whitespace-pre-wrap">
            {results.questions.diagram}
          </div>

        </section>
      )}

      {/* Revision Points */}
      {results.revisionPoints?.length > 0 && (
        <section className="bg-linear-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center text-xl">
              ⚡
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                Quick Exam Revision
              </h2>

              <p className="text-sm text-gray-600">
                Important points to remember before your exam.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {results.revisionPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white/80 border border-amber-100 rounded-xl p-4"
              >

                <span className="w-7 h-7 shrink-0 flex items-center justify-center rounded-full bg-amber-100 text-amber-800 font-bold text-sm">
                  {index + 1}
                </span>

                <p className="text-gray-700 leading-7 text-sm sm:text-base">
                  {point}
                </p>

              </div>
            ))}
          </div>

        </section>
      )}

      {/* Footer */}
      <div className="text-center py-5 border-t border-gray-200">
        <p className="text-sm text-gray-400">
          Keep learning, keep revising, and ace your exams! 🎓
        </p>
      </div>

    </div>
  );
};

export default FinalResult;
