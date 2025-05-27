import { useLocation } from "react-router-dom";
import { usePlanContext } from "../context/PlanContext";

export function FooterNav({
  onBack,
  onContinue,
}: {
  onBack?: () => void;
  onContinue?: () => void;
}) {
  const location = useLocation();
  const isMobilePlans = location.pathname === "/mobile-plans";
  const isAddOnsPage = location.pathname === "/add-ons";

  const {
    selectedPlans,
    selectedAddOns,
    setSelectedPlans,
    setSelectedAddOns,
    isModalOpen,
    setIsModalOpen,
  } = usePlanContext();

  const hasSelection =
    (isMobilePlans && selectedPlans.length > 0) ||
    (isAddOnsPage && selectedAddOns.length > 0);

  const isContinueDisabled =
    (isMobilePlans && selectedPlans.length === 0) ||
    (isAddOnsPage && selectedAddOns.length === 0);

  return (
    <footer className="fixed bottom-0 w-full z-50 bg-white border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center">
        {onBack && (
          <button
            onClick={onBack}
            className="px-4 py-2 border rounded text-sm text-gray-700 hover:bg-gray-100"
          >
            ← Back
          </button>
        )}

        <div className="flex items-center gap-4">
          {hasSelection && (
            <>
              <span className="text-sm text-gray-700">
                {isMobilePlans
                  ? `${selectedPlans.length} selected`
                  : `${selectedAddOns.length} add-ons selected`}
              </span>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 border rounded text-sm text-gray-700 hover:bg-gray-100"
              >
                View
              </button>
              <button
                onClick={() =>
                  isMobilePlans ? setSelectedPlans([]) : setSelectedAddOns([])
                }
                className="px-4 py-2 border rounded text-sm text-gray-700 hover:bg-gray-100"
              >
                Clear All
              </button>
            </>
          )}
          {onContinue && (
            <button
              onClick={onContinue}
              disabled={isContinueDisabled}
              className={`px-4 py-2 border rounded text-sm text-white ${
                isContinueDisabled
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Continue →
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
