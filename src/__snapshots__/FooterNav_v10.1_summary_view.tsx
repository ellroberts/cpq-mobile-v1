import React from "react";

export function FooterNav({
  selectedCount,
  onViewSelected,
  onClearAll,
}: {
  selectedCount: number;
  onViewSelected: () => void;
  onClearAll: () => void;
}) {
  const hasSelection = selectedCount > 0;

  return (
    <footer className="fixed bottom-0 w-full z-50 bg-white shadow-md py-4 px-6">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        {/* Back button */}
        <button className="px-4 py-2 border rounded text-sm text-gray-700 hover:bg-gray-100">
          ← Back
        </button>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {hasSelection && (
            <>
              <span className="text-sm text-gray-700">
                {selectedCount} selected
              </span>
              <button
                onClick={onViewSelected}
                className="px-4 py-2 border rounded text-sm text-gray-700 hover:bg-gray-100"
              >
                View
              </button>
              <button
                onClick={onClearAll}
                className="px-4 py-2 border rounded text-sm text-gray-700 hover:bg-gray-100"
              >
                Clear All
              </button>
            </>
          )}
          <button
            className={`px-4 py-2 border rounded ${
              hasSelection
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!hasSelection}
          >
            Continue →
          </button>
        </div>
      </div>
    </footer>
  );
}
