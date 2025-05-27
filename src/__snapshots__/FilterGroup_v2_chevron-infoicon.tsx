import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

interface FilterGroupProps {
  title: string;
  tooltip?: string;
  children: ReactNode;
  expanded: boolean;
  onToggle: () => void;
}

export default function FilterGroup({
  title,
  tooltip,
  children,
  expanded,
  onToggle,
}: FilterGroupProps) {
  return (
    <div className="mb-4 border-b pb-2">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm">{title}</h3>
          {tooltip && (
            <FontAwesomeIcon
              icon={faInfoCircle}
              title={tooltip}
              className="text-gray-400 hover:text-gray-600 transition"
            />
          )}
        </div>
        <FontAwesomeIcon
          icon={expanded ? faChevronUp : faChevronDown}
          className="text-gray-500"
        />
      </div>

      {expanded && <div className="mt-2">{children}</div>}
    </div>
  );
}