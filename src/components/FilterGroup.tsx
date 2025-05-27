import { ReactNode, useState } from "react";
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
  hideDivider?: boolean;
}

export default function FilterGroup({
  title,
  tooltip,
  children,
  expanded,
  onToggle,
  hideDivider,
}: FilterGroupProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => setShowTooltip(!showTooltip);
  const hideTooltip = () => setShowTooltip(false);

  return (
    <div className={`mb-4 pb-2 relative ${!hideDivider ? "border-b" : ""}`}>
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm">{title}</h3>
          {tooltip && (
            <div
              className="relative"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={hideTooltip}
              onClick={(e) => {
                e.stopPropagation();
                toggleTooltip();
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                toggleTooltip();
              }}
            >
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="text-gray-400 hover:text-gray-600 transition"
              />
              {showTooltip && (
                <div className="absolute left-6 top-0 z-10 w-48 text-xs text-white bg-gray-800 p-2 rounded shadow-md">
                  {tooltip}
                </div>
              )}
            </div>
          )}
        </div>
        <FontAwesomeIcon
          icon={expanded ? faChevronDown : faChevronUp}
          className="text-gray-500"
        />
      </div>

      {expanded && <div className="mt-2">{children}</div>}
    </div>
  );
}
