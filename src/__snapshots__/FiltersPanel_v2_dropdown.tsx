import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileAlt,
  faLaptop,
  faGlobe,
  faNetworkWired,
  faPhone,
  faHeadphones,
  faCode,
  faWifi,
  faChevronDown,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import FilterGroup from "./FilterGroup";

export function FiltersPanel() {
  const [expanded, setExpanded] = useState({
    network: true,
    data: true,
    contract: true,
    type: true,
    roaming: true,
    features: true,
  });

  const [selectedProduct, setSelectedProduct] = useState("Mobile");
  const [showDropdown, setShowDropdown] = useState(false);

  const toggle = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const iconMap: Record<string, any> = {
    Mobile: faMobileAlt,
    Hardware: faLaptop,
    Ethernet: faGlobe,
    Fibre: faNetworkWired,
    "Hosted Voice": faPhone,
    "IT Support": faHeadphones,
    Software: faCode,
    WIFI: faWifi,
  };

  const products = Object.keys(iconMap);

  return (
    <div className="space-y-4">
      {/* Product Dropdown - Custom with FA Icons */}
      <div className="bg-gray-100 p-4 rounded mb-2">
        <label className="text-sm font-semibold block mb-1">
          Selected Product:
        </label>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full border rounded px-3 py-2 bg-white flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              {iconMap[selectedProduct] && (
                <FontAwesomeIcon icon={iconMap[selectedProduct]} />
              )}
              {selectedProduct}
            </span>
            <FontAwesomeIcon icon={faChevronDown} className="text-gray-600" />
          </button>

          {showDropdown && (
            <div className="absolute z-10 bg-white border rounded w-full mt-1 max-h-60 overflow-y-auto shadow-lg">
              {products.map((product) => (
                <button
                  key={product}
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowDropdown(false);
                  }}
                  className="w-full px-4 py-2 flex items-center gap-2 hover:bg-gray-100 text-left"
                >
                  <FontAwesomeIcon icon={iconMap[product]} />
                  {product}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filters Title */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Filters</h2>
        <button className="text-blue-600 text-sm hover:underline">
          Reset All
        </button>
      </div>

      <FilterGroup title="Network" expanded={expanded.network} onToggle={() => toggle("network")}>
        {["O2", "Vodafone", "Gamma"].map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" />
            {option}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Data" expanded={expanded.data} onToggle={() => toggle("data")}>
        {["5GB", "10GB", "15GB", "Unlimited"].map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" />
            {option}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Contract Length" expanded={expanded.contract} onToggle={() => toggle("contract")}>
        {["12 months", "24 months"].map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" />
            {option}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Type" expanded={expanded.type} onToggle={() => toggle("type")}>
        {["SIM Only", "Phone + SIM"].map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" />
            {option}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="International Roaming" expanded={expanded.roaming} onToggle={() => toggle("roaming")}>
        {["Yes", "No"].map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" />
            {option}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup
        title="Features"
        tooltip="Choose additional features such as Travel or International Calls."
        expanded={expanded.features}
        onToggle={() => toggle("features")}
      >
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" />
            Travel Plus
          </label>
          <FontAwesomeIcon icon={faGlobe} className="text-gray-500" />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" />
            Travel Free
          </label>
          <FontAwesomeIcon icon={faPlane} className="text-gray-500" />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" />
            International Calling
          </label>
          <FontAwesomeIcon icon={faPhone} className="text-gray-500" />
        </div>
      </FilterGroup>
    </div>
  );
}

export default FiltersPanel;