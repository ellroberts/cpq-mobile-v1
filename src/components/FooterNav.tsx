import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePlan } from "../context/PlanContext";
import { SelectedPlansModal } from "./SelectedPlansModal";
import SelectedAddOnsModal from "./SelectedAddOnsModal";

export function FooterNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    footer,
    selectedPlans,
    selectedAddOns,
    setSelectedPlans,
    setSelectedAddOns,
  } = usePlan();

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleView = () => {
    setIsModalOpen(true);
  };

  const handleModalUpdate = (updated) => {
    if (location.pathname === "/mobile-plans") {
      setSelectedPlans(updated);
    } else if (location.pathname === "/add-ons") {
      setSelectedAddOns(updated);
    }
    setIsModalOpen(false);
  };

  const isMobilePlans = location.pathname === "/mobile-plans";
  const isAddOns = location.pathname === "/add-ons";

  const selectedCount = isMobilePlans
    ? selectedPlans.length
    : isAddOns
    ? selectedAddOns.length
    : 0;

  return (
    <>
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t shadow z-50">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="text-sm text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-50"
            >
              ← Back
            </button>

            {selectedCount > 0 && (
              <>
                <button
                  onClick={() => {
                    if (isMobilePlans) setSelectedPlans([]);
                    if (isAddOns) setSelectedAddOns([]);
                  }}
                  className="text-sm text-red-600 hover:underline"
                >
                  Clear All
                </button>

                <button
                  onClick={handleView}
                  className="text-sm text-blue-600 hover:underline"
                >
                  View Selected ({selectedCount})
                </button>
              </>
            )}
          </div>

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

      {/* Modal rendering based on step */}
      {isMobilePlans && (
        <SelectedPlansModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          plans={selectedPlans}
          onUpdate={handleModalUpdate}
        />
      )}

      {isAddOns && (
        <SelectedAddOnsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleModalUpdate}
        />
      )}
    </>
  );
}
