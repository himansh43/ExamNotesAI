import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./Features/getUser";
import { setUserDetails } from "./Slices/userSlice";
import Notes from "./Pages/Notes";
import Pricing from "./Pages/Pricing";
import PaymentSuccess from "./Pages/PaymentSuccess";
import PaymentFailed from "./Pages/PaymentFailed";
import History from "./Pages/History";

export const serverUrl = `http://localhost:8000`;

const App = () => {
  const user = useSelector((state) => state.userDetails.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      if (userData && userData.success) {
        dispatch(setUserDetails(userData.user || userData));
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/pricing"
          element={user ? <Pricing /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/history"
          element={user ? <History /> : <Navigate to="/login" />}
        />
        <Route
          path="/notes"
          element={user ? <Notes /> : <Navigate to="/login" replace />}
        />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
      </Routes>
    </div>
  );
};
export default App;
