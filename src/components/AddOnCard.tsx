import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

type AddOn = {
  id: string;
  name: string;
  description: string;
  price: number;
  tooltip: string;
  network: string;
  data: string;
};

type AddOnCardProps = {
  addon: AddOn;
  qty: number;
  onUpdate: (qty: number) => void;
  onClear: () => void;
};

export default function AddOnCard({
  addon,
  qty,
  onUpdate,
  onClear,
}: AddOnCardProps) {
  const [activeBadge, setActiveBadge] = useState<number | null>(null);

  useEffect(() => {
    if (qty === 0) setActiveBadge(null);
  }, [qty]);

  const changeQuantity = (newQty: number) => {
    onUpdate(Math.max(0, newQty));
  };

  const handleBadgeClick = (value: number) => {
    if (activeBadge === value) return;
    changeQuantity(value);
    setActiveBadge(value);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-4 shadow-sm flex flex-col relative w-full">
      {/* Top Right Info Icon */}
      <div className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer">
        <FontAwesomeIcon icon={faInfoCircle} />
      </div>

      {/* Title + Description + Price */}
      <div className="mb-2 w-full min-w-0">
        <h3 className="text-base font-semibold text-gray-800 leading-tight mb-1">
          {addon.name}
        </h3>
        <p
          className="text-sm text-gray-600 truncate overflow-hidden whitespace-nowrap w-full"
          title={addon.description}
        >
          {addon.description}
        </p>
        <p className="mt-2 text-base font-semibold text-gray-800">
          £{addon.price.toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center border rounded">
          <button
            onClick={() => changeQuantity(qty - 1)}
            className="px-3 py-1 border-r hover:bg-gray-100"
          >
            –
          </button>
          <span className="px-3 py-1">{qty}</span>
          <button
            onClick={() => changeQuantity(qty + 1)}
            className="px-3 py-1 border-l hover:bg-gray-100"
          >
            +
          </button>
        </div>
        {qty > 0 && (
          <button
            onClick={onClear}
            className="text-sm text-red-500 hover:underline ml-2"
          >
            Clear selection
          </button>
        )}
      </div>

      {/* Badge Buttons */}
      <div className="flex gap-2">
        {[25, 50, 100].map((val) => (
          <button
            key={val}
            onClick={() => handleBadgeClick(val)}
            className={`px-4 py-1 rounded-full text-sm border ${
              activeBadge === val
                ? "bg-black text-white"
                : "bg-white text-black border-gray-300 hover:bg-gray-100"
            }`}
          >
            +{val}
          </button>
        ))}
      </div>
    </div>
  );
}
