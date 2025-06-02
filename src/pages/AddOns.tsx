import React, { useState } from "react";
import AddOnCards from "../components/AddOnCards";
import { AddOnFiltersPanel } from "../components/AddOnFiltersPanel";
import { usePlan } from "../context/PlanContext";
import { addOnData } from "../mobileData/addOnData";
import {
  faMobileAlt,
  faLaptop,
  faNetworkWired,
  faPhone,
  faHeadset,
  faCode,
  faWifi,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";

export default function AddOns() {
  const [selectedFilters, setSelectedFilters] = useState({
    network: [],
    data: [],
    contract: [],
    type: [],
    roaming: [],
    features: [],
  });

  const [sortOrder, setSortOrder] = useState("low-to-high");

  const toggleFilter = (group, value) => {
    setSelectedFilters((prev) => {
      const groupValues = prev[group] || [];
      const newGroupValues = groupValues.includes(value)
        ? groupValues.filter((v) => v !== value)
        : [...groupValues, value];
      return { ...prev, [group]: newGroupValues };
    });
  };

  const resetFilters = () => {
    setSelectedFilters({
      network: [],
      data: [],
      contract: [],
      type: [],
      roaming: [],
      features: [],
    });
  };

  const { setSelectedAddOns, selectedAddOns } = usePlan();


  const filteredAddOns = addOnData.filter((addon) => {
    const match = (key) =>
      selectedFilters[key].length === 0 ||
      selectedFilters[key].includes(addon[key]);
    return match("network") && match("data");
  });

  const sortedAddOns = [...filteredAddOns].sort((a, b) => {
    const getPrice = (addon) => Number(addon.price ?? 0);
    return sortOrder === "low-to-high"
      ? getPrice(a) - getPrice(b)
      : getPrice(b) - getPrice(a);
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="max-w-[1200px] mx-auto px-6 py-8 flex gap-6">
        <aside className="w-[280px] bg-white p-4 rounded shadow">
          <AddOnFiltersPanel
            selectedFilters={selectedFilters}
            toggleFilter={toggleFilter}
            resetFilters={resetFilters}
          />
        </aside>

        <main className="flex-1 space-y-4">
          <div className="flex justify-end">
            <label className="mr-2 text-sm font-medium">Sort by:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            >
              <option value="low-to-high">Price (Low to High)</option>
              <option value="high-to-low">Price (High to Low)</option>
            </select>
          </div>

          <AddOnCards addOns={sortedAddOns} selectedFilters={selectedFilters} />
        </main>
      </div>

    </div>
  );
}
