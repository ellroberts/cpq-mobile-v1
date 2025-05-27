import { useState } from "react";
import FilterGroup from "./FilterGroup";

export function AddOnFiltersPanel({
  selectedFilters,
  toggleFilter,
  resetFilters,
}) {
  const [expanded, setExpanded] = useState({
    network: true,
    data: true,
  });

  const toggle = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const networks = ["O2", "Vodafone", "EE", "Three"];
  const dataOptions = ["5Gb", "20Gb", "Unlimited"];

  return (
    <div className="space-y-4 pb-2">
      {/* Reset All */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-md font-semibold">Filters</h2>
        <button
          onClick={resetFilters}
          className="text-sm text-blue-600 hover:underline"
        >
          Reset All
        </button>
      </div>

      {/* Network */}
      <FilterGroup
        title="Network"
        expanded={expanded.network}
        onToggle={() => toggle("network")}
      >
        {networks.map((item) => (
          <label key={item} className="block text-sm mb-1 pl-2">
            <input
              type="checkbox"
              checked={selectedFilters.network.includes(item)}
              onChange={() => toggleFilter("network", item)}
              className="mr-2"
            />
            {item}
          </label>
        ))}
      </FilterGroup>

      {/* Data */}
      <FilterGroup
        title="Data"
        expanded={expanded.data}
        onToggle={() => toggle("data")}
        hideDivider={true}
      >
        {dataOptions.map((item) => (
          <label key={item} className="block text-sm mb-1 pl-2">
            <input
              type="checkbox"
              checked={selectedFilters.data.includes(item)}
              onChange={() => toggleFilter("data", item)}
              className="mr-2"
            />
            {item}
          </label>
        ))}
      </FilterGroup>
    </div>
  );
}
