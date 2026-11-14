import React, { useState } from "react";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../Slices/userSlice";
import { useNavigate } from "react-router-dom";

import {
  FaPlusCircle,
  FaHistory,
  FaCreditCard,
  FaSignOutAlt,
  FaGem,
} from "react-icons/fa";

import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userDetails.user);

  const [showMenu, setShowMenu] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogOut = async () => {
    try {
      setLoggingOut(true);

      const response = await fetch(`${serverUrl}/api/auth/logout`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      dispatch(setUserDetails(null));
      setShowMenu(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  const menuItems = [
    {
      name: "History",
      icon: <FaHistory />,
      path: "/history",
    },
    {
      name: "Pricing",
      icon: <FaCreditCard />,
      path: "/pricing",
    },
  ];

  return (
    <nav className="relative z-50 w-full bg-linear-to-r from-slate-950 via-slate-900 to-indigo-950 text-white shadow-lg border-b border-white/10">
      <div className="w-full max-w-full px-3 sm:px-5 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4 min-w-0">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer group min-w-0 shrink"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md group-hover:scale-105 transition">
              <FaGem className="text-white text-lg sm:text-xl" />
            </div>

            <div className="min-w-0">
              <h1 className="text-base sm:text-xl lg:text-2xl font-extrabold tracking-tight whitespace-nowrap">
                ExamNotes <span className="text-indigo-400">AI</span>
              </h1>

              <p className="hidden xs:block text-[9px] sm:text-[10px] lg:text-xs text-slate-400 tracking-widest uppercase whitespace-nowrap">
                Smart Learning Platform
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Credits */}
            <button
              onClick={() => navigate("/pricing")}
              className="hidden sm:flex items-center gap-2 px-2.5 sm:px-4 py-2 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 hover:border-indigo-400/50 transition"
            >
              <span className="text-base sm:text-lg">💎</span>

              <span className="font-bold text-xs sm:text-base tabular-nums">
                {user?.credits ?? 0}
              </span>

              <span className="w-px h-4 bg-white/20 hidden sm:block" />

              <FaPlusCircle className="text-indigo-400 text-sm sm:text-lg" />
            </button>

            {/* User Avatar */}
            <div className="border border-white/50 bg-linear-to-br from-indigo-400 to-purple-600 w-9 h-9 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center rounded-full font-bold text-sm sm:text-base uppercase">
              {user?.name?.charAt(0) || "U"}
            </div>

            {/* Hamburger Menu */}
            <div className="relative shrink-0">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/10 transition"
                aria-label="Toggle navigation menu"
                aria-expanded={showMenu}
              >
                {showMenu ? (
                  <RxCross2 size={22} />
                ) : (
                  <RxHamburgerMenu size={22} />
                )}
              </button>

              {/* Dropdown */}
              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowMenu(false)}
                  />

                  <div className="absolute right-0 top-12 z-50 w-56 max-w-[calc(100vw-24px)] rounded-2xl bg-slate-900 border border-white/10 shadow-2xl p-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* User Details */}
                    <div className="px-3 py-3 border-b border-white/10 mb-2 min-w-0">
                      <p className="font-semibold text-sm truncate">
                        {user?.name || "User"}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        Welcome back!
                      </p>
                      <p className="text-sm text-slate-400 mt-1 font-bold">
                        <span className="text-base sm:text-lg">💎</span>
                        {user?.credits ?? 0} credits left!
                      </p>
                    </div>

                    {/* Menu Items */}
                    {menuItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          navigate(item.path);
                          setShowMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-slate-300 hover:bg-indigo-600 hover:text-white transition"
                      >
                        <span className="text-indigo-400">{item.icon}</span>

                        {item.name}
                      </button>
                    ))}

                    {/* Logout */}
                    <div className="border-t border-white/10 mt-2 pt-2">
                      <button
                        onClick={handleLogOut}
                        disabled={loggingOut}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition disabled:opacity-50"
                      >
                        <FaSignOutAlt />

                        {loggingOut ? "Logging out..." : "Logout"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
