import React, { useState, useEffect } from "react";
import { usePlanContext } from "../context/PlanContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function SelectedAddOnsModal({
  isOpen,
  onClose,
  onUpdate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (addons: any[]) => void;
}) {
  const { selectedAddOns } = usePlanContext();
  const [localAddOns, setLocalAddOns] = useState<any[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLocalAddOns([...selectedAddOns]);
      setHasChanges(false);
    }
  }, [isOpen, selectedAddOns]);

  const handleRemove = (id: string) => {
    const updated = localAddOns.filter((a) => a.id !== id);
    setLocalAddOns(updated);
    setHasChanges(true);
  };

  const handleUpdate = () => {
    onUpdate(localAddOns);
    setHasChanges(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg text-sm">
        <h2 className="text-lg font-semibold mb-4">Selected Add-ons</h2>

        {localAddOns.length === 0 ? (
          <p className="text-center text-gray-500 py-6">No add-ons selected.</p>
        ) : (
          <ul className="space-y-3 mb-6">
            {localAddOns.map((addon) => (
              <li
                key={addon.id}
                className="flex justify-between items-center border border-gray-200 rounded p-3"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {addon.name}{" "}
                    <span className="text-gray-500">x {addon.qty || 1}</span>
                  </p>
                  <p className="text-gray-600 text-xs">{addon.price}</p>
                </div>
                <button
                  onClick={() => handleRemove(addon.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Remove"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 bg-gray-100 rounded hover:bg-gray-200"
          >
            Close
          </button>
          <button
            onClick={handleUpdate}
            disabled={!hasChanges}
            className={`px-4 py-2 rounded text-white text-sm ${
              hasChanges
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
