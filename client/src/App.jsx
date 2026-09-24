import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Home from "./pages/home/home";
import Solutions from "./pages/solution/solutions";
import SolutionDetail from "./pages/solution/SolutionDetail";
import Technologies from "./pages/technologies/technologies";
import About from "./pages/about/about";
import Services from "./pages/services/services";
import Portfolio from "./pages/portfolio/portfolio";
// import PartnersClient from "./pages/PartnersClient/partners&client";
import Testimonials from "./pages/testimonials/testimonials";
import Careers from "./pages/careers/careers";
import JobApplication from "./components/careers/InsidePages/JobApplication/JobApplication";
import Blog from "./pages/blog/blog";
import ArticleDetails from "./components/blog/ArticleDetails";
import Contact from "./pages/contact/contact";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

import UserLayout from "./pages/User/UserLayout";
import UserDashboard from "./pages/User/UserDashboard";
import UserProfile from "./pages/User/UserProfile";
import UserJobs from "./pages/User/UserJobs";
import JobDetails from "./pages/User/JobDetails";
import ApplyJob from "./pages/User/ApplyJob";
import SavedJobs from "./pages/User/SavedJobs";
import MyApplications from "./pages/User/MyApplications";
import ApplicationDetails from "./pages/User/ApplicationDetails";


import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageUsers from "./pages/Admin/ManageUsers";
import ManageJobs from "./pages/Admin/ManageJobs";
import ManageApplications from "./pages/Admin/ManageApplications";
import ManageInternships from "./pages/Admin/ManageInternships";
import ManageContacts from "./pages/Admin/ManageContacts";
import ManageBlogs from "./pages/Admin/ManageBlogs";
import ManageServices from "./pages/Admin/ManageServices";
import ManageTestimonials from "./pages/Admin/ManageTestimonials";
import ManagePortfolio from "./pages/Admin/ManagePortfolio";
import ManageTechnologies from "./pages/Admin/ManageTechnologies";
import ManagePartners from "./pages/Admin/ManagePartners";

// NOTE: every route below is nested INSIDE the Layout route.
// That's what makes Navbar + Footer "universal" — React Router
// renders Layout once, and swaps only the <Outlet /> content
// (the actual page) as the URL changes. Navbar/Footer never
// re-mount between page navigations.
//
// IMPORTANT: <BrowserRouter> is NOT here. There must be exactly
// ONE <BrowserRouter> in the whole app, and it belongs in
// main.jsx wrapping <App />, like this:
//
//   import { BrowserRouter } from "react-router-dom";
//   ReactDOM.createRoot(document.getElementById("root")).render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   );
//
// If you put a second <BrowserRouter> here too, you get:
// "You cannot render a <Router> inside another <Router>"


export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/solutions/:slug" element={<SolutionDetail />} />
        <Route path="/technologies" element={<Technologies />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        {/* <Route path="/partners-clients" element={<PartnersClient />} /> */}
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/job-application" element={<JobApplication />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/article/:id" element={<ArticleDetails />} />
        <Route path="/contact" element={<Contact />} />
        
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<RoleRoute allowedRole="user" />}>
            <Route path="/user" element={<UserLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="jobs" element={<UserJobs />} />
              <Route path="jobs/:jobId" element={<JobDetails />} />
              <Route path="jobs/:jobId/apply" element={<ApplyJob />} />
              <Route path="saved-jobs" element={<SavedJobs />} />
              <Route path="applications" element={<MyApplications />} />
              <Route path="applications/:applicationId" element={<ApplicationDetails />} />
            </Route>
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<RoleRoute allowedRole="admin" />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/jobs" element={<ManageJobs />} />
            <Route path="/admin/applications" element={<ManageApplications />} />
            <Route path="/admin/internships" element={<ManageInternships />} />
            <Route path="/admin/contacts" element={<ManageContacts />} />
            <Route path="/admin/blogs" element={<ManageBlogs />} />
            <Route path="/admin/services" element={<ManageServices />} />
            <Route path="/admin/testimonials" element={<ManageTestimonials />} />
            <Route path="/admin/portfolio" element={<ManagePortfolio />} />
            <Route path="/admin/technologies" element={<ManageTechnologies />} />
            <Route path="/admin/partners" element={<ManagePartners />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}