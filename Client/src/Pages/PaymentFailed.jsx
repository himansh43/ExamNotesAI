
import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg text-center">

                {/* Failed Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                    Payment Failed!
                </h1>

                <p className="text-gray-500 mb-6 leading-relaxed">
                    Unfortunately, your payment could not be processed.
                    Please try again or use another payment method.
                </p>

                {/* Error Message */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-red-700">
                        Your payment was unsuccessful. If any amount
                        was deducted, please check your payment status
                        before retrying.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => navigate("/pricing")}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200"
                    >
                        Try Again
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition duration-200"
                    >
                        Back to Home
                    </button>
                </div>

                {/* Footer */}
                <p className="text-xs text-gray-400 mt-6">
                    Need help? Contact our support team.
                </p>

                <p className="text-sm font-semibold text-indigo-600 mt-2">
                    ExamNotesAI
                </p>

            </div>
        </div>
    );
};

export default PaymentFailed;
