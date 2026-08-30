import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Home from "./pages/home/home";
import Solutions from "./pages/solution/solutions";
import SolutionDetail from "./pages/solution/SolutionDetail";
import Technologies from "./pages/technologies/technologies";
// Uncomment each import below as that team member finishes their page.
// import About from "./pages/about/about";
// import Services from "./pages/services/services";

// import Portfolio from "./pages/portfolio/portfolio";
// import PartnersClient from "./pages/PartnersClient/partners&client";
// import Testimonials from "./pages/testimonials/testimonials";
// import Careers from "./pages/careers/careers";
import Blog from "./pages/blog/Blog";
import ArticleDetails from "./components/blog/ArticleDetails";

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
        {<Route path="/technologies" element={<Technologies />} />}
        {/*
          JSX doesn't support // comments inside markup — the "<"
          always starts a new tag no matter what's before it.
          You MUST wrap commented-out JSX in { / * ... * / } like
          this whole block. Uncomment one <Route> line at a time
          as each page gets built, matching the import above.
        */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/services" element={<Services />} /> */}
       
        {/* <Route path="/portfolio" element={<Portfolio />} /> */}
        {/* <Route path="/partners-clients" element={<PartnersClient />} /> */}
        {/* <Route path="/testimonials" element={<Testimonials />} /> */}
        {/* <Route path="/careers" element={<Careers />} /> */}
        { <Route path="/blog" element={<Blog />} /> }
        { <Route path="/article/:id" element={<ArticleDetails />}/>}
      </Route>
    </Routes>
  );
}
