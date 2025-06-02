import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileAlt,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function ServiceCard({
  id,
  name,
  description,
  icon,
  isSelected,
  onToggle,
}) {
  return (
    <div className="border rounded-lg p-6 bg-white text-center shadow-sm flex flex-col items-center space-y-4">
      {/* Icon */}
      <FontAwesomeIcon icon={icon} className="text-4xl text-gray-600" />

      {/* Title */}
      <h3 className="text-lg font-semibold">{name}</h3>

      {/* Description */}
      <p className="text-sm text-gray-500">{description}</p>

      {/* Add/Remove button */}
      <button
        onClick={onToggle}
        className={`w-full text-sm py-2 rounded transition ${
          isSelected
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {isSelected ? (
          "Remove"
        ) : (
          <>
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add
          </>
        )}
      </button>
    </div>
  );
}
