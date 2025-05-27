import { MobilePlanCard } from "./MobilePlanCard";

export function MobilePlanCards({ plans, selectedPlans, setSelectedPlans }) {
  const handleToggle = (plan) => {
    setSelectedPlans(plan); // ✅ Pass full plan object to togglePlan
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {plans.map((plan) => (
        <MobilePlanCard
          key={plan.id}
          {...plan}
          isSelected={selectedPlans.some(
            (p) => String(p.id) === String(plan.id)
          )}
          onToggle={() => handleToggle(plan)} // ✅ Send full object
        />
      ))}
    </div>
  );
}
