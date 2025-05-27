import React from "react";

export function FooterNav({ selectedCount }: { selectedCount: number }) {
  const hasSelection = selectedCount > 0;

  return (
    <footer className="fixed bottom-0 w-full z-50 bg-white shadow-md py-4 px-6">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        <button className="px-4 py-2 border rounded bg-gray-100 text-gray-800 hover:bg-gray-200">
          ← Back
        </button>
        <button
          className={`px-4 py-2 border rounded ${
            hasSelection
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!hasSelection}
        >
          {hasSelection
            ? `Continue (${selectedCount} selected) →`
            : "Continue →"}
        </button>
      </div>
    </footer>
  );
}
