import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../Utils.js/firebase";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../Slices/userSlice";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import {
  FaBrain,
  FaBookOpen,
  FaFilePdf,
  FaChartLine,
  FaGift,
  FaCheckCircle,
  FaLock,
  FaArrowRight,
  FaGem,
} from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      setError("");

      const signupWithPopUpresponse = await signInWithPopup(auth, provider);
      console.log("signupopup data ", signupWithPopUpresponse);
      // Extract Firebase user details
      const firebaseUser = signupWithPopUpresponse.user;

      const options = {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
        }),
      };

      const apiResponse = await fetch(`${serverUrl}/api/auth/login`, options);

      const data = await apiResponse.json();
      console.log("login data is", data);

      if (!apiResponse.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      dispatch(setUserDetails(data.user));

      navigate("/");
    } catch (error) {
      console.error("Google authentication error:", error);

      setError(
        error.code === "auth/popup-closed-by-user"
          ? "Login cancelled. Please try again."
          : error.message || "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <FaGift />,
      title: "50 Free Credits",
      description: "Start with 50 credits and generate notes without paying.",
      color: "bg-purple-500/20 text-purple-300",
    },
    {
      icon: <FaBookOpen />,
      title: "Exam Notes",
      description: "High-yield, revision-ready exam-oriented notes.",
      color: "bg-blue-500/20 text-blue-300",
    },
    {
      icon: <FaBrain />,
      title: "Project Notes",
      description:
        "Well-structured documentation for assignments and projects.",
      color: "bg-pink-500/20 text-pink-300",
    },
    {
      icon: <FaChartLine />,
      title: "Charts & Graphs",
      description: "Generate diagrams, charts and flowgraphs automatically.",
      color: "bg-green-500/20 text-green-300",
    },
    {
      icon: <FaFilePdf />,
      title: "PDF Downloads",
      description: "Download clean, printable PDFs of your study materials.",
      color: "bg-orange-500/20 text-orange-300",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-6">
        {/* Navbar */}
        <nav className="flex justify-between items-center border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <FaGem className="text-white text-lg" />
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                ExamNotes <span className="text-indigo-400">AI.</span>
              </h2>

              <p className="text-[10px] sm:text-xs text-slate-400">
                Smart learning starts here
              </p>
            </div>
          </div>

          <span className="hidden sm:block text-sm text-slate-400">
            AI-powered learning platform
          </span>
        </nav>

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center py-14 lg:py-20">
          {/* Left Section */}
          <div className="flex flex-col gap-8">
            {/* Badge */}
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-7">
                <FaBrain />
                AI-powered study assistant
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                Unlock
                <br />
                Smarter
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">
                  AI Notes.
                </span>
              </h1>

              <p className="mt-6 text-slate-400 text-base sm:text-lg leading-8 max-w-lg">
                Transform your learning experience with AI-generated exam notes,
                project documentation, charts and downloadable PDFs. Learn
                faster and prepare smarter.
              </p>
            </div>

            {/* Google Login Card */}
            <div className="max-w-md w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="mb-6">
                <h2 className="text-xl font-bold">Welcome to ExamNotes AI</h2>

                <p className="text-sm text-slate-400 mt-2">
                  Sign in to start your smarter learning journey.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-xl p-3 mb-4">
                  {error}
                </div>
              )}

              {/* Google Button */}
              <button
                onClick={handleGoogleAuth}
                disabled={loading}
                className="w-full bg-white hover:bg-slate-100 text-slate-900 py-4 px-5 rounded-xl flex justify-center items-center gap-3 font-bold shadow-lg transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></span>
                    Signing you in...
                  </>
                ) : (
                  <>
                    <FcGoogle size={24} />
                    Continue with Google
                    <FaArrowRight className="ml-auto text-slate-400 text-sm" />
                  </>
                )}
              </button>

              {/* Benefits */}
              <div className="flex flex-col gap-4 mt-7">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <FaCheckCircle className="text-green-400" />
                  Get 50 free credits when you sign up.
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <FaCheckCircle className="text-green-400" />
                  No payment required to get started.
                </div>
              </div>

              {/* Security */}
              <div className="flex items-center justify-center gap-2 mt-7 pt-5 border-t border-white/10 text-xs text-slate-500">
                <FaLock className="text-green-400" />
                Secure authentication powered by Google
              </div>
            </div>
          </div>

          {/* Right Section - Features */}
          <div>
            <div className="mb-8">
              <p className="text-indigo-400 text-sm font-bold uppercase tracking-widest mb-3">
                Everything in one place
              </p>

              <h2 className="text-2xl sm:text-3xl font-extrabold">
                Your AI-powered
                <span className="text-indigo-400"> study companion.</span>
              </h2>

              <p className="text-slate-400 text-sm mt-3 leading-6">
                Everything you need to make your exam preparation easier and
                more productive.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group bg-white/4 border border-white/10 hover:border-indigo-400/50 hover:bg-white/8 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 ${
                    index === 4 ? "sm:col-span-2" : ""
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-5 ${feature.color} group-hover:scale-110 transition duration-300`}
                  >
                    {feature.icon}
                  </div>

                  <h3 className="font-bold text-white text-lg mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-6">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Highlight */}
            <div className="mt-6 p-5 rounded-2xl bg-linear-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-400/20 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
                <FaGem className="text-indigo-300 text-xl" />
              </div>

              <div>
                <h3 className="font-bold text-white">
                  Start learning smarter today!
                </h3>

                <p className="text-xs text-slate-400 mt-1">
                  Your next exam preparation journey starts here.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 py-6 text-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} ExamNotes AI. All rights reserved.
          </p>

          <p className="text-xs text-slate-600 mt-2">
            Made with ❤️ for students.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
