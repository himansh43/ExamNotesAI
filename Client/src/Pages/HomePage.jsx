import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import img1 from "../assets/img1.png";

import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

import {
  FaArrowRight,
  FaBrain,
  FaFilePdf,
  FaProjectDiagram,
  FaBolt,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";

const HomePage = () => {
  const user = useSelector((state) => state.userDetails.user);
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaBrain />,
      title: "AI-Powered Notes",
      description:
        "Generate intelligent, structured and exam-focused notes within seconds.",
      color: "from-indigo-500 to-purple-600",
    },
    {
      icon: <FaProjectDiagram />,
      title: "Smart Diagrams",
      description:
        "Understand complex concepts with clear diagrams and flowcharts.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FaFilePdf />,
      title: "PDF Downloads",
      description: "Download, save and access your revision material anytime.",
      color: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50">
      <NavBar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-600/20 blur-3xl rounded-full pointer-events-none"></div>

        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 bg-purple-600/20 blur-3xl rounded-full pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20 lg:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="flex flex-col gap-6 sm:gap-7 text-center md:text-left">
              <div className="flex justify-center md:justify-start">
                <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-400/20 rounded-full px-3 sm:px-4 py-2 max-w-full">
                  <FaStar className="text-yellow-400 text-sm shrink-0" />

                  <span className="text-indigo-200 text-[11px] sm:text-sm font-medium">
                    AI-Powered Smart Learning Platform
                  </span>
                </div>
              </div>

              <h1 className="text-[2.5rem] leading-[1.15] sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                Create Smart
                <br />
                AI Notes in
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">
                  Seconds.
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-7 sm:leading-8 max-w-lg mx-auto md:mx-0">
                Generate exam-focused notes, project documentation, flow
                diagrams and revision-ready content using AI. Study faster,
                understand better and achieve more.
              </p>

              {/* Benefits */}
              <div className="flex flex-col gap-3 text-xs sm:text-sm text-slate-300 items-center md:items-start">
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-400 shrink-0" />
                  Exam-focused study materials
                </div>

                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-400 shrink-0" />
                  AI-generated diagrams and flowcharts
                </div>

                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-400 shrink-0" />
                  Downloadable PDF notes
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-fit mx-auto md:mx-0">
                <button
                  onClick={() => navigate("/notes")}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3.5 sm:py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm sm:text-base font-bold shadow-xl shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-1"
                >
                  {user ? "Create Notes" : "Get Started"}
                  <FaArrowRight />
                </button>

                <button
                  onClick={() => navigate("/pricing")}
                  className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm sm:text-base font-semibold transition-all duration-300"
                >
                  Explore Pricing
                </button>
              </div>

              <p className="text-xs text-slate-400">
                ✨ Turn your study material into smarter learning.
              </p>
            </div>

            {/* Right Image */}
            <div className="relative flex justify-center items-center mt-2 md:mt-0">
              <div className="absolute w-56 h-56 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>

              <div className="relative w-full max-w-sm sm:max-w-lg">
                <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-purple-600 rounded-2xl sm:rounded-3xl blur opacity-30"></div>

                <div className="relative bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 shadow-2xl">
                  <img
                    src={img1} 
                    alt="AI-powered exam notes generation"
                    className="w-full h-auto max-h-90 sm:max-h-none object-contain rounded-xl sm:rounded-2xl"
                  />

                  {/* Floating Badge */}
                  <div className="absolute -left-2 sm:-left-5 top-8 sm:top-12 hidden sm:flex items-center gap-3 bg-white text-slate-900 px-3 sm:px-4 py-3 rounded-xl shadow-xl">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <FaBolt className="text-green-600" />
                    </div>

                    <div>
                      <p className="font-bold text-sm">AI Powered</p>
                      <p className="text-xs text-gray-500">Smart Generation</p>
                    </div>
                  </div>

                  <div className="absolute -right-2 sm:-right-4 bottom-8 sm:bottom-12 hidden sm:flex items-center gap-3 bg-white text-slate-900 px-3 sm:px-4 py-3 rounded-xl shadow-xl">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <FaFilePdf className="text-indigo-600" />
                    </div>

                    <div>
                      <p className="font-bold text-sm">PDF Ready</p>
                      <p className="text-xs text-gray-500">Easy Downloads</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <p className="text-indigo-600 font-bold text-xs sm:text-sm uppercase tracking-widest mb-3">
            What We Offer
          </p>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
            Everything You Need to
            <span className="text-indigo-600"> Study Smarter</span>
          </h2>

          <p className="text-gray-500 text-sm sm:text-base mt-4 leading-7">
            Powerful AI tools designed to make your learning experience easier,
            faster and more productive.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-linear-to-br ${feature.color} flex items-center justify-center text-white text-xl sm:text-2xl shadow-lg mb-5 sm:mb-6 group-hover:scale-110 transition duration-300`}
              >
                {feature.icon}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-500 text-sm leading-7">
                {feature.description}
              </p>

              <div className="mt-5 flex items-center gap-2 text-indigo-600 text-sm font-semibold">
                Learn More
                <FaArrowRight className="text-xs group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-5 sm:px-8 lg:px-12 pb-14 sm:pb-20">
        <div className="max-w-7xl mx-auto relative overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-700 p-7 sm:p-10 md:p-16 text-center text-white">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-5 leading-tight">
              Ready to Study Smarter?
            </h2>

            <p className="text-indigo-100 text-sm sm:text-base max-w-xl mx-auto leading-7 mb-7 sm:mb-8">
              Start generating intelligent notes and transform the way you
              prepare for your exams.
            </p>

            <button
              onClick={() => navigate("/notes")}
              className="inline-flex items-center justify-center gap-3 bg-white text-indigo-700 w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base hover:bg-indigo-50 hover:scale-105 transition duration-300 shadow-xl"
            >
              Start Creating Notes
              <FaArrowRight />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
