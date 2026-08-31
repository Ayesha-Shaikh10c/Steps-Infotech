import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

// This is the ONE place Navbar and Footer get rendered.
// Every page in the site is wrapped by this automatically once
// it's registered as a nested route under Layout in App.jsx.
// Individual page components (Home, About, Solutions, etc.)
// should NOT import Navbar or Footer themselves — just build
// the page's own content and export it.
export default function Layout() {
  return (
    <div className="w-full">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
