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

interface PlanContextType {
  selectedPlans: Plan[];
  setSelectedPlans: (plans: Plan[]) => void;
  togglePlan: (plan: Plan) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedAddOns: AddOn[];
  setSelectedAddOns: (addons: AddOn[]) => void;
  updateAddOn: (addon: Omit<AddOn, "quantity">, quantity: number) => void;
  clearAddOns: () => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPlans, setSelectedPlans] = useState<Plan[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);

  const togglePlan = (plan: Plan) => {
    setSelectedPlans((prev) => {
      const exists = prev.find((p) => String(p.id) === String(plan.id));
      if (exists) {
        return prev.filter((p) => String(p.id) !== String(plan.id));
      }
      return [...prev, plan];
    });
  };

  const updateAddOn = (addon: Omit<AddOn, "quantity">, quantity: number) => {
    setSelectedAddOns((prev) => {
      const existing = prev.find((a) => a.id === addon.id);
      if (quantity === 0) {
        return prev.filter((a) => a.id !== addon.id);
      }
      if (existing) {
        return prev.map((a) =>
          a.id === addon.id ? { ...a, quantity } : a
        );
      } else {
        return [...prev, { ...addon, quantity }];
      }
    });
  };

  const clearAddOns = () => setSelectedAddOns([]);

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
        updateAddOn,
        clearAddOns,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlanContext = (): PlanContextType => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlanContext must be used within a PlanProvider");
  }
  return context;
};
