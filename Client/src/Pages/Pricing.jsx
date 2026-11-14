
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";

import {
  FaArrowLeft,
  FaCrown,
  FaBolt,
  FaGem,
  FaShieldAlt,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";

import { serverUrl } from "../App";
import NavBar from "../Components/NavBar";

const Pricing = () => {
  const navigate = useNavigate();

  const [loadingPlan, setLoadingPlan] = useState(null);
  const [error, setError] = useState("");

  const plans = [
    {
      name: "Starter",
      description: "Perfect for quick revisions",
      price: 100,
      credits: 100,
      icon: <FaBolt />,
      color: "from-blue-500 to-cyan-500",
      features: [
        "Generate AI notes",
        "Exam-focused answers",
        "Diagram & chart support",
        "Fast generation",
      ],
      button: "Get Started",
    },
    {
      name: "Popular",
      description: "Best value for students",
      price: 300,
      credits: 300,
      icon: <FaCrown />,
      color: "from-indigo-500 to-purple-600",
      popular: true,
      features: [
        "All Starter features",
        "More credits per ₹",
        "Revision mode access",
        "Priority AI response",
      ],
      button: "Choose Popular",
    },
    {
      name: "Pro Learner",
      description: "For serious exam preparation",
      price: 500,
      credits: 500,
      icon: <FaGem />,
      color: "from-pink-500 to-purple-600",
      features: [
        "Maximum credit value",
        "Unlimited revisions",
        "Charts & diagrams",
        "Ideal for full syllabus",
      ],
      button: "Go Pro",
    },
  ];

  const handlePayment = async (planName) => {
    try {
      setError("");
      setLoadingPlan(planName);

      const response = await fetch(
        `${serverUrl}/api/payment/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ planName }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to create payment session");
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Checkout URL not received from server");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setError(error.message || "Something went wrong. Please try again.");
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <div>
        <NavBar/>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">

        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-8">

          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition duration-300"
          >
            <FaArrowLeft size={13} />
            Back to Home
          </button>

          {/* Heading */}
          <div className="text-center pt-16 pb-24">

            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-5 py-2 rounded-full mb-6">
              <FaStar className="text-yellow-400" />
              <span className="text-sm text-indigo-100 font-medium">
                Simple & Affordable Pricing
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Invest in Your
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 mt-2">
                Learning Journey
              </span>
            </h1>

            <p className="text-slate-300 mt-6 max-w-2xl mx-auto text-sm sm:text-lg leading-8">
              Get more AI credits and unlock smarter ways to prepare
              for your exams. Choose the perfect plan for your learning needs.
            </p>

            <div className="flex justify-center flex-wrap gap-5 mt-8 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                Instant credits
              </span>

              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                Secure checkout
              </span>

              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-green-400" />
                One-time payment
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-12 -mt-12 relative z-10 pb-20">

        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">

          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col bg-white rounded-3xl p-7 sm:p-8 border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                plan.popular
                  ? "border-indigo-500 shadow-xl shadow-indigo-200/60 lg:scale-105 z-10"
                  : "border-slate-200 shadow-lg hover:border-indigo-300"
              }`}
            >

              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-6 py-2 rounded-full shadow-lg whitespace-nowrap">
                  <FaCrown className="inline mr-2" />
                  MOST POPULAR
                </div>
              )}

              {/* Plan Header */}
              <div className="flex justify-between items-start mb-6 mt-2">

                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    {plan.name}
                  </h2>

                  <p className="text-sm text-slate-500 mt-2">
                    {plan.description}
                  </p>
                </div>

                <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${plan.color} flex items-center justify-center text-white text-xl shadow-lg`}>
                  {plan.icon}
                </div>

              </div>

              {/* Price */}
              <div className="py-6 border-y border-slate-100">

                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-semibold text-slate-500">
                    ₹
                  </span>

                  <span className="text-5xl font-extrabold tracking-tight text-slate-900">
                    {plan.price}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <FaGem className="text-indigo-500" />

                  <span className="text-indigo-600 font-bold">
                    {plan.credits} Credits
                  </span>
                </div>

                <p className="text-xs text-slate-400 mt-2">
                  One-time payment · No subscription
                </p>

              </div>

              {/* Buy Button */}
              <button
                onClick={() => handlePayment(plan.name)}
                disabled={loadingPlan !== null}
                className={`w-full mt-7 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                  plan.popular
                    ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-200"
                    : "bg-slate-100 text-slate-800 hover:bg-indigo-600 hover:text-white"
                }`}
              >
                {loadingPlan === plan.name ? (
                  <>
                    <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    {plan.button}
                    <span>→</span>
                  </>
                )}
              </button>

              {/* Features */}
              <div className="mt-8">

                <p className="text-sm font-bold text-slate-900 mb-5">
                  What's included:
                </p>

                <div className="flex flex-col gap-4">

                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">

                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                        <GiCheckMark className="text-green-600 text-xs" />
                      </div>

                      <p className="text-sm text-slate-600">
                        {feature}
                      </p>

                    </div>
                  ))}

                </div>
              </div>

            </div>
          ))}

        </div>

        {/* Trust Section */}
        <div className="mt-16">

          <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12">

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center">
                  <FaShieldAlt className="text-green-600 text-xl" />
                </div>

                <div>
                  <p className="font-bold text-slate-800 text-sm">
                    Secure Payments
                  </p>
                  <p className="text-xs text-slate-400">
                    Stripe Checkout
                  </p>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-slate-200"></div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <FaBolt className="text-indigo-600 text-xl" />
                </div>

                <div>
                  <p className="font-bold text-slate-800 text-sm">
                    Instant Credits
                  </p>
                  <p className="text-xs text-slate-400">
                    After confirmed payment
                  </p>
                </div>
              </div>

            </div>

          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-slate-500">
              Invest in your learning. Prepare for success.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
};

export default Pricing;
