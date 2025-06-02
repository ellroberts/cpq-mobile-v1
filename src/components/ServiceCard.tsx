
import React from "react";
import classNames from "classnames";

interface Props {
  id: string;
  name: string;
  isSelected: boolean;
  onToggle: () => void;
}

export default function ServiceCard({ id, name, isSelected, onToggle }: Props) {
  return (
    <div
      onClick={onToggle}
      className={classNames(
        "border rounded-lg p-4 cursor-pointer shadow-sm transition-all",
        {
          "border-blue-600 bg-blue-50": isSelected,
          "hover:shadow-md": true
        }
      )}
    >
      <div className="text-lg font-medium mb-2">{name}</div>
      <button
        className={classNames(
          "w-full text-sm py-1 px-2 rounded border transition",
          {
            "bg-blue-600 text-white": isSelected,
            "bg-gray-100 text-gray-700": !isSelected
          }
        )}
      >
        {isSelected ? "Remove" : "+ Add"}
      </button>
    </div>
  );
}
