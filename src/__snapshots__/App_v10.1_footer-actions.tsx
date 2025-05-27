import "./index.css";
import { Header } from "./components/Header";
import { FiltersPanel } from "./components/FiltersPanel";
import { FooterNav } from "./components/FooterNav";
import { MobilePlanCards } from "./components/MobilePlanCards";
import { SelectedPlansModal } from "./components/SelectedPlansModal";
import { useState } from "react";
import { mobilePlanData } from "./mobileData/mobilePlanData";

export default function App() {
  const [selectedFilters, setSelectedFilters] = useState({
    network: [],
    data: [],
    contract: [],
    type: [],
    roaming: [],
    features: [],
  });

  const [selectedPlans, setSelectedPlans] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClearAll = () => {
    setSelectedPlans([]);
  };
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

  const filteredPlans = mobilePlanData.filter((plan) => {
    const matches = (key) =>
      selectedFilters[key].length === 0 ||
      selectedFilters[key].includes(plan[key]);

    return (
      matches("network") &&
      matches("data") &&
      matches("contract") &&
      matches("type") &&
      matches("roaming")
    );
  });

  const sortedPlans = [...filteredPlans].sort((a, b) => {
    const getPrice = (plan) =>
      Number(plan.price.replace("£", "").replace("/month", ""));
    return sortOrder === "low-to-high"
      ? getPrice(a) - getPrice(b)
      : getPrice(b) - getPrice(a);
  });

  const selectedPlanObjects = mobilePlanData.filter((plan) =>
    selectedPlans.includes(plan.id)
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      <Header />
      <main className="flex flex-1 p-6 pb-36 gap-6 max-w-[1200px] mx-auto w-full">
        <aside className="w-[280px] bg-white p-6 rounded shadow">
          <FiltersPanel
            selectedFilters={selectedFilters}
            toggleFilter={toggleFilter}
            resetFilters={resetFilters}
          />
        </aside>
        <section className="flex-1 space-y-4">
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

          <MobilePlanCards
            plans={sortedPlans}
            selectedFilters={selectedFilters}
            selectedPlans={selectedPlans}
            setSelectedPlans={setSelectedPlans}
          />
        </section>
      </main>

      <FooterNav
        selectedCount={selectedPlans.length}
        onViewSelected={() => setIsModalOpen(true)}
        onClearAll={handleClearAll}
      />

      <SelectedPlansModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plans={selectedPlanObjects}
      />
    </div>
  );
}
