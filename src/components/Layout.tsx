import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { FooterNav } from "./FooterNav";
import CommentOverlay from "./CommentOverlay"; // ✅ Import the overlay

const stepRoutes = ["/mobile-selection", "/mobile-plans", "/add-ons"];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentIndex = stepRoutes.indexOf(location.pathname);

  const handleBack = () => {
    if (currentIndex > 0) {
      navigate(stepRoutes[currentIndex - 1]);
    }
  };

  const handleContinue = () => {
    if (currentIndex < stepRoutes.length - 1) {
      navigate(stepRoutes[currentIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      <Header />
      <main className="flex-1 relative">
        <Outlet />
        <CommentOverlay /> {/* ✅ Overlay persists across all routed pages */}
      </main>
      <FooterNav onBack={handleBack} onContinue={handleContinue} />
    </div>
  );
}
