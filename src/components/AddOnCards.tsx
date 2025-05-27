import React from "react";
import AddOnCard from "./AddOnCard";
import { usePlanContext } from "../context/PlanContext";

type AddOn = {
  id: string;
  name: string;
  description: string;
  price: number;
  tooltip: string;
  network: string;
  data: string;
  qty?: number;
};

type Props = {
  addOns?: AddOn[];
  selectedFilters?: Record<string, string[]>;
};

export default function AddOnCards({ addOns, selectedFilters }: Props) {
  const { selectedAddOns, setSelectedAddOns } = usePlanContext();

  if (!Array.isArray(addOns)) {
    console.warn("🚨 AddOnCards: addOns is undefined or not an array");
    return <div>⚠️ No add-ons available.</div>;
  }

  if (!selectedFilters || typeof selectedFilters !== "object") {
    console.warn("🚨 AddOnCards: selectedFilters missing or malformed");
    return null;
  }

  const getQuantity = (addon: AddOn) => {
    const match = selectedAddOns.find(
      (a: any) => a.name === addon.name && typeof a.qty === "number"
    );
    return match ? match.qty : 0;
  };

  const handleUpdate = (addon: AddOn, qty: number) => {
    if (qty === 0) {
      setSelectedAddOns((prev: any[]) =>
        prev.filter((a) => a.name !== addon.name)
      );
    } else {
      setSelectedAddOns((prev: any[]) => {
        const exists = prev.find((a) => a.name === addon.name);
        if (exists) {
          return prev.map((a) => (a.name === addon.name ? { ...a, qty } : a));
        } else {
          return [...prev, { ...addon, qty }];
        }
      });
    }
  };

  const handleClear = (addon: AddOn) => {
    setSelectedAddOns((prev: any[]) =>
      prev.filter((a) => a.name !== addon.name)
    );
  };

  const matchesFilter = (addon: AddOn) => {
    const match = (key: string) =>
      Array.isArray(selectedFilters[key]) &&
      (selectedFilters[key].length === 0 ||
        selectedFilters[key].includes((addon as any)[key]));
    return match("network") && match("data");
  };

  const filteredAddOns = addOns.filter(matchesFilter);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredAddOns.map((addon) => (
        <AddOnCard
          key={addon.id}
          addon={addon}
          qty={getQuantity(addon)}
          onUpdate={(qty) => handleUpdate(addon, qty)}
          onClear={() => handleClear(addon)}
        />
      ))}
    </div>
  );
}
