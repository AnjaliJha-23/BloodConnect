import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import RequestBlood from "./pages/RequestBlood/RequestBlood";
import ProfileProtectedRoute from "./components/ProtectedRoutes/ProfileProtectedRoute";
import MyRequests from "./pages/MyRequests/MyRequests";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideLayout && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<ProtectedRoute>
             <Dashboard /> 
             </ProtectedRoute>
            }/>

          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProtectedRoute>
            <Profile />
            </ProtectedRoute>
          }/>
          <Route path="/request-blood" element={ <ProtectedRoute> <ProfileProtectedRoute> <RequestBlood /> </ProfileProtectedRoute> </ProtectedRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-requests" element={<MyRequests />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;