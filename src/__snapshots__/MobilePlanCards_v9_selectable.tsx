import { MobilePlanCard } from "./MobilePlanCard";
import { mobilePlanData } from "../mobileData/mobilePlanData";

export function MobilePlanCards({ selectedFilters, selectedPlans, setSelectedPlans }) {
  const togglePlan = (id: number) => {
    setSelectedPlans((prev: number[]) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const filtered = mobilePlanData.filter((plan) => {
    const matchesNetwork =
      selectedFilters.network.length === 0 ||
      selectedFilters.network.includes(plan.network);

    const matchesData =
      !selectedFilters.data ||
      selectedFilters.data.length === 0 ||
      selectedFilters.data.includes(plan.data);

    const matchesContract =
      !selectedFilters.contract ||
      selectedFilters.contract.length === 0 ||
      selectedFilters.contract.includes(plan.term);

    const matchesRoaming =
      !selectedFilters.roaming ||
      selectedFilters.roaming.length === 0 ||
      selectedFilters.roaming.includes(plan.ukEuMins);

    const matchesFeatures =
      !selectedFilters.features ||
      selectedFilters.features.length === 0 ||
      selectedFilters.features.every((feature) => plan.icons.includes(feature));

    return (
      matchesNetwork &&
      matchesData &&
      matchesContract &&
      matchesRoaming &&
      matchesFeatures
    );
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {filtered.map((plan) => (
        <MobilePlanCard
          key={plan.id}
          {...plan}
          isSelected={selectedPlans.includes(plan.id)}
          onToggle={togglePlan}
        />
      ))}
    </div>
  );
}
