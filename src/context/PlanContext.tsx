
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  [key: string]: any;
}

interface FooterState {
  disableContinue: boolean;
  continueLabel: string;
}

interface PlanContextType {
  selectedPlans: Plan[];
  setSelectedPlans: (plans: Plan[]) => void;
  togglePlan: (plan: Plan) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedAddOns: AddOn[];
  setSelectedAddOns: (addons: AddOn[]) => void;
  selectedServices: string[];
  setSelectedServices: (services: string[]) => void;
  footer: FooterState;
  setFooter: (footer: FooterState) => void;
}

const PlanContext = createContext<PlanContextType>({
  selectedPlans: [],
  setSelectedPlans: () => {},
  togglePlan: () => {},
  isModalOpen: false,
  setIsModalOpen: () => {},
  selectedAddOns: [],
  setSelectedAddOns: () => {},
  selectedServices: [],
  setSelectedServices: () => {},
  footer: { disableContinue: true, continueLabel: "Continue" },
  setFooter: () => {},
});

export function PlanProvider({ children }: { children: ReactNode }) {
  const [selectedPlans, setSelectedPlans] = useState<Plan[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [footer, setFooter] = useState<FooterState>({
    disableContinue: true,
    continueLabel: "Continue",
  });

  const togglePlan = (plan: Plan) => {
    if (selectedPlans.find((p) => p.id === plan.id)) {
      setSelectedPlans(selectedPlans.filter((p) => p.id !== plan.id));
    } else {
      setSelectedPlans([...selectedPlans, plan]);
    }
  };

  return (
    <PlanContext.Provider
      value={{
        selectedPlans,
        setSelectedPlans,
        togglePlan,
        isModalOpen,
        setIsModalOpen,
        selectedAddOns,
        setSelectedAddOns,
        selectedServices,
        setSelectedServices,
        footer,
        setFooter,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export const usePlan = () => useContext(PlanContext);
