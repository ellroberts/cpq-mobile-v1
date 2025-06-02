
import React, { useEffect } from "react";
import { SERVICE_OPTIONS } from "../mobileData/serviceOptions";
import ServiceCard from "../components/ServiceCard";
import { usePlan } from "../context/PlanContext";

export default function MobileSelection() {
  const { selectedServices, setSelectedServices, setFooter } = usePlan();

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter((s) => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  useEffect(() => {
    setFooter({
      disableContinue: selectedServices.length === 0,
      continueLabel: `Continue (${selectedServices.length} selected)`,
    });
  }, [selectedServices, setFooter]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Mobile Selection</h2>
        <p className="text-gray-600 mt-1">Step 1 of 5</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SERVICE_OPTIONS.map((service) => (
          <ServiceCard
            key={service.id}
            id={service.id}
            name={service.name}
            isSelected={selectedServices.includes(service.id)}
            onToggle={() => toggleService(service.id)}
          />
        ))}
      </div>
    </div>
  );
}
