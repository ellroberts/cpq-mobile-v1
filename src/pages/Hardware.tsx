import React from "react";
import { hardwareData } from "../mobileData/hardwareData";
import { usePlan } from "../context/PlanContext";
import FooterNav from "../components/FooterNav";
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

export default function Hardware() {
  const {
    selectedHardware,
    updateHardware,
    clearHardware,
    isModalOpen,
    setIsModalOpen,
  } = usePlan();

  const handleQtyChange = (id, name, price, description, qty) => {
    updateHardware({ id, name, price, description }, qty);
  };

  const selectedQty = selectedHardware.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="p-4 max-w-[1200px] mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Choose Your Hardware</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {hardwareData.map((item) => {
          const selected = selectedHardware.find((s) => s.id === item.id);
          const quantity = selected ? selected.quantity : 0;

          return (
            <div key={item.id} className="border p-4 rounded shadow-sm bg-white">
              <div className="flex justify-between mb-2">
                <h3 className="font-bold">{item.name}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <p className="font-semibold mb-2">£{item.price.toFixed(2)}</p>
              <div className="flex items-center justify-between mt-2">
                {[1, 5, 10].map((val) => (
                  <button
                    key={val}
                    className={`px-3 py-1 rounded border ${
                      quantity === val ? "bg-gray-800 text-white" : "bg-gray-100"
                    }`}
                    onClick={() => handleQtyChange(item.id, item.name, item.price, item.description, val)}
                  >
                    +{val}
                  </button>
                ))}
                {quantity > 0 && (
                  <button
                    className="text-sm text-red-500 ml-2 underline"
                    onClick={() => handleQtyChange(item.id, item.name, item.price, item.description, 0)}
                  >
                    Clear selection
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <FooterNav
        selectedCount={selectedQty}
        onClear={() => clearHardware()}
        onView={() => setIsModalOpen(true)}
        onContinue={() => alert("Continue to next step")}
      />
    </div>
  );
}
