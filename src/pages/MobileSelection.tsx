import React, { useEffect } from "react";
import { SERVICE_OPTIONS } from "../mobileData/serviceOptions";
import ServiceCard from "../components/ServiceCard";
import { usePlan } from "../context/PlanContext";
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

  const iconMap = {
    mobile: faMobileAlt,
    hardware: faLaptop,
    ethernet: faNetworkWired,
    fibre: faNetworkWired,
    "hosted voice": faPhone,
    "it support": faHeadset,
    software: faCode,
    wifi: faWifi,
  };

  const descriptionMap = {
    mobile: "Flexible mobile plans with data, minutes, and SMS options.",
    hardware: "Devices and equipment for your connectivity needs.",
    ethernet: "Reliable wired internet connections for businesses.",
    fibre: "High-speed fibre optic internet for seamless connectivity.",
    "hosted voice": "Cloud-based VOIP services for efficient communication.",
    "it support": "Expert technical support for your IT infrastructure.",
    software: "Business software solutions for productivity and management.",
    wifi: "Wireless internet solutions for homes and businesses.",
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 mt-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {SERVICE_OPTIONS.map((service) => (
          <ServiceCard
            key={service.id}
            id={service.id}
            name={service.name}
            icon={iconMap[service.name.toLowerCase()]}
            description={descriptionMap[service.name.toLowerCase()]}
            isSelected={selectedServices.includes(service.id)}
            onToggle={() => toggleService(service.id)}
          />
        ))}
      </div>
    </div>
  );
}
