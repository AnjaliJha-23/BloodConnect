import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./components/ProtectedRoute/AdminRoute";
import Users from "./pages/Admin/Users";
import Requests from "./pages/Admin/Requests";
import NewsletterList from "./pages/Admin/NewsletterList";


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
import Analytics from "./pages/Admin/Analytics";


import ContactMessages from "./pages/Admin/ContactMessages"; 

import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!hideLayout && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
<Route
  path="/admin/newsletter"
  element={
    <ProtectedRoute>
      <AdminRoute>
        <NewsletterList />
      </AdminRoute>
    </ProtectedRoute>
  }
/>
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/request-blood"
            element={
              <ProtectedRoute>
                <ProfileProtectedRoute>
                  <RequestBlood />
                </ProfileProtectedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/my-requests"
            element={
              <ProtectedRoute>
                <MyRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <Users />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route
  path="/admin/newsletter"
  element={
    <ProtectedRoute>
      <AdminRoute>
        <NewsletterList />
      </AdminRoute>
    </ProtectedRoute>
  }
/>
          <Route
            path="/admin/requests"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <Requests />
                </AdminRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <Analytics />
                </AdminRoute>
              </ProtectedRoute>
            }
          />

          {/* 2. Add Route for Contact Messages */}
          <Route
            path="/admin/contact"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <ContactMessages />
                </AdminRoute>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;