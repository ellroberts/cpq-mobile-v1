// Snapshot of v4 filter functionality — 2025-05-20
// Includes: filter state, network group, reset all logic

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

export function FiltersPanel({ selectedFilters, toggleFilter, resetFilters }) {
  const networks = ["O2", "Vodafone"];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={resetFilters}
          className="text-sm text-blue-600 hover:underline flex items-center gap-1"
        >
          <FontAwesomeIcon icon={faRedo} />
          Reset All
        </button>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-2">Network</h3>
        {networks.map((network) => (
          <label key={network} className="block text-sm mb-1">
            <input
              type="checkbox"
              checked={selectedFilters.network.includes(network)}
              onChange={() => toggleFilter("network", network)}
              className="mr-2"
            />
            {network}
          </label>
        ))}
      </div>
    </div>
  );
}
