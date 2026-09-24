import { Outlet } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import Chatbot from "../chatbot/chatbot";

// This is the ONE place Navbar, Footer and Chatbot get rendered.
// Every page is automatically wrapped by Layout.
export default function Layout() {
  return (
    <div className="w-full">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <div id="site-footer">
        <Footer />
      </div>

      <Chatbot />
    </div>
  );
}