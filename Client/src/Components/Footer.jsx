
import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaGem,
  FaBookOpen,
  FaHistory,
  FaCoins,
  FaEnvelope,
  FaArrowRight,
  FaHeart,
} from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 text-white mt-16">

      {/* Main Footer */}
      <div className="mx-auto px-6 sm:px-10 lg:px-12 py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand Section */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                <FaGem className="text-xl text-white" />
              </div>

              <h2 className="text-2xl font-extrabold tracking-tight">
                ExamNotes <span className="text-indigo-400">AI</span>
              </h2>
            </div>

            <p className="text-slate-400 text-sm sm:text-base leading-7 max-w-md">
              ExamNotes AI helps students generate exam-focused notes,
              revision material, diagrams, and printable PDFs using AI.
              Learn smarter, prepare faster, and achieve more.
            </p>

            <div className="flex items-center gap-2 text-sm text-indigo-300">
              <FaBookOpen />
              <span>Smart Learning. Better Results.</span>
            </div>

          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative">
              Quick Links
              <span className="absolute left-0 -bottom-2 w-10 h-0.5 bg-indigo-500 rounded-full"></span>
            </h3>

            <ul className="flex flex-col gap-4">

              <li>
                <button
                  onClick={() => navigate("/notes")}
                  className="flex items-center gap-3 text-slate-400 hover:text-indigo-400 transition duration-200 text-sm group"
                >
                  <FaBookOpen className="text-indigo-500" />
                  Notes
                  <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate("/history")}
                  className="flex items-center gap-3 text-slate-400 hover:text-indigo-400 transition duration-200 text-sm group"
                >
                  <FaHistory className="text-indigo-500" />
                  History
                  <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition" />
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate("/pricing")}
                  className="flex items-center gap-3 text-slate-400 hover:text-indigo-400 transition duration-200 text-sm group"
                >
                  <FaCoins className="text-indigo-500" />
                  Add Credits
                  <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition" />
                </button>
              </li>

            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative">
              Support & Account
              <span className="absolute left-0 -bottom-2 w-10 h-0.5 bg-indigo-500 rounded-full"></span>
            </h3>

            <ul className="flex flex-col gap-4">

              <li>
                <button
                  onClick={() => navigate("/login")}
                  className="text-sm text-slate-400 hover:text-indigo-400 transition duration-200"
                >
                  Sign In
                </button>
              </li>

              <li>
                <a
                  href="mailto:support@examnotes.com"
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition duration-200"
                >
                  <FaEnvelope className="text-indigo-500" />
                  support@examnotes.com
                </a>
              </li>

            </ul>
          </div>

        </div>

      </div>

      {/* Bottom Copyright Section */}
      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">

          <p className="text-xs sm:text-sm text-slate-500 text-center">
            © {currentYear} ExamNotes AI. All rights reserved.
          </p>

          <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1">
            Made with
            <FaHeart className="text-red-500 mx-1" />
            for students
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;
