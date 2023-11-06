import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./pages/Auth/Signup/SignUp";
import Profile from "./pages/Auth/Profile/Profile";
import Login from "./pages/Auth/Login/Login";
import Reset from "./pages/Auth/Reset/Reset";
// import PrivateRoute from "./components/ProtectedRoutes/PrivateRoute";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import Order from "./pages/Order/Order";
import UpdateProfile from "./pages/Auth/Profile/UpdateProfile";
import Dashboard from "./pages/User/Dashboard";
import AdminRoute from "./components/ProtectedRoutes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import Services from "./pages/Admin/Services/Services";
import Page404 from "./pages/Page404/Page404";
import "react-multi-carousel/lib/styles.css";
import { useEffect } from "react";
import Sitting from "./pages/Admin/Sitting/Sitting";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import AllComment from "./pages/Comment/AllComment";
import Blogs from "./pages/Blogs/Blogs";
import BlogDetails from "./components/AllBlog/BlogDetails";
import AllServices from "./pages/Services/AllServices";
import ServicesDetails from "./pages/Services/ServicesDetails";
import Policy from "./pages/Policies/Policy";
import Users from "./pages/Admin/Users/Users";
import AdminOrder from "./pages/Admin/Orders/AdminOrder";
import AdminSubscription from "./pages/Admin/Subscriptions/AdminSubscription";
import AdminBlogs from "./pages/Admin/AdminBlogs/AdminBlogs";
import AddBlog from "./pages/Admin/AdminBlogs/AddBlog";
import UpdateBlog from "./pages/Admin/AdminBlogs/UpdateBlog";
import Success from "./components/Payment/Success";
import Error from "./components/Payment/Error";

function ScrollToTop() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  return null;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/*Protected User Routes */}
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route path="user" element={<Dashboard />}></Route>
            <Route path="user/profile" element={<Profile />}></Route>
            <Route path="user/order" element={<Order />}></Route>
            <Route
              path="user/updateProfile"
              element={<UpdateProfile />}
            ></Route>
          </Route>
          {/* Protected Admin Routes */}
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/services" element={<Services />} />
            <Route path="admin/sitting" element={<Sitting />} />
            <Route path="admin/users" element={<Users />} />
            <Route path="admin/orders" element={<AdminOrder />} />
            <Route path="admin/subscription" element={<AdminSubscription />} />
            <Route path="admin/blogs" element={<AdminBlogs />} />
            <Route path="admin/blogs/create-blog" element={<AddBlog />} />
            <Route
              path="admin/blogs/update-blog/:id"
              element={<UpdateBlog />}
            />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forgot" element={<Reset />} />
          <Route path="/reviews" element={<AllComment />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/detail/:id" element={<BlogDetails />} />
          <Route path="/all-services" element={<AllServices />} />
          <Route path="/service/detail/:id" element={<ServicesDetails />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/success" element={<Success />} />
          <Route path="/error" element={<Error />} />

          <Route path="/*" element={<Page404 />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
