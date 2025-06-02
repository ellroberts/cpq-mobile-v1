import React from "react";
import { usePlan } from "../context/PlanContext";
import { useLocation, useNavigate } from "react-router-dom";

export function FooterNav() {
  const { footer } = usePlan();
  const location = useLocation();
  const navigate = useNavigate();

  const stepRoutes = ["/mobile-selection", "/mobile-plans", "/add-ons"];
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
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t shadow z-50">
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between">
        <button
          onClick={handleBack}
          className="text-sm text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
        >
          ← Back
        </button>

        <button
          onClick={handleContinue}
          disabled={footer.disableContinue}
          className={`text-sm px-4 py-2 rounded ${
            footer.disableContinue
              ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {footer.continueLabel}
        </button>
      </div>
    </footer>
  );
}
