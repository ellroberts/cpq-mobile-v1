import { useState, useEffect } from "react";
import type { MobilePlan } from "../mobileData/mobilePlanData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  plans: MobilePlan[];
  onUpdate: (updatedPlans: MobilePlan[]) => void;
};

export function SelectedPlansModal({
  isOpen,
  onClose,
  plans,
  onUpdate,
}: Props) {
  const [localPlans, setLocalPlans] = useState<MobilePlan[]>(plans);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setLocalPlans(plans);
    setHasChanges(false);
  }, [plans, isOpen]);

  const handleRemove = (id: number) => {
    const updated = localPlans.filter((plan) => plan.id !== id);
    setLocalPlans(updated);
    setHasChanges(true);
  };

  const handleUpdate = () => {
    onUpdate(localPlans);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Selected Plans</h2>
        <ul className="space-y-3 mb-6">
          {localPlans.map((plan) => {
            // Correctly formatted logo path
            const logoSrc = `/assets/${plan.network
              .toLowerCase()
              .replace(/\s+/g, "-")}-logo.png`;

            return (
              <li
                key={plan.id}
                className="border border-gray-200 rounded p-3 text-sm flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <img src={logoSrc} alt={plan.network} className="w-6 h-6" />
                  <span className="font-medium">{plan.name}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-gray-600 font-semibold">
                    £{plan.price}/mo
                  </span>
                  <button
                    onClick={() => handleRemove(plan.id)}
                    className="w-8 h-8 flex items-center justify-center hover:text-red-700 text-red-600 cursor-pointer"
                    aria-label="Remove plan"
                  >
                    <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                  </button>
                </div>
              </li>
            );
          })}

          {localPlans.length === 0 && (
            <li className="text-gray-500 text-sm italic">No plans selected</li>
          )}
        </ul>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </button>
          <button
            onClick={handleUpdate}
            className={`px-4 py-2 text-sm rounded text-white ${
              hasChanges
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!hasChanges}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}