import React, { useEffect, useState } from "react";
import { serverUrl } from "../App";
import { setAllNotes } from "../Slices/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../Components/NavBar";
import FinalResult from "../Components/FinalResult";

const History = () => {
  const dispatch = useDispatch();
  const allNotes = useSelector((state) => state.userAllNotes.allNotes);

  const [content, setContent] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  console.log("All Notes", allNotes);
  console.log("Content is", content);

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        setFetching(true);

        const response = await fetch(
          `${serverUrl}/api/gemini-result/getAllNotes`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data = await response.json();

        dispatch(setAllNotes(data.notes || []));
      } catch (error) {
        console.log("Error:", error);
        setError("Unable to load your notes.");
      } finally {
        setFetching(false);
      }
    };

    fetchAllNotes();
  }, [dispatch]);

  const handleFetchNotesById = async (id) => {
    try {
      setLoading(true);
      setError("");
      setActiveId(id);
      setContent(null);

      const response = await fetch(
        `${serverUrl}/api/gemini-result/getnotesById/${id}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch note");
      }

      const data = await response.json();

      if (data.note) {
        setContent(data.note.content);
      } else {
        setError("Note not found.");
      }
    } catch (error) {
      console.log("Error:", error);
      setError("Unable to load this note.");
    } finally {
      setLoading(false);
    }
  };

  const filteredNotes =
    allNotes?.filter((note) =>
      note.topic?.toLowerCase().includes(search.toLowerCase()),
    ) || [];

  return (
    <div className="min-h-screen bg-slate-500 p-3 sm:p-5 lg:p-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-10">
          <NavBar />
        </div>
        {/* Header */}

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-11 w-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xl shadow-lg shadow-indigo-200">
                ✨
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  My Study History
                </h1>
                <p className="text-sm text-slate-500">
                  Access all your previously generated study materials.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm">
            <p className="text-xs text-slate-500 font-medium">
              TOTAL SAVED NOTES
            </p>
            <p className="text-2xl font-bold text-indigo-600">
              {allNotes?.length || 0}
            </p>
          </div>
        </div>

        {/* Main Layout */}

        <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-5">
          {/* Sidebar */}

          <aside className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden h-fit lg:sticky lg:top-5">
            <div className="p-5 border-b border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-800 text-lg">
                  Saved Notes
                </h2>

                <span className="bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full">
                  {filteredNotes.length} Notes
                </span>
              </div>

              {/* Search */}

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  🔍
                </span>

                <input
                  type="text"
                  placeholder="Search your topics..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                />
              </div>
            </div>

            {/* Notes List */}

            <div className="p-3 max-h-[65vh] lg:max-h-[calc(100vh-300px)] overflow-y-auto">
              {fetching ? (
                <div className="py-10 text-center text-slate-400">
                  <div className="animate-spin h-7 w-7 border-2 border-indigo-500 border-t-transparent rounded-full mx-auto mb-3"></div>
                  Loading notes...
                </div>
              ) : filteredNotes.length > 0 ? (
                <div className="space-y-2">
                  {filteredNotes.map((note) => (
                    <button
                      key={note._id}
                      onClick={() => handleFetchNotesById(note._id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group ${
                        activeId === note._id
                          ? "bg-indigo-50 border-indigo-300 shadow-sm"
                          : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-200"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center text-lg ${
                            activeId === note._id
                              ? "bg-indigo-600 text-white"
                              : "bg-slate-100 text-indigo-600 group-hover:bg-indigo-100"
                          }`}
                        >
                          📚
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3
                            className={`font-semibold text-sm truncate ${
                              activeId === note._id
                                ? "text-indigo-700"
                                : "text-slate-700"
                            }`}
                          >
                            {note.topic}
                          </h3>

                          <p className="text-xs text-slate-400 mt-1">
                            View study material →
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="text-4xl mb-3">📂</div>

                  <h3 className="font-semibold text-slate-700">
                    No notes found
                  </h3>

                  <p className="text-xs text-slate-400 mt-2">
                    {search
                      ? "Try another search term."
                      : "Your saved notes will appear here."}
                  </p>
                </div>
              )}
            </div>
          </aside>

          {/* Content Viewer */}

          <main className="bg-white border border-slate-200 rounded-2xl shadow-sm min-h-150 overflow-hidden">
            {/* Content Header */}

            <div className="border-b border-slate-100 p-5 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2">
                    Study Material
                  </p>

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {allNotes?.find((n) => n._id === activeId)?.topic ||
                      "Your Study Workspace"}
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    {content
                      ? "Your saved learning material"
                      : "Select a topic from your history to get started."}
                  </p>
                </div>

                {content && (
                  <span className="bg-green-50 text-green-700 border border-green-100 rounded-full px-4 py-2 text-xs font-semibold w-fit">
                    ✓ Saved Material
                  </span>
                )}
              </div>
            </div>

            {/* Content Body */}

            <div className="p-5 sm:p-8">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-32">
                  <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full mb-4"></div>

                  <p className="text-slate-500 font-medium">
                    Loading your study material...
                  </p>
                </div>
              ) : error ? (
                <div className="text-center py-24">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : content ? (
                <div className="max-w-4xl mx-auto">
                  <div>
                    <FinalResult results={content} />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-28">
                  <div className="w-24 h-24 rounded-3xl bg-indigo-50 flex items-center justify-center text-5xl mb-6">
                    📖
                  </div>

                  <h3 className="text-xl font-bold text-slate-800">
                    Ready to continue learning?
                  </h3>

                  <p className="text-slate-500 text-sm max-w-sm mt-3 leading-7">
                    Choose any saved topic from the sidebar to view your
                    previously generated AI study notes.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default History;
