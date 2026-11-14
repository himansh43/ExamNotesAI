
import React from "react";
import { Link } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-5">

      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">

        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <GiCheckMark className="text-green-600 text-4xl" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800">
          Thank You!
        </h1>

        <p className="text-gray-500 mt-3">
          Your payment has been submitted.
          Your credits will appear after payment verification.
        </p>

        <Link
          to="/"
          className="block mt-7 bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700"
        >
          Go to Dashboard
        </Link>

      </div>
    </div>
  );
};

export default PaymentSuccess;
